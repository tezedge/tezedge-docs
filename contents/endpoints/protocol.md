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



