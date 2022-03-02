---
title: Action Fuzzer
sidebar: Docs
showTitle: false
---

# The Action Fuzzer

## Design

This fuzzer is closely related to the new state-machine architecture of the `TezEdge` node which is inspired by `Redux`. Details about the state-machine can be found at: https://medium.com/tezedge/the-new-architecture-of-the-tezedge-node-bridging-the-gap-between-formal-specification-and-3275a9a53a4d

The goal of this fuzzer is to test: *enabling-conditions*, *reducers*, and *safety-conditions*. The fuzzer can start from an **arbitrary state**, and execute the *reducer* by dispatching randomly generated actions. For each step, the fuzzer calls the *enabling-condition* check routine, and then, if the check passes the *reducer* function. Finally, after the *reducer* returns, the *safety-condition* check routine is called.

When launched, the fuzzer fetches the live state from a running node via an RPC call. This allows us to fuzz from "real-world" states at different stages of the node’s process life.

The fuzzing engine we use is a fork of `fuzzcheck` (https://github.com/loiclec/fuzzcheck-rs), this is a structure-aware fuzzer with coverage-guided feedback. Our customised version can be found at: https://github.com/tezedge/fuzzcheck-rs

Each action of the state machine is encoded with a type, `fuzzcheck` enables us to derive mutator code for these types by adding a few extra annotations to them. These annotations only affect the final code of `TezEdge` if the project is built with the `fuzzing` feature, normal builds are not affected in any way.

Custom mutators were implemented for some types, these mutators can use information from the current state (initially obtained via RPC), to generate more precise action payloads. For example, many actions include an IP address in their payload and this IP address usually corresponds to a connected peer. We want to prioritise the generation of valid IP addresses, so we randomly select existing addresses from the state's peers-list. The implementation from the previous example can be found at:
https://github.com/tezedge/tezedge/blob/master/shell_automaton/src/fuzzing/net.rs

Finally, several tests are available to fuzz different groups of actions, these are: `test_all`, `test_control`, `test_dns`, `test_peer`, `test_storage`. By default we run `test_all` which will use all the actions. These tests can be found at: https://github.com/tezedge/tezedge/blob/master/shell_automaton/tests/action_fuzz.rs


## How to run

The easiest way to run the fuzzer is by using the scripts found in the repository at https://github.com/tezedge/action_fuzzer_ci/

The following steps can be used to deploy the fuzzing environment as a Docker container:
```
git clone https://github.com/tezedge/action_fuzzer_ci/
mkdir -p /var/lib/fuzzing-data/reports/
cd action_fuzzer_ci
./deploy.sh
```

The docker image can be launched (from the *action_fuzzer_ci* directory) with: `./run.sh`.
The container runs in detached mode, output can be read with: `docker logs -f $(docker ps -q -f ancestor=action_fuzzer)`.

Once running, the container will accept GET requests to http://127.0.0.1:8080/start. When handling such requests the server performs the following actions:

- Check if there is a node instance running (in the container), and terminate it.
- Check if there is a `fuzzcheck` instance running, terminate it.
- If a previous `fuzzcheck` instance was terminated, then generate html reports from code coverage information. These reports are stored in the "/var/lib/fuzzing-data/reports/" mount point.
- Pull new code from https://github.com/tezedge/tezedge (develop branch).
- Rebuild and run `TezEdge`.
- Rebuild and run the fuzzer.

Generated coverage reports can be visualized with a web browser from http://127.0.0.1:8080/. Keep in mind that to generate reports for the first time two requests to http://127.0.0.1:8080/start are needed, since the reports for the first request are generated when the first fuzzer is stopped by the second request.

