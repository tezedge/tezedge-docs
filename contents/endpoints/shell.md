---
title: Shell
sidebar: Docs
showTitle: false
---

# Table of contents

- [Commit hash](#commit-hash)
- [Bootstrapped](#bootstrapped)

# Shell

## Commit hash

Returns node build information. Specifically the git commit hash.

&nbsp;

#### *Request*

```bash
GET /monitor/commit_hash
```

#### *Response*

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| *String* |  Git commit hash. |


*Example Request*

```bash
curl http://carthage.tezedge.com:18732/monitor/commit_hash
```

*Example Response*

```JSON
"a42d44b30f938a976731367c857a58633386a668"
```

## Bootstrapped

Returns bootstrap information.

&nbsp;

#### *Request*

```bash
GET /chains/<chain_id>/blocks/<block_id>/header
```

#### *Response*

| Field             |                  Description                           |
|-------------------|--------------------------------------------------------|
| `block` *String* |  Base58Check encoded block hash. |
| `timestamp` *RFC3339 timestamp* | Block baking timestamp. |

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
