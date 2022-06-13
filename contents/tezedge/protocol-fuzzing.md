---
title: protocol-fuzzing
sidebar: Docs
showTitle: false
---
# Fuzzing the Tezos economic protocol

Any kind of system that features multiple interacting parts will inevitably have more potential for error. When we increase complexity, we need to proportionately increase our efforts at detecting bugs.

In one of [our previous articles](https://medium.com/tezedge/how-we-utilized-fuzzing-to-improve-security-in-the-tezedge-node-and-created-an-open-source-ci-tool-92ffbd804db1), we discussed the benefits of automated bug testing, in particular, the technique that is known as fuzzing (also referred to as fuzz testing). Fuzzing involves testing software by feeding it a large amount of generated inputs, the purpose of which is to capture behavior that could potentially cause vulnerabilities.

A Tezos node is composed of the economic protocol and the _shell_. The _shell_ provides the environment where the economic protocol runs, and it is in charge of: handling P2P connections, implementing the storage, and the interfaces that connect to end-users (RPCs). TezEdge is the _shell_ written in Rust, and the economic protocol is written in OCaml, between both we have the FFI layer so code from both languages can communicate with each other.

Having fuzzed most parts of our _shell_ implementation, we now turn our attention to the economic protocol implementation used by the Tezos network.

The economic protocol is the logic in charge of applying operations (transactions, smart contract execution, etc) and producing blocks. In Tezos the economic protocol can be updated on-chain via a [voting system](https://tezos.gitlab.io/alpha/voting.html) in the protocol itself. Currently, the Tezos network uses protocol-12 "Ithaca".

Since the economic protocols of Tezos are written in OCaml, we need to utilize a Foreign Function Interface (FFI) layer to ‘glue’ the TezEdge node’s Rust code with OCaml. An FFI can have serious bugs because although it is a very small surface, it involves unsafe code with potential for memory corruption bugs. 

Instead of fuzzing the OCaml code directly, we perform fuzzing through TezEdge's operation injection RPC endpoint. This way, the injected operations travel all the way from the RPC endpoint in the shell, to the protocol-runner process and finally to the FFI and the OCaml runtime. This way we cover not just the OCaml code, but also our FFI code.

**Fuzzing the economic protocol**

The goal of fuzzing operations is to target the economic protocol implementation, in this case the [Ithaca protocol](http://tezos.gitlab.io/ithaca/protocol_overview.html). To do so we employ _structure-aware fuzzing_ by implementing encoders for the different operations supported by the protocol:



* Seed nonce revelation
* Double endorsement evidence
* Double baking evidence
* Activate account
* Proposals
* Ballot
* Double pre-endorsement evidence
* Failing noop
* Preendorsement
* Endorsement
* Reveal
* Transaction
* Origination
* Delegation
* Register global constant
* Set deposits limit

The encoders allow the generation of operations by providing partial information and generating the rest of the data randomly. This way, we can selectively provide valid information for some, all, or none of the fields of each operation.

For some fields, the fuzzer will always generate valid information, one example is the _signature_ field, all operations are signed with the _ed25519_ key of the _bootstrap1_ account. Without it, all operations would fail the signature check performed by the protocol.

The operation fuzzer is implemented as a Python script that makes use of the [Tezos' Python Execution and Testing Environment](https://tezos.gitlab.io/developer/python_testing_framework.html). Four nodes and bakers are started in [sandboxed mode](https://tezos.gitlab.io/developer/python_testing_framework.html#a-simple-sandbox-scenario). This amount of bakers is the minimum required to make progress (bake new blocks). Bootstrap accounts _bootstrap2_ to _bootstrap5_ are used by bakers, and _bootstrap1_ is used as _source_ for operations. Random operations are injected via the injection/operationRPC.

The target node, and the protocol implementation are built with [coverage instrumentation](https://docs.tezedge.com/tezedge/coverage) and periodic coverage reports are generated. These reports will display coverage information relevant to the protocol implementation (OCaml code). We can find the coverage reports used in our CI here: [http://fuzz.tezedge.com/develop/.fuzzing.latest/operation_fuzzer/](http://fuzz.tezedge.com/develop/.fuzzing.latest/operation_fuzzer/)


## The operations fuzzer

This fuzzer is implemented as a Python script that makes use of the [Tezos' Python Execution and Testing Environment](https://tezos.gitlab.io/developer/python_testing_framework.html) and allows to craft and inject random (protocol-12, _Ithaca_) operations.

The fuzzer runs four nodes and four bakers in [sandboxed mode](https://tezos.gitlab.io/developer/python_testing_framework.html#a-simple-sandbox-scenario), this is the minum required to bake new blocks and do progress. Bootstrap accounts `bootstrap2-5` are used by bakers, and `bootstrap1` is used as source for the randomly generated operations, before injecting any operations protocol _Ithaca_ is activated.

On every iteration the fuzzer will:



* Request via RPC the current block's _level_.
* Request via RPC the current contract's _counter_.
* Generate a random operation, sign it, and inject it via the `injection/operation` RPC.
* Every 100 iterations coverage counters are dumped and coverage reports are generated. Reports are stored in `/var/lib/fuzzing-data/reports/develop/.fuzzing.latest/operation_fuzzer/` in the host.


### **Try out the operations fuzzer**

This repository contains the script files needed to deploy and run _TezEdge's_ operations fuzzer in the fuzzing CI.



1. Run `./deploy.sh`. This script will build the _fuzz_op_ Docker container.
2. Run `./run.sh`. The scrip will run the _fuzz_op_ container which will listen form _XMLRPC_ requests at address `127.0.0.1:9002`.
3. The fuzzer can be restarted at any time by sending an _XMLRPC_ request, this can be done by running the script at `scripts/restart_fuzzer.py`. In this restart process new code will be pulled and built from _TezEdge's_ `develop` branch, this way the fuzzer can be integrated in CI.
