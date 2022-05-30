---
title: Coverage
sidebar: Docs
showTitle: false
---

# Coverage

It is possible to build an instrumented version of *TezEdge* that includes coverage counters. These counters allow us to extract information about which code paths are reached during the node's execution. This information is of particular interest during fuzzing, where we can obtain [coverage reports](http://fuzz.tezedge.com/develop) of the different fuzzers.

Typically, coverage information is dumped when the instrumented process exits. Instead, in *TezEdge* we provide a mechanism to dump coverage information on demand, at any point during the process execution by sending a `SIGUSR2` signal.

## Building TezEdge with coverage support

Instrumentation is provided for both *Rust* and *OCaml* (economic protocol) components. For *Rust* components we rely on `rustc`'s [profiling support](https://doc.rust-lang.org/beta/unstable-book/compiler-flags/profile.html), and for *OCaml* we use a slightly modified version of [bisect-ppx](https://github.com/tezedge/bisect_ppx).

We can obtain the list of steps needed to compile *TezEdge* with coverage support (plus the dependencies for the coverage reporting scripts) from the `Dockerfile` of the [node-fuzzer](https://github.com/tezedge/node-fuzzer):

```
FROM debian:buster
RUN apt update
RUN apt install -y git curl openssl libssl-dev pkg-config
RUN apt install -y libsodium-dev clang libclang-dev llvm llvm-dev libev-dev
RUN apt install -y make lcov python3 python3-pip
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3 1
RUN update-alternatives --install /usr/bin/pip pip /usr/bin/pip3 1
RUN pip install psutil
# RUN pip install matplotlib mpld3
RUN git clone https://github.com/tezedge/tezedge --branch develop
COPY ./scripts /scripts
ENV RUSTUP_HOME=/rust
ENV CARGO_HOME=/cargo
ENV PATH=/cargo/bin:/rust/bin:$PATH
ARG rust_toolchain="nightly-2021-11-21"
RUN curl https://sh.rustup.rs -sSf | sh -s -- --default-toolchain ${rust_toolchain} -y --no-modify-path
RUN cargo install cargo-binutils
RUN rustup component add llvm-tools-preview
RUN apt-get install -y opam
RUN git clone https://gitlab.com/tezedge/tezos.git --branch fuzzing_coverage
RUN cd /tezos && opam init --disable-sandboxing -y && eval $(opam env) && env OPAMYES=1 make build-dev-deps && opam pin add bisect_ppx https://github.com/tezedge/bisect_ppx.git#register_callbacks -y && ./scripts/with_coverage.sh opam config exec -- make && cp /tezos/libtezos-ffi.so /tezos/libtezos.so
```

To build and run *TezEdge* with profiling support we pass the `fuzz` option to the `./run.sh` script. We also must provide in `TEZOS_BASE_DIR` the path to a `libtezos.so` built with coverage support, and specify the output directory for the *OCaml* coverage dumps in `BISECT_FILE`:

```
BISECT_FILE=/tezos/_coverage_output/ TEZOS_BASE_DIR=/tezos KEEP_DATA=1 ./run.sh fuzz --network=mainnet
```

## Dumping counters and producing coverage reports

To dump coverage counters we send a `SIGUSR2` to the target process(es), these processes are: *light-node*, and *protocol-runner*. Signalling the *light-node* process is straightforward since it only contains rust code; a simple signal to the process’ PID does the job. In case of *protocol-runner*, we must locate the main *OCaml* runtime thread and send the signal to that specific TID.

The easiest way to accomplish this task is by running the [coverage](https://github.com/tezedge/node-fuzzer/blob/bad-node/scripts/coverage) script provided with the *node-fuzzer*. If the node is running the script will send the `SIGUSR2` periodically, and it will produce the coverage reports as HTML files.

Coverage reports are stored in `/coverage/develop/.fuzzing.latest/`, it is recommended to run the node as well as the coverage script inside a *Docker* container and set a [volume mount](https://docs.docker.com/storage/volumes/) for the `/coverage` directory.

