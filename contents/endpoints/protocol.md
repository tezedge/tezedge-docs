---
title: Protocol
sidebar: Docs
showTitle: false
---

# Protocol

* Context ( Blockchain State )
    - [Cycle](#cycle)
    - [Constants](#constants)
    - [Endorsing Rights](#endorsing-rights)
    - [Baking Rights](#baking-rights)


&nbsp;

## Cycle

Returns info about the cycle


*Request*

```bash
GET /chains/<chain_id>/blocks/<block_id>/context/raw/json/cycle/<cycle_id> 
```  

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `block_id` *string* | Id of the requested block |
| `chain_id` *string* | Id of the requested chain |
| `cycle_id` *string* | Id of the requested cycle |

*Response*

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `random_seed` *string* |  Athe 32 byte seed generated from the committed nonces |  
| `roll_snapshot` *i32* |  A randomly selected snapshot for the requested cycle  |

&nbsp;
&nbsp;

*Example Browser*

<a href="http://carthage.tezedge.com:18732/chains/main/blocks/1/context/raw/json/cycle/1"
target="_blank">http://carthage.tezedge.com:18732/chains/main/blocks/1/context/raw/json/cycle/1
</a>

*Example Request*


```bash
curl http://carthage.tezedge.com:18732/chains/main/blocks/1/context/raw/json/cycle/1
```

*Example Response*


```JSON
{
    "roll_snapshot": 0,
    "random_seed": "c8db55740733852aa18aa82e108e4475b1abcf3f1f077ac966e9cecca86612ec"
}
```
&nbsp;

&nbsp;

## Constants

Returns all the constants specified in the protocol


*Request*


```bash
GET /chains/<chain_id>/blocks/<block_id>/context/constants
```

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `chain_id` *string* | Id of the requested chain |
| `block_id` *string* | Requested block Id |  

*Response*

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
| `quorum_max` (i32) | Maximum value a quorum can reach expressed in percentage multiplied by 100. |
| `quorum_min` *i32* | Minimum quorum for a voting period to be successful, expressed in percentage multiplied by 100. |
| `seed_nonce_revelation_tip` *BigInt* | The amount of mutez awarded for including a nonce reveal operation |
| `test_chain_duration` *i64* | Lifetime of the testchain in seconds. |
| `time_between_blocks` *i64* | Used for calculating estimated timestamps. |
| `tokens_per_roll` *BigInt* | Number of mutez needed for one roll. |



&nbsp;
&nbsp;

*Example Browser*

<a href="http://carthage.tezedge.com:18732/chains/main/blocks/head/context/constants"
target="_blank">http://carthage.tezedge.com:18732/chains/main/blocks/head/context/constants
</a>


*Example Request*


```bash
curl http://carthage.tezedge.com:18732/chains/main/blocks/head/context/constants
```

*Example Response*

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
&nbsp;

## Endorsing Rights

Returns the endorsing rights for a level. The default behavior is to return the rights for the provided `block_id`.


*Request*

```bash
GET /chains/<chain_id>/blocks/<block_id>/helpers/endorsing_rights?(level=<block_level>)*&(cycle=<block_cycle>)*&(delegate=<pkh>)
```  


| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `block_id` *string* | Requested block Id |  
| `chain_id` *string* | Id of the requested chain |


*Optional query arguments*

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `cycle` *i32* | Retrieve the rights for the entire current cycle. |
| `delegate` *i32* | Filters the results, showing only the rights for this delegate. |
| `level` *i32* | Block level at which the rights will be retrieved. |

*Response*

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `delegate` *string* | The delegates pkh (private key hash, e.g. tz1..) which will perform the endorsement |
| `estimated_time` *rfc3339* | The estimated time when the endorsing will start. For rights requested behind the provided block_id, this field is omitted. |
| `level` *i32* | Level of the block to be endorsed. |
| `slots` *[i32]* | List of all the endorsing slots the delegate is meant to fill |


&nbsp;
&nbsp;

*Example Browser*

<a href="http://carthage.tezedge.com:18732/chains/main/blocks/1/helpers/endorsing_rights"
target="_blank">http://carthage.tezedge.com:18732/chains/main/blocks/1/helpers/endorsing_rights
</a>

*Example Request*


```bash
curl http://carthage.tezedge.com:18732/chains/main/blocks/1/helpers/endorsing_rights

```

*Example Response*

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

&nbsp;

## Baking Rights

Returns the baking rights for a level. The default behavior is to return the rights for the successor of the provided `block_id` (the next block). Delegates that have at least one priority assigned below `max_priority` (the default is 64) display their best priority.


*Request*


```bash
GET /chains/:chain_id/blocks/:block_id/helpers/baking_rights?(level=<block_level>)*&(cycle=<block_cycle>)*&(delegate=<pkh>)*&[max_priority=<int>]&[all]
```

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `block_id` *string* | Requested block Id |  
| `chain_id` *string* | Id of the requested chain |

*Optional query arguments*

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `all` | Returns all priorities instead of just the best one |
| `cycle` *i32* | Retrieve the rights for the entire current cycle. |
| `delegate` *string* | Filters the results, showing only the rights for this delegate. |
| `level` *i32* | Block level at which the rights will be retrieved. |
| `max_priority` *i32* | The maximum priority to calculate. The default is 64.

*Response*

Returns a list of objects with the following fields, sorted by priority:

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `delegate` *string* | pkh (private key hash, e.g. tz1..) which will perform the endorsement |
| `estimated_time` *rfc3339* | The estimated time at which the baking will take place. For rights requested behind the provided block_id, this field is omitted |
| `level` *i32* | The level of the block to which the rights are calculated. |
| `priority` *i32* | The priority of the delegate |



&nbsp;
&nbsp;

*Example Browser*

<a href="http://carthage.tezedge.com:18732/chains/main/blocks/1/helpers/baking_rights"
target="_blank"> http://carthage.tezedge.com:18732/chains/main/blocks/1/helpers/baking_rights
</a>


*Example Request*


```bash
curl http://carthage.tezedge.com:18732/chains/main/blocks/1/helpers/baking_rights
```

*Example Response*

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

&nbsp;

