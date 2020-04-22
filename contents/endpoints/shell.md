---
title: Shell
sidebar: Docs
showTitle: false
---

# Shell

* Monitor
  - [Commit hash](#commit-hash)
  - [Bootstrapped](#bootstrapped)


* Chain
  - [Block](#block)

&nbsp;

## Commit hash

Returns node build information. Specifically the git commit hash.

*Request*

```bash
GET /monitor/commit_hash
```

*Response*

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| *String* |  Git commit hash. |

&nbsp;
&nbsp;

*Example Browser*

<a href="http://carthage.tezedge.com:18732/monitor/commit_hash"
target="_blank"> http://carthage.tezedge.com:18732/monitor/commit_hash
</a>


*Example Request*

```bash
curl http://carthage.tezedge.com:18732/monitor/commit_hash
```

*Example Response*

```JSON
"a42d44b30f938a976731367c857a58633386a668"
```

&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;

## Bootstrapped

Returns bootstrap information.

*Request*

```bash
GET /monitor/bootstrapped
```

*Response*

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `block` *String* |  Base58Check encoded block hash. |
| `timestamp` *RFC3339* | Block baking timestamp. |

&nbsp;
&nbsp;

*Example Browser*

<a href="http://carthage.tezedge.com:18732/monitor/bootstrapped"
target="_blank"> http://carthage.tezedge.com:18732/monitor/bootstrapped
</a>


*Example Request*

```bash
curl http://carthage.tezedge.com:18732/monitor/bootstrapped
```

*Example Response*

```JSON
{
  "block": "BLivkZRMjPkUXU4Wo7EzHpEArtWYUNwbkjzQvWo8UbTD9CKeeME",
  "timestamp": "2020-04-15T09:37:59Z"
}
```

&nbsp;
&nbsp;
&nbsp;


## Block

Returns all the information about a block for the supplied block_id


*Request*


```bash
GET /chains/<chain_id>/blocks/<block_id>
```

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `chain_id` *string* | Id of the requested chain |
| `block_id` *string* | Requested block Id |  


*Response*


| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `hash` *String* | Base58Check encoded block hash. |
| `chain_id` *string* | Base58Check encoded chain id. |
| `header` | [Header fields](#block.header) |
| `metadata` | [Metadata fields](#metadata) |
| `operations` | [Operations fields](#operations) |
| `balance_updates` | List of [Balance update fields](#balance-update) |

&nbsp;

### [header](#block.header)

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `level` *i32* | Block level. |
| `proto` *u8* | Protocol used to create the block. |
| `predecessor` *string* | Base58Check encoded block hash. |
| `timestamp` *RFC3339* | Time at which block was baked. |
| `validation_pass` *u8* | Number of validation passes. |
| `operations_hash` *string* | Base58Check encoded hash of a list of root hashes of Merkle trees of operations. |
| `fitness` *string* |  A sequence of sequences of unsigned bytes, ordered by length and then lexicographically. It represents the claimed fitness of the chain ending in this block. |
| `context` *string* | Base58Check encoded hash of the state of context, after application of this block. |
| `protocol_data` | The protocol-specific fragment of the block header. |


&nbsp;
&nbsp;
&nbsp;

### [metadata](#metadata)

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `protocol` *string* |  Base58Check encoded protocol hash. |
| `next_protocol` *string* | Base58Check encoded protocol hash. |
| `test_chain_status` | [Test chain status](#metadatatest_chain_status) |
| `max_operations_ttl` *i31* | The "time-to-live" of operation for the next block. | 
| `max_operation_data_length` *i31* | The maximum size of an operation in bytes. |
| `max_block_header_length` *i31* | The maximum size of a block header in bytes. |
| `max_operation_list_length`| [Max operation list lengths](#metadatamax_operation_list_lenghts) |
| `baker` *string* | Base58Check encoded private key hash of the baker (tz1...). |
| `level` | [Level](#metadatalevel) |
| `voting_period_kind` *string* | The voting period the block was baked in. |
| `nonce_hash` *string* | Base58Check encoded nonce hash. Returns null, if nonce_hash is not present. |
| `consumed_gas` *BigInt* | Total gas consumed by creating the block and including it in the blockchain. |
| `deactivated` *string* | List of Base58Check encoded public key hashes (tz1....) which baking was deactivated. |
| `balance_updates` | [Balance update](#balance-update) | 


&nbsp;


#### [test\_chain\_status](#test_chain_status)
Structure indicating the status of a forked test chain.

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `status` *string* | The status of the test chain. |

The next fields are dependent on the `status` field.

&nbsp;

##### [forking](#forking)
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `protocol` *string* | Base58Check encoded protocol hash of the activated protocol on the test chain. |
| `expiration ` *i32* | Expiration of the test chain, in seconds. |

##### [running](#running)
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `protocol` *string* | Base58Check encoded protocol hash of the activated protocol on the test chain. |
| `expiration ` *i32* | Expiration of the test chain, in seconds. |
| `chain_id` *string* | Base58Check encoded chain id of the running test chain. |
| `genesis` *string* | Base58Check encoded block hash of the genesis block on the test chain. |

&nbsp;

#### [max\_operation\_list_length](#max_operation_list_length)
Bounds for the maximum list size or maximum operation count.

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `max_size` *int31* | Maximum size of the list in bytes. |
| `max_op` *(optional) int31* | Maximum operation count. |

&nbsp;

#### [level](#level)
Structure encapsulating information about the position of the block in the blockchain.

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `level` *i32* | Block level. |
| `level_position` *i32* | The level of the block, relative to the block that starts protocol alpha. This is specific to the protocol alpha. Other protocols might or might not include a similar notion. |
| `cycle` *i32* | The current cycle's number. Note that cycles are a protocol-specific notion. As a result, the cycle number starts at 0 with the first block of protocol. |
| `cycle_position ` *i32* | The current level of the block, relative to the first block of the current cycle. |
| `voting_period ` *i32* | The current voting period's index. Note that cycles are a protocol-specific notion. As a result, the voting period index starts at 0 with the first block of protocol. |
| `voting_period_position ` *i32* | The current level of the block, relative to the first block of the current voting period. |
| `expected_commitment ` *bool*| States whether the baker of this block has to commit a seed nonce hash. |

&nbsp;

#### [balance_updates](#balance_updates)
Structure representing information about the various balance changes that happened in the included operations.

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `kind` *string* | The type or “kind” of the balance update. |
| `change` *BigInt* | The difference in balance after the operation. |

The next fields are dependent on the `kind` field.

&nbsp;

##### [contract](#contract)
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `contract` *string* | Base58Check encoded private key hash of the contract whose balance was changed. | <!-- check grammar pls --> 

##### [freezer](#freezer)
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `category` *string* | The category of the frozen balance. |
| `delegate  ` *string* | Base58Check encoded private key hash of the delegate whose balance was changed. |
| `cycle` *i32* | The cycle the balance is frozen for. | <!-- check grammar pls -->


&nbsp;
&nbsp;
&nbsp;

### [operations](#operations)

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `protocol` *string* | Base58Check encoded protocol hash. |
| `chain_id` *string* | Base58Check encoded chain id of the chain the operation was executed on. |
| `hash` *string* | Base58Check encoded operation hash. |
| `branch` *string* | Base58Check encoded block hash of a branch root block. | 
| `contents` | [Operation contents](#operation-contents) or [Operation Contents And Result](#operation-contents-and-result) |
| `signature` *(optional) string* | Base58Check encoded signature of the operation. |


#### Operation Contents
The contents of the executed operations.

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `kind` *string* | The type or kind of the operation. |

The next fields are dependent on the `kind` field.

##### endorsement
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `level` *i32* | Level of the endorsed block. |

##### seed nonce revelation
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `level` *i32* | Level of the block containing the nonce. |
| `nonce` *string* | Nonce for the random seed generation. |

##### double_endorsement_evidence
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `op1` | [Inlined Endorsement](#inlined-endorsement) |
| `op2` | [Inlined Endorsement](#inlined-endorsement) |

The next fields are dependent on the *kind* field.

##### Double Baking Evidence 
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `bh1` *FullHeader* | First header of the double baked block. | 
| `bh2` *FullHeader* | Second header of the double baked block evidence. |

##### Activate account
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `pkh` *string* | Base58Check encoded public key hash of the activated account. |
| `secret` *string* | The secret of the activated account. |

##### Proposal
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `source` *string* | Base58Check encoded public key hash of the proposer. |
| `period` *i32* | The voting period expressed in a number. | 
| `proposals` *string* | A list of the proposed protocol Base58Check encoded hashes. |

##### Ballot
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
|`source` *string* | Base58Check encoded public key hash of the ballot submitter. |
|`period` *i32* | The voting period expressed in a number. |
|`proposal` *string* | Base58Check encoded hash of the protocol to which the ballot is submitted. |
|`ballot` *string* | The ballot to submit. |

##### Reveal
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `source` *string* | Base58Check encoded public key hash of the revealed account. |
| `fee` *bigint* | Fee for the operation. |
| `counter` *BigInt* | The account’s counter. |
| `gas_limit` *BigInt* | The set gas limit. |
| `storage_limit` *BigInt* | The set storage limit. |
| `public_key` *string* | Base58Check encoded public key of the revealing account. |

##### Transaction
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `source` *string* | Base58Check encoded public key hash of the transaction sender. |
| `fee` *BigInt* | Fee for the operation. |
| `counter` *BigInt* | The account’s counter. |
| `gas_limit` *BigInt* | The set gas limit. |
| `storage_limit` *BigInt* | The set storage limit. |
| `amount` *BigInt* | The amount of tokens transferred. |
| `destination` *string* | Base58Check encoded public key hash of the transaction recipient. |
| `parameters` *(optional)* | [Transaction paramaters](#transaction-parameters) |

##### Origination
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `source` *string* | Base58Check encoded public key hash of the implicit account performing the origination. |
| `fee` *BigInt* | Fee for the operation. |
| `counter` *BigInt* | The account’s counter. |
| `gas_limit` *BigInt* | The set gas limit. |
| `storage_limit` *BigInt* | The set storage limit. |
| `balance`  *BigInt* | Mutez to give the originated account (contract). |
| `delegate` *(optional) String* | Deprecated in 005 and later protocols, Delegate to whom the originated account delegates to. |
| `script` *string* | Hex string encoded michelson script. |

##### Delegation
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `source` *string* | Base58Check encoded public key hash of the implicit account performing the delegation (delegator). |
| `fee` *BigInt* | Fee for the operation. |
| `counter` *BigInt* | The account’s counter. |
| `gas_limit` *BigInt* | The set gas limit. |
| `storage_limit` *BigInt* | The set storage limit. |
| `delegate` *(optional) string* | Base58Check encoded public key hash of the implicit account receiving the delegation (delegate). |

---------------------------------------------------------------------------------------------------------------------------

#### Inlined Endorsement:
Inlined endorsement operation

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `branch` *string* | Base58Check encoded block hash of a branch root block. | 
| `operations` | [Endorsement Operation](#endorsement-operation) |
| `signature` *(optional string)* |  Base58Check encoded signature of the operation. |

#### Endorsement Operation
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `kind` *string* | The type or “kind” of the operation. |
| `level` *i32* | Level (height) of endorsed block. |

---------------------------------------------------------------------------------------------------------------------------
#### Transaction parameters
Optional parameters for smart contract calls

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `entrypoint` *string* | Named entrypoint to a Michelson smart contract. |
| `value` | One of the following michelson expressions: [Michelson int](#michelson-integer-expression), [Michelson string](#michelson-string-expression), [Michelson bytes](#michelson-bytes-expression), [Michelson generic prim](#michelson-generic-prim-expression). |

---------------------------------------------------------------------------------------------------------------------------

#### Michelson integer expression

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `int` *BigInt* | Expression value. |

---------------------------------------------------------------------------------------------------------------------------

#### Michelson string expression

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `string` *string* | Expression value. |

---------------------------------------------------------------------------------------------------------------------------

#### Michelson bytes expression

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `bytes` *string* | Expression value. Bytes in string format.  |

---------------------------------------------------------------------------------------------------------------------------

#### Michelson generic prim expression

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `prim` *string* | Michelson primitive. |
| `args` *(optional)* | List containing a variation of the following michelson expressions: [Michelson int](#michelson-integer-expression), [Michelson string](#michelson-string-expression), [Michelson bytes](#michelson-bytes-expression), [Michelson generic prim](#michelson-generic-prim-expression). |
| `annots` *(optional) [string]* | List of annotations. |


---------------------------------------------------------------------------------------------------------------------------

#### Operation Contents And Result
The contents and results of the executed operations. Same fields as in Operation Contents above with and additional metadata field

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `metadata` | [Operation Contents And Result Metadata](#operation-contents-and-result-metadata) |

#### Operation Contents And Result Metadata
Contains metadata about the operation.

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `balance_updates` | [Balance update](#balance-update) |
| `operation_result` | [Reveal Result](#reveal-result) or [Transaction Result](#transaction-result) or [Origination Result]() or [Delegation Result](#delegation-result) |
| `internal_operation_results` *(optional)* | [Internal Operation Result](#internal-operation-result) |

---------------------------------------------------------------------------------------------------------------------------


#### Internal Operation Result

Result of an internal operation.

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `kind` *string* | The operation type or “kind”. |
| `source` *string* | Base58Check encoded public key hash of the account initializing the operation. |
| `nonce` *positive i16* |   |

The next fields are dependent on the `kind` field.

##### Reveal
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `public_key` *string* |  Base58Check encoded public key of the revealing account. |
| `result` | [Reveal Result](#reveal-result) |

##### Transaction
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `amount` *BigInt* | The amount of tokens transferred. |
| `destination` *string* | Base58Check encoded public key hash of the transaction receiver. |
| `parameters` *(optional)* | [Transaction paramaters](#transaction-parameters) |
| `result` | [Transaction Result](#transaction-result) |

##### Origination
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `balance` *BigInt* | Mutez to give the originated account (contract). |
| `delegate` *(optional) string* | Deprecated in 005 and later protocols, Delegate to whom the originated account delegates to. |
| `script` *string* |  Hex string encoded michelson script. |
| `result` | [Origination Result](#origination-result) |

##### Delegation
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `delegate` *(optional) string* | Base58Check encoded public key hash of the implicit account receiving the delegation (delegate). |
| `result` | [Delegation Result](#delegation-result) |

---------------------------------------------------------------------------------------------------------------------------

#### Reveal Result
Result of the reveal operation.

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `status` *string* | The operation result status. |

The next fields are dependent on the *status* field.

##### Applied
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `consumed_gas` *(optional) BigInt* | The amount of gas the operation consumed. |

##### Failed
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `errors` *error* | List of errors. |

##### Backtracked
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `errors` *(optional) error* | List of errors. |
| `consumed_gas` *(optional) BigInt* | The amount of gas consumed by the operation. |


---------------------------------------------------------------------------------------------------------------------------

#### Delegation Result
Result of the delegation operation.

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `status` *string* | The operation result status. |

The next fields are dependent on the *status* field.

##### Applied
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `consumed_gas` *(optional) BigInt* | The amount of gas the operation consumed. |

##### Failed
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `errors` *error* | List of errors. |

##### Backtracked
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `errors` *(optional) error* | List of errors. |
| `consumed_gas` *(optional) BigInt* | The amount of gas consumed by the operation. |

---------------------------------------------------------------------------------------------------------------------------

#### Transaction Result
Result of the transaction operation.

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `status` *string* | The operation result status: applied / failed / skipped / backtracked. |

The next fields are dependent on the *status* field.

##### Applied
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------
| `consumed_gas` *(optional) BigInt* | The amount of gas consumed by the operation. |
| `storage` *(optional) string* | Micheline expression. |
| `big_map_diff` | [Big Map Diff](#big-map-diff) |
| `balance_updates` | [Balance update](#balance-update) |
| `originated_contracts` *(optional) string* | Originated contracts. |
| `consumed_gas` *(optional) BigInt* | The amount of gas the operation consumed. |
| `storage_size` *(optional) BigInt* | Size of the storage after the operation was applied. |
| `paid_storage_size_diff` *(optional) BigInt* | Amount paid for the storage upgrade. |
| `allocated_destination_contract` *(optional) bool* |

##### Failed
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `errors` *error* | List of errors. |

##### Backtracked
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `errors` *error* | List of errors. |
| `consumed_gas` *BigInt* | The amount of gas the operation consumed. |
| `storage` *string* | Micheline expression. |
| `big_map_diff` | [Big Map Diff](#big-map-diff) |
| `balance_updates` | [Balance update](#balance-update) |
| `originated_contracts` *string* | Originated contracts. |
| `consumed_gas` *BigInt* | The amount of gas consumed by the operation. |
| `storage_size` *BigInt* | Size of the storage after the operation was applied. |
| `paid_storage_size_diff` *BigInt* | Amount paid for the storage upgrade. |
| `allocated_destination_contract` *bool* |

---------------------------------------------------------------------------------------------------------------------------

#### Origination Result
Result of the origination operation.

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `status` *string* | The operation result status. |

The next fields are dependent on the `status` field.

##### Applied
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------
| `consumed_gas` *BigInt* | The amount of gas consumed by the operation. |
| `big_map_diff` *(optional)* | [Big Map Diff](#big-map-diff) |
| `balance_updates` *(optional)* | [Balance update](#balance-update) |
| `originated_contracts` *(optional) string* | Originated contracts. |
| `consumed_gas` *(optional) BigInt* | The amount of gas consumed by the operation. |
| `storage_size` *(optional) BigInt* | Size of the storage after the operation was applied. |
| `paid_storage_size_diff` *(optional) BigInt* | Amount paid for the storage upgrade. |



##### Failed
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `errors` *error* | List of errors. |

##### Backtracked
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `errors` *error* | list of errors. |
| `consumed_gas` *BigInt* | The amount of gas consumed by the operation. |
| `big_map_diff` *(optional)* | [Big Map Diff](#big-map-diff) |
| `balance_updates` *(optional)* | [Balance update](#balance-update) |
| `originated_contracts` *(optional) string* | Originated contracts. |
| `consumed_gas` *(optional) BigInt* | The amount of gas the operation consumed. |
| `storage_size` *(optional) BigInt* | Size of the storage after the operation was applied. |
| `paid_storage_size_diff` *(optional) BigInt* | Amount paid for the storage upgrade. |

---------------------------------------------------------------------------------------------------------------------------

#### Big Map Diff
List of the actions executed over the big map

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `action` *string* | The action applied to the BigMap. |

The next fields are dependent on the `action` field.

##### Update
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `big_map` *BigInt* | Bigmap ID. |
| `key_hash` *string* | Base58Check encoded hash of the key. |
| `key` *string* | Micheline expression. |
| `value` *(optional) string* | Micheline expression. |

##### Remove
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `big_map` *BigInt* | Bigmap ID. |

##### Copy
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `source_big_map` *BigInt* | ID of the source Bigmap. |
| `destination_big_map` *BigInt* | ID of the destination Bigmap. |

##### Alloc
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `big_map` *BigInt* | Bigmap ID. |
| `key_type` *string* | Micheline expression for the allocated key type. |
| `value_type` *string* | Micheline expression for the allocated value type. |



&nbsp;
&nbsp;
&nbsp;

*Example Browser*

<a href="http://carthage.tezedge.com:18732/chains/main/blocks/head"
target="_blank">http://carthage.tezedge.com:18732/chains/main/blocks/head
</a>


*Example Request*

```bash
curl http://carthage.tezedge.com:18732/chains/main/blocks/head
```

*Example Response*

```JSON
{
    "protocol": "PsCARTHAGazKbHtnKfLzQg3kms52kSRpgnDY982a9oYsSXRLQEb",
    "chain_id": "NetXjD3HPJJjmcd",
    "hash": "BL6rMn1NDNsEAdR7zkMPep7NuE4bXpZXoG3hMqJWZJUU4oJjGtT",
    "header": {
        "priority": 1,
        "timestamp": "2019-12-15T15:26:33Z",
        "predecessor": "BMTvSL9DYnZj3CDwnY4kUo1fRpX5VN8afj47soRtygi3BCtb9xp",
        "context": "CoUqJZooijVRxPi62WvMdiTx2f7dDpk4LP6Ud1QBHzC8RuoexuPm",
        "proof_of_work_nonce": "b1a7b92bd53a0000",
        "fitness": [
            "01",
            "000000000000a027"
        ],
        "signature": "sigTed2a4Vg4rwiZhvncFsJLdZmT3ZBAcgz4GX894AwxA4zzq1Ku5gcsquWCQxcxy9aB9WNiPqTavMueQUV5dD3GfiPUP8mT",
        "validation_pass": 4,
        "operations_hash": "LLoacMkMfyEju5pLnFEwNTnSjbemgz5H3zbDH47V5qVcpv5Y1PxYf",
        "level": 41000,
        "proto": 2
    },
    "metadata": {
        "max_operation_list_length": [
            {
                "max_op": 32,
                "max_size": 32768
            },
            {
                "max_size": 32768
            },
            {
                "max_op": 132,
                "max_size": 135168
            },
            {
                "max_size": 524288
            }
        ],
        "protocol": "PsCARTHAGazKbHtnKfLzQg3kms52kSRpgnDY982a9oYsSXRLQEb",
        "max_operation_data_length": 16384,
        "level": {
            "cycle": 20,
            "cycle_position": 39,
            "expected_commitment": false,
            "level": 41000,
            "level_position": 40999,
            "voting_period": 20,
            "voting_period_position": 39
        },
        "max_operations_ttl": 60,
        "voting_period_kind": "proposal",
        "deactivated": [],
        "baker": "tz1PV5g16m9hHMAVJ4Hx6NzzUHgksDnTLFcK",
        "test_chain_status": {
            "status": "not_running"
        },
        "max_block_header_length": 238,
        "next_protocol": "PsCARTHAGazKbHtnKfLzQg3kms52kSRpgnDY982a9oYsSXRLQEb",
        "nonce_hash": null,
        "consumed_gas": "0",
        "balance_updates": [
            {
                "change": "-160000000",
                "contract": "tz1PV5g16m9hHMAVJ4Hx6NzzUHgksDnTLFcK",
                "kind": "contract"
            },
            {
                "category": "deposits",
                "change": "160000000",
                "cycle": 20,
                "delegate": "tz1PV5g16m9hHMAVJ4Hx6NzzUHgksDnTLFcK",
                "kind": "freezer"
            },
            {
                "category": "rewards",
                "change": "3750000",
                "cycle": 20,
                "delegate": "tz1PV5g16m9hHMAVJ4Hx6NzzUHgksDnTLFcK",
                "kind": "freezer"
            }
        ]
    },
    "operations": [
        [
            {
                "branch": "BMTvSL9DYnZj3CDwnY4kUo1fRpX5VN8afj47soRtygi3BCtb9xp",
                "hash": "opPFWQK1o17UJdS1u2tkGpFC6WFNjfMJbeb3Rv3MsRUBsZpgLTV",
                "contents": [
                    {
                        "kind": "endorsement",
                        "level": 40999,
                        "metadata": {
                            "balance_updates": [
                                {
                                    "change": "-20000000",
                                    "contract": "tz1MjUzcie7XuKXQtTTjcAmUQcrcSUqtbn48",
                                    "kind": "contract"
                                },
                                {
                                    "category": "deposits",
                                    "change": "20000000",
                                    "cycle": 20,
                                    "delegate": "tz1MjUzcie7XuKXQtTTjcAmUQcrcSUqtbn48",
                                    "kind": "freezer"
                                },
                                {
                                    "category": "rewards",
                                    "change": "833333",
                                    "cycle": 20,
                                    "delegate": "tz1MjUzcie7XuKXQtTTjcAmUQcrcSUqtbn48",
                                    "kind": "freezer"
                                }
                            ],
                            "delegate": "tz1MjUzcie7XuKXQtTTjcAmUQcrcSUqtbn48",
                            "slots": [
                                16
                            ]
                        }
                    }
                ],
                "protocol": "PsCARTHAGazKbHtnKfLzQg3kms52kSRpgnDY982a9oYsSXRLQEb",
                "chain_id": "NetXjD3HPJJjmcd",
                "signature": "sigRouWgqjGBnxW8V79qFURq2bJntwCWGKSFrt687XKQZx3xDM16HRvCKj9ZhRBU8uKesJqYrjnnmNch3FmXFmhfF4LcF7Bd"
            },
            {
                "signature": "sighW6CyFFc61BwCfiByQfKH8t9Ty3x5L3UzrbBToZXiEWhhEhYdQwncCSjG1Q87M5wWY24BxHWdbD1sHRDe4EXXayeF2NXj",
                "protocol": "PsCARTHAGazKbHtnKfLzQg3kms52kSRpgnDY982a9oYsSXRLQEb",
                "hash": "opWe75Tc8TMt9JBFomSJ5VP2eMoPhx8PCCiSbgPwVVbfksHW8Rg",
                "chain_id": "NetXjD3HPJJjmcd",
                "branch": "BMTvSL9DYnZj3CDwnY4kUo1fRpX5VN8afj47soRtygi3BCtb9xp",
                "contents": [
                    {
                        "kind": "endorsement",
                        "level": 40999,
                        "metadata": {
                            "balance_updates": [
                                {
                                    "change": "-20000000",
                                    "contract": "tz1YH2LE6p7Sj16vF6irfHX92QV45XAZYHnX",
                                    "kind": "contract"
                                },
                                {
                                    "category": "deposits",
                                    "change": "20000000",
                                    "cycle": 20,
                                    "delegate": "tz1YH2LE6p7Sj16vF6irfHX92QV45XAZYHnX",
                                    "kind": "freezer"
                                },
                                {
                                    "category": "rewards",
                                    "change": "833333",
                                    "cycle": 20,
                                    "delegate": "tz1YH2LE6p7Sj16vF6irfHX92QV45XAZYHnX",
                                    "kind": "freezer"
                                }
                            ],
                            "delegate": "tz1YH2LE6p7Sj16vF6irfHX92QV45XAZYHnX",
                            "slots": [
                                26
                            ]
                        }
                    }
                ]
            },
            {
                "contents": [
                    {
                        "kind": "endorsement",
                        "level": 40999,
                        "metadata": {
                            "balance_updates": [
                                {
                                    "change": "-20000000",
                                    "contract": "tz1T7q1oyHReuhwRnzan6MPvRfXAP3Wm4tv2",
                                    "kind": "contract"
                                },
                                {
                                    "category": "deposits",
                                    "change": "20000000",
                                    "cycle": 20,
                                    "delegate": "tz1T7q1oyHReuhwRnzan6MPvRfXAP3Wm4tv2",
                                    "kind": "freezer"
                                },
                                {
                                    "category": "rewards",
                                    "change": "833333",
                                    "cycle": 20,
                                    "delegate": "tz1T7q1oyHReuhwRnzan6MPvRfXAP3Wm4tv2",
                                    "kind": "freezer"
                                }
                            ],
                            "delegate": "tz1T7q1oyHReuhwRnzan6MPvRfXAP3Wm4tv2",
                            "slots": [
                                4
                            ]
                        }
                    }
                ],
                "hash": "opFSXmDB4Vm6JbcM3y9YqqaQhR3GEk1XgVxawJ8U5BXGCtjXRWJ",
                "branch": "BMTvSL9DYnZj3CDwnY4kUo1fRpX5VN8afj47soRtygi3BCtb9xp",
                "chain_id": "NetXjD3HPJJjmcd",
                "protocol": "PsCARTHAGazKbHtnKfLzQg3kms52kSRpgnDY982a9oYsSXRLQEb",
                "signature": "sigWLrvRruGax7RjLXJkpyzfqCotNjpW8XRVMa7dDJBAyRBTgesizbBrFmdgKafEWrzN7sHnZuxzTdUSEnWXAgCKwFsFELK2"
            },
            {
                "protocol": "PsCARTHAGazKbHtnKfLzQg3kms52kSRpgnDY982a9oYsSXRLQEb",
                "hash": "onvH2QnLbHQyj3hyeSv6o9KEdjaqnZZzSJT1qLWMRqkb9vTNGLi",
                "signature": "sigehkGbKr7UsdHydtdhkRYEb1DNHej1NbwpGaejV8JZbTFq3A73oZu8pYDHYsC2ioW9QFzL2RvQxjcQHbBv1TbPsHAXGgD7",
                "branch": "BMTvSL9DYnZj3CDwnY4kUo1fRpX5VN8afj47soRtygi3BCtb9xp",
                "chain_id": "NetXjD3HPJJjmcd",
                "contents": [
                    {
                        "kind": "endorsement",
                        "level": 40999,
                        "metadata": {
                            "balance_updates": [
                                {
                                    "change": "-80000000",
                                    "contract": "tz1aWXP237BLwNHJcCD4b3DutCevhqq2T1Z9",
                                    "kind": "contract"
                                },
                                {
                                    "category": "deposits",
                                    "change": "80000000",
                                    "cycle": 20,
                                    "delegate": "tz1aWXP237BLwNHJcCD4b3DutCevhqq2T1Z9",
                                    "kind": "freezer"
                                },
                                {
                                    "category": "rewards",
                                    "change": "3333332",
                                    "cycle": 20,
                                    "delegate": "tz1aWXP237BLwNHJcCD4b3DutCevhqq2T1Z9",
                                    "kind": "freezer"
                                }
                            ],
                            "delegate": "tz1aWXP237BLwNHJcCD4b3DutCevhqq2T1Z9",
                            "slots": [
                                28,
                                19,
                                13,
                                5
                            ]
                        }
                    }
                ]
            },
            {
                "hash": "ooMsbfKp4LBCqifWULM9pkmxTkraf2vDrrqPen7msQPfmyMxxYq",
                "branch": "BMTvSL9DYnZj3CDwnY4kUo1fRpX5VN8afj47soRtygi3BCtb9xp",
                "signature": "sigR3Cw7AoSKZsKa79oUeuQFVnnkhc7m1Q88kuc73cSXE32SXyLGZwaqFWDcQiLxX2iRngqUAvKHVen6Na2dUWDuF1RmQvBb",
                "chain_id": "NetXjD3HPJJjmcd",
                "contents": [
                    {
                        "kind": "endorsement",
                        "level": 40999,
                        "metadata": {
                            "balance_updates": [
                                {
                                    "change": "-40000000",
                                    "contract": "tz1NRTQeqcuwybgrZfJavBY3of83u8uLpFBj",
                                    "kind": "contract"
                                },
                                {
                                    "category": "deposits",
                                    "change": "40000000",
                                    "cycle": 20,
                                    "delegate": "tz1NRTQeqcuwybgrZfJavBY3of83u8uLpFBj",
                                    "kind": "freezer"
                                },
                                {
                                    "category": "rewards",
                                    "change": "1666666",
                                    "cycle": 20,
                                    "delegate": "tz1NRTQeqcuwybgrZfJavBY3of83u8uLpFBj",
                                    "kind": "freezer"
                                }
                            ],
                            "delegate": "tz1NRTQeqcuwybgrZfJavBY3of83u8uLpFBj",
                            "slots": [
                                27,
                                18
                            ]
                        }
                    }
                ],
                "protocol": "PsCARTHAGazKbHtnKfLzQg3kms52kSRpgnDY982a9oYsSXRLQEb"
            },
            {
                "contents": [
                    {
                        "kind": "endorsement",
                        "level": 40999,
                        "metadata": {
                            "balance_updates": [
                                {
                                    "change": "-40000000",
                                    "contract": "tz1RomaiWJV3NFDZWTMVR2aEeHknsn3iF5Gi",
                                    "kind": "contract"
                                },
                                {
                                    "category": "deposits",
                                    "change": "40000000",
                                    "cycle": 20,
                                    "delegate": "tz1RomaiWJV3NFDZWTMVR2aEeHknsn3iF5Gi",
                                    "kind": "freezer"
                                },
                                {
                                    "category": "rewards",
                                    "change": "1666666",
                                    "cycle": 20,
                                    "delegate": "tz1RomaiWJV3NFDZWTMVR2aEeHknsn3iF5Gi",
                                    "kind": "freezer"
                                }
                            ],
                            "delegate": "tz1RomaiWJV3NFDZWTMVR2aEeHknsn3iF5Gi",
                            "slots": [
                                7,
                                6
                            ]
                        }
                    }
                ],
                "chain_id": "NetXjD3HPJJjmcd",
                "hash": "ooTBHHhHNq1VtTXtfe1jrUXk1VcRnzsnX7casPMY6VMZyu2x4Hw",
                "protocol": "PsCARTHAGazKbHtnKfLzQg3kms52kSRpgnDY982a9oYsSXRLQEb",
                "signature": "sigZo1J678w6BtMVaXm4TiqyxxXf2QHNSM5cjwtqS7BCWTiXtoATbLuocCEDTziDcYcmS82fBuk9tn56zfRz6PrixKLkK8dT",
                "branch": "BMTvSL9DYnZj3CDwnY4kUo1fRpX5VN8afj47soRtygi3BCtb9xp"
            },
            {
                "protocol": "PsCARTHAGazKbHtnKfLzQg3kms52kSRpgnDY982a9oYsSXRLQEb",
                "branch": "BMTvSL9DYnZj3CDwnY4kUo1fRpX5VN8afj47soRtygi3BCtb9xp",
                "hash": "ooG6M1Vxmfuwwvb4jLiyA5anYzBYwYWRCdFPkE9msyPLz68xWFZ",
                "contents": [
                    {
                        "kind": "endorsement",
                        "level": 40999,
                        "metadata": {
                            "balance_updates": [
                                {
                                    "change": "-80000000",
                                    "contract": "tz1Kz6VSEPNnKPiNvhyio6E1otbSdDhVD9qB",
                                    "kind": "contract"
                                },
                                {
                                    "category": "deposits",
                                    "change": "80000000",
                                    "cycle": 20,
                                    "delegate": "tz1Kz6VSEPNnKPiNvhyio6E1otbSdDhVD9qB",
                                    "kind": "freezer"
                                },
                                {
                                    "category": "rewards",
                                    "change": "3333332",
                                    "cycle": 20,
                                    "delegate": "tz1Kz6VSEPNnKPiNvhyio6E1otbSdDhVD9qB",
                                    "kind": "freezer"
                                }
                            ],
                            "delegate": "tz1Kz6VSEPNnKPiNvhyio6E1otbSdDhVD9qB",
                            "slots": [
                                21,
                                11,
                                9,
                                8
                            ]
                        }
                    }
                ],
                "chain_id": "NetXjD3HPJJjmcd",
                "signature": "sighbiXAV7pZUFVnjYLn6YLL9KmatsLBahHvXmP19p6yjne8Co3ApQzBoj44Vc2mZn9wrTgF9hsuu8hJUbshwpJwJd3Qt4JQ"
            },
            {
                "signature": "sigkmG6gbXN2XFwkD7ULZasBnEnDpqNBPqBSYCUJUGuQNG46bytX1FTU8AGeRdMsDjoaUuNLLrPSfGMsY4EKf6WkdxpARGUN",
                "hash": "ooBfwL5xXqaKpJBcc8m2VfQKMFtBW28o6J92mHHBfohqyJQkFUw",
                "contents": [
                    {
                        "kind": "endorsement",
                        "level": 40999,
                        "metadata": {
                            "balance_updates": [
                                {
                                    "change": "-80000000",
                                    "contract": "tz1TEZtYnuLiZLdA6c7JysAUJcHMrogu4Cpr",
                                    "kind": "contract"
                                },
                                {
                                    "category": "deposits",
                                    "change": "80000000",
                                    "cycle": 20,
                                    "delegate": "tz1TEZtYnuLiZLdA6c7JysAUJcHMrogu4Cpr",
                                    "kind": "freezer"
                                },
                                {
                                    "category": "rewards",
                                    "change": "3333332",
                                    "cycle": 20,
                                    "delegate": "tz1TEZtYnuLiZLdA6c7JysAUJcHMrogu4Cpr",
                                    "kind": "freezer"
                                }
                            ],
                            "delegate": "tz1TEZtYnuLiZLdA6c7JysAUJcHMrogu4Cpr",
                            "slots": [
                                25,
                                20,
                                3,
                                0
                            ]
                        }
                    }
                ],
                "protocol": "PsCARTHAGazKbHtnKfLzQg3kms52kSRpgnDY982a9oYsSXRLQEb",
                "branch": "BMTvSL9DYnZj3CDwnY4kUo1fRpX5VN8afj47soRtygi3BCtb9xp",
                "chain_id": "NetXjD3HPJJjmcd"
            },
            {
                "chain_id": "NetXjD3HPJJjmcd",
                "protocol": "PsCARTHAGazKbHtnKfLzQg3kms52kSRpgnDY982a9oYsSXRLQEb",
                "branch": "BMTvSL9DYnZj3CDwnY4kUo1fRpX5VN8afj47soRtygi3BCtb9xp",
                "contents": [
                    {
                        "kind": "endorsement",
                        "level": 40999,
                        "metadata": {
                            "balance_updates": [
                                {
                                    "change": "-20000000",
                                    "contract": "tz1PV5g16m9hHMAVJ4Hx6NzzUHgksDnTLFcK",
                                    "kind": "contract"
                                },
                                {
                                    "category": "deposits",
                                    "change": "20000000",
                                    "cycle": 20,
                                    "delegate": "tz1PV5g16m9hHMAVJ4Hx6NzzUHgksDnTLFcK",
                                    "kind": "freezer"
                                },
                                {
                                    "category": "rewards",
                                    "change": "833333",
                                    "cycle": 20,
                                    "delegate": "tz1PV5g16m9hHMAVJ4Hx6NzzUHgksDnTLFcK",
                                    "kind": "freezer"
                                }
                            ],
                            "delegate": "tz1PV5g16m9hHMAVJ4Hx6NzzUHgksDnTLFcK",
                            "slots": [
                                29
                            ]
                        }
                    }
                ],
                "signature": "sigYpbeNd3TxytYZBATmbQWqrdU1uNvqe4jW4Yn7gp4nbKstw1noivfsAS3PA8yUscZwt31ucgbqcPyCvQAyJNnELKQy9G8B",
                "hash": "ooniLRhmsprYtDjMP9WGMJ5P9BH8j6yYG5nLDewgVPqi1toXQ6F"
            }
        ],
        [],
        [],
        []
    ]
}
```

&nbsp;
&nbsp;
&nbsp;
