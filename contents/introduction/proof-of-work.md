---
title: Proof of work
sidebar: Docs
showTitle: false
---

# Proof of work

**The Nakamoto protocol** was the first to propose a decentralized solution to the issue of publication. It uses **proof of work**, a concept based on a partial hash collision.

A hash collision occurs when you take two different messages, you put them through a cryptographic hash function and it gives you the same hash. If your cryptographic hash function is well designed, hash collisions shouldn’t happen at all. It would be computationally infeasible (not impossible, but extremely difficult) to find a collision.

However, you can ask for a **partial hash collision**. You could say “I would like 2 hashes to match in their first 10 bits” or “if the hash of a message is a 256 bit number, I would like it to be below a certain value” and that way you can tune it and create a task that someone would need to solve in order to produce such a hash. 

This idea was first introduced by Adam Back in 1997 for email spam. Back proposed to create a small price for sending a message—everyone had to pay a few cents to send an email. It would make spam expensive, because spammers operate by sending millions and millions of email and then maybe one out of 10,000 messages will be opened. If it costs just one cent or two cents to send an email, most people wouldn’t mind, but it will become very expensive for spammers to send mass emails.

You could try to tie email to the entire payment system and banking system, but that's very difficult to do. Email is a centralized system, it's not very programmable and it's fragmented. Banking systems are different around the world, so you can't really do this with an open protocol like email. 

However, you could create a **task** to perform: **finding a hash collision**. 

It will require processing time and energy. This way we create a cost, which is good, because you want the process to be difficult to duplicate. You aren’t transferring the value, you are only spending it, so this money is not going to pay for anything, it's just going to cost you something. 

**Proof of work connects real world resources such as computing power and electricity with digital information.** Information is not scarce since you can always duplicate it. However, energy and processing power cannot be duplicated without a significant cost, and thus it is scarce, providing the first building block of a proof of work cryptocurrencies.

## Consensus

### The Nakamoto consensus

The **Nakamoto consensus** is a set of cryptoeconomic rules that was used to define the first cryptocurrency protocol. The Nakamoto consensus utilizes proof of work to create new blocks. The way it works is that **miners produce blocks through proof of work.** 


### Miners produce blocks:
* Each block contains recorded transactions
* Every block points back to a previously mined block
* Blocks have timestamps stating when they were mined 
* They commit to a **Merkle tree** of transactions 
* Each block has the block hash to its parent block, there is a proof of work nonce
* Mining is the computationally-intensive process of solving proof-of-work problems to extend the chain
* Blocks and transactions are propagated on a gossip network

## Blocks

A blockchain derives its name from its structure; it is a chain of blocks, with each block pointing back to a previously created (mined) block. Blocks contain recorded transaction data, therefore a chain of blocks constitutes a ledger of transactions—the blockchain. 

### Mining

A proof of work blockchain begins with the first block, also known as the genesis block. Every block since then has to be mined. **Mining is the term used to describe the process of creating new blocks for the blockchain.** This is a computationally intensive process that also consumes electric energy, thus creating a real-world cost to the creation of a cryptocurrency coin.  Recorded transactions are bundled together into files that are called blocks. A block contains a timestamp that states the time at which the miner claims the block was created. Newly created blocks commit to a **Merkle tree** of transactions. 

### Merkle trees

A Merkle tree (alternatively a **hash tree**) is a tree-like data structure consisting of:

*   Leaf nodes that have exactly one parent node and no children. They contain the cryptographic hash of a particular block of information.
*   Non-leaf nodes (“branches”, to continue with the tree metaphor) that have exactly one parent node and can have any number of children (both leaves and branches). They contain the cryptographic hash for all nodes descending from them—their children nodes, the children of their children and so on.

That means that for any given non-leaf node in the tree, you can calculate the hash of all of its children and see that it matches the parent non-leaf node's hash. All non-leaf nodes will gradually descend into leaf nodes, which contain the actual cryptographically hashed data. This is the basis of the blockchain: you can very quickly and securely confirm that the data is correct by checking it against the parent’s hash.

For instance, Bob makes a transaction of 1 ꜩ to Alice. Bob’s transaction is bundled along with several other transactions and placed inside a newly-created block. Mallory wants to interfere and rewrite a node to state that Bob in fact sent 1 ꜩ to her and not Alice. However, the Merkle tree’s properties prevent her from doing that; the transaction data would not fit the hash belonging to the parent node above Bob’s transaction.  

In a blockchain, each block only links to the previous one. The blockchain is a Merkle tree, but it’s a degenerate tree with only one child per node. 

## The nonce

In a proof of work algorithm, we often talk about miners solving a cryptographic task in order to produce a new block. The solution they look for is known as the golden **nonce.** A nonce is a 32-bit (4-byte) number that produces a 256-byte hash value. The miners run through millions (if not billions) of various nonces to find one that produces a hash value equal or lower than the target value set by the blockchain’s protocol—the golden nonce.

Only the golden nonce allows a miner to create a new block and receive the rewards for it. There is competition between miners to find this nonce. The nonce’s target hash value is dictated by the current **network difficulty**. The protocol sets this mining difficulty. The more blocks have been produced, the more difficult this process becomes. This is why cryptocurrency mining is becoming increasingly more expensive and miners must constantly improve their hardware in order to remain competitive. 

The difficulty is increased by decreasing the target value for the hash. Roughly speaking, this means that the hash number produced by the nonce must start with more zeros. Since the chances of finding a lower hash value from any random nonce decreases, the miners have to test an increasing amount of nonces. 

If a miner finds such a nonce, then they win the right to add that block to the blockchain. The nonce is written into the block header, along with a timestamp and the current difficulty. The block then joins the chain and the miner receive the block reward.

The nonce is a random, one-time, whole number. Through trial and (mostly) error, miners test millions of nonces in order to produce the hash value that meets the target. Only a nonce that produces the target hash value will win the block reward. This process of trial and error constitutes the ‘work’ in proof of work. 

### Growing the blockchain

The blockchain starts with one empty block (the genesis block) and after that, miners are going to compete to create the next block. They will attempt to solve this proof of work task by finding the correct nonce, allowing them to produce the next block. 

As a miner, I figure out the correct nonce, I create a block with the nonce written in the header and I add it to the previous block. This is how I participate in the growth of the blockchain. There is an entire ecosystem of miners who are utilizing their computing power in an attempt to create more blocks. As long as the blocks are verified by the other miners as being valid, you will have consensus algorithm. 

The difference is that whereas classical consensus algorithms are based on the principle that you have a set of _n_ people and then these _n_ people need to agree, there's no particular set of people—_the set of people is anyone with computing power_—therefore anyone who has sufficient computing power can join into this algorithm.

There are, of course, some issues with this algorithm. For instance, you might be thinking “if someone has more computing power than anyone else, then they may have a proportionately greater influence on the mining process”. Indeed, miners that are rich or have cheap access to energy and/or computational power are at a great advantage. Proof of work blockchains often lead to a degree of centralization as economies of scale favor the wealthy.

## Counting the score

Since there is a possibility for two blocks to be created at the same height, the nodes must agree to a single Merkle tree of blocks that they will recognize as the valid blockchain. In general, the Merkle tree with the highest score (largest amount of blocks) will win and be recognized as the valid chain. The score of a blockchain represents the amount of blocks within a single degenerative Merkle tree of blocks.

You have several options for implementing score:

###  a) Centralized: trusted third parties

A central party (a group of individuals or an individual) that decides which branch is the right branch.

### b) Bitcoin: the longest chain 

The chain with the largest amount of blocks is the valid chain.

### c) Proof-of-stake: counting signatures

Count the number of signatures that you can have in a certain branch or the length of the branch.

### d) Liquid Proof-of-stake: counting endorsements

The score of the chain is going to be the total number of endorsements you have on the chain.

In general, you can you can take a blockchain protocol and decompose it into three layers: 

1. The network layer, which is how do you communicate with the rest of the world. How do you exchange operations? How to exchange blocks? This can be a gossip network, but you could have direct lines so that you have many different network architectures in order to communicate.

2. The consensus layer which is reaching one consistent state despite having many different messages. How do you reach this consensus? You will look at all of this information that comes on your network and have to decide what your state is. 

3. The transaction layer (which we sometimes call the economic protocol). 

Decentralization is achieved by entangling the consensus and transaction layers. You are going to utilize parts of your transaction layer to achieve consensus. The way this works in blockchain is that when you create a block, you get rewarded with newly created coins so that you can transact them at a later point, thus creating an incentive for reaching consensus. 

### Peer to peer

A peer to peer (P2P) system divides tasks between multiple nodes. These nodes are known as peers and are equals in relation to each other. Each peer makes a portion of their computing power, disk storage, network bandwidth or other type of digital resource available to other peers. This is done without any kind of direct control from centralized servers. 

One popular use case of a P2P network is file sharing. Demand for files on the internet is often asymmetric. The number of people who want a file may be infinite, but the number of people who are able to provide the file is often limited. When too many people attempt to download from a few servers, they may overload the servers and hinder the downloading process for everyone. 

The BitTorrent file sharing system decentralizes this by dividing files into pieces and making each user upload some pieces of the files (known as “seeding”) to others. Each peer acts as a server offering parts of files they are actively seeding. Even if a computer goes offline, the network continues to operate as others step in to provide their file pieces. This has resulted in what is one of the most resilient and robust file distribution networks in the world.

### P2P in blockchain

In a proof of work blockchain, instead of using the P2P network for file sharing, we are using it to maintain and distribute a ledger.

A proof of work blockchain treats nodes in its network as peers, making them equal to each other in terms of privileges. In this case, verifying and growing the blockchain is what that the peers co-operate on, with each node providing computational power and energy in order to find the proof-of-work nonce, in addition to checking the validity of the blockchain. 

The nodes reach consensus by identifying the valid chain. For instance, in a proof of work blockchain, whenever a node goes offline momentarily and then comes back online, it finds the chain with the most blocks and validates the other nodes by checking against this chain. In other protocols (proof of stake and liquid proof of stake), the node would select the valid chain based on different parameters.

# Known Issues

### 51% Attack

If the longest chain gets priority over all other chains, then we may have a problem if enough nodes cooperate maliciously to create a false version of the blockchain. If I control more than 51% of the computing power or hashing power in this network, then I can create my version of the chain and it grows faster than the original chain because I'm producing it at 51% of speed while the other miners are producing the original chain at just 49% of speed. If I manage to outpace the original chain, then at some point my chain will be longer than all the others. Then I can reveal my chain and essentially take over the entire blockchain network. 

### Throughput

Bitcoin produces one megabyte sized blocks every 10 minutes because it's based on a real network like the Internet. You need to account for potentially large latencies and small bandwidths. As a result, you can only achieve something like four transactions per second on Bitcoin while in comparison conventional payment networks like Visa or MasterCard are doing thousands of transactions per second 

### Cost (energy expenditure)

Another issue is cost and energy expenditure.The energy expenditure is very intensive as it requires advanced central processing units (CPUs) to perform around the clock in order for mining to be profitable. This also generates a lot of excess heat. 

Today, most miners use expensive hardware such as custom chips and liquid cooling to mine proof of work cryptocurrencies. This constitutes a major expense, both in purchased hardware and continuous energy expenditure. It creates a red queen race between miners because as more people put in more computing power, the difficulty of the proof-of-work challenges increases. As of 2019, 64 terawatt hours (TWh) of electricity is consumed annually just to operate the Bitcoin network 

This raises the question of whether there is a way of doing this more cheaply, without spending so much energy, avoiding issues like the 51% attack but at the same time maintaining synchronicity.

The safety of the system gets markedly worse if you can harm the network and the transitive nature of the blocks, but that's also tied to its throughput. This is why you can't have a Bitcoin block every second—it’s essentially a synchronicity problem.

### Protocol innovation

Although there's a wealth of new research on the field of cryptocurrency since they were first created in 2009. The earliest blockchain protocol is pretty much set in stone and it is very difficult to come to a consensus agreement for changes towards its own protocol.

