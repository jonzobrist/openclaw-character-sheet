# Project Spec

## Working Name

OpenClaw Character Sheet

## Problem

OpenClaw workspaces can contain rich agent instructions, tools, skills, constraints, and behavioral guidance, but the resulting agent behavior is hard to inspect, compare, and reason about at a glance.

This project creates a human-friendly interface for understanding:

- what an agent is configured to do
- what constraints shape its behavior
- how those instructions translate into likely behavioral tendencies
- how those tendencies map onto simplified leadership-principle lenses
- how a proposed change may alter behavior in realistic scenarios

## Primary Users

- agent designers
- prompt and policy authors
- evaluators and reviewers
- operators debugging why an agent behaved a certain way

## Core Jobs To Be Done

- inspect one workspace and understand the configured agent quickly
- see how agent behavior is shaped by prompts, tools, skills, and rules
- compare two versions of a configuration
- safely experiment with hypothetical changes before writing them back
- run scenario-based tests to evaluate likely behavioral differences

## Non-Goals For V1

- full psychological modeling
- guaranteed prediction of live model behavior
- direct in-place editing of arbitrary workspace files
- support for every possible OpenClaw configuration shape

## V1 Scope

### Input

One OpenClaw workspace path.

### Output

A normalized profile containing:

- agent identity and metadata
- models, tools, skills, and major constraints
- evidence-backed behavioral traits
- simplified leadership-principle ratings
- scenario test definitions and result summaries

### Core Views

1. Workspace Overview
2. Character Sheet
3. Trait Diff
4. Scenario Lab

## System Design

### 1. Ingest

Read relevant workspace files and build a normalized internal representation.

Potential inputs:

- agent config files
- prompt files
- skills
- tool definitions
- memory or policy documents

### 2. Analyze

Map observed evidence to explainable behavioral traits.

The analysis layer should produce:

- trait scores
- evidence snippets
- confidence
- notable risks and strengths

### 3. Simulate

Run scenario-based evaluations that compare likely behavior across configurations.

V1 should support:

- baseline evaluation
- hypothetical change evaluation
- side-by-side comparison

### 4. Present

Render the profile in a character-sheet style interface with clear explanations and visual summaries.

The first visual direction is intentionally playful:

- fantasy tabletop tone
- parchment and codex-inspired panels
- a named sample agent, `OpenClaw Lobster`
- behavioral stats plus a leadership-principle codex

## Guiding UX Principles

- show evidence beside interpretation
- make changes legible with before/after comparisons
- prefer explicit uncertainty over false confidence
- keep the experience playful, but not unserious
- use themed presentation to make complex config inspection feel approachable

## Open Questions

- Which OpenClaw workspace formats do we need to support first?
- What sources are authoritative when files disagree?
- How much scoring should be deterministic versus model-assisted?
- Do we want local-only execution for the first version?

## Recommended Technical Sequence

1. finalize schema
2. finalize initial trait rubric
3. inspect one real workspace and build a parser
4. output profile JSON from CLI
5. build UI against saved fixtures and generated profiles
