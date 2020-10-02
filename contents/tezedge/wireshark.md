---
title: Wireshark
sidebar: Docs
showTitle: false
---


### **Using Wireshark to intercept, analyze and display network data in Tezos**

For a developer who is working directly with a Tezos node, it is very useful to be able to view the traffic of data that moves through the network. Among developers, **Wireshark** is one of the most popular tools for the analysis of network traffic.

Wireshark is a utility that intercepts packets (messages) that arrive via the network, using dissectors to deconstruct what is within them and displaying them in its user interface (UI).

Wireshark has three basic functions:



1. Intercepting packets moving across the network
2. Using dissectors to analyze the intercepted packets
3. Displaying the data in its UI

By default, Wireshark is capable of analyzing a large variety of network traffic. However, in order to analyze additional types of traffic, Wireshark uses custom-made **dissector** plugins.


#### **Tezos dissector**

As we wanted to expand Wireshark’s functionalities for the Tezos protocol, we had to develop a new dissector.

A dissector is a module used to analyze a particular protocol. Each dissector decodes its part of the protocol and then hands off decoding to subsequent dissectors for an encapsulated protocol. Most dissectors are built into Wireshark (such as TCP and IP).

Additional dissectors can be added externally, as was the case with the Tezos dissector plugin. We have created the[ wireshark-epan-adapter](https://github.com/simplestaking/tezos-dissector/tree/master/wireshark-epan-adapter), a small abstraction layer that wraps the unsafe C-like API for plugins in a safe Rust API. This library connects Wireshark with the tezos-dissector and enables us to write a dissector in Rust. The tezos-dissector is compiled as a dynamic library. Wireshark loads this library when it is launched.


#### **Architecture overview**

As a Tezos network is cryptographically secured, we had to design a mechanism with which the Tezos dissector could analyze the encrypted communication.

Since we’re attempting to read messages sent across an encrypted network, we must find a way to decrypt this communication. This is done by intercepting the initial ‘handshake’ message that nodes sent each other when initiating communication. The handshake message contains a nonce, which is a random incrementing number, and a pair of keys (private and public). You can read more about this process in our past article about[ the Tezos P2P layer.](https://medium.com/simplestaking/tezos-rust-node-a-deep-dive-into-the-tezos-p2p-layer-98e3b3e3b704)

Due to the nature of this mechanism, it is crucial to **run Wireshark before launching the Tezos node.** Otherwise, the handshake message cannot be intercepted, making it impossible to decrypt the communication.

The Tezos dissector operates by extracting the nonce and the public key from the intercepted handshake message and then using them to decrypt subsequent messages.

Once decrypted, they are stored in memory. When a user clicks on a particular packet (row in the UI), the corresponding message is deserialized and then displayed in the Wireshark UI.

Here we will describe the processes happening inside the dissector:


#### **Decrypting communication**

1.[ The dissector receives TCP packet from Wireshark](https://github.com/simplestaking/tezos-dissector/blob/f1649f366961418a9142767b029fc5f0444a2b9c/wireshark-epan-adapter/src/plugin.rs#L399)

2.[ The dissector creates ‘conversations’ between two communicating nodes and assigns the packets into the appropriate conversations](https://github.com/simplestaking/tezos-dissector/blob/f1649f366961418a9142767b029fc5f0444a2b9c/src/dissector.rs#L123)

3.[ Arrange packets into a complete chunk. When the chunk is complete, we begin decrypting and storing it into memory](https://github.com/simplestaking/tezos-dissector/blob/f1649f366961418a9142767b029fc5f0444a2b9c/src/conversation/overall_buffer.rs#L144)


#### **Deserializing and presenting the data**

4. [Once the user clicks on a row, the dissector prepares to display the conversation id and (node) addresses in the Wireshark UI](https://github.com/simplestaking/tezos-dissector/blob/f1649f366961418a9142767b029fc5f0444a2b9c/src/conversation/overall_buffer.rs#L233)

5. [Now we need to find the corresponding chunk and the corresponding message to the packet](https://github.com/simplestaking/tezos-dissector/blob/f1649f366961418a9142767b029fc5f0444a2b9c/src/conversation/overall_buffer.rs#L308)

6. [If packets contain multiple messages, we display all of the messages](https://github.com/simplestaking/tezos-dissector/blob/f1649f366961418a9142767b029fc5f0444a2b9c/src/conversation/overall_buffer.rs#L338)

7. [Now we need to deserialize and create a tree structure in order to display the data in that tree.](https://github.com/simplestaking/tezos-dissector/blob/f1649f366961418a9142767b029fc5f0444a2b9c/src/value/message.rs#L286)


### **How to run dissector**

For instruction on how to build and install, see the[ Tezos dissector readme file](https://github.com/simplestaking/tezos-dissector#prerequisites) on our Github.

To launch Wireshark, please enter the correct path to the identity.json file.

```wireshark -o tezos.identity_json_file:~/.tezos-node/identity.json```

*   The dissector cannot decrypt communication without the appropriate identity.json file. By default, the identity.json can be found in this home directory: ~/.tezos-node/identity.json
*   If Wireshark is launched after the node is already running, then it cannot intercept the handshake message, without which it cannot decrypt communication. Therefore it is crucial that you launch Wireshark before you launch the node.
*   Do not restart the node during the capturing session. If you restart the node, Wireshark will no longer have the handshake message, which will prevent it from decrypting communication. If you need to restart node, stop the node -> restart the capturing session -> start the node.

You will know that the dissector has loaded correctly if you enter “tezos” into the displayed filter and the autocomplete will show all of the Tezos filter types.


![Image](../../static/images/wireshark1.gif)


If the identity has been loaded correctly, then Wireshark will be able to decrypt communication and all of the messages can be now displayed.


![Image](../../static/images/wireshark2.gif)




