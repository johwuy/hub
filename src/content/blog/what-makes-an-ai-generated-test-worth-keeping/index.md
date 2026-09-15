---
title: "What Am I Actually Testing?"
description: "AI makes it easy to produce more tests. The harder questions are what deserves protection and how the test should be built."
date: "09/15/2026"
draft: false
---

AI makes it easy to write code. It also makes it easy to write tests for that code.

At first, I would ask AI to write tests and then skim what it produced. Much of the frontend test setup was unfamiliar to me, including authentication, asynchronous behavior, and mocked application state. It was easy to let AI fill in those gaps and move on when the tests passed.

I was not yet reasoning carefully about why each test existed or how it had been built. I did not stop to ask whether something meaningful was still untested or whether a test was checking an insignificant detail. The tests passed, but they did not give me confidence that the system handled the cases that mattered.

The ease of generating tests forced me to slow down and ask two better questions:

> What behavior deserves protection, and what is the right way to test it?

## Failures showed me where behavior lived

This is where I started paying more attention to transformations at system boundaries. An object retrieved from the database did not match the object created in memory because the database truncated timestamp precision. In another case, a null value changed representation across the persistence boundary.

A mock would not have exposed either issue because I did not know those transformations were happening. The mock could only represent the behavior I already expected.

That did not mean I needed an end-to-end test of the entire system. I needed the smallest test that contained the behavior under question: writing the value to the database and fetching it again. Without that round trip, I was not testing the transformation that persistence performed.

## Duplicated tests made the problem visible

The difference between adding more tests and gaining more confidence became clearer while I was working on a shared modal for creating and editing a contract. The tests treated the create and edit modes as if they were two separate modals. That duplicated tests for behavior both modes shared, such as closing the modal and validating its inputs.

I did not need a separate version of every test for each mode. The shared behavior could be tested once, with additional tests reserved for places where creating and editing actually behaved differently.

> The number of scenarios was not the same as the number of meaningful behaviors.

AI made permutations cheap to enumerate. What mattered was identifying the guarantees each test protected.

## How the test was built mattered too

AI also recreated behavior that existing testing tools already handled. A spy could observe whether a real callback was called. A stub could replace a dependency at a boundary. The project already had libraries and patterns for creating them, but AI built replacements from scratch. The tests ran, yet they were harder to understand and did not follow the way the rest of the test suite worked.

What AI created was also less robust and added complexity just to make the test pass. That complexity made me stop and ask whether I was approaching the test correctly or whether the codebase already had a solution I should be using.

## Test the boundary between responsibilities

The modal also showed me why test boundaries matter when parts of a system interact. The modal did not own whether it remained on the page. It owned communicating that the user wanted to close it by calling its `onClose` callback. The page owned responding to that callback by no longer rendering the modal.

That interaction created two related behaviors at two different scopes. The modal test needed to verify that it sent the signal. The page test needed to verify that it responded by closing the modal. Each test stopped at the boundary owned by the thing under test instead of reaching into the responsibility of the other.

## Decision, transformation, state

I do not treat decision, transformation, and state as strict categories. They are prompts that help me explore behavior before writing tests:

- **Decision:** What choices or branches does this behavior contain?
- **Transformation:** Where does data change as it crosses a boundary?
- **State:** What states can the system be in, and what happens from each one?

The goal is not to classify every test. This framework puts me in the mindset of asking which behaviors should be tested. It helps me **notice the behavior that could fail**, decide what needs protection, and choose how to test it.

## Reviewing both purpose and construction

I now review a test along two dimensions: its purpose and its construction.

AI is often good at producing locally plausible code. It is less reliable at deciding which behavior matters, where the test boundary belongs, when coverage is redundant, and which existing project patterns should be reused. That changes what I ask when reviewing its output:

**Purpose: Is this behavior worth protecting?**

- What decisions, transformations, or states are present?
- Which behavior could fail?
- Is the same guarantee already covered elsewhere?
- What expected behavior does this test protect, whether it is a successful flow or an error case?

**Construction: Is this a good test of that behavior?**

- What is the smallest boundary that contains the behavior?
- Does the project already have a library, helper, or pattern for building this test?
- Is the test observing or replacing only what it needs to, or is it recreating existing test machinery?

AI can write another test almost instantly. The valuable work is deciding whether that test makes the system more trustworthy and whether it is built in a way the codebase can support. I started by asking AI to write tests and skimming what it produced. I ended up reviewing both what the tests protected and how they were created.
