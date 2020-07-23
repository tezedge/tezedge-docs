---
title: Debugger
sidebar: Docs
showTitle: false
---

# Debugger

* Context ( Debugger endpoints )
    - [P2P message](#p2p)
    - [Log messages](#log)
    - [RPC messages](#rpc)

&nbsp;

## P2P

Reverse cursor over captured P2P messages.


*Request*

```bash
GET /v2/p2p?(cursor_id=<message_id>)&(limit=<count_limit>)&(remote_addr=<remote_address>)&(incoming=<incoming_flag>)&(types=<message_types>)&(source_type=<source_type>)
```

*Optional query arguments*

|                               |                                                                                                                                                          |
|-------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `cursor_id` *unsigned number* | Specifies start of the cursor. If no value is provided, the latest message is used as cursor.                                                            |
| `limit` *unsigned number*     | Limits result to returning at most specified amount of messages.                                                                                         |
| `remote_addr` *string*        | Filter results to only contain messages exchanged between local node and node specified by the given address. Address should be of `<IP>:<PORT>` format. |
| `incoming` *boolean*          | Filter results to only contain incoming or outgoing messages.                                                                                            |
| `types` *string*              | Filters results to only contain messages of specified types. String should be comma separated list of values. Allowed types: `tcp, metadata, connection_message, rest_message, p2p_message, disconnect, advertise, swap_request, swap_ack, bootstrap, get_current_branch, current_branch, deactivate, get_current_head, current_head, get_block_headers, block_header, get_operations, operation, get_protocols, protocol, get_operation_hashes_for_blocks, operation_hashes_for_block, get_operations_for_blocks, operations_for_blocks`                                            |
| `source_type` *string*        | Filters results to only contain messages of specific source. String should contain either value `local` or `remote`.                                     |

*Response*
List of JSON values with properties:

|                 |                                    |
|-----------------|------------------------------------|
| `type` *string* | Type of contained message          | 
| `incoming` *boolean* | Flag determining if message was sent or recevied by local node. |
| `timestamp` *number* | Unix timestamp representing when was message processed. |
| `id` *number*  |  Identification number of message. |
| `source_type` *string* | Source type of message, either `local` or `remote`. |
| `remote_addr` *string* | Socket address of remote node. Formatted as `<IP>:<PORT>` |
| `message` *objects* | JSON representation of received message. Each message type has its own representation. |

*Example Request*

```bash
# Get all connection messages and metadata messages sent by remote peer 134.209.234.131:19732
curl "carthage.tezedge.com:11000/v2/p2p?remote_addr=134.209.234.131:19732&limit=2&types=connection_message,metadata&incoming=true" 
```

*Example Response*

```JSON
[
  {
    "type": "metadata",
    "incoming": true,
    "timestamp": 1595497615554685000,
    "id": 78539,
    "source_type": "remote",
    "remote_addr": "134.209.234.131:19732",
    "message": {
      "type": "metadata_message",
      "disable_mempool": false,
      "private_node": false
    }
  },
  {
    "type": "connection_message",
    "incoming": true,
    "timestamp": 1595497615526494200,
    "id": 78532,
    "source_type": "remote",
    "remote_addr": "134.209.234.131:19732",
    "message": {
      "type": "connection_message",
      "port": 19732,
      "versions": [
        {
          "chain_name": "TEZOS_ALPHANET_CARTHAGE_2019-11-28T13:02:13Z",
          "distributed_db_version": 0,
          "p2p_version": 0
        }
      ],
      "public_key": "idtpBRh6NtHCxP1EqMBHHptkDEdn2s",
      "proof_of_work_stamp": "7b9b4a04480f3486cc734691cef259ebf4b80aa7d069c688",
      "message_nonce": "53e65244837811045fb86dd4ef4ea699eea80512ff1c99f0"
    }
  }
]
```

&nbsp;


## Log

Returns cursor over captured log messages produced by node.


*Request*

```bash
GET /v2/log?(cursor_id=<message_id>)&(limit=<count_limit>)&(level=<log_level>)&(timesstamp=<message_timestamp>)
```


*Optional query arguments*

|                               |                                                                                                                                                          |
|-------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `cursor_id` *unsigned number* | Specifies start of the cursor. If no value is provided, the latest message is used as cursor.                                                            |
| `limit` *unsigned number*     | Limits result to returning at most specified amount of messages.                                                                                         |
| `level` *string* | Level of captured message. Allowed levels: `trace, debug, info, notice, warn, warning, error, fatal` |
| `timestamp` *number* | Unix timestamp representing when was message processed. |

*Response*

|        |        |
|--------|--------|
| `level` *string* | Message importance level. |
| `timestamp` *number* | UNIX timestamp, when was log received. |
| `section` *string* | Section of code, from which the log originated, if any. |
| `message` *string* | Content of the log. |
| `id` *number* | Identification number of this log. |

*Example Request*

```bash
# Get last 4 log message from running node starting from 7/23/2020, 1:10:12 PM containing only information messages
curl "carthage.tezedge.com:11000/v2/log?limit=4&timestamp=1595502612378870000&level=info" 
```

*Example Response*

```JSON
[
  {
    "level": "info",
    "timestamp": 1595502612378825000,
    "section": "",
    "message": "Update current head to BLbnKqeQiv1kmSC3WVQe9e6ivS51GbfvbkQ3gWV7Aby2oHu4Rob (fitness 01)",
    "id": 136375
  },
  {
    "level": "info",
    "timestamp": 1595502612378266000,
    "section": "",
    "message": "Request pushed on 2020",
    "id": 136374
  },
  {
    "level": "info",
    "timestamp": 1595502612378218000,
    "section": "",
    "message": "switching to new head BLbnKqeQiv1kmSC3WVQe9e6ivS51GbfvbkQ3gWV7Aby2oHu4Rob",
    "id": 136373
  },
  {
    "level": "info",
    "timestamp": 1595502612351503000,
    "section": "",
    "message": "Request pushed on 2020",
    "id": 136372
  }
]
```

&nbsp;

## RPC

Returns cursor over captured RPC messages.


*Request*

```bash
GET /v2/rpc?(cursor_id=<message_id>)&(limit=<count_limit>)&(remote_addr=<remote_address>)
```


*Optional query arguments*

|                               |                                                                                                                                                          |
|-------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `cursor_id` *unsigned number* | Specifies start of the cursor. If no value is provided, the latest message is used as cursor.                                                            |
| `limit` *unsigned number*     | Limits result to returning at most specified amount of messages.                                                                                         |
| `remote_addr` *string* | Level of captured message. Allowed levels: `trace, debug, info, notice, warn, warning, error, fatal` |

*Response*

|        |        |
|--------|--------|
| `incoming` *boolean* | Filter results to only contain incoming or outgoing messages.  |
| `timestamp` *number* | UNIX timestamp, when was message received. |
| `remote_addr` *string*        | Filter results to only contain messages exchanged between local node and node specified by the given address. Address should be of `<IP>:<PORT>` format. |
| `id` *number* | Identification number of this log. |
| `message` *string* | Content of the message. Is either a `Request` or `Response` |

*`Request` message structure*

|        |        |
|--------|--------|
| `type` *string* | Type of message, always `request`. | 
| `method` *string* | RPC method name `GET`, `SET` etc. |
| `path` *string* | Path part of URI with without the address. |
| `payload` *string* | Sent payload. |

*`Response` message structure*

|        |        |
|--------|--------|
| `type` *string* | Type of message, always `response`. | 
| `status` *string* | Status code of response (`200 OK` for example). |
| `payload` *string* | Sent payload. |

*Example Request*

```bash
# Get last 100 RPC messages
curl "carthage.tezedge.com:11000/v2/rpc" 
```

*Example Response*

```JSON
[
  {
    "incoming": false,
    "timestamp": 1595510540723,
    "remote_addr": "0.0.0.0:1234",
    "id": 1,
    "message": {
      "type": "response",
      "status": "200 OK",
      "payload": "\"idtUCT3hGpzEBLzLgTprGKbbh6LmRr\""
    } 
  },
  {
    "incoming": true,
    "timestamp": 1595510539936,
    "remote_addr": "0.0.0.0:1234",
    "id": 0,
    "message": {
      "type": "request",
      "method": "GET",
      "path": "",
      "payload": "/network/self"
    } 
  }
]
```

