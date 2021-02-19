---
title: Storage memory
sidebar: Docs
showTitle: false
---
# Storage memory

  
Memory management is one of the most crucial aspects of programming since it controls the way a software application accesses computer memory. A software requires access to the computer's random access memory (RAM) to:

  

- Load its own bytecode that needs to be executed.Store the data values and structures that's been used by the program

- Load any run-time systems that are required for the program to execute.

- Unlike hard disk drives, RAM is finite.

  

Unlike hard disk drives, RAM is finite. If a program keeps consuming memory without freeing it, we may reach a position where the system itself runs out of memory and crashes.

  

To avoid this, memory must be efficiently managed. One way of achieving that is garbage collection.

  

**The Importance Of Garbage Collection**

  

A garbage collector's function is to reclaim garbage or the memory occupied by objects that are no longer in use by the program.

  

Garbage collection can potentially be a cumbersome process as it takes up a significant portion of total processing time in a program and has significant influence on the system’s performance. Garbage collection usually occurs when one of the following conditions is observed:

  

- The overall system has low physical memory. This can be detected either by a low memory notification from your OS or can be indicated by the host.

- The memory allocated to objects on the managed heap has surpassed an acceptable threshold.

  

JVM(Java/Scala/Groovy/Kotlin), JavaScript, C#, Golang, Ruby, and OCaml, and Ruby are some of the languages that use Garbage collection for memory management by default.

  

**Stack vs Heap**

  

Before we go deeper into garbage collection, let's gain a little more clarity on how computer memory works. Regardless of what language you are running, when a program gets executed, a particular amount of memory is allocated on your RAM to make space for variables, computations, etc. This space can be in on of the two following spaces:

  

- **Stack:** The items on the stack are managed by the CPU upon compilation. Everytime a variable is created, it gets pushed onto the stack. A stack follows the LIFO (Last In First Out) principle Simply put, when the program ends, the system automatically clears the stack by removing the last item first. The stack mostly holds local variables of primitive data types like ints, booleans, etc.

- **Heap:** Unlike the stack, the heap is not managed by the CPU and is managed by the programmer themselves. The biggest problem with heap is that the programmer has to be constantly aware of where, why, and how much memory you are working with at all times. However, it isn't limited to the size of the variables and has more space than the stack.

  

**Memory Release Via Garbage Collection**

  

The main objective of Garbage Collector is to free heap memory by removing unreachable objects. The garbage collector determines the best time to perform a collection based on the memory allocations being made. When the garbage collector performs a collection, it:

  

- Releases the memory for objects that are no longer being used by the application.

- Determines which objects are no longer being used by examining the application's roots.

  

An application's roots include static fields, local variables on a thread's stack, CPU registers, GC handles, and the finalize queue. The garbage collector can ask the rest of the runtime for these roots.

Based on this list, the GC creates a graph that contains all the objects that are within the root's reach. The objects that are unreachable for this graph are considered garbage, and the allocator promptly releases the memory associated with them**.**

  

********What happens during garbage collection?********

  

1. The garbage collector examines the managed heap, looking for the blocks of address space occupied by unreachable objects.

2. Upon discovering an unreachable object, the garbage collector uses a memory-copying function to compact the reachable objects in memory, freeing up the blocks of address spaces allocated to unreachable objects.

3. After these reachable objects have been compacted, the garbage collector makes the necessary pointer corrections so that the application's roots point to the objects in their new locations.

4. Memory is compacted only if the GC discovers a significant number of unreachable objects.

5. If all the objects in a managed heap survive the collection process, there is no need for memory compaction.

6. To improve performance, the runtime allocates memory for large objects in a separate heap. The GC automatically releases the memory for large objects. However, this memory usually isn't compacted to avoid moving large objects in memory.

  

**Improving upon manual memory allocation?**

  

There are several reasons we prefer using an integrated garbage collector instead of allocating memory manually. For a better perspective, let's compare your standard garbage collection with C's free() function. Free() is used in C to dynamically deallocate the memory.

  

- Firstly, free() is a very expensive operation, which involves navigating over the complex data structures used by the memory allocator.

- Whenever you call free(), all of the code and data gets loaded into the cache, which inadvertently displaces them every single time you free a single memory allocation.

- On the other hand, a garbage collector can free up multiple memory areas in one go, which makes the system displace code and data only once, making it far more efficient.

- Garbage collectors also move memory areas around and compact the overall heap, making allocation easier and faster.

  

**Garbage Collection vs. Automatic Reference Counting**

  

Memory management usually takes place via two methods – Garbage Collection and Automatic Reference Counting (ARC). Like GC, ARC also aims to take the burden of memory management away from the programmers. Languages like Objective-C, Swift, and Perl use the ARC for memory management.

  

The core principle of ARC is simple: an object is considered needed as long as some piece of code is holding on to it. This is how it works:

  

- ARC counts the number of references for each object. When the reference count drops to zero, the object is deemed unreachable and recycled.

- During compilation, the ARC inserts messages like retain and release on to the objects which increases or decreases its reference count at runtime.

- When the number of references goes down to zero, the object gets marked for deallocation.

- Unlike GC, ARC isn't a background process. Plus, it removes objects asynchronously at runtime.

  

While reference counting does have its moments, many computer scientists don't consider it "serious" garbage collecting. The ARC system has the following disadvantages:

  

- Each object needs to store a reference count.

- Programs end up using more memory and are consequently slower.

- Reference counting is expensive since you need to constantly update and check the references of each object during runtime.

- They cannot collect so-called circular, or self-referential structures.

  

**Advantages of a garbage collection**

  

- It frees up programmers from having to manually release memory, enabling them to channel their focus on more important functions.

- It allocates objects on the managed heap more efficiently.

- Objects that are no longer users are reclaimed, cleared of their memory, and the GC reserves the memory for future allocation.

- Constructors don't need to initialize every data field since managed objects get to automatically start with fresh content.

- By making sure that an object cannot use the content of another object, it provides memory safety.

  

**Garbage collection and OCaml**

  

Tezos' underlying protocol has been written in OCaml. As with most of the modern languages, it has an integrated garbage collector which can do the garbage collection process for you. This garbage collector is a modern hybrid generational/incremental collector which outperforms manual collection in most cases.

  

The OCaml garbage collector is synchronous and doesn't run in a separate thread. It can only get called during an allocation request. OCaml's garbage collector has two heaps – the minor heap and the major heap.

  

- **Minor Heap:** Most objects are small, get allocated frequently and then immediately freed. These objects enter the minor heap and get promptly freed up by the garbage collector.

- **Major Heap:** Only a few objects are more long lasting. These objects get shifted into the major heap from the minor heap after a certain amount of time. The major heap gets cleaned up less frequently than the minor heap.

  

**The Garbage Collection module in OCaml**

  

OCaml's GC module has some useful functions for querying and calling the garbage collector. to understand how all this works, consider the following program:

  

let rec iterate r x_init i =

  

if i = 1 then x_init

  

else

  

let x = iterate r x_init (i-1) in

  

r *. x *. (1.0 -. x)

  

let () =

  

Random.self_init ();

  

Graphics.open_graph " 640x480";

  

for x = 0 to 640 do

  

let r = 4.0 *. (float_of_int x) /. 640.0 in

  

for i = 0 to 39 do

  

let x_init = Random.float 1.0 in

  

let x_final = iterate r x_init 500 in

  

let y = int_of_float (x_final *. 480.) in

  

Graphics.plot x y

  

done

  

done;

  

Gc.print_stat stdout

  
  

**The code above, will print out the following:**

  

minor_words: 115926165 # Total number of words allocated

  

promoted_words: 31217 # Promoted from minor -> major

  

major_words: 31902 # Large objects allocated in major directly

  

**minor_collections: 3538** # Number of minor heap collections

  

**major_collections: 39** # Number of major heap collections

  

heap_words: 63488 # Size of the heap, in words = approx. 256K

  

heap_chunks: 1

  

top_heap_words: 63488

  

live_words: 2694

  

live_blocks: 733

  

free_words: 60794

  

free_blocks: 4

  

largest_free: 31586

  

fragments: 0

  

compactions: 0

  

There are two things that you should note in the block of content above. The minor heap has around 3,538 collections, while the major heap has only 39. In this simple example, we can see that the minor heap is nearly 100X times bigger than the major heap.

  

**Minor Heap Garbage Collection in OCaml**

  

First, let's see how the minor heap works in OCaml. As mentioned before, the minor heap is where most of the short-lived values are held. In the minor heap, we have a sequence of OCaml blocks in one chunk of virtual memory.

  

Here are some points to keep in mind about the minor heap:

  

- OCaml uses copying collection to move all live blocks in the minor heap to the major heap. The work needed here is proportional to the number of live blocks in the minor heap. As per definition, the number of blocks in the minor heap is generally small.

- The minor collection halts the application while it runs. This is why it's very important that it finishes quickly to minimize interruptions.

  

**How does garbage collection work in minor heaps?**

  

- There are two pointers that delimit the start and end of the heap region – caml_young_start (start) and caml_young_end (end).

- In a fresh minor heap, the current pointer (ptr) will point at the end, while the "limit" is equal to "start."

- As blocks get allocated, the ptr value will keep decreasing until it reaches the "limit." When the limit is reached, the minor heap garbage collection gets triggered.

  

**Major Heap Garbage Collection in OCaml**

  

The major heap is much larger in size than the minor heap and scales up several gigabytes in size. It is cleaned using a mark-and-sweep garbage collection algorithm. This is how it works:

  

- During the mark phase, the algorithm scans the block graph and marks all live blocks by setting a bit in the tag of the block header. This tag is also known as the color tag.

- During the sweep phase, it sequentially scans the heap chunks and identifies dead blocks that haven't been marked earlier.

  

Like the minor heap, major heap garbage collection also needs to stop the application to conduct its operations. As such, the mark-and-sweep phases run incrementally over slices of the heap to avoid frequent pausing.

  

**Garbage Collection in the TezEdge node**

  

The Rust-based TezEdge node has begun development on a garbage collector for its storage. The primary reason behind this is a desire to increase the node’s performance by storing the blockchain state in memory. However, since memory is limited and expensive, it is necessary to efficiently manage it, with GC being one way of achieving that.

  

Two constraints for the GC implementation were identified:

1. The node needs to store at least the last 7 cycles in memory in order to function properly.

2. The GC must not slow down the node’s storage to the point where switching to an in-memory implementation does not improve performance.

  

The approach that has so far delivered the best results utilizes a so-called mark and move approach. The 7 most recent cycles are divided into 7 cycle stores, necessary entries from older cycles are periodically ‘moved’ to the new cycle stores and everything else gets garbage collected. For more detailed information, illustrated diagrams and a discussion of the process, please read the [TezEdge garbage collection article.](https://docs.tezedge.com/tezedge/garbage-collection)

  
  
  

**Bibliography**

  

Madhavapeddy, Anil, Hickey, Jason, and Minsky, Yaron. “Real World OCaml,” in [https://dev.realworldocaml.org/](https://dev.realworldocaml.org/), 2013.

  

“Garbage Collection,” in [https://ocaml.org/learn/tutorials/garbage_collection.html](https://ocaml.org/learn/tutorials/garbage_collection.html).

  

“Fundamentals of garbage collection,” in [https://docs.microsoft.com/en-us/dotnet/standard/garbage-collection/](https://docs.microsoft.com/en-us/dotnet/standard/garbage-collection/).

  

Zorn, Benjamin. "The Measured Cost of Conservative Garbage Collection"in [https://onlinelibrary.wiley.com/doi/abs/10.1002/spe.4380230704](https://onlinelibrary.wiley.com/doi/abs/10.1002/spe.4380230704), 1993.

  

“Garbage Collection in Java,” in [https://www.geeksforgeeks.org/garbage-collection-java/](https://www.geeksforgeeks.org/garbage-collection-java/).
