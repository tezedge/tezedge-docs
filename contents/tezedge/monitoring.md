---
title: Monitoring
sidebar: Docs
showTitle: false
---

# Baking monitoring

Blockchains are formed by the continuous incrementation of a chain of blocks. These blocks contain various types of operations (such as transactions, delegations and accusations). Nodes must first validate new operations in their _mempool_ before they can be added to blocks that are then added to the _head_ of the chain. 

How the mempool validates blocks is a relatively complex process encompassing many different actions. You may have read our past articles ([1](https://medium.com/tezedge/the-tezedge-node-a-deep-dive-into-the-mempool-part-1-1a01e3b9de9a), [2](https://medium.com/tezedge/the-tezedge-node-a-deep-dive-into-the-mempool-part-2-fc7c579d0033)) on the mempool. For a person running a Tezos node such as a blockchain developer or a baker, it is very useful to see what is happening inside the TezEdge node’s mempool, as well as view how long the various actions and possibly identify at which point of the validation process do problems occur.

**View and monitor processes in the mempool**

For this purpose, we’ve expanded the TezEdge Explorer to include a mempool viewer. You can now view the details of `block application`, `baking`, `endorsements`, `pending` and `statistics`. This can be done either within the same terminal in which you are running the TezEdge Node, or via our own [browser-based front end](http://prechecker.mempool.tezedge.com/#/mempool/block-application).

**How we did it**

The new mempool implementation that TezEdge uses records each step related to baking and processing new blocks, such as messages sending/receiving, operation decoding, pre-checking and pre-applying, block application and so on, and stores them along with their timestamps and other required data. UI application queries dedicated RPCs, which handlers collect stored data and provide it back in JSON format.


### Launching the command line (terminal) version

BAKER PERSPECTIVE (with –baker-address arg.)


![Image](../../static/images/baking1.png)


When you start the terminal UI, the first screen you will see is the ``endorsements`` screen. The top bar contains all the crucial information about the node you are connected to. 

Starting with the topmost row, from left to right: 

The ``Block`` hash of the current head in the node

The ``Local Level`` of the node, in other words the level of the current head in the node.

The ``Remote Level`` represents the best known level of the connected peers, this is the point we want to be sync up to.

The ``Protocol`` of the current head was baked with. 

In the same row, on the far right end, the time until your ``Next baking`` and ``Endorsement`` is displayed.

Below the topmost row, on the left side, there is a summary that displays all of the endorsement slots currently inside of the mempool and their respective statuses:

``Missing``

``Broadcast``

``Applied`` 

``Prechecked`` 

``Decoded`` 

``Received`` 

In the screenshot, there are 56 slots that are missing and 200 slots that are prechecked. The other statuses display 0. When we add up all of these values together (in this case, 200 + 56), we get 256, which is the number of endorsement slots for a block.

Moving below this row, on the left we see a large table. 

Each row corresponds to one endorsement operation from the baker, as the baker sends only one endorsement operation for all of their slots. All the statistics are from the baker node’s perspective. 

This table contains:

the number of `SLOTS` each baker has for the endorsement operation they produced. 

The address of the `BAKER` that has the rights to endorse the current block

The `STATUS` - This is the current status of the baker endorsing the block. Until we see an endorsement from that baker, the status is MISSING. When we receive a block, it changes to RECEIVED, and then DECODED and PRECHECKED as it is processed by the node. These endorsement operations will be included in the next baked block. 

The `DELTA` column shows how long it took for the operation to be processed by the baker’s node and broadcast back to the network. 

The `RECEIVE HASH` column shows how long the operation took to reach our baker’s node since the node has a notion of a new block and this expects the block to be endorsed. 

`RECEIVE CONTENT` shows the delay between receiving the hash and the whole operation data. The node first receives the operation hash in the message `CurrentHead` from the peer. Then it has to request the content of the operation. 

`DECODE` describes the time it took to deserialize all the data required to process the operation. 

`PRECHECK` and `APPLY` columns are mutually exclusive. If the node is running with endorsement prechecking enabled the precheck column will be filled otherwise the apply column will be filled. Both these columns show the time it took to precheck or apply (basically verify the operation). from the time the data was properly decoded.

Lastly, there is the `BROADCAST` column that shows the time it took the node to send out the operation after a successful verification (precheck/apply). 

If we are running the TUI with a specified baker address, there is a panel right on the right of the main table. This panel contains the data for the baker’s most recent endorsement operation injected into the node and when their next endorsing operation is expected. It contains a list of consecutive operations that happened inside the node and provides an insight into the current state of endorsing.



1. **Block received -** the time delay between when the block was baked and the time we first see this block. 
2. **Block application** - the time it took to apply the block (before you endorse, you first have to apply the block)
3. **Endorsement Operation Injected** - The time it took to inject the operation into the node after the endorsed block has been applied
4. **Endorsement Operation Validated** - The time it took to validate the endorsement operation by the protocol
5. **Endorsement Hash Sent** - The time it took to send the hash of the operation to the network after validation.
6. **Endorsement Operation Requested** - The first time the node received a ``GetOperation`` message for the endorsement operation that the baker injected. 
7. **Endorsement Operation Sent** - The time delay it took to send the operation content after receiving the request

With all the values present, the baker can be assured that the operation was verified by their node and it was successfully broadcast to the network. With one or more values missing, the baker can pinpoint exactly what went wrong in the lifecycle of the endorsement operation. 



![Image](../../static/images/baking2.png)


Pressing F2 will take you to the baking screen, which displays statistics captured by the TezEdge node that are relevant for baking blocks. The top panel is identical to the endorsement screen.

We can divide the screen into 2 sections. On the left, we see a table containing various statistics about all the connected peers and their ability to send/receive blocks from the network utilizing  the peer messages. 

`ADDRESS` and `NODE ID` columns identify the peers network address and its node id respectively. 

These are followed by 4 columns of time statistics.



1. `HEADER RECEIVED` - The meaning of this column changes based on whether the block was received from the network or it was baked by the baker’s node and injected. 

    When we receive a block from the **network**, this value represents the delay since we first saw this block. This means that one of the rows will contain a 0 value. This means that the node first saw this block when this peer sent it to the node.  \
 \
When the baker **injects** a block this value represents the delay between baking the block and receiving the block back from the peers.

2. `HEADER SENT` - The time delay between the application of the block and it being sent to the network. 
3. `OP REQUESTED` - The time between sending the block to the network and the time we receive a request for the content of the block. 
4. `OP SENT` - The time between the received request for block contents and the time the node responds to the peer with the block’s content

The left panel contains live updates from the node. The top panel contains the last baked block’s statistics as well as information about the next time the baker has the rights to bake a block. 

The panel only takes into consideration the highest priority right (priority 0). The panel contains a list of consecutive operations inside the node with the duration of the respective operation:



1. `Injected` -  The time it took to inject the block according to the minimum block delay in the network. Each level has its precise minimum time it can be included in the chain according to priorities and endorsing power.
2. `Load data` - The time it took to fetch the data from the database for block application
3. `Protocol Apply Block` - The duration of the whole block application, including the time it spent inside the protocol.
  &nbsp;&nbsp;&nbsp;  a) `Apply` - The application duration inside the protocol
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; i. `Begin application` - The duration of the `begin_application` function inside the protocol
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ii. `Decoding operations` - The time it took to decode the operations inside the protocol
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iii. `Encoding operations metadata` - The time it took to encode the metadata of the operations 
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; iv. `Collecting new rolls` - The time it took to collect the new rolls on a cycle change. This value will be 0 most of the time.
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;      v. `Commit` - The time it took to commit the new block into the context
4. `Store application result` - The time it took to store the application result in the database we received from the protocol.
5. `Block Header Sent` - The time it took to send the baked block’s header to the network
6. `Block Header Received Back` - The time it took to receive the baked block’s header back from the first peer
7. `Block Operations Requested` - The time it took to receive the first request for the block’s content since we received the headers back.
8. `Block Operations Sent` - The time it took to send the block’s content to the peer that first requested the block’s content. 

When all the values are present, the baker can be ensured that everything was done right on their part, the block was properly broadcast to the network and the node was able to correctly respond to the request for the block’s content. 

The panel titled `APPLICATION PROGRESS` displays statistics about the latest applied block. This panel updates every time a new block is applied and it displays the various statistics for the application process from downloading all the data to sending the block into the network. 



1. `Download` - The time needed to download and store all the data for the block contents
    1. `Block header` - The time it took to download the header
    2. `Block Operations` - The time it took to download the block’s content (operations)

    **(The next steps are identical to the panel above)**


Note that the download times are always 0 for the baked block, as the baker was the one that created the block, so no download is required

At the bottom of the terminal we can see the shortcuts that control which screen is displayed, and also the F10 quit button.

User guide for the TUI can be found here:

[https://github.com/tezedge/tezedge-tui#tezedge-terminal-user-interface](https://github.com/tezedge/tezedge-tui#tezedge-terminal-user-interface)
