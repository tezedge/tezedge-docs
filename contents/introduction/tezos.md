---
title: Tezos
sidebar: Docs
showTitle: false
---
# Tezos

## Overview

The purpose of Tezos is to create an eternal blockchain. One of the core issues in blockchain is the destructive nature of forking. This is why Tezos has been developed as a self-amending blockchain that avoids hard forks.

## Self amendment

The main advantage of the Tezos blockchain is the ability to self amend. Instead of changing the protocol by forking into a different version, change is made from within the Tezos ecosystem. 

**Why self amendment?**

* **Explicit governance**: Avoids never-ending debates (e.g. block size, hard forks)
* **Rewards innovation**: Incentivizes collaboration instead of competition
* **Avoids plagiarism**
* **Solves collective action problems**: A block reward is a solution for a collective action problem.
* **Introduces security into the system, builds and maintains infrastructure.**
* It fosters **coordination.**
*   **Super-nash equilibrium** - no one benefits from deviating from the strategy. The most famous example is the *prisoner’s dilemma* - defection is in the individual’s  interest, but the best solution is to cooperate. 
*   Digging tunnels to **Pareto optimality** - there is a solution to a problem and there cannot be a better solution without making anyone worse off - therefore it is considered fair.

By changing from the inside, there will be changes to the code, but they're going to come from the blockchain itself. 

**How is that accomplished?** The *apply* function and the *fitness* functions are put inside the states that are modified, so now the state of our blockchain is also going to contain the function itself instead of just containing the set of balances or the total amount of work. 

There is a new type of operation called an *amendment* which can modify, so now it is possible to submit operations which modify the rules of the ledger in addition to making transactions. To achieve this, the amendments have the option of introspecting into protocols. One can make changes to *apply*, but for the operation to be valid, they can require some structure on *apply.* 

The apply function cannot be replaced with just any function. The apply function must have certain properties. 

Self amendment gives us **explicit governance.** It provides a very specific operation with very specific rules, such as voting, for example, which would let us change the protocol and that's like having the rule of law. 

There's been a lot of contentious debates in certain cryptocurrencies about the block size or  hard forks. The problem with contentious debate is that if there isn't a hard rule to go by, then it can carry on forever. Tezos strives to reward innovation right away—if someone has a great idea about blockchain, then they usually have to start their own blockchain since most people aren’t motivated into contributing to an existing one. Tezos fosters an environment which rewards innovation. If there is a breakthrough idea, anyone can submit it to the Tezos protocol.

 

## Emmy⁠⁠: liquid proof of stake

Tezos allows token holders to transfer (“delegate”) validation rights to other token holders without transferring ownership. In Tezos, delegation is optional. The Tezos consensus mechanism as “Liquid Proof-of-Stake” to maintain a dynamic validator set, facilitating token holder coordination and accountable governance.

*   It is an algorithm that proceeds in cycles.
*   A cycle is a set of blocks, 4096 blocks(slots)
*   Each slot is separated by at least a minute.
*   A slot comes up and a baker (a block producer in Tezos) creates a block. If they are honest, they will attach it to the end of the chain.
*   Another baker comes in and creates a block, repeated until the end of the cycle
*   For robustness, once a baker create a block they will want to prove that they created it, malicious players do not want to claim the creation of a block.
*   32 stakeholders are randomly selected (select 32 token values and look up who owns them), these are going to get endorsement rights and are known as endorsers.
*   Whenever a baker creates a block, there are endorsers waiting to see who made the block and approve it. Once the block is created by the bakers, the endorsers create and submit endorsement operations for the baked block, and the process is repeated.
*   A baker receives a reward that is proportional to the amount of endorsements included in the created block.

**Generating randomness** 

Since Tezos runs a deterministic protocol, there is no randomness. 

In proof of work, the randomness is external in the sense that if a proof of work task is being hashed, it focuses on partial collision and not the rest. The rest provides a lot of randomness that is very difficult to optimize for.

Tezos uses a *commit reveal scheme* to generate entropy. Different people commit to a random number and then reveal it at a later time. Different trivial numbers are used to create entropy. A cycle begins and rights are assigned. The score of the chain is going to be the total number of endorsements on the chain. 

**Baker safety deposits**

Baker and endorsers have to place safety deposits. This is done in order to discourage equivocation (when someone creates two blocks at the same height), since Tezos wants people to commit to one version.

Bakers have to pay a deposit when creating a block. Once the baker creates a block, other users can see whether they created two blocks at the same height. Users can report this, and if the accusations are true, the baker will lose their deposit. Accusers must check all chains and look out for double bakings or double endorsements.

The safety deposits ensure that anyone is who is participating in the system (producing blocks, endorsing) is actually holding tokens and, in some sense, has the network’s best interests at heart. 

**Advantages** 



*   **Quick convergence to consensus** 

    When endorsers are reactive, after a few blocks, a substantial fraction of the ownership base has been selected, and if they all agree on this history, they are unlikely to depart.

*   **Good liveness** 

    The blockchain will always be making progress. Even if some participants are not reactive, new transactions and new blocks will continue to be created.


*   **Fair block creation rights** 
    
    The creation of blocks is proportionate to the stake a person owns in Tezos. If someone owns 1% of the tokens, they should be able to make 1% of the blocks.


**Disadvantages**



*   **No finality**

    It is impossible to know whether a transaction has been permanently included in the ledger. It is possible that someone has come up with a longer chain, or a better chain. Statistically, it is likely that a user's version of the chain will change. However, finality may be introduced in a future protocol update.

*   **Synchronicity assumption**

    There is a reason why we wait a minute and not a second. For the system to work, an honest majority is needed, but if people begin delaying blocks, then all of a sudden the honest majority needs to become much larger. If an individual can delay every message by 2 minutes and they control 33% of the network, then they are going to create blocks at a slower speed, but if they can slow the speed of the other bakers (the users who create blocks), then they are going to go at the same speed as everyone else. If an individual can delay the process by 2 minutes, then the network must have a 66% honest majority.


# Smart contract design	

**Correctness** 	

It is crucial to avoid errors. While verifiability is important, it is also necessary to be able to prove to everyone that the smart contracts in Tezos do not have any issues. It's not enough for the developer to be confident, everyone else needs to be confident as well. 	

**Parsimony**	

Space is expensive on the blockchain, it is valued as a premium and everyone needs to keep everything that's on a blockchain on their disk (or even in memory, if efficiency is a priority), therefore it is better to avoid space-intensive smart contracts. 	

**Performance** 	

Performance is not an issue since smart contracts run on simple logic. 	

**Portability** 	

Portability isn’t an issue either, since the smart contracts perform reading on the Tezos blockchain. It is not necessary to run them on a dozen different platforms. 	



# Michelson # 
Michelson is the programming language used to write smart contracts on the Tezos blockchain. 

Michelson is a strongly-typed, stack-based language with high level primitives and strict static type checking. The types of Michelson are composable, so complex data can be annotated by one large type. 

Michelson does not contain features such as polymorphism, closures, or named functions. High-level programming languages such as Ligo or SmartPy can be written and compiled to the Michelson programming language. Developers can prove properties in their smart contracts through a formal verification process.  A Michelson program is a series of instructions that are run in sequence: each instruction receives the stack resulting of the previous instruction as an input, and then rewrites it for the next instruction. The stack contains both immediate values and heap allocated structures. All values are immutable and garbage collected. 

A Michelson program receives as input a stack containing a single pair whose first element is an input value and second element the content of a storage space. It must return a stack containing a single pair:



*   The first element is a list of internal operations
*   The second element the new contents of the storage space.

Alternatively, a Michelson program can fail, explicitly using a specific opcode, or because there was an error that wasn’t picked up by the type system (e.g. division by zero, gas exhaustion etc.).

The types of the input, output and storage are fixed and monomorphic, and the program is typechecked before being introduced into the system. No smart contract execution can fail because an instruction has been executed on a stack of unexpected length or contents.

This specification gives the complete instruction set, type system and semantics of the language. It is meant as a precise reference manual, not an easy introduction. Even though, some examples are provided at the end of the document and can be read first or at the same time as the specification.

The Michelson programming language is unlike any other and it is almost like a virtual machine’s operation code. Although it is possible to hand-type Michelson, it is not necessary. Instead, simply write in a high-level programming language (such as Ligo, SmartPy or fi) that compiles into Michelson.
