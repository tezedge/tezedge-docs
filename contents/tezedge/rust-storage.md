---
title: Rust Storage
sidebar: Docs
showTitle: false
---

# The new 100% safe Rust-based TezEdge storage implementation 


### The new Rust-based storage implementation

If you want to improve a blockchain node’s overall performance, the storage that contains the _blockchain state _is one of the best starting points. The storage must be regularly and continuously accessed by the node in order to validate new blocks. A faster storage module allows for a faster block application time.

In Tezos, the underlying format of the blockchain state is a Merkle tree. To be able to read from and write into the blockchain state as fast as possible, it is essential to develop a performant Merkle tree storage. 

Originally, the TezEdge node utilized the default RocksDB key-value store. While it is an excellent database, it was not suitable for our use case because



* RocksDB is programmed in C++ and may potentially corrupt memory and contain security vulnerabilities. We want to rewrite all of the components of RocksDB that are suitable for Merkle trees into Rust. 
* One of the main priorities of RocksDB has been the accommodation/digestion of lots of writes in a short time. We want to optimize for reads instead, we need to customize RocksDB but we are running into limitations of the design.
* RocksDB has been designed to mostly use disk storage and just a small part of memory. That may be suitable for small-resources use cases, which is good for decentralization. We plan to continue supporting this use case. However, for bakers or owners of high performing devices, RocksDB doesn't provide a good option to efficiently utilize memory. 
* RocksDB by default uses a small part of memory for cache and memtables while dumping everything to the disk. We want to develop a database that will be something in between RocksDB and an in-memory DB, so that huge amounts of RAM can be better utilized.
* Flushing/compaction in RocksDB and write/read amplification are a major concern. Default RocksDB has limited options for scheduling compaction. We want to utilize Tezos business logic to perform flushes and compaction at specific times (taking into account the current usage of resources).
* RocksDB has no information of how storage is used, the optimization opportunities are limited because of the clear abstraction. For example, we want to schedule aggressive compaction during low load if we know that high load (end of cycle) is imminent, to speed up future reads. If we have any information about which context hash will be next used, we can prefetch it or otherwise optimize for it.

For these reasons, we’ve replaced RocksDB with a custom-built Rust-based key-value store . It has improved performance specifically for Merkle trees and storage data is now saved into the file system, which grants us more control and oversight for C++, increasing the node’s security.

https://github.com/tezedge/tezedge/tree/master/tezos/context


### Crash recovery

When we fully re-wrote the database, we also took into consideration crash events.

The devices on which Tezos nodes are run require electric power, so if there is a power outage, the device may shut down and the node will crash.

If the node crashes, there is a risk of losing the _blockchain state_, which is the data it needs to validate new blocks of operations. While we can’t prevent power outages, we can take measures to recover these systems quickly and easily in such events. To achieve data recovery, we need the node to behave as consistently/deterministically as possible.

**Crash consistency**

The TezEdge node stores the blockchain state on disk. The data on the disk needs to be consistent in order for it to be correct. Crash consistency is making sure that the blockchain data can be correctly recovered in the event of a sudden power loss or system crash.

Our database format is simple, which make crash recoveries easier:



* Our database is composed of multiple append-only files, and 1 more file, with a constant size, that contains the size of every other files.
* Every time we append data to 1 of the file, we update its size in the "size file"

If a crash occurs, then we restart the node and we read the file that contains the size of the other file. and we truncate them to their last known correct size.

In addition, we also include the checksum of each files, so we can compute their checksum and verify that the integrity of their data was not altered.

For example, this is where we compute and compare the checksum of the file `strings.db`:

[https://github.com/tezedge/tezedge/blob/master/tezos/context/src/kv_store/persistent.rs#L404](https://github.com/tezedge/tezedge/blob/master/tezos/context/src/kv_store/persistent.rs#L404)

This is where we truncate the files, after the node has restarted:

[https://github.com/tezedge/tezedge/blob/develop/tezos/context/src/kv_store/persistent.rs#L651](https://github.com/tezedge/tezedge/blob/develop/tezos/context/src/kv_store/persistent.rs#L651)

To test that our database is crash-consistent, we implemented some tests that simulate crashes.

The tests and instructions can be found on this repository:

[https://github.com/tezedge/tezedge-crash-recovery-test](https://github.com/tezedge/tezedge-crash-test)

We ran the tests on the current version of TezEdge.

From now on, we will run these tests in CI, to ensure that every future version of the TezEdge node is tested and crash consistent.

**Try it out**

This can be tested directly from the TezEdge crash test repository:

```

$ git clone https://github.com/tezedge/tezedge-crash-test

$ cd tezedge-crash-test

$ ./run_test.sh bootstrap

```
