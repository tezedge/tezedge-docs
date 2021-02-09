---
title: Merkle storage
sidebar: Docs
showTitle: false
---


## **How the blockchain state is stored in the TezEdge node**

In a distributed network like blockchain, we want to be able to quickly verify that the data distributed from node to node remains the same. We want to avoid inconsistencies between each node’s version of the blockchain data, whether they happen accidentally or are intentionally created by adversaries.

However, a blockchain’s data tends to be relatively large in size and continuously grows as new transactions are being made. New blocks (containing new operations) are constantly being added to the head of the chain, which keeps updating the blockchain data.

Since the amount of data in the blockchain state is usually very large and constantly keeps growing, we want to be as efficient as possible in verifying and accessing its contents in order to provide a fast and satisfactory service to our users.


### **Efficiently verifying the integrity of data**

A more primitive approach would be to go through the entire data and verify its entire contents. The drawback of this approach is obvious: as the data can be large, the cost of verifying becomes prohibitive for most applications.

In order to be efficient, we need to:



1. Validate large bodies of data without requiring too much memory.
2. Know which parts of the data that have been changed and only verify those.

One way of achieving this is through a** Merkle tree** (also known as a hash tree), a method of structuring data that utilizes hash functions to create a tree-like system of referencing.


### **Hash functions**

To understand what Merkle trees are and what they accomplish, we need to first explain the underlying concept of hash functions.

Hash functions are one-way functions that convert a variable-length input into a fixed-length output. This means that you can enter an input that can be anything, a single number, a sentence or an entire book, and the hash function will compute it and return a fixed length hex (hexadecimal output), which is a combination of numbers 0–9 and the letters a,b,c,d,e and f.

For example, entering the word “_Tezos_” into a [Blake2b hash function](https://toolkitbay.com/tkb/tool/BLAKE2b_512) will return the following hash output:
```
5751c92f5a773cc5fb19097e6298afabdc412f7d40e6ccf320d779cb1a55fd1d010d2ab0abbef7fadbda5357a227dd6ba9898c3ce04fe13984b9b6455f135f3c
```
It is important to note that the hash output of a value is marginal in size compared to the size of the input from which it was hashed. Also, since they are one-way functions, you cannot enter the hash output and receive the input that was used to create it, which is one of the reasons why they are useful in cryptography.

Any change to the input, however small, will completely change the hash output. However, if the exact same input is entered into a hash function, the output will always be the same, which is why they are useful for verifying the integrity of data.


### **Merkle trees**



![Image](../../static/images/Storage1.png)



Merkle trees build upon this technology by creating a tree-like structure that labels every ‘leaf’ node (unrelated to blockchain nodes) with its hash and every non-leaf node (a ‘branch’) with a hash calculated from the hashes of the branches and leaves descending from it. The root of the Merkle tree has its hash calculated from the hashes of all of the tree’s branch and leaf nodes.

By using a Merkle tree, we can verify data via the hashes of the data’s contents. This allows us to quickly verify the integrity of the data, as any changes to the contents will change the output hashes.

Merkle trees have many benefits that make them useful in data verification:



1. They cryptographically verify data and store the proof in the form of the root hash.
2. They can validate large bodies of data and require minimal memory.
3. Since hash outputs are so small, they can be sent and received without high bandwidth.

In blockchain, Merkle trees are extremely useful in validating data and ensuring that every transaction was verified in a block and the blocks prior to it. This data structure makes it extremely efficient and easy to prove the validity of the network and its transactions.

The drawbacks of Merkle trees (against other types of trees) include higher CPU usage and potentially long computation times. The use of a hash function is a trade off between search time and data storage space. A hash output takes up less memory, but its computation and retrieval constitute extra steps.

When generating a hash for the root node in a Merkle tree, you have to store a hash for each branch and leaf nodes, and then compute all of these hashes. For large trees this can add up into considerable computation times. We describe the process in detail later on in this article.

Since the root and each of its branches and leaves is retrievable by their hash, we can use Merkle trees to very quickly verify large bodies of data such as the blockchain state.


### **Combining Merkle trees with Git-like semantics**

We wanted to ensure that we have the same method for computing hashes as utilized in the storage design of[ Irmin](https://github.com/mirage/irmin), a blockchain state storage system that follows the same design principles as Git. Irmin is currently being utilized in the OCaml implementation of the Tezos node to store the Tezos blockchain state.

The goal is to create a storage that combines the efficient data verification of Merkle trees with Git-like semantics such as commit and checkout, for which a full explanation is provided below.

The result is a key-value store which we named as **Merkle storage.** To understand how it works, let’s first look at the three types of entries found in Merkle storage.

**Entries in Merkle storage**

Merkle storage combines the tree-like structure of Merkle trees with Git-like semantics. To explain how this operates, we are re-using the same tree diagram we used earlier to explain Merkle trees, but now with terms from Git:

![Image](../../static/images/Storage2.png)




1. A **Blob** is an acronym for a **b**inary **l**ong **ob**ject, which means it is an object containing an arbitrarily long collection of bytes. Blobs are in essence the ‘files’ of the Merkle storage, acting similarly as files do in Git. They are the leaf nodes of the storage’s Merkle tree.
2. A **Tree** is akin to a directory and it does not contain data in itself, but it may contain references to Blobs that do contain data or references to other Trees that contain Blobs. Trees are the ‘branch’ nodes of the storage’s Merkle tree.
3. At the root of the storage’s Merkle tree is a **Commit** that contains metadata (time, author and message) for all of its branches and leaves. It references a particular Tree by its hash. By hashing the Commit, we get the commit hash (also known in Tezos as the context hash) which can be used to verify the blockchain state.

**Persistent key-value storage**

If we want to be able to use the data from the blockchain state, we must first find a place to persist (store) them. However, the blockchain state is too large to be stored in memory. For this reason, we need to store it on a database. Merkle storage uses a simple key-value database back-end (currently RocksDB, but this may change in the future).

**Interacting with the storage through actions**

In order to be able to read from and write into the Merkle tree, we need a basic set of actions that serve these purposes, as well as Git-like actions such as Checkout and Commit.

We can get all of these actions by utilizing the same API used in Irmin. These actions can be perceived as commands, and can be imagined to be a concept similar to SQL queries. Each action has something akin to a path, for example:


![Image](../../static/images/Storage3.png)



For each block, we have a list of actions that, when applied in the same exact order, create the exact state of the blockchain. Since these actions can be recorded and replayed, they can also be used to debug the state of the Merkle storage.

**Types of Actions**

To understand how Merkle storage operates, we need to first explain the various types of actions. The API of Merkle storage consists of the following actions:

**SET** — Set key/value.

**GET** — Read value under key.

**MEM** — Check if a value under a given key exists. Return bool.

**DMEM** — Checks if a directory under a given key exists.

**COPY** — Copy subtree from one path to another.

**DELETE** — Remove a key or all keys that have a key as a prefix.

**COMMIT** — After we have made some writes on the storage with SET/COPY/DELETE, we can perform a _commit_ action and get a hash of the current state. The commit action is parameterized by time, author’s name and a commit message.

**CHECKOUT** — To go back in the history of the storage state, we can _checkout_ a state by the hash values we get from its _commit_ action.


### **Implementation with Merkle trees**

There is a separate method of computing hashes for each type of entry in Merkle storage. First we want to illustrate how the Merkle storage is constructed, followed by an explanation for the hash computation of blobs, trees and commits.

Now, onto the example:


![Image](../../static/images/Storage4.png)


**1.** We begin with an empty storage and perform an action **SET [a] = 1**, we compute the hash of the value **1** and take the first two bytes (4 hex digits), resulting in **407f**. For the convenience of this article, we display the first two bytes of all hash outputs. This will become a blob with a hash of **407f**.

**2.** Now we will create a tree which refers to the blob with a hash of **407f**. This tree, which also happens to be the root of the Merkle tree, has a hash output of **d49a**. We save the **407f** blob and **e49a** tree to the key-value store.

![Image](../../static/images/Storage5.png)


**3.** Next, let’s add a pair **SET [b, c] = 1**. While **a** and **b** are on the first level of the Merkle tree, the **c** constitutes a tree that descends further down from them.

Notice that the value 1 is the same as for the previous key. This means the hash of it has already been calculated and there already is a blob with the hash and value in the database.

**4.** We go backwards from the blob **407f** and create a new tree for the part of the key path **c** with the hash **cfd0** one level above the blob.

**5.** We go one step back in the key path to **b**, which is the first level, therefore the root tree. It will have two entries: **a,** referring to a blob, with the hash **407f**, and **b**, which refers to a tree, with the hash **cfd0**. We hash the entire tree, resulting in the hash **ed8a** and store it in the key value database along with the child tree **cfd0**.

Note that the previous tree **d49a** remains in the Merkle tree. If you wanted to know what the storage looked like before we performed the last action, you could expand the tree **d49a** and follow all the references to children entries. Besides, notice the value 1 is stored only once in RocksDB. Merkle trees are efficient, in larger trees, entire trees can be left untouched and reused.

![Image](../../static/images/Storage6.png)



**6.** Let’s see what happens when we add **SET [b, d] = 2**. First, we create a new blob with the value **2**, its hash is **028a**.

**7.** The new child tree with the hash **bb91** will refer from **c** to the blob with the hash **407f** as well as from **d** to the new blob with the hash **028a**.

**8.** Then the new root tree must point from **b **to the new tree **bb91** which we just created as well as from **a** to the pre-existing blob **407f**. We hash the new root tree again and now the hash is **4371**.


![Image](../../static/images/Storage7.png)




**9.** Let’s update the value of [a] to 2. That means performing **SET [a] = 2**.

**10.** The value **2** has already been created under the hash **028a**, so we do not need to create a new blob. We create a new root that needs **a** to refer to a different hash **028a** and **b** to tree **bb91**. The new hash is **0d78** and is the only new entry.



![Image](../../static/images/Storage8.png)



**11.** Now we will perform the action **COMMIT**. The commit references the latest root tree **0d78** and also contains information about the time when it was made, a name, a message and also a reference to a previous commit. Since the commit is at the root of the Merkle tree, hashing the commit gives us the context hash, which is used in every block header and can be used to verify the blockchain state.


### **Computing hashes**

There are three kinds of entries for which hashes need to be computed: blobs, trees and commits. Computation needs to conform to the implementation details of the **Irmin** library.

Hashes are computed simply by concatenating the values. Once they are connected together, we hash them.

**Blob Hash**

The blob hash is the easiest to calculate and the input consists of a concatenation of the value length and the value itself.

[Here](https://github.com/simplestaking/tezedge/blob/v0.9.0/storage/src/merkle_storage.rs#L298) in the code you can see how exactly blob hashes are calculated. We’ve also prepared [a test](https://github.com/simplestaking/tezedge/blob/v0.9.0/storage/src/merkle_storage.rs#L1346) in which you can see how a blob hash is calculated, step by step. Here is a command with which you can run the test.
```
git clone https://github.com/simplestaking/tezedge.git
cd tezedge

cargo test --package storage --lib -- merkle_storage::tests::test_hash_of_value_1_blob --nocapture
```

**Tree Hash**

The tree hash contains a reference for all of its child trees and blobs. [Here](https://github.com/simplestaking/tezedge/blob/v0.9.0/storage/src/merkle_storage.rs#L280) is the exact method how the tree hash is calculated, along with a link to [a test](https://github.com/simplestaking/tezedge/blob/v0.9.0/storage/src/merkle_storage.rs#L1453) in which you can see how the calculation is performed, step by step. You can run the test with this command:

```
git clone  https://github.com/simplestaking/tezedge.git
cd tezedge

cargo test --package storage --lib -- merkle_storage::tests::test_hash_of_small_tree --nocapture
```

**Commit Hash**

The ultimate test for the correctness of our implementation is the computation of the commit hash, which has to produce the same hash values as Irmin does.

A commit hash contains a reference for the root of the Merkle tree and a reference to the previous commit hash. It also contains the time, name and a message. In Tezos, the commit hash is also known as the context hash. Every block in the Tezos blockchain has a header which contains, among other items, the context hash. [Here](https://github.com/simplestaking/tezedge/blob/v0.9.0/storage/src/merkle_storage.rs#L314) you can see the exact code of how it is calculated. We’ve also prepared [a test](https://github.com/simplestaking/tezedge/blob/v0.9.0/storage/src/merkle_storage.rs#L1382) with which you can see how it is calculated. You can run the test with this command:
```
git clone https://github.com/simplestaking/tezedge.git
cd tezedge

cargo test --package storage --lib -- merkle_storage::tests::test_hash_of_commit --nocapture
```

### **Improving the Merkle tree in the implementation**

**Optimizing memory space usage**

We wanted to use memory space more efficiently, which means reducing allocation overhead. Allocation overhead occurs when we wastefully allocate data in memory space, for instance; when we clone trees that contain data that we already have.

If we allocate too much early, it will fragment our memory, which wastes space and slows down performance. The future use of memory will be slower.

To measure and improve allocations, we used[ heaptrack](https://github.com/KDE/heaptrack) to intercept allocation operations and track allocated memory, recording the functions that perform the allocation.

**Removing wasteful copying**

All modifications to the blockchain state must first go to the staging area. The staging area is a temporary tree that contains a recent copy of the blockchain state along with the changes that have yet to be committed.

In the base version, any use of SET/COPY/DELETE actions to the staging area resulted in copying the entire tree and all of its parent trees all the way up to the root of the Merkle tree.

When we wanted to find the tree to be modified, we had to search the staging area by its path and the lookup function made another copy of the tree.

To remove wasteful copying of data, we started modifying the trees in memory. The simplest way to do this is to have a list of entries (blobs, trees and commits). We used indexes as references to the entries.

The drawback is that we are losing the previous state of the tree. However, we are storing a list of all actions since the latest commit so that we can rebuild a previous state of the tree by reapplying specific actions if necessary.

**Delaying the application of actions until commit**

Previously, actions were applied continuously, one by one. However, this was slow as the data had to be fetched from the database to the memory and disk access is much slower than accessing memory.

By bundling the actions and applying them in batches, we only have to fetch the data only once from the database. All the data is efficiently cached in memory and the CPU’s cache so that the application of actions is even faster.

**Testing the correctness of our implementation**

You can check the correctness of our implementation by running [this test](https://github.com/simplestaking/tezedge/blob/v0.9.0/shell/tests/actors_apply_blocks_test.rs#L38).

The OCaml implementation of the Tezos node uses actions to store data into Irmin. We have these actions stored, which means we can use them to re-create the same blockchain state as Irmin has. With each commit action in our Merkle tree, we check whether we have the same commit hash as Irmin has. In this test, the first 1,000 blocks are checked.

To run the test, follow these steps:
```
git clone https://github.com/simplestaking/tezedge.git

cd tezedge

cargo build — release

PROTOCOL_RUNNER=$(pwd)/target/release/protocol-runner cargo test --release -- --ignored test_actors_apply_blocks_and_check_context_and_mempool
```



