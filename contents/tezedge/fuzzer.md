---
title: Action Fuzzer
sidebar: Docs
showTitle: false
---


# The Action Fuzzer
 This fuzzer is closely related to the new _state-machine_ architecture of the TezEdge node, so let's start by describing it.

In this architecture there is a separation between _side-effects_ (interacting with the _external world_, for example sending or receiving data over the network) and the internal state of the node. 

The aim is to have most of the node’s logic represented as a series of _actions_ that can be applied to a _state_ producing a new state. The functions in charge of applying actions to the state are called _reducers_.

These actions are always deterministic, meaning that if we start from a state S and we apply a sequence of actions (A1, A2, A3…) to that state, we always get the same state S’. From the debugging and testing perspective, this enables us to save a particular state and record any actions applied to that state, so we can later restore a _snapshot_ of the state and _replay_ those actions, always getting the same results. 


One of our main goals is to avoid running into invalid or impossible states, which is the focus of this particular fuzzer. It also enables us to fuzz using any state of our choice as a starting point, giving us the degree of flexibility needed to reach deep logic paths. 

**A fuzzer to test enabling conditions, reducers, and safety conditions.**

Before an action is applied (by calling the reducer), an _enabling condition_ is checked against the current state (S) and the action (A). If the enabling condition fails to check, it means that this action is not valid and cannot be applied to the current state, so the reducer is not called, and the action is filtered out. If the check succeeds, the reducer is called to apply the action to the state, changing it into a new one (S1). 
Checks for _safety conditions_ are performed against the new state (S1) that was produced by the call to the reducer. If the state properties of the new state don’t hold for every state transition, then we reached an invalid state.

The fuzzer can start from an arbitrary state, and apply pseudo-random actions to it. For each generated action, the fuzzer first calls the routine that performs the enabling condition check, if the check passes then the reducer function is called, finally the enabling condition check routine is called. This can be used to detect bugs in the reducers and enabling conditions (lack of checks preventing invalid actions to be applied). Safety conditions allow us to detect if we have reached an invalid state due to logic bugs.

**How does it work?**

To get its “initial” state, the fuzzer can fetch the current state from a live running node via an RPC call to that node. This allows us to fuzz from states representing real-world cases and at different stages of a node’s life (bootstrapping, fully bootstrapped, block application, etc…).

The fuzzing engine we use is [fuzzcheck](https://github.com/loiclec/fuzzcheck-rs), a structure-aware fuzzer with coverage-guided feedback. In the node implementation each action is encoded by a type, by adding extra annotations to these types they can be used by fuzzcheck to derive the code needed to generate and mutate random actions.

We augmented some of these fuzzcheck mutators by providing feedback from the current node’s state. We can use the state information to produce more precise payloads for random actions. For example, many actions include an IP address in their payload, this IP address usually belongs to a connected peer. To reach deeper logic we want to prioritize payloads containing valid IP addresses, so we just extract them from the peers list of the current state.
