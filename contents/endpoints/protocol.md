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
| `chain_id`        |  |
| `block_id`        |  |  
| `cycle_id`        |  |  


*Response:*

| Field                |                  Description                           |
|----------------------|--------------------------------------------------------|
| `roll_snapshot`      |  A randomly selected snapshot for the requested cycle  |
| `random_seed`        |  Athe 32 byte seed generated from the committed nonces |  

&nbsp;
&nbsp;

*Example Request:*


```bash
curl http://tezedge.com/chains/main/blocks/head/context/raw/json/cycle/10
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



