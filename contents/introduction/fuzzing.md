---
title: Fuzzing
sidebar: Docs
showTitle: false
---

# Fuzzing


## **What is fuzzing?**

Fuzzing or fuzz testing is one of the most effective, automated ways to identify software vulnerabilities. Fuzzing involves providing invalid, unexpected, or random data as inputs to a computer program to test it for different bugs and vulnerabilities. An experienced fuzzer usually tests the software with inputs that are *semi valid.* In other words, the inputs are valid enough that they don’t get directly rejected, but are invalid enough to trigger issues deep into runtime. Let’s take a closer look to see what’s going on behind the scenes.

Fuzz testing ensures that error-handling routines catch nonsensical and incorrect inputs. It also makes sure that all possible eventualities have been accounted for in web developmental environments.

Fuzzing has many **advantages:** it improves overall software security testing, it detects bugs that can be commonly used by hackers to exploit a system and fuzz testing offers a chance to catch the bugs that may not get noticed earlier due to limitations of time and resources.

On the other hand, there are some **drawbacks:** Fuzzing alone isn't enough to get a complete picture of a potential attack surface. It may not be as effective for dealing with security threats that don't cause program crashes such as viruses, Trojans, etc. Most types of fuzzing are used to detect surface-level threats and aren't sophisticated enough to uncover deeper threats. Fuzz testing also requires time and resources to be of any use.


## **History of fuzzing**

Fuzz testing was developed in 1989 by Professor Barton Miller and his students at the University of Wisconsin, Madison. While their tests were mostly geared towards command-line and UI fuzzing, it showed that even the most sophisticated operating systems are vulnerable to simple fuzzing.

During their study, Miller and his students identified three characteristics of the fuzz testing approach:


1. The input is random. The testers don’t use any model of program behavior, application type, or system description. 
2. The testing has a simple reliability criteria. If the application crashes or hangs (meaning it no longer reacts to inputs), it’s considered to have failed the test. Otherwise, it passes.
3. Fuzzing can be automated to a high degree, and the results can be compared across applications, operating systems, and vendors.


## **A simple example of fuzzing**

To understand how a fuzzing test works, let’s look at a simple example: the program has an integer in which logic dictates that it can only accept 0,1, and 2. Regardless, the user can choose to input a value between 3 and 255. They can do so because an integer data type can accept anything between 0 and 255. 

However, this will lead to security issues such as buffer overflows and denial of service (DoS). We can hunt out such edge cases in a codebase through fuzz testing and ensure that the parsing, acceptance, storing, and reading of the data causes no bugs.


## **Smart vs dumb fuzzing**

Fuzzers utilize an input model that generates inputs for programs by taking in structured inputs such as a file, a sequence of keyboard or mouse events, or a sequence of messages. The fuzzed input can be completely random with no knowledge of what the expected input should look like, or it can be created to look like a valid input with some slight changes. 

A smart fuzzer follows protocol to leverage the input model and generate a significant proportion of valid inputs. However, the input model here needs to be explicitly provided. It is important to note that the greater the level of intelligence you build into a fuzzer, the deeper your tests will be able to penetrate the protocol. The downside is that in the process, you end up creating more work for yourself.

A dumb fuzzer doesn’t require the input model and can test out a large variety of programs. The fuzzer is labeled “dumb” because these guys generate a lower proportion of valid inputs. A dumb fuzzer requires a smaller amount of work and resources to create its inputs. The problem with this approach is that certain programs may work only if specific input aspects are present, e.g. a program may accept a name only if it is under a particular string length. If the fuzzer cannot input a name of the required length, it may not even get the chance to explore the program.

On the other hand, dumb fuzzers are a lot more flexible than smart fuzzers. A more measured approach could be to start with a dumb fuzzer and gradually increase its intelligence by improving its overall code quality. However, starting with an overtly simplistic fuzzer may make the work involved in transitioning between dumb and smart overtly tedious.


## **The different types of fuzzers**

Fuzzers can be split into two categories – mutation-based and generation-based. 



*   **Mutation-based**: The fuzzer creates inputs by modifying the provided inputs.
*   **Generation-based:** The fuzzer creates new inputs from scratch.


### **Mutation fuzzing**

Mutation-based fuzzers are pretty simple to create and can be used with both dumb and smart fuzzing. In this system, samples of valid inputs can be mutated randomly to produce a test input. A dumb fuzzer can utilize mutation techniques to alter specific segments of valid sample inputs and test a program. 

This can be pretty helpful for code coverage since the modified inputs are similar enough to the valid set to get accepted by the program. This method is pretty resource-friendly since you are covering a large area without the use of much intelligence.

Mutation-based fuzzers often use two techniques – Replay and Man-in-the-Middle (Proxy)


#### **#1 Replay**

In this testing, the fuzzer uses predetermined, saved sample inputs and replays them post-mutation. This works well for simple systems wherein the protocol may not require any dynamic inputs. For example, in file format fuzzing, several sample files may be saved and fuzzed to provide to the target program.

Replay fuzzing, however, may fail while testing more complex protocols since they may require dynamic responses during run-time for the fuzzer to venture deep into its systems.


#### **#2 Man-in-the-Middle or Proxy**

Man-in-the-Middle (MITM) is a technique used by hackers to gain entry into systems. For example, a hacker may place themselves as a proxy between a client and a server to modify the information packets transmitted between them. The same approach can be adapted into a fuzzer. However, understand that you are not just modifying an existing set of input files in this technique. You are dynamically adjusting whatever the client or the server is sending during run-time.

There are two advantages to this approach. First, the method is dynamic enough to be used by both dumb and smart fuzzers. Second, your fuzzer need not be confined to either the client or the server, and it has the flexibility to choose its own deployment.


### **Generation fuzzing**

Generation-based fuzzers generate input from scratch rather than mutating existing input. They generally require a certain level of intel to construct various inputs that make some sense to the program. 

Generation fuzzers split a protocol or file format into chunks to build up in a valid order and fuzz independently. This allows them to create inputs that are similar to what the software is used to but still have enough inconsistencies within them to help during fuzzing.

Generation fuzzing is generally a lot deeper than mutation because it can construct valid input sequences instead of random generations.


## **Bug types detected by fuzz testing**



1. **Memory Leaks: **Fuzzing is most used by large applications to hunt out bugs affecting the safety of memory.
2. **Invalid Input: **Fuzzers may generate invalid inputs that can be used to test error-handling routines. This is especially useful in detecting the robustness of dynamic run-time, wherein the software doesn’t have power over its inputs.
3. **Correctness Bugs: **Fuzzing also helps you in detecting and funneling out "correctness" bugs, in other words flaws that detect issues in the correctness of the outcome. Examples of these include corrupted databases, poor search results, etc.


## **Examples of fuzz testing tools**

These tools are the ones most commonly used in web security:



*   **Peach Fuzzer**: While other testing tools can only search for known threads, a Peach Fuzzer enables users to find both known and unknown threats and vulnerabilities. Overall, it’s far more robust and secure than scanners.
*   **Spike Proxy**: A professional-grade tool that looks for application-level vulnerabilities in web applications. It has an open Python infra that provides basics such as SQL Injection and cross-site-scripting. It is available for both Linux and Windows.
*   **Webscarab**: This tool is written in Java and is portable to many platforms. Webscarab frameworks that communicate across HTTP and HTTPS protocols are used for analyzing applications.
*   **OWASP WSFuzzer**: Coded in Python, WSFuzzer is a GPL'd program that currently targets Web Services.


## **Fuzzing attacks**

As fuzzing is a very effective method of detecting vulnerabilities, it can also be used by hackers to locate loopholes that can serve them as potential attack vectors. 

Financial institutions, corporations, government databases and even blockchains are sometimes targeted by fuzzing attacks.  \


A fuzzer would try combinations of attacks on:



*   numbers (signed/unsigned integers/float…)
*   chars (urls, command-line inputs)
*   metadata : user-input text (id3 tag)
*   pure binary sequences

One of the more common approaches taken to fuzzing is to define lists of “known-to-be-dangerous values” for each data type, and test various recombinations.



*   For integers: 0, negative, or very large numbers.
*   For character type: Escaped, interpretable characters / instructions (ex: For SQL Requests, quotes / commands…)
*   For binary: Random inputs.** **


## **Fuzzing in blockchain**

When talking about blockchain, vulnerabilities could be present at the network level or at a smart contract level. While there are several options for testing besides fuzzing, a fuzz test is more flexible since it can proactively identify additional vulnerabilities. An important difference from other tests is that fuzzing might point out situations that a human may not include. Moreover, since blockchains are productive environments, the potential impact of an issue is higher.

Fuzzing a blockchain is not straightforward. Conceptually, a blockchain is a network so the context in which fuzzing methods are applied to traditional networks may serve as a starting point but additional considerations must be taken. Blackbox fuzzing or data-driven fuzzing is included in most traditional fuzzers and defines test cases independently from the network logic focusing on behavior and performance. On the other hand, white box fuzzing generates test cases by analyzing the source code and the information gathered when executing it. To test a blockchain it is common to use a grey-box approach, which is a combination of both black box and white box fuzzing, using a coverage fuzzing tool such as libFuzzer or AFL. 

To test the communication layer, a fuzz test process may look like this:



*   Each fuzz input or seed provides a random amount of test cases 
*   Pick a random node and send X bytes as a message originated in the node, i.e. put the bytes into the receive buffer of this peer
*   Repeat the last step
*   Get and revise the output and compare it to the real test scenario

For each input (or seed), an amount of coverage data is collected when run. Coverage indicates if new paths or branches were discovered with the given seed or not. Based on the coverage, seed trimming takes place to gradually eliminate a portion of the seed as long as the coverage remains constant. In case that an input increases coverage, it is stored, otherwise it is discarded. Increasing the coverage is possible when paths span multiple transactions.

The purpose of the fuzz test is to provide extensive coverage beyond the communication layer. It should also test other parts of the source logic and semantics such as the transaction relay and the blockchain state (known as the context in Tezos). Fuzz tests in blockchain can generate three main actions: create a given input, replicate a transaction and replicate a block creation. Additional components and actions that are commonly fuzzed in a blockchain include:



*   Baking: The idea is to simulate block tracing by tracking transaction packages; this process mirrors the set of transactions that are needed to be added to a block in order to be confirmed. Additionally, tests on blocks overall size and transaction fees can also be measured. 
*   Block validation: one of the most concerning vulnerabilities is double spending (in which a single transaction spends from the same input twice). These tests are also focused on assessing other node validating capabilities through differential testing, e.g. show a different behavior when a node may duplicate inputs that were created in the same block but not in an earlier block.
*   Consensus: Consensus rules are defined reflecting the rules that govern the acceptance of valid transactions and blocks on the network. Fuzzing the consensus may be the most challenging test to replicate. Normally, they aim to generate confidence that the consensus rules were properly implemented whilst maintaining the core semantics without changes or regressions. 
*   Mempool: aims the fuzzing at testing low level parsing and serialization or script evaluation. Tests to validate transaction load when synchronizing are also applied. 


## **Fuzzing smart contracts**

Smart contracts are autonomous programs that run on a blockchain controlling the logic of operations that entail value of the digital assets as well as the person who receives the benefits. Moreover, _because of the critical role they play, smart contracts need complete, comprehensive, and effective test generation. _There are several reasons that make smart contracts vulnerable to security attacks:



*   First is that once a contract is deployed, it cannot be amended, making them an enticing target for hackers, 
*   The security vulnerabilities within a smart contract may represent significant threats to the underlying dapps (decentralized applications based on smart contracts logic) that may go from important financial losses to a complete loss of the ecosystem’s reputation, 
*   The execution of a smart contract depends on the underlying blockchain protocol and the composition of other interactive smart contracts.
*   The languages in which smart contracts are built, as well as the runtime environments may still not be fully mature,
*   Finally, as in the case of blockchain or any other complex piece, the scope of manually prepared tests and frameworks may not be fully covering the full extent of a contract’s scope or functionality.

Current smart contract analysis includes a wide array of options including static analysis, dynamic analysis and fuzzing. Static analyzers focus on extracting code patterns to match with predefined pattern criteria. This method is fast and scalable but is less accurate than other methods. Dynamic analyzers such as Manticore and Oyente apply symbolic execution to explore all execution paths of the contract, which trade high accuracy for low scalability.

While fuzzing in blockchain tries to identify exploits among its semantics and components, fuzz tests in smart contracts aim to recognize exploits and vulnerabilities with common smart contract functionalities. A high-level overview of fuzzing a smart contract can be represented as follows:



    1. The user provides the initial state S0 that include one or more contracts accounts
    2. Then provides correctness properties (optionally)
    3. All sequences commence from S0. The fuzzer generates the sequence of transactions that invoke the contract under test, simulating a transaction to a new state; i.e. n different transactions from _n_ senders.
    4. the fuzzer mutates the transaction data or inputs, or the entire sequence itself.

Testing a contract functionality can go from general functionalities to very specific contract semantics. Among common functionalities that may result in exploits or vulnerabilities include: 



    *   **Runtime values** 

    Runtime values are recorded to evaluate reactive arguments and variables. Blank seeds are passed as arguments for each function. Based on executed tests, seeds are updated adding runtime values and function arguments. Updated seeds are set as arguments so the resulting variables become the arguments for measuring next executing transactions. This way, the output reflects the execution history and state of the contract, helping to identify potential exploits. 

    *   **Hash values** 

    Based on the previous test, with the hash input recorded in the seed set, a validity check of the hash value can be implemented. 

    *   **Balance Increment** 

    Simulate a contract sending value to a random address and ensure that the receiver contract does not create any window to be exploited. 

    *   **Code Injection** 

    Test operations in which a contract may be involved in executing code that originates in a different contract. Objective is to ensure that the external contract does not gain full control on the contract host.

    *   **Unchecked Transfer Value** 

    It describes the amount of currency transfer without being constraint including two types of implementations.

    *   **Vulnerable Access Control** 

    It represents that an attacker can bypass access control or grant privileges to conduct sensitive operations, such as currency transfer and self-destruction.



## **References**

[https://www.f-secure.com/en/consulting/our-thinking/15-minute-guide-to-fuzzing](https://www.f-secure.com/en/consulting/our-thinking/15-minute-guide-to-fuzzing)

[https://owasp.org/www-community/Fuzzing](https://owasp.org/www-community/Fuzzing)

[http://pages.cs.wisc.edu/~bart/fuzz/](http://pages.cs.wisc.edu/~bart/fuzz/)

[https://searchsecurity.techtarget.com/definition/fuzz-testing](https://searchsecurity.techtarget.com/definition/fuzz-testing)

[https://www.guru99.com/fuzz-testing.html](https://www.guru99.com/fuzz-testing.html)

[https://forum.tezosagora.org/t/smart-contract-vulnerabilities-due-to-tezos-message-passing-architecture/2045](https://forum.tezosagora.org/t/smart-contract-vulnerabilities-due-to-tezos-message-passing-architecture/2045)

[https://tezos.stackexchange.com/questions/3235/is-tezos-blockchain-vulnerable-to-frontrunning](https://tezos.stackexchange.com/questions/3235/is-tezos-blockchain-vulnerable-to-frontrunning)

[https://www.reddit.com/r/tezos/comments/9zcvca/is_tezos_vulnerable_to_this_attack/](https://www.reddit.com/r/tezos/comments/9zcvca/is_tezos_vulnerable_to_this_attack/)

[https://www.reddit.com/r/tezos/comments/ezwde1/tezos_potential_vulnerability_question/](https://www.reddit.com/r/tezos/comments/ezwde1/tezos_potential_vulnerability_question/)

[https://www.reddit.com/r/tezos/comments/6q64vb/augur_had_8_critical_vulnerabilities_due_to_use/](https://www.reddit.com/r/tezos/comments/6q64vb/augur_had_8_critical_vulnerabilities_due_to_use/)

[https://www.apriorit.com/dev-blog/602-tezos-blockchain-smart-contract-overview](https://www.apriorit.com/dev-blog/602-tezos-blockchain-smart-contract-overview) 

[https://leastauthority.com/static/publications/LeastAuthority-Tezos-Protocol-Audit-Report.pdf](https://leastauthority.com/static/publications/LeastAuthority-Tezos-Protocol-Audit-Report.pdf)

[https://leastauthority.com/static/publications/LeastAuthority-Tezos-Foundation-Smart-Contracts-Audit-Report.pdf](https://leastauthority.com/static/publications/LeastAuthority-Tezos-Foundation-Smart-Contracts-Audit-Report.pdf) 

[https://arxiv.org/pdf/1812.00140.pdf](https://arxiv.org/pdf/1812.00140.pdf)

[https://arxiv.org/pdf/1807.03932.pdf](https://arxiv.org/pdf/1807.03932.pdf)

[https://mariachris.github.io/Pubs/FSE-2020-Harvey.pdf](https://mariachris.github.io/Pubs/FSE-2020-Harvey.pdf)

[https://www.synopsys.com/blogs/software-security/defensics-sdk-fuzzing-bitcoin/](https://www.synopsys.com/blogs/software-security/defensics-sdk-fuzzing-bitcoin/)

[https://srlabs.de/bites/ethereum_dos/](https://srlabs.de/bites/ethereum_dos/)

[https://tezos.gitlab.io/developer/testing.html](https://tezos.gitlab.io/developer/testing.html) 

[https://medium.com/least-authority/https-medium-com-least-authority-five-security-audits-for-the-tezos-foundation-7e7375cf055b](https://medium.com/least-authority/https-medium-com-least-authority-five-security-audits-for-the-tezos-foundation-7e7375cf055b)

[https://tezos.gitlab.io/developer/testing.html](https://tezos.gitlab.io/developer/testing.html)

[https://lcamtuf.coredump.cx/afl/README.txt](https://lcamtuf.coredump.cx/afl/README.txt)

[https://siqima.me/publications/saner20b.pdf](https://siqima.me/publications/saner20b.pdf)
