# OpenClaw Character Sheet

An inspection and visualization tool for OpenClaw workspaces that helps humans understand how an agent is configured, how it is likely to behave, and how configuration changes may affect that behavior.

## Vision

The app treats an agent like a playable character sheet:

- inspect configuration, tools, skills, and constraints
- derive explainable behavioral traits from observable evidence
- compare before/after changes
- run scenario tests to preview likely behavior shifts

## First Goal

Build a thin vertical slice for one workspace:

1. ingest one OpenClaw workspace
2. identify the configured agent and relevant files
3. derive an initial set of behavioral traits
4. render a character-sheet style UI
5. simulate a few scenario-based tests

## Product Principles

- Every visible stat must be evidence-backed
- Traits are derived from configuration, not claimed as literal psychology
- Read-only analysis comes before direct editing
- Diffs and simulations are core, not add-ons
- Humans should be able to inspect why the system reached a conclusion

## Initial Project Layout

- `docs/PROJECT_SPEC.md`: v1 product and technical scope
- `docs/TRAIT_RUBRIC.md`: initial trait definitions and scoring inputs
- `schemas/agent-profile.schema.json`: normalized data shape for ingestion and UI

## Suggested Next Steps

1. validate the v1 trait set and scenario list
2. inspect a real OpenClaw workspace and map its files into the schema
3. choose the app stack for the first prototype
4. implement the ingestion pipeline before building polished UI
