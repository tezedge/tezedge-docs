---
title: Synchronization
sidebar: Docs
showTitle: false
featuredImage: ../images/1.gif
---

# The synchronization and bootstrapping process 

In this section, we explain the node synchronization process. We will particularly focus on the application of transactions (and other operations) to the Tezos protocol. Also included is a guide on how to run the TezEdge node’s synchronization process.

Please note that the TezEdge node is currently capable of:
* Downloading headers and operations, which it can apply to the protocol in order to get the current state of the blockchain after the application of the most recent block.
* Creating an OCaml node-compatible database
* Providing web socket data for monitoring the synchronization process
* Providing the following remote procedure calls (RPCs):
```
/monitor/bootstrapped (GET)
/chains/main/blocks/head (GET)
```

# Synchronization

In Tezos, synchronization describes the process of a node downloading operations and headers from her peer(s) and then applying the operations to the protocol.

The protocol is a set of rules that processes operations with the previous state of the blockchain, resulting in the next state. The protocol keeps processing operations and states until it reaches the latest block of operations, resulting in the latest state.

![Image](../../static/images/synchronization_1.gif "Image")

In Tezos, the latest state is sometimes referred to as the context. We will provide a more detailed explanation of state in a future article.

**The synchronization process**

Let’s say Alice wants to bake. To become a baker, Alice must synchronize her node with the network. In order to do so, Alice’s node must have her own copy of the blockchain. She acquires it by downloading the block headers and blocks of operations from her peer(s), applying them to the protocol until she reaches the latest block, resulting in the latest state of the blockchain.

**1) Downloading headers and operations**

To download operations and headers, Alice must establish a trusted connection with one of her peers. First, she requests and downloads the block headers. Second, her node will download all of the operations in the history of the network, starting with the oldest block of operations and progressing chronologically to the latest. We provided a detailed description of this process in our article about the P2P layer.

**2) Applying to protocol**

After Alice has downloaded all of the blocks of operations from her peers, her node will begin applying the operations to the protocol, starting with the oldest block of operations and progressing chronologically towards the latest. Each time a block of operations is applied, the state of the network is changed, directly affecting the balances of all Tezos accounts, among other values. Additionally, each time a block of operations is applied to the protocol, Alice creates a new context hash for the block. Alice continuously checks the correctness of her application process by comparing her context hash with the context hash from the block header.

Some operations may be invalidated by the protocol. For instance, in the animation below, there is a transaction in which Alice sends 20 Tezos to Bob. However, the protocol checks the latest state, which reveals that Alice does not have enough in her balance to make the transaction, and thus the protocol invalidates the transaction.

<animation 2>

The synchronization process can be susceptible to errors and interruptions. In our approach to the synchronization process, our primary goal is to improve stability as much as possible. We applied various methods of improving network resiliency to common errors such as incorrect data, network timeouts, downtime and other network issues in general.

When we download the blockchain data, we don’t interact with OCaml until we begin applying the blocks to the Tezos protocol. The results are cached into the RocksDB database that is embedded in the TezEdge node.

The synchronization process can now be viewed through an early version of the web-based Node Explorer, which displays how many blocks have been downloaded. You can also see messages about statistics, including download speed and estimated time of download. These are delivered through a web socket.

# Guide for bootstrapping the TezEdge node
You have three options for trying out the synchronization process:
**A) View an already running node through the Tezos Node Explorer (browser)**

The most straightforward method is to view it through your internet browser at this address: node.tezedge.com
Since this is a demo mode, you do not need to run your own node as it is already running. The node is regularly restarted in order to demonstrate the synchronization process.

<animation 3>

**B) Bootstrap your own node via Docker**
1. Download the repo
```
git clone https://github.com/simplestaking/tezedge
```
2. Download and install Docker (if you haven’t already)
3. Run docker by typing the following command into the terminal:
```
cd docker
docker-composer up
```
Your terminal will now show information about the bootstrapping process
4. You can also view this information in your browser by entering this address into the URL bar: http://127.0.0.1:8080/
 
**C) Build and run your node from the source code**

You can build and run the node in multiple configurations. For instance, the node can provide structured logs, which makes it easier to set up various monitoring tools. For more information on how to build the node from the source code, see the readme on [GitHub.](https://github.com/simplestaking/tezedge)
