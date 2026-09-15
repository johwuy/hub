---
title: "What Am I Actually Testing?"
description: "AI makes it easy to produce more tests. The harder questions are what deserves protection and how the test should be built."
date: "09/15/2026"
draft: false
---

AI makes it easy to write code. It also makes it easy to write tests for that code.

At first, I would ask AI to write backend tests and then skim what it produced. If the tests passed, I moved on. I was reviewing whether the tests ran, not whether they were valuable.

I was not yet reasoning carefully about why each test existed or how it had been built. I did not stop to ask whether something meaningful was still untested or whether a test was checking an insignificant detail. The tests passed, but they did not give me confidence that the system handled the cases that mattered.

## The backend taught me to question purpose

The turning point came from backend tests. I had relied on the ORM to move data between the application and the database without treating that boundary as behavior that needed protection. Two failures exposed transformations I was not testing:

- An object retrieved from the database did not match the object created in memory because the database truncated timestamp precision.
- A null value changed representation across the same boundary.

A mock would not have exposed either issue because I did not know those transformations were happening. The mock could only represent the behavior I already expected.

That did not mean I needed an end-to-end test of the entire system. I needed the smallest test that contained the behavior under question: writing the value to the database and fetching it again. Without that round trip, I was not testing the transformation that persistence performed.

The backend experience taught me to ask the first question:

> What behavior deserves protection?

## The frontend taught me to question construction

I later worked in a frontend codebase built with Ember, a framework I had no prior experience with. Much of its test setup was unfamiliar to me, including authentication, asynchronous behavior, and mocked application state. Testing components and their interactions also relied more heavily on spies, stubs, and mocks.

AI could fill in those gaps, but the backend experience had taught me not to stop when the tests passed. The frontend work led me to the second question:

> What is the right way to test this behavior?

### Shared behavior did not need duplicated tests

The difference between adding more tests and gaining more confidence became clearer while I was working on a shared modal for creating and editing a contract. The tests treated the create and edit modes as if they were two separate modals. That duplicated tests for behavior both modes shared, such as closing the modal and validating its inputs.

I did not need a separate version of every test for each mode. The shared behavior could be tested once, with additional tests reserved for places where creating and editing actually behaved differently.

> The number of scenarios was not the same as the number of meaningful behaviors.

AI made permutations cheap to enumerate. What mattered was identifying the guarantees each test protected.

### Reuse the testing tools already there

One example was how AI created mocks and spies from scratch instead of using the testing tools the project already provided. The hand-built mocks were brittle, and the tests kept failing as more behavior was recreated inside them.

As more complexity was added to make those tests pass, I started to question the approach. It felt too complicated for a problem that was unlikely to be new. I searched the codebase, found the existing testing library and patterns, and refactored the tests to use them.

That experience taught me that reviewing a test meant examining more than its assertions. I also needed to understand how it was constructed and whether it reused the tools the codebase already trusted.

### Test the boundary between responsibilities

The modal also showed me why test boundaries matter when parts of a system interact. The modal did not own whether it remained on the page. It owned communicating that the user wanted to close it by calling its `onClose` callback. The page owned responding to that callback by no longer rendering the modal.

That interaction created two related behaviors at two different scopes. The modal test needed to verify that it sent the signal. The page test needed to verify that it responded by closing the modal. Each test stopped at the boundary owned by the thing under test instead of reaching into the responsibility of the other.

## Decision, transformation, state

Those backend and frontend failures eventually gave me a simple set of prompts for exploring behavior: decision, transformation, and state.

I do not treat decision, transformation, and state as strict categories. They are prompts that help me explore behavior before writing tests:

- **Decision:** What choices or branches does this behavior contain?
- **Transformation:** Where does data change as it crosses a boundary?
- **State:** What states can the system be in, and what happens from each one?

The goal is not to classify every test. This framework puts me in the mindset of asking which behaviors should be tested. It helps me **notice the behavior that could fail**, decide what needs protection, and choose how to test it.

## Reviewing both purpose and construction

I now review a test along two dimensions: its purpose and its construction.

AI is often good at producing locally plausible code. It is less reliable at deciding which behavior matters, where the test boundary belongs, when coverage is redundant, and which existing project patterns should be reused.

AI was only as useful as the context I gave it and the questions I knew to ask. When I did not understand the behavior, boundaries, or existing testing tools myself, I could not guide it toward a better test or recognize when its output was wrong. That changes what I ask when reviewing its output:

**Purpose: Is this behavior worth protecting?**

- What decisions, transformations, or states are present?
- Which behavior could fail?
- What happens if this behavior fails?
- Is the same guarantee already covered elsewhere?
- What expected behavior does this test protect, whether it is a successful flow or an error case?

**Construction: Is this a good test of that behavior?**

- What is the smallest boundary that contains the behavior?
- Does the project already have a library, helper, or pattern for building this test?
- Is the test observing or replacing only what it needs to, or is it recreating existing test machinery?

AI can write another test almost instantly. The valuable work is deciding whether that test makes the system more trustworthy and whether it is built in a way the codebase can support. I started by asking AI to write tests and skimming what it produced. I ended up reviewing both what the tests protected and how they were created.
