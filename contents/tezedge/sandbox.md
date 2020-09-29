### **The TezEdge Sandbox: a fully offline Tezos chain simulator that reveals all interactions between the protocol and the storage.**

As blockchain developers, we want to be able to test our smart contracts, apps and protocols in an environment that behaves in the same way as the network where they will be deployed eventually. However, we can’t work directly with the live network as it can have serious consequences. Should an error or bug arise, it can spread to the rest of the blockchain, affect other users and cause considerable financial losses.

For those reasons, developers want to have a safe environment in which they are free to play around without having to worry about threatening the network. In this environment, developers can test their own protocols, smart contracts and apps to verify if everything is in correct working order. They can also activate and set parameters for existing protocols. At the same time, they need to simulate the conditions in which the smart contract or app will operate once it will be deployed on the main network.


### **The Tezos blockchain sandbox**

For this purpose, we’ve created the Tezos sandbox, an offline simulation of the Tezos blockchain, written in Rust. You can now safely develop protocols, smart contracts and apps for Tezos while being in full control of the simulated network.

All of this can be done without a connection to a Tezos network or even the internet. The Tezos sandbox is a fully offline simulation of the Tezos blockchain that can be run locally.


### **The launcher**

_Please note that the launcher is meant to be used only in sandbox mode.The primary reason for the launcher is to easily control the node from a front end environment. Please note that when you launch the sandbox with an active internet connection, adversaries can access the private keys from the wallets created in the sandbox. To make key management more convenient, we’ve created an RPC endpoint through which users can access these keys._

To easily control and launch the sandboxed node, we have created a launcher with 4 endpoints which are essentially RPCs.

Those endpoints are:



1. /start — Launches a TezEdge node with the supplied argument sent through the request’s body.
2. /init_client — Initializes the tezos-client with the accounts to be used in the sandbox network.
3. /activate_protocol — Activates the protocol on the sandbox network.
4. /bake — Bakes a block using the provided accounts in the initialization endpoint.


### **How to launch**



1. First, you need to clone this repo.

```git clone https://github.com/simplestaking/tezedge.git```

2. Then change into the cloned directory

```cd tezedge```

3. Run docker by typing this command:

```docker-compose -f docker-compose.sandbox.yml pull```

```docker-compose -f docker-compose.sandbox.yml up```

4. Open the TezEdge Explorer in your browser

You can view the status of the node in your browser by entering this address into your browser’s URL bar:[ http://localhost:8080](http://localhost:8080/)


#### **Starting the node**

To reach the required state of the node, which is the sandbox mode, we need to launch it with certain arguments and parameters. We tried to map those parameters to the Tezos OCaml node.


![Image](../../static/images/sandbox1.gif "Parameters")
There are many parameters here. You can find their descriptions in the front end. The categories are: Node, Networking, P2P, Database, Interop with Protocol, Sandbox, Logging

Here, two things are happening: we are launching the sandbox itself and setting the parameters of the node._ _In the beginning we do not have any blocks and the storage is empty. We need to add the first block (the genesis block) with an activator key. We use this activator key to sign the next block, which activates the protocol.

**Adding wallets to the chain**

Since we want to ensure that the TezEdge node uses the same endpoints and functionalities as the OCaml node, we use the OCaml tezos-client binary to make calls to our sandboxed TezEdge node. The tezos-client is used to sign the blocks and activate the protocol.



![Image](../../static/images/sandbox2.gif)

We will now add wallet and keys into the chain by using the init_client endpoint.

**Important: **The keys, even the secret key, are sent in plaintext format. Adversaries can access the private keys from the wallets created in the sandbox.

**Please do not use the keypairs used in the sandbox node on a live network**.


#### **Setting the chain parameters**

At this point, the network only uses the genesis protocol. If we want to test various features (including transactions and baking), we need to activate a custom protocol.

Once the parameters are set, they are sent to the back end, where the launcher adds wallets to the set parameters. Now we have all the requirements to inject the first block, which activates the protocol.


![Image](../../static/images/sandbox3.gif)


On this screen, you can see the parameters specific for the Tezos protocol. The categories are: Chain, Blocks, Smart Contract , Baking, Governance. Smart Contract

The node is now running in sandbox mode and the protocol has been activated. Now we can verify whether the activated protocol is working as intended:


#### **Mempool**

We select a wallet, which displays a screen that allows us to create a transaction. We add a recipient address for the transaction. We then set an amount and the transaction fee.

When we click on send, the transaction is injected into the node. We can confirm this by opening up the mempool screen, where we can see the performed operation (this transaction).

![Image](../../static/images/sandbox4.gif)

Above, you can see how we created an operation and how we verified its existence in the mempool.


#### **Baking**

Once the operations have been validated and added into the mempool, they are ready to be baked. After you press the “bake” button, a block is created and included in the chain.

All applied operations are collected from the mempool and a new block is created from them.

![Image](../../static/images/sandbox5.gif)


Here you can see how the block was baked from all applied transactions. After the block has been successfully baked, the mempool clears itself.


#### **Storage**

The user can now go into the storage, where they can see all of the interactions between the protocol and the storage for their transaction on their custom protocol.

This is particularly useful for developers who need to debug their smart contract and protocol interactions with the storage, including all reads and writes, in a chronological order.


![Image](../../static/images/sandbox6.gif)

Here you can select a baked block and see how the protocol interacted with the storage.



