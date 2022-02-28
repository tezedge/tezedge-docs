---
title: Baking
sidebar: Docs
showTitle: false
---

# Baking

In the Tezos network, **Baking** is the process of creating, or _baking_ the next block for the blockchain.

After a baker bakes a block, other stakeholders in the network validate, or _endorse_ it. Submitting an endorsement operation to the blockchain is known as **Endorsing**.

Currently, the TezEdge node supports baking using the Octez baker executable called `tezos-baker`.

## Importing Delegate Address

In order to bake/endorse blocks, you need to have a Tezos account that is eligible for baking. To make Tezos programs, like `tezos-baker` and `tezos-endorser` aware of it, you need to import it using the following command:

```
$ tezos-client \
  --endpoint "http://localhost:18732" \
  --base-dir "$HOME/data-mainnet/client" \
   import secret key <delegate_alias> <delegate_secret_key>
```

## Launching the Tezos Baker.

Before you can launch the Tezos baker, you need to have the TezEdge node running and providing an RPC functionality, see the [Quick Start](../get-started/quick-start) guide for more information.

Assuming that the TezEdge node uses port 18732 for RPC, and directory `/tmp/tezos-data` as its context storage, use the following command to launch the `tezos-baker`:

```
$ tezos-baker-011-PtHangz2 \
  --endpoint "http://localhost:18732" \
  run with local node "/tmp/tezos-date" <delegate_alias>
```

## Launching Tezos Endorser

Before you can launch the Tezos baker, you need to have Tezedge node running and providing an RPC functionality, see [Quick Start](../get-started/quick-start) guide for more information.


Assuming that the TezEdge node uses port 18732 for RPC, use the following command to launch `tezos-baker`:

```
$ tezos-endorser-011-PtHangz2 \
  --endpoint "http://localhost:18732" \
  run <delegate_alias>
```

## Using Ledger Stored Tezos Address

Hardware wallets/ledgers add safety to your crypto accounts as such accounts cannot be copied or digitally stolen from, and in some cases, are inaccessible from outside of the wallet. Tezos baking/endorsing binaries support the Ledger Nano S wallet.

For more details on using Ledger Nano S, see https://ledger.com/start. For more information on Tezos binaries support for it, see http://tezos.gitlab.io/user/key-management.html#ledger-support.

To bake/endorse using an account stored on your Ledger Nano S, you need to install the Tezos Baking application on it. For more details, see https://github.com/obsidiansystems/ledger-app-tezos.

To list connected Ledgers that are available for Tezos binaries, execute this command:

```
$ tezos-client \
  --endpoint "http://localhost:18732" \
   list connected ledgers

## Ledger `major-squirrel-thick-hedgehog`
Found a Tezos Wallet 2.1.0 (git-description: "091e74e9") application running
on Ledger Nano S at
[IOService:/AppleACPIPlatformExpert/PCI0@0/AppleACPIPCI/XHC1@14/XHC1@14000000/HS03@14300000/Nano
S@14300000/Nano S@0/IOUSBHostHIDDevice@14300000,0].

To use keys at BIP32 path m/44'/1729'/0'/0' (default Tezos key path), use one
of:

tezos-client import secret key ledger_username "ledger://major-squirrel-thick-hedgehog/bip25519/0h/0h"
tezos-client import secret key ledger_username "ledger://major-squirrel-thick-hedgehog/ed25519/0h/0h"
tezos-client import secret key ledger_username "ledger://major-squirrel-thick-hedgehog/secp256k1/0h/0h"
tezos-client import secret key ledger_username "ledger://major-squirrel-thick-hedgehog/P-256/0h/0h"
```

For each Tezos account stored on the Ledger, this will report four kinds of commands to import this address, for 4 different private key formats (Ed25519, Secp256k1, P256 and Bip25519 respectively).

Then you need to import the corresponding key:

```
$ tezos-client \
  --endpoint "http://localhost:18732" \
   import secret key <delegate_alias> "ledger://major-squirrel-thick-hedgehog/ed25519/0h/0h"
```

And finally, the _Tezos Baking_ application on the Ledger should be configured for baking:

```
$ tezos-client \
   --endpoint "http://localhost:18732" \
   setup ledger to bake for <delegate_alias> 
```

After that, you can use the commands mentioned above to run baker/endorser daemons with the alias _<delegate\_alias>_. Note that you need to have your Ledger connected and the _Tezos Baking_ application active on it.

## Using Remote Signing

To keep your private keys at home while running the TezEdge node on a VPS, or to use the keys provided by Ledger, the _remote signer_ application can be used.

See here for more details: http://tezos.gitlab.io/user/key-management.html#signer

In this basic setup, there is a VPS server running Tezedge node and Tezos baker/endorser daemons, and the home server accessible from it via address `home`. This home server should have access to the Tezos address that should be used.

On the _home_ server, start the `remote-signer` application:

```
home$ tezos-signer \
   --base-dir "$HOME/data-mainnet/client" \
   launch http signer --address 0.0.0.0 -p 17732
```

Then you need to import the address provided by the `tezos-signer` server to your VPS:

```
$ tezos-client \
   --endpoint "http://localhost:18732" \
   --base-dir "$HOME/data-mainnet/client" \
   import secret key <delegate_alias> http://home:17732/<delegate_address>
```

Now you can start baking and endorsing daemons on your VPS using the command above. In case of a Ledger-based account, the Ledger should be connected to the _home_ server, and _Tezos Baking_ application should be active on it, otherwise, the blocks/endorsement operations will not be signed and thus won't be parts of the blockchain._


