---
title: Storage
sidebar: Docs
showTitle: false
---



# Storage

For any process in which you want to regularly access data, you must first sort out the issue of where and how to store the data. Storage is a particularly important aspect of services that rely upon data to validate new information. The conventional internet framework is based on the paradigm of centralization. Information is recorded on a server so users can request and retrieve data from any part of the world at any given time. The main drawbacks associated to centralized storage are:



*   having a single point of failure;
*   privileged data is widely exposed;
*   censorship can restrict the data scope and 
*   poor data management, especially before data privacy regulations. 

Decentralized storage resolves these issues. The concept behind decentralized storage is that information is distributed into several pieces and stored inside the nodes of a P2P network. The premiere example is blockchain. The nature of blockchain allows data to be stored in a decentralized manner, improving security and avoiding a single point of failure. Each connected node contributes to the storage and processing capabilities of the network.


## Storage in Blockchain

**Blocks**

Blockchains are decentralized P2P networks that are composed of an immutable sequence of data structures called blocks. Transactional data originated in a blockchain is verified, ordered and bundled into blocks. Each block contains specific information that will be used to compose the blockchain immutable capability. A block will store data depending on its capacity, containing three main pieces: a generated unique hash value (obtained from solving the PoW puzzle) called Nonce, the previous block’s hash as well as the transactional data along with a timestamp. A block then will store thousands of the most recent transactions that have not been bundled yet into previous blocks. 




![Image](../../static/images/storage1.png)


_Figure 1: Block architecture_

Some traditional blockchains, such as Bitcoin, fix the size of each block so that each transaction can be processed on time without impacting the network’s latency. In Tezos, the size of a block is variable, which doesn’t necessarily mean storage inefficiency, as only a single binary value that results from hashing a block will be stored. Despite a block being bigger in size, the input needed for baking or reading a block is only 32 bytes, avoiding latency issues across the rest of the network.

**Nodes**

Each node will maintain a complete copy of the blocks baked in chronological order, in order to verify whether these transactions are indeed valid, i.e. the senders have sufficient credit to be spent and thus, avoid a potential double-spending.  Each time a block is created (baked), it will be appended at the end of the chain and this state will be distributed across all the network. 

By storing the blockchain state, any data stored in a blockchain becomes traceable, transparent, verifiable and tamper-proof. Furthermore, it also aids in preventing malicious nodes from modifying the state of the data stored in the network.

**Contracts**

Nick Szabo proposed a concept for the programmable pieces of code that automatically complete an action when certain criteria are met: smart contracts. Contracts in Tezos are used to execute an action that allow peers to transfer or check balances between them. 

A smart contract stores the token value along a piece of storage. When deploying a contract in Tezos or any blockchain, a gas limit and the storage value of the contract are specified at origin. Since the data contained in a contract needs to be distributed on every node, the size is somewhat limited in order to avoid massive transactions affecting the whole network. The storage cost in Tezos is currently 0.001 XTZ per allocated exceeded byte.

At the initial deployment, fees are paid for storage along with transaction fees paid to bakers for validating a transaction. Reading the content of a contract is free when connected to the network’s RPC protocol. Please note that invoking a contract will incur transaction fees when modifying the state of the contract. Smart contracts can be interacted with in two main manners: a contract is read when it doesn’t modify the storage state, however, if more storage is needed for new changes, additional XTZ will need to be burnt. 


## **Where is data stored?**

Blockchain interacts with pieces of information stored as binary data and distributed across all connected devices that may be found inside the network. However, it also has to process information coming from outside of the network. Depending where the data is stored, it is known as on-chain data or off-chain data.


### How is data stored on-chain?

Storage in blockchain, like most of its characteristics, can defer from one network to another depending on the storage system, use cases and external processes among others. 

As a result of _baking_ (the block creation process in Tezos) a unique hash is created based on the exact data of a block or given an encryption key. The hash is added to both the ledger and the block metadata to link transactions. The network distributes the block to all connected nodes within the network and is placed inside their storages, although the content is still only accessible to the content owner. Finally, the storage system records all transaction details such as the block’s location and hash into the blockchain ledger and distributes information across all nodes.

Storing data on-chain comes with important drawbacks such as a fixed amount of data is limited by a protocol, significant costs related to transaction fees and extensive privacy measures. 

First, storing an increased amount of data is costly and inefficient to retrieve, since most blockchains only allow the user to obtain the transactional hashes. On the other hand, if data is stored on a public blockchain like Tezos, the information will be available to every connected node. 


### How is data stored off-chain?

As previously mentioned, storing huge amount of data into a blockchain is not efficient. One of the most popular approaches when dealing with the huge size of the data is to store the hash of an entire piece of data, for example, storing the hash of an entire data frame. This process only requires the owner to keep an updated relational database where a relational ID is linked to a specific hash to keep a file control log at hash level.  Among the most widely used techniques are P2P distributed file sharing systems such as the InterPlanetary File System (IPFS), Swarm or Arweave. However, the biggest fallback of these methods is that they aren’t reliable yet in terms of safeguarding sensitive or privileged information.


## **Storage in Tezos**

The architecture of the Tezos blockchain is mainly composed of two key components: the node and the client. The node is accountable for establishing a connection between network peers and updating the blockchain state – also known as context in Tezos- whereas a client objective functions as a tool to interact with a node. In this way, to gain access to Tezos, a node needs to have the necessary data stored to be able to run the blockchain.  

The data directory of every Tezos node contains two sub-directories that are used to manage data stores in Tezos, called _store_ and _context:_



*   The _store_ sub-folder is used to manage all data related to block metadata such as headers, operations and protocols. 
*   The _context _sub-directory will be in charge of storing  the corresponding blockchain state hash. The context can be viewed as the blockchain state version controller. Tezos uses a data structure called Merkle trees to store its context. This structure will be explained in detail in the following section.

 

A block history of Tezos can be found in an allocated storage space within the main shell. The shell is the part of the node that makes P2P and RPC communications possible so that any client or transaction explorer can gain full access to the complete transactional history. In short, the shell will contain the key-value pair to reference on-chain data, as well as information regarding the ledger’s context.

 


### Merkle Tree structure

To deal with challenges such as latency and accessibility, Tezos storage works by organizing the storage data into a Merkle tree structure, in which each key represents a path to a value. This key-value pair will be the result of passing each transaction contained in a block through a one-way hash function. The output will be unique, giving the structure a tamper-proof status. This structure is known as a Merkle tree and can be found across different use cases such as file systems like IPFS or ZFS, distributed control systems like Git and peer to peer networks or blockchains.

Since the Git storage structure is very similar to the one used in Tezos, it is worth understanding the logic behind this structure. Let’s look at the three types of entries:

**Blobs**

The most basic storage data unit in Git is a Binary Large Object or blob. When any type of content is inserted into Git, a 40 character checksum hash object will be created. Merkle trees begin to organize data structures by creating a unique SHA-1 hash that will be the output of the content being stored. This way, Git only stores the content of a file internally instead of tracking each incremental change it may undergo. It will also ignore any additional information such as file metadata.

**Trees**

A tree is a higher hierarchy under the organizational structure. A tree can contain several blobs or other trees. Trees are identified by hashing the tree content as well.

**Commit**

A commit is the current state of a tree, which can be viewed as a snapshot of the content of the working tree. A commit will store the files existing in a directory at that time along with its content. Asides from other data structures, a commit in Git will store transactional metadata such as the hash of the working tree, author, timestamp and message. Once a commit is created, a hash will also be created to identify these objects from other commits.

One of the most important features of this type of structure is that when a blob inside a committed tree undergoes a change in its content, a new commit will be created. Instead of storing the entirety of the data structures again, the commit will only store the content of the file that was modified, referencing the hash of blobs and trees objects that didn’t undergo any changes. 

When this process is replicated in a blockchain, the conceptual optimization process of Merkle trees gains importance as a widely-used method that enhances the efficiency of network operations.

For Tezos, applying the Merkle tree structure brings advantages by optimizing network transfer latency, lowering storage requirements and by sharing only the small shard of data required by nodes to bake transactions. In this case, the block transactions will play the role of the leaf nodes. 


## **History modes and snapshots**

Two elements that are key when explaining storage in Tezos are history modes and snapshots. As explained shortly, snapshots allow Tezos nodes to store only a partial load of the data by allowing them to replicate required information at a certain point in time. Both features work together and intended to enhance latency within the network by achieving that each node no longer has to record the entire transactional history. Instead, each node will only save the required data in accordance to the selected history mode. 


### **Storage history modes**

 

History mode is a feature that allows a Tezos node to optimize the disk storage required, allowing a node to run without sacrificing storage capabilities to maintain the full on chain data . There are three types of history mode that can be chosen: full mode, rolling mode or archive mode.

**Full history mode**

The full history mode is the default mode for Tezos nodes. This mode requires little disk storage space, especially when compared to the archive mode. The full history only keeps the data necessary to reconstruct the complete context since the baking of the first block (the genesis block). Moreover, full history mode is available for all bakers to request information on any block or any transaction at any level. This mode also enables chain synchronization by snapshots whilst also aiding other nodes to bootstrap and synchronize as well. However, this mode is not without its drawbacks. One constraint being that the storage requirements are constantly increasing and will continue to do so since the full history is being stored.

**Rolling mode**

Next is the rolling mode. This is the simplest mode of the three, since this mode only manages the last rolling cycle of the chain data. The low storage requirements allows the node to be bootstrapped in minutes and can continue with its baking and sync assignments.. Nevertheless, the rolling mode cannot be used to help other nodes in bootstrapping ala history mode and thus its restricted for bakers trying to delegate their services.

**Archival mode**

Finally, the archive mode is the most demanding in terms of storage as its name suggests. This mode allows us to retrieve any data stored on chain since the genesis, i.e. all on-chain data is available. It is commonly used in Tezos block explorers or indexers.

 

It is worth mentioning that the node will not be able to retrieve block and staking rights data before a checkpoint is made. A checkpoint in Tezos is the moment in which the consensus is fixed at a regular interval of time to hash a saved copy of the data.

 

Also, it is important to mention that the aforementioned history modes are still in experimental phases, so it is not recommended to replace current structures with nodes coming from these branches. However, experiments are encouraged using alternative networks.


### **Snapshots**

 

As previously mentioned, one of the ubiquitous blockchain challenges is that the chain is increasingly growing every moment, increasing the difficulty of the data retrieval process from the chain to a peer. Taking advantage of the history mode storage requirements, it is now feasible to download a snapshot to get a full node running. Thus, a snapshot in Tezos consists in the process of  extracting the necessary data to bootstrap a node from a single data entry. Importing/exporting a snapshot usually takes about 2GB of data, completing in a matter of minutes rather than taking even full days to fully synchronize a node.


### **Select context storage using tezedge**

Tezedge supports 3 different implementations for the context storage, the implementation can be specified with the `--tezos-context-storage=` parameter:
- `irmin` (default): Uses the same implementation as Octez
- `tezedge`: Uses a Rust based implementation.  
Tezedge supports 2 contexts: on-disk and in-memory.  
In addition to `--tezos-context-storage=tezedge`, `--context-kv-store` specifies which context to use:
  - `inmem`: Store the blockchain state in RAM. It's fast but requires a machine with lots of memory
  - `ondisk` (default): Store the blockchain on disk



## References

**Academic sources**

Ali, S., Wang, G., White, B., & Cottrell, R. L. (2018, August). ‘A blockchain-based decentralized data storage and access framework for pinger’. [https://www.osti.gov/servlets/purl/1475405](https://www.osti.gov/servlets/purl/1475405) 

 (pp. 1303-1308). IEEE.

A. M. Antonopoulos. Andreas M. Antonopoulos. _MasteringBitcoin - Programming the Open Blockchain_, O’Reilly Media(2017)

Nakamoto, S. (2008). _Bitcoin: A peer-to-peer electronic cash system_. Retrieved from [https://nakamotoinstitute.org/bitcoin](https://nakamotoinstitute.org/bitcoin)

**Internet resources**

[https://blog.nomadic-labs.com/introducing-snapshots-and-history-modes-for-the-tezos-node.html](https://blog.nomadic-labs.com/introducing-snapshots-and-history-modes-for-the-tezos-node.html) 

[https://github.com/pluralsight/git-internals-pdf  ](https://github.com/pluralsight/git-internals-pdf)

[http://gitready.com/beginner/2009/02/17/how-git-stores-your-data.html](http://gitready.com/beginner/2009/02/17/how-git-stores-your-data.html)

[https://www.isical.ac.in/~debrup/slides/Bitcoin.pdf](https://www.isical.ac.in/~debrup/slides/Bitcoin.pdf)

[https://medium.com/ontologynetwork/everything-you-need-to-know-about-merkle-trees-82b47da0634a](https://medium.com/ontologynetwork/everything-you-need-to-know-about-merkle-trees-82b47da0634a)

[https://www.ocamlpro.com/2019/01/30/improving-tezos-storage-update-and-beta-testing/](https://www.ocamlpro.com/2019/01/30/improving-tezos-storage-update-and-beta-testing/)

[https://www.ocamlpro.com/2019/01/15/improving-tezos-storage/](https://www.ocamlpro.com/2019/01/15/improving-tezos-storage/)

[https://tezos.com/static/white_paper-2dc8c02267a8fb86bd67a108199441bf.pdf](https://tezos.com/static/white_paper-2dc8c02267a8fb86bd67a108199441bf.pdf)

[https://tezos.gitlab.io/releases/december-2019.html?highlight=storage](https://tezos.gitlab.io/releases/december-2019.html?highlight=storage)

[https://tezos.gitlab.io/api/api-inline.html#tezos-storage/Tezos_storage/index.html](https://tezos.gitlab.io/api/api-inline.html#tezos-storage/Tezos_storage/index.html)

[https://tezos.gitlab.io/007/michelson.html](https://tezos.gitlab.io/007/michelson.html)

[https://tezos.gitlab.io/user/snapshots.html](https://tezos.gitlab.io/user/snapshots.html) 

[https://tezos.gitlab.io/user/history_modes.html#history-modes ](https://tezos.gitlab.io/user/history_modes.html#history-modes)
