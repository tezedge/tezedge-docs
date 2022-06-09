
---
title: Baker
sidebar: Docs
showTitle: false
---


# The TezEdge Baker — a daemon for creating, signing and injecting endorsements and blocks

The process of validating new blocks is essential to every blockchain. Without it, it would be impossible to process new transactions and thus the blockchain would be unable to continue operating. 

In so-called Proof of Stake (PoS) blockchains, validation is done by users who have a ‘stake’, meaning that they own a certain amount of the blockchain’s tokens. Stakers are periodically chosen by the blockchain’s consensus algorithm to validate new blocks, and their chance of being selected is proportionate to the size of their stake.

The consensus algorithm of Tezos is based on PoS, but it has its own set of unique features, which is why it is known as liquid proof of stake (LPoS). In Tezos, staking is known as baking, and bakers must own a certain amount of ꜩ (currently 6000 ꜩ) to be able to validate new blocks.

Baking involves the use of the baker’s private key, which means that security is of absolute importance. In case there is a serious security vulnerability, an adversary could steal funds from the baker. Furthermore, since the introduction of the Tenderbake algorithm (Ithaca and later protocols), the baker is more complex than before. With increased complexity, there is also an increase in potential vulnerabilities.

For this reason, we wanted to ensure that our implementation of the baker has the highest level of security possible. To achieve that, we wanted to utilize fuzzing. However, the old baker implementation was difficult to fuzz, so we created our own implementation of the Tezos baker. We wrote it in Rust and designed it with fuzzing in mind. Additionally, it also requires less resources (CPU, memory) and it also shares some code with the TezEdge node. 


### A new baker implementation

The Tezos blockchain undergoes periodic updates to its consensus protocol. These updates improve the core features of the blockchain such as network stability, security, block validation and so on. However, with each new protocol, software developed for Tezos such as node shells and bakers must also be updated in order to continue working. For example, you cannot use a baker developed for the Hangzhou protocol on a network with the Ithaca protocol. 

Previous protocols also required an endorser which validates blocks, but since Ithaca was implemented, the baker and endorser are the same entity. This is because Ithaca uses the new consensus algorithm where baking and validating are very tightly related.

Since Ithaca, we have our own baker implementation that is written in Rust and benefits from shared codebase with TezEdge.


### How it works

The TezEdge baker interacts with the TezEdge or Octez node and determines when it has the right to propose or validate blocks. The rights to propose or validate are randomly distributed among the delegates in the network, but it is proportional to their stake - the more tokens a delegate has, the greater the chance of gaining the right to propose and validate blocks, thus earning more rewards. 

The precise moment to propose a block and the header/content of the block (or content of the validation operation) depends on network events and the state of the baker. It must follow a set of sophisticated rules known as the Tenderbake consensus algorithm. Basically, the baker is running on the Tenderbake algorithm.

Please note that the Baker should be kept running at all times to ensure no reward is missed.

Not everyone has 6000 ꜩ, and some of those who do have enough tokens can’t keep their baker running 24/7. In such a case, it is more beneficial to _delegate_ their tokens (transfer their baking rights) to another baker. Then the baker then repays a share of their reward to the delegator, minus a percentage-based fee.

The common problem here is how to automate the repayment of rewards to delegators. We are planning to create a tool to solve it. The baker may want to set up some rules such as the minimal delegation amount or the fee they are charging. They may want to see a summary of who is delegating to them, or how many delegates there are, what is the baking efficiency, how much rewards they’ve earned and the total fee that was charged from delegators, what is the average return on investment. The baker could possibly want to introduce some extra incentives to have more delegators. All these tasks require a tool, and it’s something we’re considering developing in the future.


### Try out the new baker

1. Make sure you satisfy TezEdge prerequisites: [https://github.com/tezedge/tezedge#prerequisites-installation](https://github.com/tezedge/tezedge#prerequisites-installation) \
2. Clone and Build Tezedge source code: 
``` 
git clone --depth 1 https://github.com/tezedge/tezedge

cd tezedge 
export SODIUM_USE_PKG_CONFIG=1

cargo build --release

cd ../ 
```

3. Make sure you satisfy Tezos prerequisites: https://wiki.tezos.com/build/clients/installation-and-setup 
4. Clone and Build mitten. 
``` 
git clone --depth 1 --branch=mitten-ithaca https://gitlab.com/nomadic-labs/tezos
cd tezos

make build-deps && eval $(opam env) && make && make mitten

```

5. Prepare binaries: 
```

mkdir bins 
cp tezos-node bins/tezos-node.octez 
cp tezos-client bins/tezos-client.octez 
cp tezos-accuser-012-Psithaca bins/tezos-accuser-012-Psithaca 
cp tezos-baker-012-Psithaca bins/tezos-baker-012-Psithaca.octez

cp ../tezedge/tezos/sys/lib_tezos/artifacts/* bins/

cp ../tezedge/target/release/{light-node,protocol-runner,baker} bins/

cp ../tezedge/tezos/mitten/* bins/ 
touch bins/tezedge.env 
``` 
 
6. Customize mitten runs. 
Put the following line in tezedge.env to use Tezedge external baker when running the mitten scenario: 
`RUN_TEZEDGE_BAKER=external`

To use the TezEdge node in the test, add: `RUN_TEZEDGE_NODE=1`


7. Choose a mitten scenario located in `src/mitten/scenarios/` and run it with: 
```

dune exec src/mitten/scenarios/no_eqc_stuck.exe --  --verbose 2 --no-emoji --timeout 400 --binaries-dir bins 
```
