---
title: Firewall
sidebar: Docs
showTitle: false
---

### **Integrating an eBPF-based firewall into the TezEdge node with multipass validations**

Any kind of service that relies on an active internet connection, whether it is a website, application or blockchain node, has to have a mechanism by which it filters incoming traffic. Adversaries may attempt to flood their target with repeated requests, aiming to overload the server and disrupt its service. A well-known form of this attack is the Distributed Denial of Service (DDoS), which is often the culprit behind the downtime of many websites and applications. Adversaries may also attempt to introduce malicious data that may interfere directly with the service.

Possible solutions include special network cards that are capable of recognizing valid traffic, but these are very expensive and difficult to scale. Another option is to accept all incoming traffic and then filter out the malicious data within the application/network layer. However, this is resource-intensive and comparatively slow.

In blockchain, securing the node against malicious peers is of prime importance as such attacks may deny service or even create erroneous blocks, leading to significant financial costs. We want to halt the adversary at the earliest step possible, before any of the packets actually arrive into the kernel. Not only does this save time and resources on part of the node, but it also maximizes security as none of the bad traffic may enter the system.


### **Utilizing XDP/eBPF as the TezEdge node’s firewall**

We wanted to create a firewall for the TezEdge node that would recognize inbound traffic and filter it out before it enters the node itself. For this purpose, we’re utilizing an eXpress Data Path / Extended Berkeley Packet Filters (XDP/eBPF) module that acts as a layer outside of the node itself. This module allows us to run an application in the kernel that acts as a firewall, filtering incoming messages.

![Image](../../static/images/firewall1.png)

_Note that the packet flows through XDP eBPF (the small icon on the bottom left) before entering any part of the networking stack. Source: Wikipedia.org_


The firewall acts as the TezEdge node’s first line of defense. When a peer first connects to a node, it begins the bootstrapping process, with the first message being the connection message.

The connection message contains the peer’s public key and their proof of work. The proof of work is a small piece of code that is generated based on the associated public key. It is very hard to replicate the proof of work, but it is easy to check its validity. The firewall ensures that each connection starts with a _valid and unique_ (per connection) proof of work. If an adversary wants to start many connections, they must generate many unique proof of works, which makes a DDoS attack very expensive.

The connection message is first subjected to these checks from the firewall. If it passes these checks, the message is allowed to pass into the node. If it does not, the message is rejected without any of its packets ever entering the kernel. This minimizes the node’s attack surface and considerably speeds up traffic filtering.


### **Integrating the firewall into the TezEdge node with multipass validations**

When an erroneous block arrives at our node, we want to invalidate it without having to actually download its operations. We want to avoid allowing them inside the validation subsystem, which minimizes the attack surface for a potential hack.

The goal of multipass validation is to[ “detect erroneous blocks as soon as possible”](https://tezos.gitlab.io/whitedoc/validation.html?highlight=multipass) without having to download the entire chain data.

For this reason, we’ve placed the multipass validations into the processing of the “head increment”, which is also known as the “CurrentHead” message, which a peer sends to our node (before we know whether the peer is trusted or not).

The CurrentHead message only contains information about the block, and possibly the operations from the mempool (you can learn more about the P2P messages in our old mempool articles[ 1](https://medium.com/simplestaking/the-tezedge-node-a-deep-dive-into-the-mempool-part-1-1a01e3b9de9a) and[ 2](https://medium.com/simplestaking/the-tezedge-node-a-deep-dive-into-the-mempool-part-2-fc7c579d0033)). When the CurrentHead message arrives at our node, in the first step we check[ several validations](https://github.com/simplestaking/tezedge/blob/v0.8.0/shell/src/state/block_state.rs#L89) in it, for example:



*   `future_block` — The block was annotated with a time that is too far in the future, so this block will be ignored, we do not download the block’s operations nor the mempool operations.
*   `fitness_increases` — If the received block does not increase fitness, then we are not interested in it, so we ignore it and we do not download the block’s operation nor the mempool operations.
*   `predecessor_check` — whether we have the previous block (the predecessor block) saved:
1. If we do not have it, then we request a “CurrentBranch” message from a peer, which sends us the entire branch. The predecessor block is in this branch.
2. If we do have the predecessor block, we schedule the downloading of the operations for the CurrentHead. Here we also schedule the downloading of operations from the mempool. These operations from the mempool, if validated, can be included in the upcoming block.

Now comes the time for the multipass strict validation. Suppose that the attacker wants to send us several of their invalid blocks.

We need to find out what version of the protocol will be used in the application of the CurrentHead block so that we can validate it before we download the operations from the CurrentHead. This information can be found in the predecessor block. Operations are not downloaded unless the CurrentHead has been validated.

Once we find out the protocol version from the predecessor, then we can [call the protocol](https://github.com/simplestaking/tezedge/blob/v0.8.0/shell/src/validation/mod.rs#L212) operation `begin_application` with the CurrentHead. This validates various items, for example: `proof_of_work_stamp`, `fitness_gap`, `baking_rights`, `signature` and `protocol data`.

If we haven’t found the protocol version from the predecessor, we check whether the CurrentHead has the same `proto_level` attribute as the block that has arrived. If the `proto_level` is different, then we discard the block. Next, the protocol data is validated.

If we do not pass through any of these validations, we can suppose that the peer is attempting to add an invalid block by changing the message. At this moment we send the [“BlacklistPeer” message](https://github.com/simplestaking/tezedge/blob/v0.8.0/shell/src/chain_manager.rs#L610). We have implemented an initial system for blacklisting malicious peers in TezEdge (with a simple[ test in CI](http://ci.tezedge.com/simplestaking/tezedge/1840/1/7)).

There is a little bit of overhead with the validations on the protocol, but we can afford it thanks to the “connection pool” as described in our[ previous article](https://medium.com/simplestaking/the-tezedge-node-using-multiple-cpu-cores-to-pre-validate-operations-in-tezos-eb4d26dc3b7d?source=collection_home---6------0-----------------------).

With this kind of multipass validation, we’ve secured that:



*   We won’t download the `current_branch` from the network and possibly the entire history as it can be already re-written or otherwise changed by the adversary.
*   We won’t download the block’s operations from the network.
*   We won’t download the mempool’s operations (which may have also been compromised)

Next, we plan on integrating the firewall with the TezEdge node through a Unix domain socket with simple commands (block, unblock). Suspicious peers will be automatically blocked through xBPF.

**How to test the firewall**



1. Clone the firewall repository

```
git clone[ https://github.com/simplestaking/tezedge-firewall](https://github.com/simplestaking/tezedge-firewall`)
cd tezedge-firewall
```

2. We can run the firewall with either the OCaml or the Rust node. We’ve prepared two commands with which you can run it on either node.

```
docker-compose -f docker-compose.firewall.ocaml.yml pull
docker-compose -f docker-compose.firewall.ocaml.yml up
```

Here are the commands for the TezEdge (Rust) node:

```
docker-compose -f docker-compose.firewall.rust.yml pull
docker-compose -f docker-compose.firewall.rust.yml up
```

3. The output is a simulation of what happens when we try to connect with an invalid proof of work, the firewall detects the attempt and blocks the peer. The attacker receives an error message.
