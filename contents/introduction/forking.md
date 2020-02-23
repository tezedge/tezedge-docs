---
title: Forking
sidebar: Docs
showTitle: false
---

# Forking

As we discussed in our chapter about mining, two blocks may be created at the same height, prompting the nodes to choose one of the blocks and recognize it as part of the longest Merkle tree of transactions. However, what if there is a disagreement between the nodes on which block they select? What if half of the nodes want to continue building blocks onto one block while the other half want to continue with the other block? In that case, we experience a **fork.**

If you are a software developer, you might have heard of forking. A fork is a divergence in the codebase that creates another version that is based on a copy separate from the original. We say a project has forked when the source code of a software gets copied and a group of developers begin working with their own copy, creating a schism in the development of a software project.  

When we fork, we create another branch that we are (usually) free to edit as we see fit. Those familiar with GitHub know that forks are essential to the development of open source projects, as people can fork open repositories and safely test out new features in their own copies.

Forks regularly occur in the world of blockchain as blockchain projects are constantly in development and disagreements regarding updates or structural changes often lead to forks.

When discussing blockchain, we identify two types of forks that permanently change the protocol layer of the blockchain - **soft forks** and **hard forks**.

# Soft forks

A soft fork is a change in the blockchain’s code that is backwards compatible and does not break protocol consensus.

With a soft fork, you can upgrade a blockchain while allowing for a reversal in case the changes don’t work out well. In other words, a soft fork is an upgrade that is compatible with previous versions of the blockchain. 

Soft forks do not require all nodes on the network to upgrade to maintain consensus, because all blocks on the soft-forked blockchain follow the old set of consensus rules as well as the new ones. 

However, blocks produced by nodes in accordance to the old consensus rules will violate the new set of consensus rules, and as a result, will likely be rejected by the upgraded miners who constitute a majority in a soft-forked blockchain. This is because for a soft fork to work, a majority of miners need to recognize and enforce the new set of consensus rules. If this majority is reached, then the older network will fall into disuse since users will identify the the newer blockchain as the longest chain, thus establishing it as the valid blockchain.

In a soft fork, only one chain will remain valid if users decide to update. 

An example of a soft fork would be a new rule that reduces the block size from 2MB to 1MB. Old nodes that do not update will continue to see incoming transactions as valid, as these nodes follow the old set of consensus rules (limiting block size to under 2MB). 

However, if these non-updated nodes attempt to mine (create) new blocks, these blocks will be rejected as they do not conform to the new set of consensus rules (block size of 1MB or less). Thus, the blockchain with 2MB sized blocks will likely be orphaned (abandoned) as miners enforce the new consensus rule of 1MB.

# Hard forks

A hard fork is a radical change to the blockchain’s protocol that presents a permanent divergence from the previous version of the blockchain. It makes previously invalid blocks/transactions valid (or vice-versa). In order to accomplish this, the entire old network must surrender to the new network. The network is updated with a new set of consensus rules These rules are not compatible with the previous version of the blockchain, forcing all miners to upgrade. 

 

In other words, a hard fork is like a software upgrade that is incompatible with previous versions of the software. All users are required to upgrade to the latest version of the software in order to continue mining new blocks. 

Under a hard fork, blocks that are mined by nodes that haven’t updated to the new version of the protocol software will be deemed as invalid by the updated nodes. In order for their blocks to be valid on the forked network, the nodes must update. 

If all users decide to update and follow the new protocol rules, the old chain of nodes is discontinued and considered to be ‘orphaned’ (abandoned). However, if there is sufficient interest in continuing the operation of the old chain, then a hard fork leads to the creation of two blockchains that can exist simultaneously.

While both types of forks create divergences in a blockchain, a hard fork can lead to two operational blockchains while a soft fork is intended to result in one. 

Hard forks are further sub-categorized based on whether there is a general consensus on their implementation. As such, they can be either non-contentious or contentious:

**Non-contentious hard forks** 

When the blockchain’s developers suggest an upgrade to the protocol that the majority of the community agrees with, we have a planned hard fork. Planned hard forks usually have a high degree of social consensus, meaning that there is no significant opposition to the planned changes. Such hard forks usually involve changes that are universally considered to be beneficial, such as improving security or increasing utility value.

An example of a non-contentious hard forks is Ethereum’s Byzantium hard fork in October 2017, which was implemented to speed up transactions, improve blockchain security and make its smart contracts suitable for use in business.

**Contentious hard forks** 

A contentious hard fork happens when there is a disagreement between two or more parties within a blockchain’s community. Various stakeholders (investors, developers, miners, users etc.) may have different views on a proposed update. One party may believe that the proposed update will create a superior blockchain while the other thinks that the update is either unnecessary or harmful. Contentious hard forks happen only when there is a significant discourse between these two sides. If there is little opposition to a hard fork update, it usually dissipates as the opponents realize their blockchain would not capture enough value to make it worthwhile.

Arguably the most famous contentious hard fork was the creation of Bitcoin Cash (BCH). BCH hard forked from the Bitcoin blockchain because a significant number of stakeholders believed that increasing Bitcoin’s block size from 1MB to 8MB would speed up transaction processing.

A very simplistic explanation of the difference between soft forks and hard forks is that you either **create additional** consensus rules (soft fork) or **change/reduce** existing ones (hard fork):

*If you fork by creating additional consensus rules, the old nodes (based on the less restrictive rules) will not detect a change in the newly created blocks, leading to a soft fork.*

*If you fork by reducing consensus rules, the old nodes will not approve the blocks created under the reduced consensus rules, resulting in a hard fork.*

# Fork based governance 


*   Open source projects typically rely on fork governance 
*   Forks create two versions and then the users choose which version has value

Fork based governance is the most common method of governance for most blockchains outside of Tezos. Traditionally in the open source world, when you have a project and you have a different view as to how the project should develop, you usually fork. From one version of the code you create two versions of the code with two different teams of developers heading in two different directions. 

A hard fork is a change to the blockchain’s protocol that makes previously invalid blocks/transactions valid, and therefore requires all users to upgrade.

Forks happen because people have different ideas on where they want to take the project. As a user, I can choose whether I go with one version or the other, and then a few months later if I decide that I made a mistake and the others were right, I can switch to the other version. This way everyone gets what they want and there's no scarcity of options. 

However, if you try to do that with cryptocurrencies it gets a little trickier. How does a fork work in your cryptocurrency? 

Let's say I had a single Tezos coin and now there's two different versions of the code base. I'm going to end up having a Tezos coin in each of these versions. If there's two versions of the code, then I'm going to have a Tezos version A and Tezos version B. 

At first that's great because I have a choice, but do I get to keep both? Do I actually sell one of them to get the other one? Because if I have to do it, it's inconvenient. We always want to maximize our optionality. I want to have the one that people are going to use, so I have to make a decision and then later on if I made the wrong choice, then perhaps one of them drops in value and I lose some money in the process.

When a blockchain project forks, the value held on the blockchain will inevitably fork as well, at least partially. One of the fork versions is going to capture that value and the question is, which one will it be? That's the central issue of forks in governance.

**Which fork wins?** 

Once you have a fork you have two branches, which one is going to win? One popular theory in proof of work blockchains was that it was going to be the one with the most hashing power. The miners solve these cryptographic puzzles and they're going to choose the branch that they care about and that branch will win.

The question is, which branch do the miners choose to put their hashing power behind? Usually, it’s the one that users adopt, so if everyone prefers one branch, then the miners would be crazy to spend a lot of resources on a different branch. You're going to want to go on the one that users want, therefore perhaps the users are in charge of selecting which branch captures value.

There is this assumption that we don’t even need any model of governance because we can just select the best technological solution available and go with it. However, no one likes to be told which branch to choose, even if the choice is correct.

It can be argued that because of the financial aspect of forking, the branch that wins is the one that is expected to win. Like a self-fulfilling prophecy, this is a form of circular logic based on a widespread phenomenon known as _social proof_: individuals will choose the branch that they think everyone else is choosing, and that branch will retain value. They won’t necessarily value the best branch, but rather they will value the branch they think will win, and it doesn't really matter if the technology is better than the other branch. What really matters is that people are going to adopt it. In fact, everyone could be saying the same thing: _“this version is worse than the other, but I'm going to select it because it's likely going to be the winning choice and I don’t want to lose money by going with the losing branch”_ 

**Selecting the one chain**


Since competition is good for business, forks should be considered a good thing. The best chain will win as long as conditions are fair. Or we could have many different chains, each catering to their audience—a blockchain for everyone. 

Why does selecting the one chain matter? Why should we all get along and agree to one chain? To fork or not to fork? Why not have many versions and everyone who disagrees gets their own Fork? After all, competition is good, may the best one win and we'll get a blockchain for everyone, right?

The problem is that **economics favor one chain**. Forking will cause costly destruction and stagnation before we reach a state where we have one chain. It’s costly, but it’s also necessary. It's more economical to have one token on one chain. In order to reach that state, you will have costly **destruction** at first, where you'll have a lot of potential forking and if some fork takes over another fork then there will be a loss of value. The other problem is **exponential stagnation**: at some point you get to the point where you can't really credibly fork. If you fork off the main branch that everyone else is tied to, then your fork has a very low chance of succeeding, and therefore you have a very low chance of actually being able to innovate. 

It's very similar to the game of 'chicken', where you have two cars facing each other down the highway, speeding towards each other in the same lane, neither of which is looking to dodge the oncoming vehicle, instead relying on the other driver to swerve. 

*You have the same dynamic with forks in cryptocurrencies.* No one really wants to fork, everyone just wants to steer the direction of the main branch by saying: if you don't steer away, then I'm going to fork and we will divide the blockchain, it will be bad for both of us and you may even lose value. As you can surely figure out, this is not a good model of governance. 

**The Schelling point**

One way of describing the branch that wins is the one that becomes a Schelling point. This is also known as the focal point and it is a concept from Thomas Schelling. It is a solution that people tend to choose by default in the absence of communication. 

The general idea is that it's not the algorithm that controls the decentralized ledger, it's not the miners, it's not necessarily the developers or stakeholders. It's **the social consensus.** It's basically _what everyone agrees is the ledger._ 

To give you an idea of a Schelling point you need to meet someone in Paris, you are there for a day _but_ you didn't set a time and place. 

_So when and where do you meet?_ 

The most common answer is that you meet under the Eiffel Tower at noon (12:00 PM). That's where you meet if you couldn’t agree to a specific time and place. It's the obvious choice because the Eiffel Tower is a tall landmark located in the center of Paris and it is relatively easy to locate, it's what most people would come up with. The central train station is also an acceptable answer. 

Without much coordination, you can agree on what's the most obvious choice—the Schelling point. This is what dictates the result of forks in cryptocurrencies.

