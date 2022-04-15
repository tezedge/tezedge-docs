---
title: Consensus algorithms
sidebar: Docs
showTitle: false
---
# Consensus algorithms

A distributed system consists of multiple separate devices that need to coordinate their actions in order to achieve their goal(s).  One of the fundamental problems of distributed systems is the issue of agreeing on shared data that is used in computation. This is known as reaching consensus. 

In blockchain, consensus is reached through a consensus algorithm, a set of rules to be followed when agreeing on the contents of new blocks. Various chains utilize a variety of consensus protocols. 

Consensus algorithms are the backbone of decentralized networks. Simply put, a consensus algorithm allows a decentralized network to make decisions and, in general, get things done in the ecosystem. In order to understand how consensus algorithms work, let us first look at how consensus decision-making works.


## **What is consensus decision-making?**

Consensus is a decision-making process in which the participants develop and decide on proposals that are organically accepted by the entire group. The process and outcome of consensus decision-making are both referred to as consensus. The core tenets of consensus decision-making are as follows:



*   Collaborative: The participants in the group contribute to the idea and engineer it to make a proposal that’s acceptable for everyone involved.
*   Cooperative: The participants involved in the process work to reach the whole group’s best possible conclusion. Instead of competing, they are helping each other out to reach a conclusion
*   Egalitarian: Consensus decision making has to be as democratic as possible. As such, every participant must have the same opportunity to present and amend proposals.
*   Inclusive: As many participants as possible should be involved in the entire decision-making process. 
*   Participatory: The process chosen needs to ensure that every participant is heard and their inputs are considered.

Decentralized networks that deal with transactions carrying significant financial value need to utilize a consensus mechanism that brings in something extra apart from its core fundamentals. 

Our consensus algorithm of choice needs to be completely robust and failsafe. It needs to work even in the extreme situation where a large portion of its participants is rendered useless. This is why we need our consensus algorithm to answer the Byzantine Generals Problem successfully.



## **The Byzantine Generals Problem**

The Byzantine Generals Problem describes a situation in which, in order to avoid a terminal failure of a system, the system's participants must agree to a unified course of action, but some of these actors are unreliable. The Problem is often described in the following way: 



*   There is a castle in the middle, which is heavily fortified.
*   There is an army surrounding the castle. This army is strong enough to conquer the castle provided they attack all at once.
*   One of the generals wants to propagate a message. Let’s say the message is “Attack!”
*   Now imagine some of the generals in the army have been corrupted. They want to spread dissension in the ranks.
*   The way they are going to do that is by falsifying the message. Instead of propagating “Attack”, they are going to propagate “Retreat.”

This is where the challenge lies. How do you create a consensus system that not only works seamlessly but works even if some of the participants in the system don’t act in the interest of the whole network? Solving this challenge is known as answering the Byzantine Generals Problem.


### **Byzantine fault tolerance**

A decentralized monetary system like Bitcoin and Ethereum needs to be as robust as possible and work under all circumstances. A failure to answer the Byzantine Generals problem could lead to protocol-breaking issues such as double-spending. Hence, before we go any further, let’s understand what double-spending means.

Imagine Alice sends 1 XTZ (ꜩ) to Bob. Before this transaction goes through, Alice sends the same 1 XTZ to Charlie. Now, how will the protocol follow these attempted transactions? What if half of the nodes in the network decide to go with the Bob transaction and the other half with the Charlie transaction? If that happens, then that would mean that both of these realities can exist simultaneously, which completely breaks our monetary protocol.

This double spending problem doesn’t occur with paper currency, because the act of transaction involves the physical transference of the ownership of bank notes. 

However, when it comes to digital assets, you are not really physically handing over any money. As such, it leaves the door open for double spending. The only way we can prevent this from happening is by integrating a Byzantine fault tolerant consensus algorithm. 


## **Synchronous vs Asynchronous Model**

The underlying model that the consensus algorithm needs to make certain assumptions about timing. In other words, how long does it take for a message to successfully propagate? 

There are three main types of timing models that you can use – synchronous, asynchronous, and partially synchronous. These three models make some guarantees about the latency between the exchange of messages amongst nodes during protocol execution.

**Synchronous model** 

This model has a known upper bound when it comes to the amount of time it takes for messages to be delivered between nodes. There is also an upper bound on the relative difference in speed between the nodes. Achieving consensus in a synchronous system is significantly less complex since everyone involved has a time guarantee. When someone sends a message, the receiver will get it within a specific time frame. This allows protocol creators to build a system wherein they get a message within a fixed time frame. However, this environment is not really practical in a real-world distributed system because we can’t expect all the nodes in a wide area network to be online at the same time.

**Asynchronous model**

The asynchronous model is more practical than the synchronous version. In this model, the upper bounds of both the time of propagation and the relative speed between the nodes don't exist. Messages can take a long time to reach their destination and the nodes may take an arbitrarily long time to respond. During real-time execution, nodes fail and messages drop off all the time. This is why this model is a lot more realistic.



### **FLP impossibility and building a model that works**

While practical systems are mostly asynchronous, it could be nearly impossible to create a consensus system that makes no assumptions for time. One of the conditions that must be met is "termination." Every non-faulty node must decide on some output value.

This brings us to the FLP impossibility result, named after researchers Fischer, Lynch, and Paterson. In their 1985 paper "Impossibility of Distributed Consensus with One Faulty Process," the three researchers showed that even a single faulty process makes it impossible for a deterministic, asynchronous system to reach consensus.

There are two ways to circumvent the FLP impossibility:



*   Using timeouts
*   Using the Nakamoto consensus

**Using timeouts**

Looking into our consensus model, the FLP impossibility result clearly states that we cannot make progress in a system if there is no progress made wrt message propagation. So, if messages are delivered asynchronously, termination can't be guaranteed. One way to circumvent is to use timeouts. If a particular consensus step hasn't been executed then the protocol waits until there is a timeout. Following that, the whole process starts all over again. Paxos is a well-known consensus algorithm that uses this method.

**Using Nakamoto consensus**

Using a Nakamoto consensus method over a traditional consensus method is another way to overcome the hurdles of an asynchronous system. Traditional consensus doesn't scale well since it requires you to know every single node in the network. In Nakamoto consensus, instead of selecting a leader and coordinating with other nodes, the consensus is based on which node finds a new block the fastest.

Nakamoto consensus introduces a metric called "difficulty" into the network, which could be some work, resource, asset, etc. The network member must do or invest in this difficulty to create a new block. Network difficulty helps in economically incentivizing the nodes to continually perform expensive puzzles for the chance of randomly winning a reward (i.e., a block reward). Most of the mainstream algorithms like Proof-of-Work, Proof-of-Stake, etc., are Nakamoto consensus algorithms.


## **List of consensus algorithms**

Now let’s examine several of the most common and  well-known consensus protocols:

**1. Proof-of-Work**

Proof-of-work (PoW) is currently the most well-known consensus algorithm. First introduced in the Bitcoin whitepaper, PoW enables specialized nodes, called miners, to use their computational resources to solve difficult cryptographic puzzles. To better understand this, here is  a quick overview of how the process works.

First, the contents of the Bitcoin block are hashed using the SHA-256 algorithm. The block consists of:



*   The header includes key features like block creation time, the hash of the previous block, and the Merkle tree root.
*   List of transactions contained within the block.

Suppose that the hash of the overall value is M.

Following that, the miner chooses a “nonce”, which is a random, one-time whole number, and appends it to the hash of the block and hashes the whole value, such that the result is h(n+M), such that “n” is the nonce and h() is the SHA-256 hashing function.

For each mining cycle a metric known as difficulty (D) is predetermined by the network. A miner can successfully add a block to the Bitcoin blockchain only if h(n+M) &lt; D. The difficulty metric makes it extremely tough for miners to find a nonce that satisfies the required condition. Miners test and discard millions of nonces every single day to meet the required target. 

Upon successfully meeting these conditions, the miner receives the block reward. 

**2. Proof of Stake**

Following PoW, the most well-known consensus algorithm is proof-of-stake (PoS). Not only is Ethereum going to adopt the PoS protocol as it moves into Ethereum 2.0, but several other projects like Cosmos and Dash, have already adopted the consensus algorithm. So, how does it work and what makes it different from PoW?



*   First, the PoS process is completely virtual, while PoW uses real-world  resources such as processing power and energy.
*   In PoS, an individual node’s hashrate is directly proportional to their stake instead of individual computational power.
*   The chosen validator gets the opportunity to add a block to the chain.

One school of thought states that the node with the largest stake will get more opportunities to sign (create) new blocks. However, this system would invariably lead to centralization as the richest members (users with the largest stake) would get the most opportunities.

Another system of PoS is coin age-based. Coin age is the product of the number of coins multiplied by the number of days the coins have been held. 



*   Coins that have been dormant for >30 days have a better chance of signing the latest block. 
*   Once a coin has been used to sign a block, its coin age becomes zero and it must wait for 30 more days.
*   The probability of being chosen reaches its maximum level after 90 days to prevent large collections of stakes from dominating the ecosystem.

Overall, there are two huge advantages that PoS has over PoW – It’s more scalable and exponentially less wasteful. 

**3. Delegated Proof of Stake**

Delegated proof of stake (DPoS) is a generic term that describes a particular class of PoS algorithms. These algorithms are used in protocols like EOS, BitShares, and Tron. The core philosophy behind DPoS is that the blocks are produced by a predetermined set of validators. Along with mining the blocks, these validators are responsible for taking care of overall network health and verify the validity of the generated block.

As you can imagine, the delegates have considerable power in this system. This is why it is highly important that the protocol takes extra care in choosing their delegates. Some of the steps that they can take are as follows:



*   Delegates could be chosen on the basis of the size of their stake. They may also receive votes from users in the ecosystem. Following the election, a delegate's voting power could be directly proportional to their stake.
*   The past history of the delegates is also considered during the selection process. If they had been guilty of malicious acts in the past, they could get looked over.
*   A delegate could be asked to show commitment by depositing their funds into a time-locked smart contract. The funds locked could be confiscated in the event of malpractice.

**4. Liquid Proof of Stake**

Liquid Proof of Stake (LPoS) is the consensus algorithm used by Tezos and is the meeting point of traditional PoS and DPoS implementations. The concept of LPoS is rooted in the principles of liquid democracy.

The liquid democracy system can easily transition between direct and representative democracy as people can either vote on policies directly or delegate (hand over) their voting responsibilities to another user. This system is a lot more scalable than direct democracy since participants can simply delegate their votes. On the other hand, it’s a lot more decentralized and secure than delegated democracy since decision-making is not limited to a select few. Additionally, delegates can be easily held accountable for their actions since people are at liberty to take back their votes.

Different protocols have different LPoS implementations. This is a brief overview of how Tezos does theirs:



*   Tezos holders can become a baker by staking at least 8,000 XTZ or “1 roll.” Post staking, they can produce blocks, confirm transactions, and earn block rewards. If they have delegated their baking rights to someone else, the reward will be shared between the two parties.
*   A random validator bakes a new block and must get it endorsed by 32 other random validators.
*   Tezos rewards its bakers and endorsers with transaction fees and a share of its inflationary growth. Tezos has an annual inflation of ~5.5%.

**5. Practical Byzantine Fault Tolerance**

Practical Byzantine Fault Tolerance or pBFT is another well known consensus protocol that’s often used in conjunction with PoS. Nodes in a pBFT-enabled distributed system are sequentially ordered, with one node being the primary (or the leader node) and others referred to as secondary (or the backup nodes). Traditional, pBFT takes place over five phases 1.request 2.re-prepare 3.prepare 4.commit and 5.reply:



*   The maximum number of faulty nodes that this system can tolerate is “f.”
*   In the pre-prepare phase, the leader assigns a sequence number to each request and multi-casts the message to each of the other nodes. 
*   Each node validates the pre-prepared message, gives their vote, and muti-casts a prepared message to every other node.
*   If the node receives 2 f +1 prepared messages matching the pre-prepared message stored in their log, the request gets agreed upon.
*   In the commit phase, each node multi-casts to every other node a commit message. 
*   If 2f +1 matching commit messages are received, it shows that the 2f+1 nodes are confirming the request. As such, the request gets executed.

**6. Hybrid PoW/PoS**

The hybrid PoW/PoS aims to capture the benefits and mask the deficiencies of both the approaches. Decred is one of the more well known cryptocurrencies that utilizes both PoW and PoS algorithms to create a hybrid system. 

Masternode coins like Dash are also based on a hybrid PoW/PoS system. In these systems, the masternodes often need to lock up a certain amount of native tokens in the protocol. They prove their commitment by staking their coins.

In Decred's PoS-PoW system, stakeholders have three distinct roles to play – block voting, voting on changes to the consensus rules, and voting on project management.

An advantage of the hybrid PoW/PoS system is that it drastically increases the costs of attacking the network since there are two different systems that must be circumvented by the attacker.

**7. Paxos**

Paxos was the first consensus algorithm that was extensively tested and peer-reviewed. The algorithm has three entities – Proposers, Acceptors, and Learners. Their roles are as follows:



*   **Proposers:** Receive requests from clients and try to convince Acceptors to take in the proposed requests.
*   **Acceptors**: Accept the proposed values from proposers and let them know if they have been accepted or not. A response from an acceptor is equal to a positive/negative vote for a particular proposal.
*   **Learners**: Announces the outcome of the process.

This is how the consensus works:



*   A client sends a request to any of the Proposer nodes.
*   Upon receiving the request, the proposer 
*   The Proposer runs a two-phase protocol with the acceptors. The two phases are – Prepare and Commit.
*   In the Prepare phase, the Proposer assigns a proposal number to the request. This number must be unique and no two proposers can come up with the same number.
*   This number must be bigger than any previously used number in the system. This can be achieved by either using an incrementing counter or a nanosecond-level timestamp. If this number isn't bigger, the proposal will be instantly rejected.
*   In the Prepare phase, the Proposer attaches a proposal number and sends the message to the majority of the Acceptors
*   If the Receiver sees that the proposal number (ID) is larger than the number in any of the previous rounds, they respond with a positive "PROMISE" message.
*   Upon receiving a PROMISE from the majority of the Acceptors, the Proposer can now initiate the second phase – Accept.
*   In the Accept phase, the Proposer tells all the Acceptors to accept the value corresponding to the proposal.
*   If the ID still remains the largest they have seen, the Acceptors accept the value and send it to all the Learners.
*   If the Learners receive a positive message from the majority of the Acceptors, they accept the Value and the consensus is reached.

**8. Federated Byzantine Agreement **

In the Federated Byzantine Agreement (FBA) algorithm, each byzantine general is responsible for their own blockchain. While this algorithm was pioneered by Ripple, Stellar has further refined the system by adopting the first ever provably safe FBA protocol. The nodes have to be known and verified ahead of time. 

A quorum of nodes is created from individual nodes. A quorum is the minimum number of nodes required for a solution to be correct. Subsets of quorum are called quorum slices. Individual slices need to convince other nodes to agree with their solution.

This is how the process works:



*   Each node receives a transaction from external applications
*   The node forms a Candidate Set with all the valid transactions
*   The nodes merge their candidate set with the UNLs(Unique Node List) candidate sets and vote on the validity of the transactions
*   The transactions that receive at least 50% votes are passed to the final round.
*   In the final round, at least 80% of the UNL nodes need to agree on the transactions for them to go through.
*   Each validating node collates the transactions with at least 80% UNL agreement into a block. They calculate the block hash, sign them, and broadcast the result to the network.
*   The validating nodes now compare the block hash. A block gets validated when at least 80% of the validating nodes have signed off on the same hash.

The methods by which blockchains reach consensus are still evolving and new consensus algorithms are constantly emerging. This aforementioned is not an exhaustive list of all consensus algorithms, but rather a list of the popular ones that are widely used by a majority of cryptocurrencies. 

**Bibliography**



*   Miguel Castro and Barbara Liskov. “Practical Byzantine Fault Tolerance,” in Proceedings of the Third Symposium on Operating Systems Design and Implementations, 1999
*   Preethi Kasireddy. “Let’s take a crack at understanding distributed consensus,” [https://www.preethikasireddy.com/](https://www.preethikasireddy.com/), 2018
*   Interchain Foundation. “Understanding the Basics of a Proof-of-Stake Security Model,” in [http://blog.cosmos.network/](http://blog.cosmos.network/), 2017.
*   Leslie Lamport, Robert Shostak, and Marshall Pease. “The Byzantine Generals Problem,” in ACM Transactions on Programming Languages and Systems, Vol. 4, 1982.
*   Georgios Konstantopoulos. “Understanding Blockchain Fundamentals, Part 1: Byzantine Fault Tolerance,” in [https://medium.com/loom-network/](https://medium.com/loom-network/), 2017.
*   Ameer Rosic "Proof of Work vs Proof of Stake: Basic Mining Guide," in [https://blockgeeks.com/](https://blockgeeks.com/) in 2018
*   Paul Krzyzanowski. “Understanding Paxos,“ in [https://www.cs.rutgers.edu/](https://www.cs.rutgers.edu/), 2018
