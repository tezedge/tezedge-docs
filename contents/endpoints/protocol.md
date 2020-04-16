---
title: Protocol
sidebar: Docs
showTitle: false
---

# Shell


## Cycle

Returns info about the cycle

&nbsp;

### *Request:*

```bash
GET /chains/<chain_id>/blocks/<block_id>/context/raw/json/cycle/<cycle_id> 
```  

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `block_id` *string* | Description |
| `chain_id` *string* | Description |
| `cycle_id` *string* | Description |

### *Response:*

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `random_seed` *string* |  Athe 32 byte seed generated from the committed nonces |  
| `roll_snapshot` *string* |  A randomly selected snapshot for the requested cycle  |

&nbsp;
&nbsp;

*Example Request:*


```bash
curl http://carthage.tezedge.com:18732/chains/main/blocks/1/context/raw/bytes/cycle
```

*Example Response:*


```JSON
{
    "16": {
        "last_roll": {
            "6": 100,
            "7": "00000502",
            "1": ["aa",12],
            "0": "00000502",
            "3": "00000502",
            "5": "00000502",
            "2": "00000502",
            "4": "00000502"
        },
        "roll_snapshot": "0008"
    },
    "12": {
        "last_roll": {
            "1": "000003c7"
        }
    }
}
```

## Endorsing Rights

Returns the endorsing rights for a level. The default behavior is to return the rights for the provided block_id.

&nbsp;

### *Request:*

```bash
GET /chains/<chain_id>/blocks/<block_id>/helpers/endorsing_rights?(level=<block_level>)*&(cycle=<block_cycle>)*&(delegate=<pkh>)
```  


| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `block_id` *string* | Requested block Id |  
| `chain_id` *string* | Id of the requested chain |


### *Optional query arguments:*

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `cycle` *int32* | Retrieve the rights for entire current cycle. |
| `delegate` *int32* | Filters the results, showing only the rights for this delegate. |
| `level` *int32* | Block level at which the rights will be retrieved. |

### *Response*
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `delegate` *string* | The delegates pkh (private key hash, e.g. tz1..) which will perform the endorsement |
| `estimated_time` *rfc3339 timestamp* | The estimated time when the endorsing will start. For rights requested behind the provided block_id, this field is omitted. |
| `level` *int32* | Level of the block to be endorsed. |
| `slots` *[i32]* | List of all the endorsing slots the delegate is meant to fill |


*Example Request:*


```bash
curl http://carthage.tezedge.com:18732/chains/main/blocks/1/helpers/endorsing_rights

```

*Example Response:*

```JSON
[
  {
    "slots": [
      23,
      18,
      13,
      9,
      5,
      0
    ],
    "delegate": "tz1YH2LE6p7Sj16vF6irfHX92QV45XAZYHnX",
    "estimated_time": "2019-11-29T09:26:49Z",
    "level": 1
  },
  {
    "delegate": "tz1TEZtYnuLiZLdA6c7JysAUJcHMrogu4Cpr",
    "estimated_time": "2019-11-29T09:26:49Z",
    "level": 1,
    "slots": [
      28,
      25,
      4,
      2
    ]
  },
  {
    "level": 1,
    "slots": [
      31,
      16,
      11,
      10
    ],
    "estimated_time": "2019-11-29T09:26:49Z",
    "delegate": "tz1RomaiWJV3NFDZWTMVR2aEeHknsn3iF5Gi"
  },
  {
    "delegate": "tz1PirboZKFVqkfE45hVLpkpXaZtLk3mqC17",
    "level": 1,
    "estimated_time": "2019-11-29T09:26:49Z",
    "slots": [
      22,
      20,
      15,
      7,
      3
    ]
  },
  {
    "slots": [
      29,
      24
    ],
    "estimated_time": "2019-11-29T09:26:49Z",
    "level": 1,
    "delegate": "tz1PV5g16m9hHMAVJ4Hx6NzzUHgksDnTLFcK"
  },
  {
    "delegate": "tz1NRTQeqcuwybgrZfJavBY3of83u8uLpFBj",
    "estimated_time": "2019-11-29T09:26:49Z",
    "slots": [
      30,
      26,
      21,
      19,
      12,
      8,
      6,
      1
    ],
    "level": 1
  },
  {
    "level": 1,
    "delegate": "tz1Kz6VSEPNnKPiNvhyio6E1otbSdDhVD9qB",
    "slots": [
      27,
      17,
      14
    ],
    "estimated_time": "2019-11-29T09:26:49Z"
  }
]
```

## Baking Rights

Returns the baking rights for a level. The default behavior is to return the rights for the successor of the provided block_id (the next block). Delegates that have at least one priority assigned below max_priority (the default is 64) display their best priority.

&nbsp;

### *Request:*

```bash
GET /chains/:chain_id/blocks/:block_id/helpers/baking_rights?(level=<block_level>)*&(cycle=<block_cycle>)*&(delegate=<pkh>)*&[max_priority=<int>]&[all]
```

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `block_id` *string* | Requested block Id |  
| `chain_id` *string* | Id of the requested chain |

### *Optional query arguments:*

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `all` | Returns all priorities instead of just the best one |
| `cycle` *int32* | Retrieve the rights for the entire current cycle. |
| `delegate` *string* | Filters the results, showing only the rights for this delegate. |
| `level` *int32* | Block level at which the rights will be retrieved. |
| `max_priority` *int32* | The maximum priority to calculate. The default is 64.

### *Response*

Returns a list of objects with the following fields, sorted by priority:

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `delegate` *string* | pkh (private key hash, e.g. tz1..) which will perform the endorsement |
| `estimated_time` *rfc3339 timestamp* | The estimated time at which the baking will take place. For rights requested behind the provided block_id, this field is omitted |
| `level` *int32* | The level of the block to which the rights are calculated. |
| `priority` *int32* | The priority of the delegate |

*Example Request:*


```bash
curl http://carthage.tezedge.com:18732/chains/main/blocks/1/helpers/baking_rights
```

*Example Response:*

```JSON
[
  {
    "delegate": "tz1RomaiWJV3NFDZWTMVR2aEeHknsn3iF5Gi",
    "estimated_time": "2019-11-29T09:27:19Z",
    "level": 2,
    "priority": 0
  },
  {
    "level": 2,
    "delegate": "tz1NRTQeqcuwybgrZfJavBY3of83u8uLpFBj",
    "priority": 1,
    "estimated_time": "2019-11-29T09:27:59Z"
  },
  {
    "priority": 2,
    "estimated_time": "2019-11-29T09:28:39Z",
    "level": 2,
    "delegate": "tz1Kz6VSEPNnKPiNvhyio6E1otbSdDhVD9qB"
  },
  {
    "delegate": "tz1PV5g16m9hHMAVJ4Hx6NzzUHgksDnTLFcK",
    "estimated_time": "2019-11-29T09:29:19Z",
    "level": 2,
    "priority": 3
  },
  {
    "priority": 4,
    "level": 2,
    "delegate": "tz1TEZtYnuLiZLdA6c7JysAUJcHMrogu4Cpr",
    "estimated_time": "2019-11-29T09:29:59Z"
  },
  {
    "estimated_time": "2019-11-29T09:30:39Z",
    "priority": 5,
    "level": 2,
    "delegate": "tz1YH2LE6p7Sj16vF6irfHX92QV45XAZYHnX"
  },
  {
    "priority": 7,
    "level": 2,
    "delegate": "tz1PirboZKFVqkfE45hVLpkpXaZtLk3mqC17",
    "estimated_time": "2019-11-29T09:31:59Z"
  }
]
```

## Constants

Returns all the constants specified in the protocol

&nbsp;

### *Request:*

```bash
GET /chains/<chain_id>/blocks/<block_id>/context/constants
```

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `chain_id` *string* | Id of the requested chain |
| `block_id` *string* | Requested block Id |  

### *Response:*

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `baking_reward_per_endorsement` *[BigInt]* | List of values used for block reward calculation. |
| `block_security_deposit` *BigInt* | Deposit per baked block. |
| `blocks_per_commitment` *i32* | The number of blocks between 2 nonce-containing blocks for the random seed calculation (commitment == hash of a nonce). |
| `blocks_per_cycle` *i32* | Number of blocks in a cycle. |
| `blocks_per_roll_snapshot` *i32* |  Number of blocks between 2 snapshot blocks. |
| `blocks_per_voting_period` *i32* | Number of blocks in one voting period
| `cost_per_byte` *BigInt* | Cost in Mutez per bytes used in contracts. |
| `delay_per_missing_endorsement` *i64* | Expressed in seconds. Used in calculation of the minimal delay between baked blocks. |
| `endorsement_reward` *BigInt* | List of values used for endorsement reward calculation. |
| `endorsement_security_deposit` *BigInt* | Deposit per endorsement slot. |
| `endorsers_per_block` *u16* | Number of endorser slots per block. |
| `hard_gas_limit_per_block` *BigUInt* | maximum total gas usage of one block. |
| `hard_gas_limit_per_operation` *BigUInt* | Maximum gas used per operation. |
| `hard_storage_limit_per_operation` *BigUInt* | Maximum amount of bytes the storage limit of a transaction can be set to. |
| `initial_endorsers` *u16* | Value used in calculation of the minimal delay between baked blocks. |
| `max_operation_data_length` *i32* | Maximum size of an operation in bytes. |
| `max_proposals_per_delegate` *u8* | Maximum number of proposals per delegate in one proposal period. |
| `max_revelations_per_block` | Max possible number of nonce revelations contained in a block. |
| `michelson_maximum_type_size` | Maximum size of a type structure in Michelson. |
| `min_proposal_quorum` *i32* | The minimal quorum needed to proceed from the proposal period expressed in a percentage multiplied by 100 (for instance, 5% is represented by 500). |
| `nonce_length` *u8* | length of the baker generated nonce for random_seed generation. |
| `origination_size` *i32* | Size of the contract script of the origination operation. |
| `preserved_cycles` *u8*  | Number of preserved cycles. |
| `proof_of_work_nonce_size` *u8* | Size (in bytes) of the lightweight proof-of-work nonce. |
| `proof_of_work_threshold` *i64* | The threshold of a hash generated in a lightweight proof of work (PoW) task. |
| `quorum_max` (int32) | Maximum value a quorum can reach expressed in percentage multiplied by 100. |
| `quorum_min` *int32* | Minimal quorum for a voting period to be successful, expressed in percentage multiplied by 100. |
| `seed_nonce_revelation_tip` *BigInt* | The amount of mutez awarded for including a nonce reveal operation |
| `test_chain_duration` *i64* | Lifetime of the testchain in seconds. |
| `time_between_blocks` *i64* | Used for calculating estimated timestamps. |
| `tokens_per_roll` *BigInt* | Number of mutez needed for one roll. |


*Example Request:*


```bash
curl http://carthage.tezedge.com:18732/chains/main/blocks/45000/context/constants
```

*Example Response:*

```JSON
{
  "baking_reward_per_endorsement": [
    "1250000",
    "187500"
  ],
  "block_security_deposit": "168000000",
  "blocks_per_commitment": 32,
  "blocks_per_cycle": 2048,
  "blocks_per_roll_snapshot": 256,
  "blocks_per_voting_period": 2048,
  "cost_per_byte": "1000",
  "delay_per_missing_endorsement": "2",
  "endorsement_reward": [
    "1250000",
    "833333"
  ],
  "endorsement_security_deposit": "21000000",
  "endorsers_per_block": 32,
  "hard_gas_limit_per_block": "10400000",
  "hard_gas_limit_per_operation": "1040000",
  "hard_storage_limit_per_operation": "60000",
  "initial_endorsers": 24,
  "max_operation_data_length": 16384,
  "max_proposals_per_delegate": 20,
  "max_revelations_per_block": 32,
  "michelson_maximum_type_size": 1000,
  "min_proposal_quorum": 500,
  "nonce_length": 32,
  "origination_size": 257,
  "preserved_cycles": 3,
  "proof_of_work_nonce_size": 8,
  "proof_of_work_threshold": "70368744177663",
  "quorum_max": 7000,
  "quorum_min": 3000,
  "seed_nonce_revelation_tip": "125000",
  "test_chain_duration": "43200",
  "time_between_blocks": [
    "30",
    "40"
  ],
  "tokens_per_roll": "8000000000"
}
```

## Block Header

Retrieves the block header for the requested block_id

&nbsp;

### *Request*

```bash
GET /chains/<chain_id>/blocks/<block_id>/header
```

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `chain_id` *string* | Id of the requested chain |
| `block_id` *string* | Requested block Id |  

### *Response*

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `hash` *String* | Base58Check encoded block hash. |
| `chain_id` *string* | Base58Check encoded chain id. |
| `level` *i32* | Level (height) of the block. |
| `proto` *u8* | Protocol number used to bake the block. |
| `predecessor` *string* | Base58Check encoded block hash of the previous block. |
| `timestamp` *RFC3339 timestamp* | Block baking timestamp. |
| `validation_pass` | Number of validation passes. |
| `operations_hash` *string* | Base58Check encoded hash of a list of root hashes of Merkle trees of operations. |
| `fitness` *bytes* | A sequence of sequences of unsigned bytes, ordered by length and then lexicographically. It represents the claimed fitness of the chain ending in this block. |
| `context` *string* | Base58Check encoded hash of the state of context after application of this block. |
| `protocol` *string* | Base58Check encoded hash of the protocol. |
| `signature` *string* | Base58Check encoded digital signature of the shell and protocol headers. |
| `priority` *u16* | The baking priority of the delegate who baked the block. |
| `proof_of_work_nonce` *i64* | Nonce used to pass a low-difficulty PoW task for the block. |



*Example Request:*

```bash
curl http://carthage.tezedge.com:18732/chains/main/blocks/45000/header
```

*Example Response:*

```JSON
{
  "hash": "BLg5rN8iXmMsvHYaNNDcKDxWLZHLd7P9W6JqmUzSWchWg3Tjz5u",
  "chain_id": "NetXjD3HPJJjmcd",
  "level": 45000,
  "proto": 2,
  "predecessor": "BLqSF8Ygr5StTZbTQnSHgUJ7kqhehQZ6sSUZjiWvxs7q8GUpRJ3",
  "timestamp": "2019-12-18T00:03:41Z",
  "validation_pass": 4,
  "operations_hash": "LLoahcXBJnEf3sVtZatccb1oCyJRB76yk8CpGwWrJir4WJKvEjzav",
  "fitness": [
    "01",
    "000000000000afc7"
  ],
  "context": "CoWSFir6DJyUH4LGWUsLhU8W9axrDNuc9scTZGmeoNLW3gLRcrBz",
  "protocol": "PsCARTHAGazKbHtnKfLzQg3kms52kSRpgnDY982a9oYsSXRLQEb",
  "signature": "sigUWnLb3fSsExGaQnwSyZMBxV8BFAPqyFxy1D29t16espAx47eVtKNYASGXZQznsFU7CKaU62PQAcmYXfTMLcWQDqiPoqHt",
  "priority": 1,
  "proof_of_work_nonce": "b1a7b92b3a4c0500"
}
```

## Commit hash

Returns node build information. Specifically the git commit hash.

&nbsp;

### *Request*

```bash
GET /monitor/commit_hash
```

### *Response*

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| *String* |  Git commit hash. |


*Example Request:*

```bash
curl http://carthage.tezedge.com:18732/monitor/commit_hash
```

*Example Response:*

```JSON
"a42d44b30f938a976731367c857a58633386a668"
```

## Bootstrapped

Returns bootstrap information.

&nbsp;

### *Request*

```bash
GET /chains/<chain_id>/blocks/<block_id>/header
```

### *Response*

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `block` *String* |  Base58Check encoded block hash. |
| `timestamp` *RFC3339 timestamp* | Block baking timestamp. |

*Example Request:*

```bash
curl http://carthage.tezedge.com:18732/monitor/bootstrapped
```

*Example Response:*

```JSON
{
  "block": "BLivkZRMjPkUXU4Wo7EzHpEArtWYUNwbkjzQvWo8UbTD9CKeeME",
  "timestamp": "2020-04-15T09:37:59Z"
}
```

## Block

Returns all the information about a block for the supplied block_id

&nbsp;

### *Request*

```bash
GET /chains/<chain_id>/blocks/<block_id>
```

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `chain_id` *string* | Id of the requested chain |
| `block_id` *string* | Requested block Id |  


### *Response*

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `hash` *String* | Base58Check encoded block hash. |
| `chain_id` *string* | Base58Check encoded chain id. |
| `header` | [Header fields](#header) |
| `metadata` | [Metadata fields](#metadata) |
| `operations` | [Operations fields](#operations) |
| `balance_updates` | List of [Balance update fields](#balance-update) |


#### Header

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `level` *i32* | Block level. |
| `proto` *u8* | Protocol used to create the block. |
| `predecessor` *string* | Base58Check encoded block hash. |
| `timestamp` *RFC3339 timestamp* | Time at which block was baked. |
| `validation_pass` *u8* | Number of validation passes. |
| `operations_hash` *string* | Base58Check encoded hash of a list of root hashes of Merkle trees of operations. |
| `fitness` *string* |  A sequence of sequences of unsigned bytes, ordered by length and then lexicographically. It represents the claimed fitness of the chain ending in this block. |
| `context` *string* | Base58Check encoded hash of the state of context, after application of this block. |
| `protocol_data` | The protocol-specific fragment of the block header. |


#### Metadata

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `protocol` *string* |  Base58Check encoded protocol hash. |
| `next_protocol` *string* | Base58Check encoded protocol hash. |
| `test_chain_status` | [*Test chain status*](#test-chain-status) |
| `max_operations_ttl` *i31* | The "time-to-live" of operation for the next block. | 
| `max_operation_data_length` *i31* | The maximum size of an operation in bytes. |
| `max_block_header_length` *i31* | The maximum size of a block header in bytes. |
| `max_operation_list_length`| [Max operation list lengths](#max-operation-list-lenghts) |
| `baker` *string* | Base58Check encoded private key hash of the baker (tz1...). |
| `level` | [Level](#level) |
| `voting_period_kind` *string* | The voting period the block was baked in. |
| `nonce_hash` *string* | Base58Check encoded nonce hash. Returns null, if nonce_hash is not present. |
| `consumed_gas` *BigInt* | Total gas consumed by creating the block and including it in the blockchain. |
| `deactivated` *string* | List of Base58Check encoded public key hashes (tz1....) which baking was deactivated. |
| `balance_updates` | [Balance update](#balance-update) | 



#### Operations

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `protocol` *string* | Base58Check encoded protocol hash. |
| `chain_id` *string* | Base58Check encoded chain id of the chain the operation was executed on. |
| `hash` *string* | Base58Check encoded operation hash. |
| `branch` *string* | Base58Check encoded block hash of a branch root block. | 
| `contents` | [Operation contents](#operation-contents) or [Operation Contents And Result](#operation-contents-and-result) |
| `signature` *(optional) string* | Base58Check encoded signature of the operation. |

#### Max operation list lengths
Bounds for the maximum list size or maximum operation count.

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `max_size` *int31* | Maximum size of the list in bytes. |
| `max_op` *(optional) int31* | Maximum operation count. |


#### Test chain status
Structure indicating the status of a forked test chain.

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `status` *string* | The status of the test chain. |

The next fields are dependant on the `status` field.

##### forking
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `protocol` *string* | Base58Check encoded protocol hash of the activated protocol on the test chain. |
| `expiration ` *i32* | Expiration of the test chain, in seconds. |

##### running
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `protocol` *string* | Base58Check encoded protocol hash of the activated protocol on the test chain. |
| `expiration ` *i32* | Expiration of the test chain, in seconds. |
| `chain_id` *string* | Base58Check encoded chain id of the running test chain. |
| `genesis` *string* | Base58Check encoded block hash of the genesis block on the test chain. |

#### Level
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

#### Balance update
Structure representing information about the various balance changes that happened in the included operations.

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `kind` *string* | The type or “kind” of the balance update. |
| `change` *BigInt* | The difference in balance after the operation. |

The next fields are dependant on the `kind` field.

##### contract
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `contract` *string* | Base58Check encoded private key hash of the contract whose balance was changed. | <!-- check grammar pls --> 

##### freezer
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `category` *string* | The category of the frozen balance. |
| `delegate  ` *string* | Base58Check encoded private key hash of the delegate whose balance was changed. |
| `cycle` *i32* | The cycle the balance is frozen for. | <!-- check grammar pls -->

#### Operation Contents
The contents of the executed operations.

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `kind` *string* | The type or kind of the operation. |

The next fields are dependant on the `kind` field.

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

The next fields are dependant on the *kind* field.

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
| `int` *BigInt* | Experssion value. |

---------------------------------------------------------------------------------------------------------------------------

#### Michelson string expression

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `string` *string* | Experssion value. |

---------------------------------------------------------------------------------------------------------------------------

#### Michelson bytes expression

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `bytes` *string* | Experssion value. Bytes in string format.  |

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
| `nonce` *positive i16* | //TODO  |

The next fields are dependant on the `kind` field.

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

The next fields are dependant on the *status* field.

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

The next fields are dependant on the *status* field.

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

The next fields are dependant on the *status* field.

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

The next fields are dependant on the `status` field.

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
| `action` *string* | The action applied to the BigMap (update | remove | copy | alloc). |

The next fields are dependant on the `action` field.

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


