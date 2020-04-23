---
title: Endpoints (RPC)
sidebar: Docs
showTitle: false
---

# Endpoints (RPC)

Whenever you are developing any kind of software, you need to ensure it can communicate with the outside world. One way of accessing and receiving data is through remote procedure calls (RPCs).

The RPC is a basic json endpoint that a user calls to receive data. Imagine it as a communication channel that allows you to contact a remote service to send or request data.

Our primary goal in the design of a new Tezos node is to achieve the highest degree of security. That being said, we have to consider the fact that some modules have to operate at a fast speed in order to provide good service for our users.

During the development of the RPC module, we had to consider the node’s architecture which is based on the actor model. The actor model is a conceptual design that can be used to increase the security and resilience of a system. Each module in the node is separated from the others. In case of an error, the problem is limited to the faulty module. We can restart the faulty module and recover using the most recent valid state. Therefore the error does not spread to other modules in the node.

Initially, we wanted to implement the actor model for RPCs as well. The RPC server would be another actor and when we requested data it did so by communicating with the other actors (network actor, storage actor and so on).

# Fine-tuning for latency and throughput

We ran performance tests that involved a large number of requests at a time. The primary purpose of these tests was to optimize for latency, and the secondary goal was to increase throughput.

We found out that actor model model was not ideal for RPC communication because while it does provide excellent error resiliency, the service on the side of the end-user is not as fast as we wanted it to be.

This is because communication between actors adds a marginal amount of latency. When this marginal amount is multiplied by increasing the number of requests per minute, the latency stacks up and creates considerable lag.

For this reason, we decided to not use the actor model in the RPC (although we still use it for the other modules). Instead, we began to read directly from the embedded database. Essentially, we cut out the middleman, thus reducing latency.

# The technology involved # 


*   We are using the **Tokio**, an open source Rust library that is an implementation of the async runtime. 
*   On top of Tokio we are using **Hyper**, a library that processes http requests and responses.

If you are building your own node and want to figure out if it is performing well, we advise you to run a performance test that involves the maximum amount of outgoing connections. In other words, not one but 30 or more requests at a time, also measuring how many are being sent out per minute. If there is a small latency with one request, this latency will stack up with multiple requests and slow down the entire system significantly. 

The RPC data is stored in the database in a way that allows for it to be quickly retrieved. Our storage has been designed for the quickest possible _select_ function. 

There is still work to be done, especially concerning the database’s key value store.

There are two methods that can be implemented:



1. Every piece of data is always tied locally onto its key. Therefore Key A will retrieve Data A, Key B will retrieve Data B and so on. This option is faster than the next option but if you need to have multiple indexes all your data has to be duplicated multiple times.
2. Keys only contain references to data. Data itself is stored in a commit log storage. This helps to save a lot of space, because data is not duplicated, but retrieval of data is a little bit slower because after finding a correct location by querying the key-value store you have to retrieve your data from the commit log store.

We chose the second method because data stored in blockchain can take a considerable amount of space and duplicating it multiple times would take too much space. For most RPC requests the latency introduced by retrieving the data from commit log is very small and can even be improved by loading data in bulks. This helped us to achieve very low latencies and to support huge workloads.

Although we did not utilize the actor model in the RPC module, it is used in other parts of the node and remains to be an integral part of our software architecture. We are preparing an article in which we will describe the actor model and its usefulness in concurrent programming. In the meantime, you can read more about Tezos and the TezEdge node by subscribing to our Medium, giving us a follow on Twitter or visiting our GitHub.
