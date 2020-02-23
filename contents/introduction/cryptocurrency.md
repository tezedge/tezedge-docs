---
title: Cryptocurrency
sidebar: Docs
showTitle: false
---
# Cryptocurrency

**Why do we use cryptocurrencies?**

### Convenience 

Cryptocurrencies can be transferred across borders and are accepted worldwide. They are highly divisible, do not deteriorate and can be transferred at speeds comparable or better than conventional banking transactions.

### Programmability 

You can program your cryptocurrency to perform certain actions without having access an application programming interface (API). So-called smart contracts can be programmed as executable contracts that transfer money when a certain condition or value is reached.

### Predictability 

Unlike fiat currencies which are contingent to the will of central banks and governments, cryptocurrencies are issued in strict accordance to a set of rules (the protocol) that are transparent and clearly stated from the get-go. 

### Privacy 

Cryptocurrencies offer unparalleled privacy, but with one small caveat: most of them are *pseudonymous* and it is unfeasible to identify the individuals behind the transaction, although it’s not completely impossible. Privacy is important in personal finance as it protects consumers from authoritarian governments, but also from intrusive companies, criminals and other adversaries.

### Protection against debasement

Debasement occurs when the intrinsic value of a currency is intentionally lowered by its issuing body, most often in connection with commodity money or metal coins. Governments and states debase currencies in order to gain financially at the expense of citizens. Cryptocurrencies cannot be debased because they are issued according to their protocol, which cannot be changed without a majority decision (a consensus).

### Resistance to censorship 

Governments have ultimate control over the bank accounts of their citizens. Dissidents, political activists and other perceived enemies of the state may have their accounts frozen, or worse, have their funds confiscated by the state. Less extreme but more common cases include states limiting what you can and cannot pay for. 

For instance, in China, most everyday payments are made through mobile platforms (WeChat, AliPay) that are under surveillance by the Chinese government. The government tracks what people buy and can even prevent Chinese citizens from buying certain services and items. Some Chinese residents want to buy virtual private network (VPN) accounts to bypass the country’s internet firewall. The Chinese government does not allow such purchases through the country’s mobile payment system. Luckily for the Chinese netizens, most VPNs allow for payments via cryptocurrencies.

# The design of cryptocurrencies

### The digital signature

The first building block of a cryptocurrency is the **digital signature**. Digital signatures are a type of cryptographic process that was introduced in 1977 and it provides three key properties:

### 1) Authentication

*A signature on a message that consists of a string of bits. It identifies the user as the sender of the message.* 

### 2) Integrity

*It means the message was not modified. I am the only person who could have signed the message and the content has not been changed since.*

### 3) Non-repudiation

*This means it is impossible for me to provide a signature and then claim at a later point that I didn't actually sign it.*


Digital signatures represent a revolutionary concept. The idea is that we can authorize transactions without needing to reveal our identity. You can sign off on a message and protect your privacy at the same time.

### The double spend problem

If electronic money is represented by data, what prevents counterfeiters from copying the data and creating duplicate electronic money? If transactions take some time to process, how can we stop fraudsters from spending more money than they actually have by sending out two transactions at the same time? 

_For instance, Alice has 1 ꜩ (Tezos coin). She has agreed to sell it for 10 \$ to Bob. However, she has also arranged a similar deal with Mallory, although Alice knows that she doesn’t have enough ꜩ to pay both. Since there’s a significant latency between her sending the transaction and Bob or Mallory receiving it, theoretically she could send out both transactions at the same time. Without a centralized 3rd party that would check the state of her account during each transaction, she might be able to receive the 10 \$ from Mallory as well as 10 \$ from Bob, even though just one of them (the first to claim it) will receive Alice’s 1 ꜩ._

The problem lies within the realm of mathematics and equational reasoning. In this realm, there's no scarcity. I have a value X I can have as many value X's as I want since it is just digital information that can be duplicated infinitely. However, money must have scarcity, because if everyone can print their own money, it won’t be able to hold value. Therefore it is difficult to apply equational reasoning to this problem. 

# Solutions

Since we cannot use a centralized 3rd to check the account balance of every sender, we have to develop several other solutions that will work in a decentralized network. 

### Time stamping

One solution is **time stamping**: Alice signs a transaction to Bob and then she sends it to be time stamped. The time stamp is trusted and it allows you to view who signed the transaction as well as the time when it was signed. If we have the same time stamping service, we'll have a way of knowing which transaction was first signed by Alice, but the problem is Bob still doesn't know the time stamp of the previous signatures.

Perhaps you get a transaction and think *“okay, this transaction is dated recently, how do I know that there isn’t another transaction that has been signed previously from the same person?”*. The solution to that problem is **publication**.

### Publication

Publication means that you record and publish transactions. Essentially, publication is a way of knowing whether there are enough funds to make a transaction. All transactions are published chronologically, from oldest to newest, on a list. This allows other users to view the transactions and figure out whether someone has enough funds to make a transaction.

Publication is the reason why it is difficult to achieve privacy in such systems. Some degree of privacy must be sacrificed in order to create a chronological list of transactions. Only then can you reject invalid transactions, allowing the system to work.

But how do we actually create this list?

One way you could do it is to create a centralized list of transactions, so you'll have a single company that represents the currency and runs the server on which the list is hosted. 

The issue here is that you need to have a lot of trust in company that maintains the list. The centralized list is not only a single point of failure, but the people running it could also act maliciously. This means that the company could reorder, delete or refuse transactions, they could get hacked or go out of business, all of which undermine the integrity of the currency. 

### Distributed consensus

You could use **distributed consensus** and create many individual lists—multiple different actors who together maintain a coherent ledger of transactions. However, that requires some tricky algorithms in order to achieve consensus for a mutually-agreed upon version of the ledger. This is not a trivial task, yet there are decentralized solutions in which we're not relying on one list or even a finite set of lists, but where virtually anyone can participate in the maintenance of the ledger. 

### Hashing 

Before we explain proof of work, let’s first talk about hashing. In cryptography, hashing means putting data through a cryptographic hash function. A cryptographic hash function is fed with a variable-length input and processes it into a fixed-length output. If the hash function has strong cryptographic properties, then you can't reverse the function and figure out the input data if you only have the output. Strong cryptography based on hashing is the cornerstone of the proof of work algorithm that many cryptocurrencies use.

