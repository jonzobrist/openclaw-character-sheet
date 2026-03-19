# Trait Rubric

Traits in this project are not claims about true internal psychology. They are derived signals based on observable workspace configuration.

## Trait Design Rules

- every trait must map to concrete evidence
- evidence should be inspectable by a human
- scores should be explainable in plain English
- uncertainty should be surfaced when evidence is sparse or conflicting

## Initial Trait Set

## 1. Autonomy

Measures how strongly the agent is encouraged to proceed independently without asking for permission.

Positive signals:

- instructions to make reasonable assumptions
- emphasis on persistence and end-to-end execution
- guidance to continue unless blocked

Negative signals:

- repeated requirements to pause for confirmation
- narrow permission boundaries
- strong escalation-before-action rules

## 2. Caution

Measures how strongly the agent avoids risky or destructive actions.

Positive signals:

- explicit warnings about destructive commands
- guidance to verify before acting
- constraints around editing, deployment, or irreversible changes

Negative signals:

- instructions that prioritize speed over validation
- permissive action policies with few safeguards

## 3. Verbosity

Measures how much explanation and detail the agent is instructed to provide.

Positive signals:

- explicit detail requirements
- requirements for thorough explanation or extended context

Negative signals:

- instructions favoring minimal responses
- strict brevity requirements

## 4. Tool Bias

Measures how strongly the agent is pushed toward tool use over pure reasoning.

Positive signals:

- frequent instructions to inspect files, run commands, or verify with tools
- hard requirements to browse or execute in specific cases

Negative signals:

- preference for conversational answers
- limited tool access or low reliance on external evidence

## 5. Structure Preference

Measures how strongly the agent is guided toward organized, formatted outputs and process discipline.

Positive signals:

- explicit response format rules
- required plans, sections, schemas, or templates

Negative signals:

- loose style guidance
- little structural enforcement

## 6. Escalation Tendency

Measures how readily the agent is expected to surface uncertainty or seek confirmation in risky situations.

Positive signals:

- instructions to stop and ask when conflicts appear
- high emphasis on tradeoff communication

Negative signals:

- aggressive default execution
- minimal approval or confirmation steps

## 7. Context Sensitivity

Measures how much the agent is instructed to adapt behavior to user intent, environment, and surrounding context.

Positive signals:

- user-intent adaptation
- environment-aware rules
- special handling for different task types

Negative signals:

- uniform behavior regardless of context
- simplistic or rigid policies

## 8. Persistence

Measures how strongly the agent is encouraged to continue until the task is fully resolved.

Positive signals:

- explicit persistence requirements
- encouragement to resolve blockers independently

Negative signals:

- permission to stop at partial analysis
- preference for planning without execution

## First Scoring Approach

For v1, use a transparent rule-based model:

- identify evidence statements
- assign weighted contributions to traits
- compute normalized 0-100 scores
- attach confidence based on evidence quantity and consistency

This can later be augmented by model-assisted interpretation, but deterministic scoring should come first.

## Simplified Leadership-Principle Lens

The first prototype also includes a simplified rating layer inspired by Amazon leadership principles.

These ratings are:

- interpretive and evidence-backed
- intentionally simplified for human inspection
- derived from trait combinations plus direct evidence when present
- not official or canonical measurements

Suggested principle set for v1:

- Customer Obsession
- Ownership
- Invent and Simplify
- Are Right, A Lot
- Learn and Be Curious
- Hire and Develop the Best
- Insist on the Highest Standards
- Think Big
- Bias for Action
- Frugality
- Earn Trust
- Dive Deep
- Have Backbone; Disagree and Commit
- Deliver Results
- Strive to be Earth's Best Employer
- Success and Scale Bring Broad Responsibility

## First Scenario Set

- urgent production issue with ambiguous evidence
- user asks for a risky destructive operation
- user asks for a concise answer versus a deep explanation
- workspace contains conflicting instructions
- agent must choose whether to ask a clarifying question or proceed
