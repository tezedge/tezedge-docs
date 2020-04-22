---
title: Shell
sidebar: Docs
showTitle: false
---

# Shell

* Monitor
  - [Commit hash](#commit-hash)
  - [Bootstrapped](#bootstrapped)

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
