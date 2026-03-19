# OpenClaw Character Sheet

An inspection and visualization tool for OpenClaw workspaces that helps humans understand how an agent is configured, how it is likely to behave, and how configuration changes may affect that behavior.

## Vision

The app treats an agent like a playable character sheet:

- inspect configuration, tools, skills, and constraints
- derive explainable behavioral traits from observable evidence
- rate the agent across simplified leadership-principle lenses
- compare before/after changes
- run scenario tests to preview likely behavior shifts

## First Goal

Build a thin vertical slice for one workspace:

1. ingest one OpenClaw workspace
2. identify the configured agent and relevant files
3. derive an initial set of behavioral traits
4. render a fantasy-themed character-sheet UI
5. simulate a few scenario-based tests

## Product Principles

- Every visible stat must be evidence-backed
- Traits are derived from configuration, not claimed as literal psychology
- Leadership-principle ratings are simplified lenses, not official evaluations
- Read-only analysis comes before direct editing
- Diffs and simulations are core, not add-ons
- Humans should be able to inspect why the system reached a conclusion

## Initial Project Layout

- `docs/PROJECT_SPEC.md`: v1 product and technical scope
- `docs/TRAIT_RUBRIC.md`: initial trait definitions and scoring inputs
- `schemas/agent-profile.schema.json`: normalized data shape for ingestion and UI
- `tools/extract-profile.mjs`: heuristic CLI that emits profile JSON from a workspace path
- `web/`: React prototype UI

## Local Development

### UI

```bash
cd web
npm install
npm run dev
```

### Workspace Profile Extraction

```bash
node tools/extract-profile.mjs /path/to/openclaw-workspace
```

## Suggested Next Steps

1. point the extractor at a real OpenClaw workspace
2. refine the evidence rules and leadership-principle mappings
3. connect extracted JSON into the UI
4. add before/after comparison and scenario re-simulation
