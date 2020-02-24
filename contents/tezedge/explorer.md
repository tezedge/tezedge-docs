---
title: Explorer
sidebar: Docs
showTitle: false
---

# Explorer

*The TezEdge Explorer is an in-depth node explorer that shows all interactions between the Tezos protocol and storage. Developers, security researchers and other users can use the TezEdge Explorer to audit, trace and profile each individual action occurring within a block.*

In coding, most bugs occur due to an incomplete understanding of the code that is being utilized. Tracing and profiling can help with that.

Tracing is used to track individual actions performed within the code. With profiling, you can view which code is using the most resources.

Through tracing and profiling, you can gain a deeper understanding of an application, which results in code that performs well and runs smoothly, without errors or bugs. In case there is an error, detailed logging helps you quickly find and fix the error in question.

In our case, we’ve decided to provide an application that reveals the interactions between the Tezos protocol and storage.

**The interactions between protocol and storage**

In blockchain, the storage module is responsible for holding the data (values) from validated blocks. The Tezos storage organizes these values into a tree structure, in which each key represents a path to a value.

Blocks are created from a sequence of actions. There are two categories of actions for reading from and writing into the storage. The sum of these actions results in a block which is recorded into the storage.

Usually, block explorers show the sum of these actions, but not the complete sequence of the read and write actions in the storage.

**Tezos node explorer**

With TezEdge, we’ve developed an in-depth[ node explorer](http://tezedge.com) that displays every action occurring within the block, displaying its key (pathway) as well as the values it either reads from or writes into the storage.

This tool is of particular use for developers and security researchers as it allows them to audit, trace and profile each individual action occurring within a block.

_In its current early alpha version, users can search by blocks and addresses._

![Image](../../static/images/Explorer1.gif "Searching by blocks and addresses")

_This animation demonstrates searching by smart contract address. It will filter out the actions that are associated with a particular smart contract. The actions are grouped into blocks._

_You can open each action and see what it wrote into the storage, as well as the values it wrote in. Each action has a type, the time it took to write onto the storage, the path, and the value it wrote._

_This search does not contain all actions relevant to a smart contract. To see all actions relevant to a smart contract, one needs to view all actions executed within one block._

_With each block, you can find out what actions were performed during its application to the protocol. As you can see, there are many different actions occurring within the block. We also record the time needed to execute each action, allowing you to find out if an action (reading or writing) is slow or fast, therefore figuring out whether the performance is good or not._

![Image](../../static/images/Explorer2.gif "Looking inside the block")

_This animation demonstrates searching by block. In this particular case, the block contained a smart contract._

_Of particular interest is how the smart contract interacts with BigMaps. The BigMap container is a special map whose storage is only read or written per key on demand. They can be used as storage for addresses and their balances in smart contracts that operate in security token offerings (STOs)._

_In the future, we will add more search categories. In later articles, we will cover more types of actions that are performed within the block._

**How it works**

We have edited the Tezos code on the level where it reads from and writes into the storage. This way, we can capture operations made above the storage, including: write, read, delete, check out and commit.

For instance, we can capture the **write** action and see into which key the action writes into, as well as the value that is recorded into the key.

From the OCaml-based native node, the actions are sent back into the Rust-based TezEdge node. By default, it was not possible to view what a smart contract wrote into the storage, it was only possible to see the result. Now you can see everything that is being written into or read from the Tezos storage, as well as other operations above the storage layer.

We did this by editing the Tezos OCaml code and creating an additional layer above the storage that sends actions into the Rust-based TezEdge node. Actions performed above the storage such as update, read, copy and delete are saved into our database.

We are using a combination of RocksDB and commit log storage. In the commit log, we are storing the data of the actions and in RocksDB key-value store, we store only a reference to the data in commit log. Because we need to have multiple ways to look at the data, this approach helps us to save significant storage space. If we always made a copy of actions for each view we need we will be copying data over and over. With our approach, by using only pointers to commit log, we consume only 2 * 8 = 16 bytes per value stored in key-value store.

We’re also working on decoding the binary data. We will be able to decode the binary data from the Ocaml storage, translating it into numbers and strings. At the moment, we’re able to decode a significant part of the data. Our goal is to decode all of the binary data from the OCaml node.

The TezEdge Explorer is still in an early alpha stage at this point, but it already provides a new insight into the inner workings of the storage module in Tezos.
