---
title: "Building a Website That Outlasts Its Builders"
description: "Lessons from Black in Tech."
date: "03/05/2026"
---

Going to a military school where I served as an Administration and Personnel Officer and Supply and Logistics Officer for 500+ students, I became very familiar with designing processes and standard operating procedures. When I first began my leadership journey, I was just following them. But as I rose in rank, I gained the ability to question and redesign them.

Something this taught me is that even though you can come up with an amazing solution, if your successors can't carry it out with the same degree of execution, then that process will most likely die with you, leaving them stuck with a system they don't know how to use.

*That fear is exactly what shaped how I approached building the website for Black in Tech.*

## Black in Tech

Black in Tech is a one-year-old club at UC Irvine. Like many early-stage projects, the website started as a hardcoded static site, which was the right call for getting something up quickly.

But as the club grows, that approach doesn't scale. With a rotating team of interns who graduate and move on every year, we needed to think carefully about what we are building and for whom.

The question isn't what's best for the developers building it. It's what's best for the club that will outlive them. That meant juggling time of implementation, difficulty, longevity, and the varying skill levels of everyone involved.

## The Buy vs. Build Debate

That led us to a central question: do we build a custom CMS from scratch, or use an existing headless CMS like Sanity?

One concern that came up was that reaching for a premade solution would take away a learning opportunity, especially for interns with less experience who could benefit from building something like this themselves.

That's a fair concern. But it assumes all learning looks the same.

There are two fundamentally different types of learning in software engineering:

- **Learning how to use a set of tools**
- **Learning which set of tools to use**

The first can happen anywhere. Side projects, tutorials, personal experiments. There's no shortage of ways to learn how to implement a CMS.

The second is much harder to replicate on your own. Deciding which tools to use under real constraints, with actual stakeholders, real timelines, and long-term maintainability on the line, is an experience you rarely get early in your career. A club project is one of the few places where that's available to you.

A club site is not the right place to learn how to build a CMS. It's where you learn how to make responsible engineering decisions. That's a harder and more valuable skill.

## The Hybrid

But this framing presents a false binary. The real answer isn't buy or build. It's buying where the complexity isn't worth taking on, and building where the scope is manageable enough to own long-term. That's where the learning environment stays intact.

Blogging isn't worth reinventing. It requires solving deep, frustrating problems like rich text parsing, image CDN pipelines, and draft states. Sanity has already solved them well. A custom solution would be more error prone, harder to hand off, and difficult for a rotating team to maintain over time.

Simpler features like showcasing events and maintaining an org chart are worth building. The requirements are lean, the design decisions are manageable, and a rotating team can build, understand, and maintain them without getting lost. That's exactly the kind of work that belongs in a custom implementation.

This split isn't just pragmatic. It's actually better for learning across the board.

The hybrid creates a spectrum of work where anyone can find something appropriately challenging. Someone newer to the team can build out the events feature end-to-end on the custom layer. The scope is contained, the requirements are clear, and the ownership is real. Someone more experienced might be writing code too, but they are also the one deciding how that feature fits into the broader architecture, or where to draw the line between what belongs in Sanity and what belongs in the custom layer.

## Designing for What Comes After You

In the military, I learned to design processes for the person who comes after you. The best process isn't the most sophisticated one. It's the one that survives the transition.

Building this website taught me that the same principle applies to software. The hybrid approach we landed on isn't a compromise. It's the answer that holds up when you ask the right question: not "what's the best technical solution?" but "what can the next team actually carry forward?"

That's the decision worth making.