---
title: Mixing Rust and OCaml
sidebar: Docs
showTitle: false
---

### **Improving the security and speed at which the TezEdge node calls the Tezos protocol.**

In programming, it is always useful to prevent bugs that could potentially threaten your software. This is particularly important when developing software that manages resources or provides an important service.

In blockchain nodes, bugs may cause significant financial loss by denying service or exposing sensitive data. As such, safety should always be paramount in the development of a new blockchain node.

The[ TezEdge](https://github.com/simplestaking/tezedge) node (written in Rust) has to interact with the native[ Tezos](https://gitlab.com/tezos/tezos) node (written in OCaml). However, whenever two languages interact with each other, the boundaries are very often the source of bugs, vulnerabilities, and inefficiencies. We wanted to ensure safety when mixing these two languages without sacrificing the node’s performance.


### **Securing interop between Rust and OCaml**

Rust and OCaml are two languages with focus on safety and performance, each with its own strengths. They complement each other well, and sometimes a mixed-language codebase will need to integrate code written in both.

To do so correctly, some differences between the languages must be taken into account. There are for example a few differences in how each language handles memory and values:



*   Rust and OCaml have different in-memory representations for various values that must be interpreted differently.
*   Rust and OCaml each have their own strategy for managing memory. OCaml runs at runtime a Garbage Collector (GC) that can move values around to reorganize memory. Rust doesn’t need to perform garbage collection at runtime because it solves memory management statically.

Integrating both languages is a delicate task where it is easy to make mistakes. Isolating and debugging any resulting bug proves to be very difficult.

Incorrectly interpreting in-memory values or failing to take into account each language’s memory management strategy can result in memory corruption, crashes and security vulnerabilities.

**_When mixing Rust and OCaml, the usual operations involve:_**



*   Constructing and deconstructing OCaml values.
*   Interpreting memory containing OCaml values in a meaningful way.
*   Calling OCaml functions.
*   Exposing Rust functions so that OCaml can call them.
*   Cooperating with OCaml’s Garbage Collector to ensure data integrity, and avoiding crashes.

**_We wanted to address several issues in how TezEdge implemented this integration:_**



*   Safety and correctness was not enforced mechanically, but required instead careful and time-consuming inspection of the code.
*   There was unnecessary overhead. When passing data around at the boundaries, values were encoded in a binary format by the sender, and then decoded by the receiver. This was done because it made it easier to trust the code at the boundaries.

OCaml provides an API for interfacing with C code. This API was designed for minimal overhead, so it comes with no safety checks. This requires the programmer to be very careful.

Foreign code that interacts with OCaml’s runtime[ must conform to certain requirements](https://caml.inria.fr/pub/docs/manual-ocaml/intfc.html#s%3Ac-gc-harmony) to ensure that the program and OCaml’s GC interact well and safely.

Following those requirements may not seem complicated, but in practice it is very easy to make a mistake and fail to follow every rule. Even the smallest mistake can result in corrupted memory or segmentation faults. Debugging these GC-related bugs is very hard, because they are not deterministic, and cannot be studied in isolation.

The cause can be that the GC has moved values around, making old pointers stale, or because a memory location containing an OCaml value was interpreted wrongly on the Rust side.

Because of this, by default interaction between Rust and OCaml code is inherently unsafe.


### **Introducing OCaml interop**

We built[ ocaml-interop](https://github.com/simplestaking/ocaml-interop) with the goal of solving this problem by enforcing these rules statically and providing easy conversion between Rust and OCaml values. It has a strong focus on safety without sacrificing performance.

[ocaml-interop](https://github.com/simplestaking/ocaml-interop) achieves this goal by:



*   encoding OCaml’s[ GC invariants](https://caml.inria.fr/pub/docs/manual-ocaml/intfc.html#s:c-gc-harmony) into Rust’s type system so that they are enforced statically by the borrow checker as described in[ Stephen Dolan’s “Safely Mixing OCaml and Rust” paper](https://docs.google.com/viewer?a=v&pid=sites&srcid=ZGVmYXVsdGRvbWFpbnxtbHdvcmtzaG9wcGV8Z3g6NDNmNDlmNTcxMDk1YTRmNg).
*   assigning relevant types to OCaml references in Rust code that match the OCaml counterpart.
*   providing default conversions between OCaml and Rust values that behave correctly.
*   providing utilities to easily define new composable conversions correctly and safely.

We’ve implemented this interoperability in TezEdge, the Tezos node shell that is written in Rust.

After updating TezEdge to use[ ocaml-interop](https://github.com/simplestaking/ocaml-interop):



*   We found and fixed some hard to reproduce GC-related bugs.
*   When writing new code, it is not possible anymore to break any of the rules required for safe interaction with OCaml’s GC. This prevents any future bugs related to that.
*   Data conversion between Rust and OCaml representations became considerably easier and less prone to errors.
*   Without the encoding/decoding overhead, passing complex data on function calls between Rust and OCaml is now approximately twice as fast.

One of the most common calls that are used in Rust/OCaml is apply protocol, where we are using OCaml protocol to validate operations and create blocks.

Here is for example a speed comparison between round trips passing an instance of[ ApplyBlockRequest](https://github.com/simplestaking/tezedge/blob/v0.5.0/tezos/api/src/ffi.rs#L63-L70) to OCaml, and receiving an[ ApplyBlockResponse](https://github.com/simplestaking/tezedge/blob/v0.5.0/tezos/api/src/ffi.rs#L81-L93) as a result:

The old version performs encoding and decoding of both requests and responses:

`Benchmarking apply_block_request_encoded_bytes_roundtrip:`
`Collecting 100 samples in`
`time: [61.899 us 62.947 us 64.262 us]`

The new version converts Rust values directly into OCaml values and vice versa:

`Benchmarking apply_block_request_structs_roundtrip:`
`Collecting 100 samples`
`time: [27.658 us 28.170 us 28.789 us]`

**_Here are more examples of[ ocaml-interop](https://github.com/simplestaking/ocaml-interop) usage in TezEdge codebase:_**



*   [Converting Rust structs/enums into OCaml records/variants](https://github.com/simplestaking/tezedge/blob/v0.5.0/tezos/api/src/ocaml_conv/to_ocaml.rs).
*   [Converting OCaml records/variants into Rust structs/enums](https://github.com/simplestaking/tezedge/blob/v0.5.0/tezos/api/src/ocaml_conv/from_ocaml.rs).
*   [Calling into OCaml from Rust, and defining Rust functions callable from OCaml](https://github.com/simplestaking/tezedge/blob/v0.5.0/tezos/interop_callback/src/callback.rs#L48-L224).


### **How OCaml interop prevents subtle bugs**

Consider the following example (borrowed and adapted from caml-oxide’s paper).

A Rust function that takes an OCaml string s and returns an OCaml triplet (s, (s, s)):



<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image1.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![Image](../../static/images/mixing1.png)


This short snippet of code looks innocent, but it contains a very subtle bug.

On the second call to alloc_pair, the reference to s is invalid. During the first call to alloc_pair, the OCaml runtime may have moved the value pointed-to by s while performing garbage collection. Then on the second call to alloc_pair a possibly stale reference that no longer points to the intended value is being passed as an argument.

Most of the time this program will work correctly. But sooner or later this bug will manifest itself. The result will be an invalid memory access that is very hard to reproduce and debug.

But the program above does not compile. Because of the rules[ ocaml-interop](https://github.com/simplestaking/ocaml-interop) encodes using Rust’s type-system an error is produced at compile-time by Rust’s borrow-checker.

This version compiles and behaves correctly:



<p id="gdcalert2" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image2.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert3">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![Image](../../static/images/mixing2.png)


Another important detail is that compared to OCaml’s C interop API (which represents every OCaml value with a single value type), in ocaml-interop every OCaml type has a disjoint type in Rust. This ensures that things that shouldn’t be mixed do not mix.


### **References and links**



*   ocaml-interop[ repository](https://github.com/simplestaking/ocaml-interop) and[ documentation](https://docs.rs/ocaml-interop/0.2.4/ocaml_interop/).
*   OCaml Manual:[ Chapter 20 Interfacing C with OCaml](https://caml.inria.fr/pub/docs/manual-ocaml/intfc.html).
*   [Safely Mixing OCaml and Rust](https://docs.google.com/viewer?a=v&pid=sites&srcid=ZGVmYXVsdGRvbWFpbnxtbHdvcmtzaG9wcGV8Z3g6NDNmNDlmNTcxMDk1YTRmNg) paper by Stephen Dolan.
*   [Safely Mixing OCaml and Rust](https://www.youtube.com/watch?v=UXfcENNM_ts) talk by Stephen Dolan.
*   [CAMLroot: revisiting the OCaml FFI](https://arxiv.org/abs/1812.04905).
*   [caml-oxide](https://github.com/stedolan/caml-oxide), the code from that paper.
*   [ocaml-rs](https://github.com/zshipko/ocaml-rs), another OCaml&lt;->Rust FFI library.
