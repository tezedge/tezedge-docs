---
title: Formal Verification
sidebar: Docs
showTitle: false
---


# Formal verification

  

Designing a hardware or software system without any functional bugs is critical for its correct functioning. However, as designs become more complex, the goal of reaching full functional coverage using traditional simulation-based techniques becomes increasingly more challenging to achieve.

  

A test is the most common way of validating that a design is properly working. It is commonly performed by simulating a set of scenarios to validate that certain patterns or behaviors occur as expected. In this type of traditional testing framework, the test developer is in charge of defining a potential set of actions that are expected from the code, limiting the tests to the developer’s imagination. Moreover, the number of possible routes a simple design may comprise is unimaginably high; e.g. a 64 bit design has around a quintillion of possible combinations. Trying to cover all possibilities is simply unrealistic, so critical routes are often missed with common test suites.

  

Traditional testing strategies such as developing use cases is one way to flush out bugs or randomly generate tests to bypass designer bias. Still, this process eventually becomes very expensive and gives you diminishing returns.

  
  
  

![Image](../../static/images/FV1.png)
  

In situations like these, formal verification comes into consideration as complement to aforementioned testing. By checking exhaustively and automatically all executions, tests are no longer limited to a person’s imagination but to a computer processing capabilities.

  
  

## **What is Formal Verification?**

  

Formal verification is the process used to mathematically prove or disprove the correctness of an algorithm, protocol or design with respect to a formal specification. In FV, tests oversee that a component actually does what it is intended to do and does not do anything when it is not intended to. Formal verification can be used to confirm the correctness of systems like cryptographic protocols, combinational circuits, and digital circuits with internal memory.

  

The system verification is done by providing comprehensive and formal proof of the abstract mathematical model of the system. Examples of these mathematical models include – finite state machines, labeled transition systems, Petri nets, vector addition systems, etc.

  

Formal verification is used for checking the following correctness properties of the system:

  
  
  

* **Safety**: Safety can be simplified as “nothing bad happens.” As such, no matter what input a system receives, it will not give undesired outputs.

* **Liveness**: You can describe liveness as “something good eventually happens.” Simply put, a system that reaches a desired configuration, or more often than not, eventually fulfills the liveness factor.

  

To test for those correctness properties, it is important to first understand two intuitive concepts that refer to time and structure properties that govern the sequence of actions that may occur in any program.

  
  

### **State transition system (STS)**

  

A state transition system (STS) can be inferred as an abstract representation of a state machine whose properties are expressed using temporal logic formulas. A state transition system is a set of initial states S, along a set of transitions/actions, A, and for each action a in A, there is a “current” state s and (at least) one “successor” state t; i.e. if the current state is s and action a is taken, now, the current state is t (if there is only one successor state for every action, the STS is deterministic; otherwise, it is nondeterministic).

  

Moreover, in the STS context, the two aforementioned correctness properties can be covered. A safety property is a TLA formula (detailed next) that is infringed in a specific state within the behavior. On the other hand, a liveness property is a TLA formula which, when infringed, is not infringed in any single state of the behavior. To prove that a liveness property is not satisfied, the entire (possibly infinite) sequence of states must be under consideration.

  
  

### **Temporal logic of actions (TLA) and TLA+**

  

A temporal logic is any system of rules and symbolism for representing, and reasoning about, propositions qualified in terms of time, e.g., under desirable network conditions, a blockchain will eventually produce another valid block. Temporal logic is a natural domain for reasoning about distributed systems and concurrent programs, in general. Therefore a TLA can be understood as the application of temporal logic to the logic of actions to gain a tangible element in a somewhat abstract concept.

  

In this way, TLA covers the need of expressing an abstract concept such as time, to verify that a certain program is fulfilling a set of properties. This can be interpreted by using TLA+, a high-level mathematical based language for modeling software above the code level and hardware above the circuit level. It is an exceptional language for writing formal specifications and has an integrated, explicit state model checker (and simulator), called TLC. TLC easily checks both safety and liveness properties (more on this soon).

  

TLA+ unifies the specification language with the logical language used for expressing such properties (TLA). TLA+ gives us a common language to express abstract algorithms and prove that they satisfy certain behavioral properties. It is used extensively in several blockchain projects, including Tezos.

  

Linear temporal logic combines ordinary propositional logic with modal operators such as [] (box/“always”) and &lt;> (diamond/“eventually”) to express a certain state. Propositional variables consist of operators that are normally expressed in ASCII to take a boolean value. Some examples are ~ (negation), /\ (conjunction), \/ (disjunction), => (conditional/implication) and &lt;=> (biconditional). Note that [] and &lt;> are dual operators in the sense that &lt;>P is logically equivalent to ~[]~P.

  

TLA extends linear temporal logic with a logic of actions which includes expressions like [A]_t (read “box A sub t”) and &lt;A>>_t (read “angle A sub t”), where A is the action. [A]_t is a step in our STS which is either an A step or a step that does not change any of the variables in t (t can be a tuple of variables, in general). &lt;A>>_t is an A step that must change at least one variable in t ([A]_t and &lt;A>>_t are dual to one another).

  

Actions are often characterized by expressions containing primed variables, like x’. Primed variables refer to the value of the variable in the successor state and unprimed variables refer to the value of the variable in the current state. An expression containing no primed variables is referred to as state predicate. The important thing to note about [A]_t and &lt;A>>_t is that when combining these expressions with temporal operators, it is only valid to write [][A]_t and &lt;>&lt;A>>_t, not []&lt;A>>_t or &lt;>[A]_t.

  

Moreover, given a state transition system and a state predicate P, the predicate []P (read “box P”) is true of a behavior if P is true for every state in the behavior, i.e. []P holds if P always holds. The predicate &lt;>P (read “diamond P”) is true of a behavior if P holds for some state in the behavior, i.e. &lt;>P holds if there exists a state s in the behavior such that P holds in s. Note the subtle switch to discussing the satisfaction of a proposition in a given state and for a given behavior; this is in stark contrast to the universality of pure propositional logic. This difference is crucial; it doesn’t make sense to talk about satisfaction of []P or &lt;>P in a single state.

  
  

## **How to Approach Formal Verification?**

  

When simulating test scenarios, different test cases are created manually by the developer or by an automated test bench. However, even the smallest of designs have a considerable number of states. What this means is that it is impossible to plan out an extensive list of test cases correctly. More often than not, corner-case bugs, which require a specific list of conditions to trigger them, are often missed in simulation.

  

Formal verification does not execute the system design, so it requires neither tests nor test benches. It simply analyzes the design for all possible input sequences and states and continually checks to see if any assertions can be violated. If adequately tested, formal verification is 100% exhaustive and accurate.

  

All in all, systems can conduct two types of formal verifications:

  

**Specification Verification**

  

Specification verification determines whether the output of a process correctly corresponds to its input specifications. Every time a system perfectly manages to do so, it gets one step closer to achieving final verification. If the overall output of the process is incorrect, it implies that the developers have incorrectly engineered the product.

  

**Implementation Verification**

  

This verification method checks if a system properly satisfies its implementation-dependent properties. Implementation verification for hardware is already a very well-developed area.

  

When it comes to the approaches needed to build formal verification, there are two main options to follow:

  
  
  

1. Model Checking

2. Deductive Verification

  
  

#### Model Checking

  

Model checking is a formal verification approach consisting of a systematic and exhaustive exploration of the mathematical model that governs a system. It verifies designs by applying a mathematical model that revises all of the model's possible behaviors. This mathematical model could be both a finite or infinite model where infinite sets can be represented finitely using abstraction or symmetry.

  
  
  

* The most significant advantage of model checking is that it is mostly fully automatic.

* Its primary disadvantage is that it can’t be scaled up to larger systems.

  

It is important to note that model checking involves the specification of a STS. The assignment of a certain value to a certain variable determines a state. Depending on the state of the system, different actions are enabled. An action is simply a transition from one state to another, i.e. a change in the values of (some of) the variables. Actions may have specific enabling conditions that must be met by the current variables for an action to actually happen in the current state. In this context, a behavior is a (possibly infinite) sequence of states which are linked together by the actions defined in our specification.

  

The choice of the variables, actions, invariants, and properties considered in a specification are highly dependent on the system being specified and the desired level of abstraction to thoroughly cover those aspects of the system that are deemed as important.

  

When the software itself cannot be verified exhaustively, a simplified model of the underlying design that preserves its essential characteristics can be built to avoid including known sources of complexity. The design model can often be verified, while the full-scale implementation cannot.

  
  

#### Deductive Verification

  

Deductive verification is a highly exhaustive formal verification approach that generates many mathematical proof obligations from the system. If these obligations provide accurate results, then it implies that the system is conforming to its specifications.

  
  
  

* The advantage of this system is that if it is correctly applied, it accurately verifies the authenticity of the system.

* The main disadvantage is that this method requires the user to have complete in-depth knowledge of the system to feed the necessary info to the verification system. As such, it is entirely dependent on the knowledge provided to it by the user.

  

  
  

## **Formal verification design**

  

  

Formal Verification is commonly run by using a satisfiability solver, a tool that uses mathematical models to investigate every part of a program’s code in order to avoid reaching a bad state. The way to communicate with the sat solver is by writing formal properties. As previously mentioned, these properties constitute the minimal specifications required by a design. Sat solvers use languages such as[ PSL](https://en.wikipedia.org/wiki/Property_Specification_Language),[ Z](https://en.wikipedia.org/wiki/Z_notation) or[ Vienna](https://en.wikipedia.org/wiki/Vienna_Development_Method) to describe and model the formal properties into mathematical algorithms. The purpose of this is to provide the assertions to formal tools, to tell users how a block should be used and test for violations of those conditions.

  

  

Formal properties must consider three levels of detail: constrains, assertions and covers.

  
  
  

* Constraints refer to environmental conditions on which the design would function properly and would be verified in an informal way.

* Assertions are related to those minimum requirements that need to be fulfilled by the design at a given point in time; e.g. a request going into the design must be verified in X cycles later.

* On the other hand, covers potential scenarios that may play out given a certain condition, proving that something can happen.

  

Whereas assertions and covers are meant to find a bug in the design, constraints are mainly focused on identifying a potential vulnerability in the code surrounding.

  

Once tests are run we can have three outcomes: positive, negative or unknown (which may be due to unsolved time or computing power constraints). When a test passes, it represents a proof of correctness, however additional checks to the configuration of the design is recommended to ensure completeness. On the other hand, when a test fails, it may be due to several reasons: 

  
  
  

* bug in the code itself

  
  

* missing constraint as a specification input

  
  

* bug caused by an error while configuring the design as an input

  
  

* bug understanding what the intend really is

  

  

When a bug is detected, it can be easily isolated so it can be analyzed, debugged and re-tested. Although positive and negative outcomes may signify a concrete result, it may be the case where developers may mislead assumptions to a different meaning.

  
  

## Formally verifying a Smart Contract

  

Formal Verification (FV) is commonly used in situations where failure implies a catastrophe, for instance aerospace engineering or nuclear tests. However, FV can also be used in intermediate complex designs to mathematically test their correctness. One of those designs are smart contracts. Smart contracts are pieces of compiled code that are deployed on a blockchain. Once deployed, the contract is assigned an address which maintains a balance associated with it. The contract can communicate to other contracts to read data such as a balance or to transfer value between them.

  

An incorrectly designed contract presents significant risks that can range from losing monetary positions in the form of tokens, to a complete loss of trust and reputation of its hosting protocol. Formal verification complements unit testing to provide certainty that a contract is covering all the required specifications.

  
![Image](../../static/images/FV2.png)
  

Although languages that are used for contract development, like Solidity, were not conceived with formal verification in mind, there are several frameworks such as K, Isabelle or F* that can be used to run this type of testing.

  

Formal verification proves that some properties of the contract will be maintained, but does not necessarily mean that the code is 100% correct. In the context of Tezos, formal verification gains another dimension. Ad-hoc formal verification languages such as Coq and K-Michelson are in charge of ensuring that Michelson smart contracts are mathematically correct whilst also discarding any bug that may relate to the gas required to execute a contract.

  
  

## **Tezos and formal verification**

  

  

Tezos has several features that make the platform unique in a number of different ways. Besides its liquid PoS and on-chain governance, Tezos enables formal verification for its smart contracts, making them one of the most secure of their type. This is possible thanks to Michelson, a high-level stack-based programming language on which Tezos contracts must be compiled in order to be executed.

  

Michelson was originally designed to facilitate formal verification, allowing developers to validate their contract’s correctness. In addition, Mi-Cho-Coq is a framework that enables a Coq-based interpreter that translates Michelson into advanced mathematical expressions. This way, even complex contract properties such as spending limits and multisig contracts can now be expressed as theorems and be accurately tested for correctness. Moreover, besides formally verifying a design, Mi-Cho-Coq also tests the chance of getting runtime errors. Nonetheless, Mi-Cho-Coq still presents some limitations such as the lack of big map types that support verification.

  

  

Besides the existing semantics for Coq, new approaches and frameworks are being utilized and developed for Michelson formal verification. Albert, is an intermediate compilation language that uses Ott semantics to abstract away the Michelson procedural stack to mathematically verify a contract’s specification. It is intended to serve as the compilation intermediary for higher-level Tezos contract languages such as Python, Ligo and Archetype. The compiler, type checker, and parser of Albert are all written in Coq

  

  

Using the foundation of the K-Framework, the K-Michelson semantic is being developed to serve as a more human-readable and executable document, outlining the expected operational behavior of a Michelson program. This new K framework for Michelson will also allow developers to write and run tests locally using only the .tzt format with the K-Michelson translator.

  

  

Fresco (Formal Verification of Tezos Smart Contracts) is another formal verification project that is currently being developed to verify certificate correctness for Michelson based smart contracts by using theorem provers such as Coq and Why3. It aims at becoming a generalized resource analysis framework for Tezos contracts with a special focus on a concrete gas constraint problem. Once operable, this framework intends to generate verifiable certifications by testing the contracts code.

  
  

## **References**

  

Kukimoto, Yuji. “Introduction to Formal Verification.” [[https://ptolemy.berkeley.edu/](https://ptolemy.berkeley.edu/)] ([https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)). 1996

  

Seligman, Erik, Kumar, M.V Achutha Kiran. “Formal Verification.” [https://www.sciencedirect.com/] (https://www.sciencedirect.com/topics/computer-science/formal-verification) , 2015.

  

Bernardo, Bruno., Cauerlier, Raphaël., Pesin, Basile., & Tesson, Julien. “Albert, and intermediate smart-contract language for the Tezos blockchain”. _Nomadic Labs. _(2020): 584-595. DOI:[10.1007/978-3-030-54455-3_41](http://dx.doi.org/10.1007/978-3-030-54455-3_41)

  

Bernardo, Bruno., Cauerlier, Raphaël., Hu, Zhenlei., Pesin, Basile., & Tesson, Julien. “Mi-Cho-Coq, a framework for certifying Tezos Smart Contracts”. _Nomadic Labs. (_2019): 368-379. DOI:[10.1007/978-3-030-54994-7_28](http://dx.doi.org/10.1007/978-3-030-54994-7_28)

  

Bernarndo, Bruno., Cauderlier, Raphaël., Claret, Guillaume., Jakobsson, A., Pesin, Basile., & Tesson, Julien. “Making Tezos Smart Contracts More Reliable with Coq”._ International Symposium on Leveraging Applications of Formal Methods _(2020): 60-72. [https://doi.org/10.1007/978-3-030-61467-6_5](https://doi.org/10.1007/978-3-030-61467-6_5)

  

Coq. “The Coq Proof Assistant”. Coq. Accessed April 24, 2021. [https://coq.inria.fr/](https://coq.inria.fr/)

  

Nomadic Labs. “Formally Verifying a Critical Smart Contract”. Nomadic Labs. January 20, 2020. [https://blog.nomadic-labs.com/formally-verifying-a-critical-smart-contract.html](https://blog.nomadic-labs.com/formally-verifying-a-critical-smart-contract.html)

  

Jakobsson, Arvid. “Mi-Cho-Coq”. Nomadic Labs. Accessed April 26, 2021. [https://gitlab.com/nomadic-labs/mi-cho-coq](https://gitlab.com/nomadic-labs/mi-cho-coq)

  

Cauderlier, Raphaël. “Albert”. Nomadic Labs. Accessed April 26, 2021. [https://gitlab.com/nomadic-labs/albert](https://gitlab.com/nomadic-labs/albert)

  

Melo de Sousa, Simão., Crocker, Paul., Pereira, Mário., Reis, João., & Horta, Luís . “Main Goal”. Fresco. Accessed April 26, 2021. [https://release.di.ubi.pt/projects/fresco](https://release.di.ubi.pt/projects/fresco)

  

  

Skeirik, Stephen. “Formal Verifications Framework for Michelson”. Runtime Verification. July 27, 2020. [https://runtimeverification.com/blog/formal-verification-framework-for-michelson/](https://runtimeverification.com/blog/formal-verification-framework-for-michelson/)

  

GitHub. “K-Michelson: A Michelson Semantics Introduction”. Runtime Verification. Accessed April 28, 2021. [https://runtimeverification.github.io/michelson-semantics/](https://runtimeverification.github.io/michelson-semantics/)

  

Darbari, Ashish. “The evolution of formal verification - Part One”. Tech Design Forum. July 21, 2017. [https://www.techdesignforums.com/practice/technique/the-ongoing-evolution-of-formal-verification/](https://www.techdesignforums.com/practice/technique/the-ongoing-evolution-of-formal-verification/)