
### **Implementing garbage collection into the storage of the TezEdge node**

Every kind of software needs to store the data that it uses in order to operate correctly. There are two options where to store this data; either on a hard disk, or in memory. While hard disks offer much greater capacity for storing data, their drawback is slower performance as the data must be read and processed from the disk. On the other hand, memory has very limited capacities, but offers better performance as data can be quickly retrieved and used.

Therefore if we want to maximize performance, we need to store data in memory. Since memory has a very limited capacity, it must be efficiently managed in order to get the most from it. We want to avoid running out of memory, as doing so slows down processes and may lead to crashes.

Efficient memory management is particularly important in blockchain. In order for a blockchain network to function properly, its nodes need to store the blocks of operations that make up the so-called blockchain state (also known as the _context_ in Tezos). However, the blockchain state tends to be very large in size, and constantly grows as new blocks of operations are added to the head of the chain.

Since the physical device running the blockchain node has limited memory, this poses a problem; how do we avoid running out of memory if the blockchain state constantly keeps growing with each added block?

One method of solving this problem is through an automatic memory management technique known as _garbage collection_.

In order to get a thorough understanding of garbage collection in the TezEdge node, we strongly advise you to read our[ previous article](https://medium.com/simplestaking/a-deep-dive-into-the-tezos-storage-how-the-blockchain-state-is-stored-in-the-tezedge-node-3166cbd06ca2?source=collection_home---6------0-----------------------) about Merkle storage


### **What is garbage collection?**

Garbage collection is the process of automatically reclaiming memory that is no longer used by the program.

However, it is impossible to predict the future and know whether an object will or will not be used in the future. Instead, garbage collectors work by removing objects that are not reachable by the program, which is a good enough approximation.

An object is said to _reference_ another object if it links to it. An object is reachable if there is a chain of references to it from one of the _roots_. Roots are special references that exist outside of any object and serve as the entry points for the garbage collector.

There are multiple strategies to garbage collection, two common ones are **reference counting** and **tracing**.

**Reference counting**

The **reference counting** strategy works by keeping count of the references to objects. It is assumed that an object is not be garbage if the amount of references to it is greater than zero, otherwise it is assumed to be garbage. Usually, the numbers of references are tracked by a counter that is stored alongside the object. This counter is incremented/decremented each time a new reference to the object is created/destroyed.

**Tracing**

The **tracing** strategy works by scanning memory to determine which objects are reachable by the running program. Tracing garbage collectors scan memory by starting at the roots.

Objects that are reachable are assumed to not be garbage, and objects that are not reachable are assumed to be garbage. Once an object becomes garbage, the memory used by it is reclaimed so that it can be reused to allocate new objects.

Performing this work is a potentially costly operation, and for that reason it is only done under certain circumstances — usually after a certain threshold of memory usage has been reached.

**Mark and sweep**

There are multiple approaches to tracing garbage collection, and a very common one is _mark-and-sweep_. As the name implies, it performs the collection in two phases, the _mark phase_ and the _sweep phase_.

The mark phase starts by adding every reference in the roots to a _work-list_, a set of references to objects that the mark phase must process. Then every reference in this work-list is followed to visit the referenced objects. Each time an object is visited, it is marked, and every reference it contains to another object gets added to the work-list. Then the process is repeated, until the work-list is empty. Once this phase is done, every object that is reachable has been marked.

The sweep phase then scans the memory linearly (unlike the mark phase that does so by following references) and reclaims everything that has not been marked, and resetting the marks on everything that is marked.


### **Identifying constraints for GC in the TezEdge node**

Before we begin designing our GC, we must first determine what data it can remove, as well as a minimum performance requirement.



**1. Necessary data**

We want to be able to clear garbage from the TezEdge node’s storage, but it is critical that we know which entries can be considered garbage, as removing data necessary for the node’s operation may disrupt service. For the node to operate correctly, it needs to store data from at least the last 7 cycles. On the Tezos mainnet, a cycle is a collection of 4096 blocks.

**2. Performance requirement**

Memory usage overhead by the GC must be minimal. We want to be able to run the GC on nodes running on low-memory devices. We also want to ensure that the garbage collection is fast enough and does not slow down Merkle storage to the point where transitioning from persistent storage to in-memory storage does not improve performance.


### **Implementing Mark-Sweep garbage collection for the storage**

We began by implementing a basic mark-and-sweep garbage collector for the TezEdge node’s storage. In our implementation of mark-sweep GC, the “roots” are the commits, and the “objects” are the other entries in the store (blobs and trees), which are addressed by their hashes. When we begin marking entries for garbage collection, we will store the hash of each marked entry in a _set_ that we are going to call the _marked-set_.

Consider the following scenario:

![Image](../../static/images/GC1.png)

We have two commits, named “block 1” and “block 2”, and we only want to keep “block 2”. In doing so, we want to keep any entries that are reachable from the commit “block 2”, and discard everything else.

Let’s start with the mark phase, which consists of starting from the tree with hash “**ed8a**” referenced by the “block 2” commit (the commit we want to keep). First, we add the reference to it to our work-list. We then proceed to process every item in our work-list.

At first, only the root of the tree is there, so we visit it and add its hash to the marked-set, and then every reference it contains to the work-list. Then we repeat the process again. We visit all the entries currently referenced from the work-list, we mark them, and add the references they contain to the work-list. We keep repeating the process until there is nothing else in the work-list.

After the _marking phase_ is done, this is the result:

![alt_text](images/image1.png "image_tooltip")

![Image](../../static/images/GC2.png)


Every green box is an entry that has been visited and marked, and every green arrow is a reference that was followed. The dotted boxes are entries that were not visited, and hence are not reachable from the commit “block 2”, and the dotted lines are references that were not followed.

Now that we have marked every reachable entry by collecting their hashes in the marked-set, we can start with the sweep phase.

The _sweep phase_ consists of producing the difference between the set of all keys in our _key-value store_ and the _marked-set_. The result is the set of keys of entries that are no longer reachable, which we delete from the store. This completes the sweep phase and we are done.

Let’s now consider this slightly more complicated scenario:

![Image](../../static/images/GC3.png)


We have 3 commits (one for each block), and we want to keep only “block 2” and “block 3”. That means that now our garbage collector has two roots to start scanning from in the mark phase.

Following the same process as before, but doing it once for each of those commits, this is what things look like after the mark phase:

![Image](../../static/images/GC4.png)



Let’s assume that we scanned both roots sequentially, first starting with “block 3”, and then continuing with “block 2”. Everything that we reached when starting from “block 3” is in green, and everything that was reached from “block 2” is in blue. Some entries (like **407f** in this example) will be reachable from many roots, but only need to be marked the first time.

Then there are the dotted blocks and lines, that as in the scenario described before, are not reachable from any of the roots we had.

The sweep phase happens the same way as before, anything that didn’t make it to the marked-set gets deleted from the store.

Let’s now add a 4th commit:


![Image](../../static/images/GC5.png)


We will keep “block 3” and “block 4”. After the mark phase is done, this is what we have:


![Image](../../static/images/GC6.png)


All of the same logic as before applies here, but notice the purple entry **bb91**. It can be reached from both commits “block 3” and “block 4”, but all the lines coming out of it are green. The reason for this is that the mark phase that started in “block 4” reached it, and then also visited all the descendant entries, making all those arrows green. When the mark phase then started scanning from “block 3”, it reached that block and saw that it had been visited already, so it stopped there. The implication is that even if we start from multiple roots, any subtree that is shared needs to be scanned only once.

Through garbage collection, we remove everything except for the most recent block. Obviously, we cannot do this in the complete implementation, but it is the first step towards it.

**Please note that the mark and sweep implementation only retains the data from the most recent block. Additionally, all graphs in this article use only data from the Tezos testnet.**

_This graph depicts memory usage for the mark-sweep implementation of GC:_

![Image](../../static/images/GC7.png)


_This graph depicts the time it takes to apply any given block with the mark-sweep implementation of GC:_

![Image](../../static/images/GC8.png)


**Satisfying the constraints (full implementation)**

As mentioned earlier, our GC is tied down by two constraints; the node must store the 7 most recent cycles and the GC must perform fast enough to warrant storing the data in memory. If we want to keep the last 7 cycles, it would mean that the garbage collector would have to scan 6 cycles (on the mainnet, this would be 6 x 4096 = 24576 commits), each commit representing a root from which the GC could start. If we were to scan each root in every cycle individually, the GC would take too much time.

With the approach described above, the GC needs to perform a full scan, although we are only interested in discarding data from the oldest cycle. Being able to limit the work to be done by the GC to just entries from the oldest cycle would considerably reduce the amount of entries to be scanned.

There are two entry points through which the GC can reach the entries of the oldest cycle without going through entries from newer cycles: commits in the oldest cycle, and _cross-cycle references_ from entries in newer cycles to entries in the oldest cycle.

_The following diagram shows a setup with two cycles, each containing two commits:_


![Image](../../static/images/GC9.png)


In this example we have two cross-cycle references (in red) that point to the entry with the hash **407f**. If cycle #1 were to be collected, that entry would have to be preserved, and everything else discarded.

In order to quickly find cross-cycle references, we need to be able to identify the cycle to which an entry belongs. We will discuss why we need to find cross-cycle references later, but for now let’s look at how we can identify the cycle of each entry.

**Identifying entries from the oldest cycle**

There are three possible ways to achieve that:



1. **Within each entry, we could store the number of the cycle in which it was created.**

This shouldn’t add much to the memory usage, however, it will be extremely slow to filter entries by cycle, since we’d need to traverse all existing entries.

2. **For each cycle, we could store hashes of the entries that were created during that cycle.**

This will achieve our goal, which is to identify entries for a given cycle, however it could easily eat up additional hundreds of megabytes of memory.

Formula for rough approximation:

**total_memory_usage = number_of_entries * hash_size**

**hash_size = 32 bytes**

There can easily be millions of entries in the storage. For each million entries in the storage, we would need additional: 

**total_memory_usage_per_million = 1 000 000 * 32 = 32 000 000 bytes = 31 mb**

3. **Divide our in-memory storage in cycles.**

This way, we don’t consume any additional memory and can access entries of any given cycle quickly. However, there are some tradeoffs, which are discussed later in the article.


### **Dividing in-memory storage in cycles**

Let’s take the 3rd approach. We will then have 7 stores:



*   1 store for the cycle to which new commits are still being added, the _current cycle_.
*   6 stores, one for each of the previous cycles, the _archived cycles_

![Image](../../static/images/GC10.png)


The orange store represents the next cycle store to be garbage collected. The green store is still in-progress and the result of every new applied block is added to it.

With this setup:



*   We apply every new block to the current cycle store.
*   Every time a cycle ends (we’ve processed all of its 4096 blocks), we archive the current cycle, and create a new empty store for storing the newest cycle’s entries.
*   Every read action needs to perform a lookup on each store, from newest to oldest, until the entry is found.

So we end up with one store per cycle, each store containing entries that were created during its corresponding cycle.


### **Garbage collection in a divided storage**

**Identifying references to entries in other cycles**

Because we want to avoid a full scan, we have to find a better way to find cross-cycle references. We can do this easily every time a new entry is created. When a commit happens, we visit every new entry that has been created since the previous commit.

For each new entry, we visit its children. For each child entry:



*   If it doesn’t belong to the current cycle, we find to which archived cycle it belongs, and we keep it’s hash along the number of the cycle. We don’t traverse the children here, that will be done later.
*   If it belongs to the current cycle store, we visit its children entries and repeat this process.

Why did we keep those hashes and cycle numbers? Because we will be in advance, and one commit at a time, build the initial work-list that will be used when we garbage collect each of those cycles. This is important, because by doing this, the GC can now skip every commit and start by directly visiting the entries of the cycle being collected.

**Mark phase**

The mark phase works the same as before, but the work-list has already been built. We will not be adding the commits to it, because now our roots are the cross-cycle references from entries from newer cycles to entries in this cycle.

![Image](../../static/images/GC11.png)


**Moving phase**

Now that we have accumulated a list of entries which we want to keep from the old cycle, we need to move those entries into some newer cycle before we destroy the old cycle. This is in contrast to the sweeping phase from mark and sweep GC, in which we would now simply ‘sweep’ the old cycle, removing all entries that are not in the marked hash set.

It is easier and more reliable to move the remaining entries into the newest archived store. This way, we make sure that the moved entries will outlive the references pointing to them. However, this also means that some entries will exist longer than they need to.

One last important detail is that when following reachable entries from the collected cycle store, some of the referenced entries will be found in the same store, but the others will have to be searched for in the newer archived stores. The reason is that when an entry from an older cycle store gets referenced from a newer cycle store, it will at some point get moved to a cycle store that is newer than the one that contains the reference.

**Parallelization**

With the solution described above, on every cycle, we have to wait for the garbage collection to finish before we can make further progress in applying blocks. It would greatly improve performance if we can parallelize our implementation, meaning if we can proceed with block application without waiting for the garbage collection to finish.

We can start garbage collection in another[ thread](https://en.wikipedia.org/wiki/Thread_%28computing%29) so that it runs parallel with the _main thread_ (the thread in which we are applying blocks).

The problem is that now we have to introduce[ locking](https://en.wikipedia.org/wiki/Lock_%28computer_science%29), since the main thread and the garbage collection thread both need the read/write access to the cycles. The two threads will contend with each other to acquire the lock and access the cycles. This means that at any given time, either the main thread or the garbage collection thread will progress, which doesn’t make the implementation parallel.


![Image](../../static/images/GC12.png)


We need to adjust our implementation to achieve better parallelism.

_This graph depicts memory usage for the mark-move implementation of GC (preserving last 7 cycles, on testnet it is 7 x 2048):_


![Image](../../static/images/GC13.png)


_This graph depicts the time it takes to apply any given block with the mark-move implementation of GC (preserving the last 7 cycles, on testnet it is 7 x 2048):_


![Image](../../static/images/GC14.png)



**Advantages and drawbacks**

Some advantages to this approach are:



*   Writes to the current cycle are very fast.
*   Reads from the current cycle are very fast.
*   Garbage collection runs partially in parallel.
*   Minimal memory usage.

Some drawbacks to this approach are:



*   If entry isn’t found in the current cycle store, we have to go through the archived cycle stores and perform the lookup there. Even in itself, this is slower than reading from one store, and if garbage collection is in progress, it will slightly delay the read even further.
*   Since garbage collection happens in a parallel and non-blocking way, we have to make sure the garbage collector doesn’t lag too far behind so that lots of garbage doesn’t accumulate and clog the system’s memory.


#### **How to test the GC implementations by yourself**

In order to generate statistics, run these commands:

_Prepare setup:_

```
git clone -b fb_storage_extended_actions[ https://github.com/simplestaking/tezedge](https://github.com/simplestaking/tezedge)

cd tezedge

wget https://tezedge.fra1.digitaloceanspaces.com/actions-testnet.bin
```

_Generate statistics for mark-sweep:_

```
cargo run --release -p storage --bin merkle_storage_stats -- ./actions-testnet.bin -b in-memory-mark-sweep-gced > in-memory-mark-sweep-gced.stats.csv
```

Check the output in file: _in-memory-mark-sweep-gced.stats.csv_

_Generate statistics for mark-move:_

```
cargo run --release -p storage --bin merkle_storage_stats -- ./actions-testnet.bin -b in-memory-gced > in-memory-mark-move-gced.stats.csv
```

Check the output in file:_ in-memory-mark-move-gced.stats.csv_

_Note_: system memory usage statistics are generated only while running in a Linux system.

To test the correctness of the implementation, run these commands:

```
cargo run --release -p storage --bin merkle_storage_stats -- ./actions-testnet.bin -b in-memory-gced --test-integrity
```


