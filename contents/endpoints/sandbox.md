---
title: Sandbox
sidebar: Docs
showTitle: false
---

# Protocol

* Sandbox
    - [Start](#cycle)
    - [Initialize tezos client](#initialize-tezos-client)
    - [Activate Protocol](#activate-protocol)
    - [Bake](#bake)
    - [Wallets](#wallets)
    - [List nodes](#list-nodes)
    - [Stop](#stop)




## Start

Starts a sandbox node with the provided parameters

*Request*
```bash
POST http://localhost:3030/start
```

*JSON body*

|                               |                                                                                                                                                          |
|-------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `identity_expected_pow` | The expected Proof of Work difficulty to generate the identity with |
| `disable_bootstrap_lookup` | Disables DNS lookup to get peers to bootstrap from the network. Default: false |
| `network` | Specifies the Tezos environment for this node. Accepted values are: `alphanet`, `babylonnet`, `babylon`, `mainnet` or `zeronet`, where `babylon` and `babylonnet` refer to the same environment. |
| `peer_thresh_low` | Set minimal number of peers, if the running node does not have enough connected peers, peer discovery is enforced. |
| `peer_thresh_high` | Set maximum number of connected peers. If this threshold is met, then the running node will not try to connect to any more peers. |
| `sandbox_patch_context_json` | Key-values which will be added to the empty context on startup and commit genesis. |
| `genesis_pubkey` |  Public key to the account which will sign the first block |
| `tezos_data_dir` |  The path to directory which will be used to store Tezos-specific data. This is a required argument, and if the node fails to create or access this directory, it will die gracefully. |
| `identity_file` |  The path to the json identity file with peer-id, public-key, secret-key and pow-stamp. If an identity does not exist in the specified path, a new one will be automatically generated. In case it starts with "./" or "../", it is a relative path to the current dir, otherwise to the --tezos-data-dir. |
| `bootstrap_db_path` |  Path to the bootstrap database directory. In case it starts with "./" or "../", it is a relative path to the current dir, otherwise to the --tezos-data-dir. If the directory does not exist, it will be created. If directory already exists and it contains a valid database, the node will continue in the bootstrapping process on that database |
| `db_cfg_max_threads` | Maximum number of threads used by database configuration. If not specified, then the number of threads will be equal to the number of CPU cores.|
|`log_format`| Set format of logger entries, used usually with --logger-format argument. Possible values are either simple or json. Simple format is a human-readable format while JSON produces structured, easily machine-consumable log entries.|
|`log_level`|Set log level. Possible values are: critical, error, warn, info, debug, trace.|
|`ocaml_log_enabled` | Enable OCaml runtime logger. |
|`p2p_port`| Specifies port for peer to peer communication.|
|`rpc_port`| The node contains a subset of the Tezos node's REST API as described in further sections. This argument specifies the port on which those APIs will be available.|
|`websocket_address` | The node exposes various metrics and statistics in real-time through a websocket. This argument specifies the address at which this websocket will be accessible.|
|`ffi_calls_gc_threshold` | Number of ffi calls, after which the Ocaml garbage collector will be called.|
|`ffi_pool_max_connections` | Max number of FFI pool connections. default: 10 |
| `ffi_pool_connection_timeout_in_secs` | Number of seconds to wait for connection. default: 60 |
| `ffi_pool_max_lifetime_in_secs` | Number of seconds to remove protocol_runner from pool, default: 21600 (6 hours). |
| `ffi_pool_idle_timeout_in_secs` | Number of seconds to remove unused protocol_runner from pool, default: 1800 (30 minutes). |
| `store_context_actions` | Activate recording of context storage actions. |
| `tokio_threads` | Number of threads spawned by a tokio thread pool. If value is zero, then number of threads equal to CPU cores is spawned. |
| `enable_testchain` | Flag for enable/disable test chain switching for block applying. Default: false |

&nbsp;

*Example Request*


```bash
curl --location --request POST 'http://localhost:3030/start' \
--header 'Content-Type: application/json' \
--data-raw '{
    "identity_expected_pow": 0,
    "disable_bootstrap_lookup": "",
    "network": "sandbox",
    "peer_thresh_low": 1,
    "peer_thresh_high": 1,
    "sandbox_patch_context_json": {
        "genesis_pubkey": "edpkuSLWfVU1Vq7Jg9FucPyKmma6otcMHac9zG4oU1KMHSTBpJuGQ2"
    },
    "tezos_data_dir": "/tmp/tezedge/tezos-node",
    "identity_file": "/tmp/tezedge/identity.json",
    "bootstrap_db_path": "/tmp/tezedge/light-node",
    "db_cfg_max_threads": "4",
    "log_format": "simple",
    "log_level": "info",
    "ocaml_log_enabled": false,
    "p2p_port": 9732,
    "rpc_port": 18732,
    "websocket_address": "0.0.0.0:4927",
    "ffi_calls_gc_threshold": 50,
    "ffi_pool_max_connections": 10,
    "ffi_pool_connection_timeout_in_secs": 60,
    "ffi_pool_max_lifetime_in_secs": 21600,
    "ffi_pool_idle_timeout_in_secs": 1800,
    "store_context_actions": false,
    "tokio_threads": 0,
    "enable_testchain": false
  }'
```


---



## Initialize tezos client

Initializes the tezos-client with the provided accounts

*Request*
```bash
POST http://localhost:3030/init_client
```
*JSON body*

*In the json body, we send and array of the following JSON*

|                               |                                                                                                                                                          |
|-------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `alias`| An arbitrary alias for this wallet |
| `secret_key` | Base58Check-encoded secret key |
| `public_key` | Base58Check-encoded public key |
| `public_key_hash` | Base58Check-encoded public key hash |
| `initial_balance`| Initial balance of the wallet in Mutez |

&nbsp;

*Example Request*


```bash
curl --location --request POST 'http://localhost:3030/init_client' \
--header 'Content-Type: application/json' \
--data-raw '[
    {
        "alias": "bootstrap1",
        "secret_key": "edsk3gUfUPyBSfrS9CCgmCiQsTCHGkviBDusMxDJstFtojtc1zcpsh",
        "public_key": "edpkuBknW28nW72KG6RoHtYW7p12T6GKc7nAbwYX5m8Wd9sDVC9yav",
        "public_key_hash": "tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx",
        "initial_balance": "4000000000000"
    },
    {
        "alias": "bootstrap2",
        "secret_key": "edsk39qAm1fiMjgmPkw1EgQYkMzkJezLNewd7PLNHTkr6w9XA2zdfo",
        "public_key": "edpktzNbDAUjUk697W7gYg2CRuBQjyPxbEg8dLccYYwKSKvkPvjtV9",
        "public_key_hash": "tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN",
        "initial_balance": "4000000000000"
    }
]'
```

---

## Activate Protocol


*Request*
```bash
POST /activate_protocol
```
*JSON body*


|                               |                                                                                                                                                          |
|-------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `timestamp` *String* | Timestamp to use to create the block |
|`protocol_hash` *String* | Base58Check-encoded hash of the protocol to be activated |
| `protocol_parameters` *String* | [ProtocolParameters](#protocol.parameters)|

&nbsp;

### [ProtocolParameters](#protocol.parameters)

Note tahat BigInt types are numberes represented as `Strings` in the JSON body.

|                               |                                                                                                                                                          |
|-------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `preserved_cycles` *u8* | Number of preserved cycles. |
| `blocks_per_cycle` *i32* | Number of blocks in a cycle. |
| `blocks_per_commitment` *i32* | The number of blocks between 2 nonce-containing blocks for the random seed calculation (commitment == hash of a nonce). |
| `blocks_per_roll_snapshot` *i32* | Number of blocks between 2 snapshot blocks. |
| `blocks_per_voting_period` *i32* | Number of blocks in one voting period. |
| `time_between_blocks` *i64* | Used for calculating estimated timestamps. |
| `endorsers_per_block` *u16* | Number of endorser slots per block. |
| `hard_gas_limit_per_operation` *BigUInt* | Maximum gas used per operation. |
| `hard_gas_limit_per_block` *BigUInt* | Maximum total gas usage of one block. |
| `proof_of_work_threshold` *i64* | The threshold of a hash generated in a lightweight proof of work (PoW) task. | 
| `tokens_per_roll` *BigInt* | Number of mutez needed for one roll. |
| `michelson_maximum_type_size` | Maximum size of a type structure in Michelson. |
| `seed_nonce_revelation_tip` *BigInt* | The amount of mutez awarded for including a nonce reveal operation. |
| `origination_size` *i32* | Size of the contract script of the origination operation. |
| `block_security_deposit` *BigInt* | Deposit per baked block. |
| `endorsement_security_deposit` *BigInt* | Deposit per endorsement slot. |
| `baking_reward_per_endorsement` *BigInt* | List of values used for block reward calculation. | 
| `cost_per_byte` *BigInt* | Cost in Mutez per bytes used in contracts. | 
| `hard_storage_limit_per_operation` *BigUInt* | Maximum amount of bytes the storage limit of a transaction can be set to. |
| `test_chain_duration` *i64* | Lifetime of the testchain in seconds. |
| `quorum_min` *i32* | Minimum quorum for a voting period to be successful, expressed in percentage multiplied by 100. |
| `quorum_max` *i32* | Maximum value a quorum can reach expressed in percentage multiplied by 100.|
| `min_proposal_quorum` *i32* | The minimal quorum needed to proceed from the proposal period expressed in a percentage multiplied by 100 (for instance, 5% is represented by 500). |
| `initial_endorsers` *u16* | Value used in calculation of the minimal delay between baked blocks. |
| `delay_per_missing_endorsement` *i64*  | Expressed in seconds. Used in calculation of the minimal delay between baked blocks. |

&nbsp;

*Example Request*


```bash
curl --location --request POST 'http://localhost:3030/activate_protocol' \
--header 'Content-Type: application/json' \
--data-raw '{
  "timestamp": "2020-06-24T08:02:48Z",
  "protocol_hash": "PsCARTHAGazKbHtnKfLzQg3kms52kSRpgnDY982a9oYsSXRLQEb",
  "protocol_parameters": {
    "preserved_cycles": 2,
    "blocks_per_cycle": 8,
    "blocks_per_commitment": 4,
    "blocks_per_roll_snapshot": 4,
    "blocks_per_voting_period": 64,
    "time_between_blocks": [
      "1",
      "0"
    ],
    "endorsers_per_block": 32,
    "hard_gas_limit_per_operation": "1040000",
    "hard_gas_limit_per_block": "10400000",
    "proof_of_work_threshold": "-1",
    "tokens_per_roll": "8000000000",
    "michelson_maximum_type_size": 1000,
    "seed_nonce_revelation_tip": "125000",
    "origination_size": 257,
    "block_security_deposit": "512000000",
    "endorsement_security_deposit": "64000000",
    "baking_reward_per_endorsement": [
      "1250000",
      "187500"
    ],
    "endorsement_reward": [
      "1250000",
      "833333"
    ],
    "cost_per_byte": "50",
    "hard_storage_limit_per_operation": "60000",
    "test_chain_duration": "1966080",
    "quorum_min": 2000,
    "quorum_max": 7000,
    "min_proposal_quorum": 500,
    "initial_endorsers": 1,
    "delay_per_missing_endorsement": "1"
  }
}'
```
---

## Bake

Bake with the provided wallet alias or with a random wallet

*Request*

```bash
POST http://localhost:3030/bake
````

*JSON body*

|                               |                                                                                                                                                          |
|-------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
|`alias` | Alias of an initialized wallet|

Bake with a random wallet

*Request*
```bash
GET http://localhost:3030/bake
```

&nbsp;

*Example Request*


```bash
curl --location --request POST 'http://localhost:3030/bake' \
--header 'Content-Type: application/json' \
--data-raw '{
    "alias": "bootstrap1"
}'

```

---
## Wallets

List all the activated wallets in the sandbox

*Request*
```bash
GET http://localhost:3030/wallets
```

&nbsp;

*Example Request*


```bash
curl --location --request GET 'http://127.0.0.1:3030/wallets'

```


---
## List nodes

List all the running nodes in the sandbox. 

*Request*
```bash
GET http://127.0.0.1:3030/list_nodes
```

&nbsp;

*Example Request*


```bash
curl --location --request GET 'http://127.0.0.1:3030/list_nodes'

```
---
## Stop

Stops the sandbox nodes

*Request*
```bash
GET http://127.0.0.1:3030/stop
```

&nbsp;

*Example Request*


```bash
curl --location --request GET 'http://127.0.0.1:3030/stop'

```
---



