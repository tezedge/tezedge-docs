---
title: Protocol
sidebar: Docs
showTitle: false
---

# Shell


## Cycle

Returns info about the cycle

&nbsp;

*Request:*

```bash
GET /chains/<chain_id>/blocks/<block_id>/context/raw/json/cycle/<cycle_id> 
```  

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `chain_id` *string* | Description |
| `block_id` *string* | Description |  
| `cycle_id` *string* | Description |  


*Response:*

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `roll_snapshot` *string* |  A randomly selected snapshot for the requested cycle  |
| `random_seed` *string* |  Athe 32 byte seed generated from the committed nonces |  

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

Supported RPCs:

`/monitor/bootstrapped
/monitor/commit_hash
/chains/:chain_id/blocks/:block_id
/chains/:chain_id/blocks/:block_id/header
/chains/:chain_id/blocks/:block_id/context/constants
/chains/:chain_id/blocks/:block_id/context/raw/bytes/cycle
/chains/:chain_id/blocks/:block_id/context/raw/bytes/rolls/owner/current
/chains/:chain_id/blocks/:block_id/context/raw/json/cycle/:cycle_id
/chains/:chain_id/blocks/:block_id/helpers/baking_rights
/chains/<chain_id>/blocks/<block_id>/helpers/endorsing_rights`


Description:

```bash
GET /chains/<chain_id>/blocks/<block_id>/helpers/endorsing_rights?(level=<block_level>)*&(cycle=<block_cycle>)*&(delegate=<pkh>)
```  

Returns the endorsing rights for a level. The default behavior is to return the rights for the provided block_id.
 
*Optional query arguments:*

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `level` *int32* | Block level at which the rights will be retrieved. |
| `cycle` *int32* - Retrieve the rights for entire current cycle. |  
| `delegate` *int32* | Filters the results, showing only the rights for this delegate. |  

*Response fields*
| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `estimated_time` *rfc3339 timestamp* | The estimated time when the endorsing will start. For rights requested behind the provided block_id, this field is omitted. |
| `delegate` *string* - The delegates pkh (private key hash, e.g. tz1..)which will perform the endorsement |
| `level` *int32* | Level of the block to be endorsed. |
| `slots` *int32* | List of all the endorsing slots the delegate is meant to fill | 




