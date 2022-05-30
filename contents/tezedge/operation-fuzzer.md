---
title: Operations fuzzer
sidebar: Docs
showTitle: true
---

# Operations fuzzer

The goal of fuzzing operations is to target the economic protocol implementation, in this case the [Ithaca protocol](http://tezos.gitlab.io/ithaca/protocol_overview.html).

To do so we employ *struct-aware fuzzing* by implementing encoders for the different operations supported by the protocol:
- Seed nonce revelation.
- Double endorsement evidence.
- Double baking evidence.
- Activate account.
- Proposals.
- Ballot.
- Double preendorsement evidence.
- Failing noop.
- Preendorsement.
- Endorsement.
- Reveal.
- Transaction.
- Origination.
- Delegation.
- Register global constant.
- Set deposits limit.

The encoders allow to generate operations by providing partial information and generating the rest of the data randomly. This way we can selectively provide valid information for some, all, or none of fields of each operation.
                                                                                                                     
For some fields the fuzzer will always generate valid information, one example is the `signature` field, all operations are signed with the *ed25519* key of the `bootstrap1` account. Without it, all operations would fail the signature check performed by the protocol.

The operation fuzzer is implemented as a Python script that makes use of the [Tezos' Python Execution and Testing Environment](https://tezos.gitlab.io/developer/python_testing_framework.html). Four nodes and bakers are started in [sandboxed mode](https://tezos.gitlab.io/developer/python_testing_framework.html#a-simple-sandbox-scenario). This amount of bakers is the minum required to make progress (bake new blocks). Bootstrap accounts `bootstrap2-5` are used by bakers, and `bootstrap1` is used as source for operations. Random operations are injected via the `injection/operation` RPC.

The target node, and the protocol implementation (*libtezos*) are built with [coverage instrumentation](https://docs.tezedge.com/tezedge/coverage) and periodic coverage reports are generated. These reports will display coverage information relevant to the protocol implementation (OCaml code). We can find the coverage reports used in our CI here: http://fuzz.tezedge.com/develop/.fuzzing.latest/operation_fuzzer/

