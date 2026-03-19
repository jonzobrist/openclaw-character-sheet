import type { AgentProfile } from '../types/profile'

export const openclawLobsterProfile: AgentProfile = {
  agent: {
    name: 'OpenClaw Lobster',
    archetype: 'Tidecaller Troubleshooter',
    workspacePath: '/workspace/openclaw/lobster',
    model: 'gpt-5.x',
    temperament:
      'Calm under pressure, a little sharp-clawed around risk, and happiest when it can inspect the evidence before making a move.',
    summary:
      'A fixture profile for the first character-sheet prototype. The Lobster is designed to feel like a disciplined operator with a strong instinct for inspection, careful execution, and dependable follow-through.',
    tools: ['shell', 'web', 'git', 'files'],
    skills: ['troubleshooting', 'documentation', 'code review', 'ui prototyping'],
    constraints: [
      'Avoid destructive git commands unless the user explicitly asks.',
      'Prefer inspection and explanation before irreversible action.',
      'Persist until the task is fully handled when safe to do so.',
      'Ask for clarification only when the risk of guessing is meaningful.',
    ],
  },
  traits: [
    {
      id: 'autonomy',
      label: 'Autonomy',
      score: 82,
      confidence: 0.91,
      summary: 'The Lobster is encouraged to make reasonable assumptions and move the task forward without stalling.',
      evidence: [
        {
          kind: 'instruction',
          source: 'developer guidance',
          detail: 'Persist until the task is fully handled end-to-end whenever feasible.',
          weight: 10,
        },
        {
          kind: 'instruction',
          source: 'developer guidance',
          detail: 'Make reasonable assumptions when appropriate and state them after performing work.',
          weight: 8,
        },
      ],
    },
    {
      id: 'caution',
      label: 'Caution',
      score: 88,
      confidence: 0.95,
      summary: 'This agent has a pronounced safety instinct and visibly prefers reversible actions.',
      evidence: [
        {
          kind: 'constraint',
          source: 'editing rules',
          detail: 'Never use destructive commands like git reset --hard without explicit request or approval.',
          weight: 10,
        },
        {
          kind: 'constraint',
          source: 'workflow',
          detail: 'High-risk or conflicting situations should pause for realignment instead of guessing.',
          weight: 9,
        },
      ],
    },
    {
      id: 'verbosity',
      label: 'Verbosity',
      score: 66,
      confidence: 0.84,
      summary: 'The Lobster explains itself clearly, but it still tries to compress the final answer to the highest-signal details.',
      evidence: [
        {
          kind: 'style',
          source: 'final answer guidance',
          detail: 'Optimize for fast, high-level comprehension rather than completeness-by-default.',
          weight: 6,
        },
        {
          kind: 'style',
          source: 'pairing guidance',
          detail: 'Explain concepts without ego and help teammates feel supported.',
          weight: 5,
        },
      ],
    },
    {
      id: 'tool-bias',
      label: 'Tool Bias',
      score: 91,
      confidence: 0.96,
      summary: 'This agent strongly prefers inspecting the real workspace and verifying claims with tools before deciding.',
      evidence: [
        {
          kind: 'workflow',
          source: 'general instructions',
          detail: 'Build context by examining the codebase first without making assumptions or jumping to conclusions.',
          weight: 10,
        },
        {
          kind: 'workflow',
          source: 'tooling rules',
          detail: 'Use fast local tools and parallelize reads whenever possible.',
          weight: 8,
        },
      ],
    },
    {
      id: 'structure',
      label: 'Structure',
      score: 85,
      confidence: 0.9,
      summary: 'The Lobster works inside a very explicit response and editing structure.',
      evidence: [
        {
          kind: 'format',
          source: 'formatting rules',
          detail: 'Responses, updates, and file references all have strong structural constraints.',
          weight: 9,
        },
        {
          kind: 'format',
          source: 'project guidance',
          detail: 'Plans, schemas, and scoped sections are preferred over vague prose.',
          weight: 8,
        },
      ],
    },
    {
      id: 'escalation',
      label: 'Escalation',
      score: 72,
      confidence: 0.82,
      summary: 'The Lobster does not escalate often, but it is expected to stop and realign when the downside of guessing is high.',
      evidence: [
        {
          kind: 'workflow',
          source: 'escalation guidance',
          detail: 'Escalate gently and deliberately when decisions have non-obvious consequences or hidden risk.',
          weight: 7,
        },
        {
          kind: 'workflow',
          source: 'default mode',
          detail: 'Prefer making reasonable assumptions unless the answer cannot be discovered safely.',
          weight: 5,
        },
      ],
    },
    {
      id: 'context',
      label: 'Context Sensitivity',
      score: 87,
      confidence: 0.9,
      summary: 'The agent is highly tuned to user intent, environment context, and the difference between coding, planning, and review work.',
      evidence: [
        {
          kind: 'policy',
          source: 'developer guidance',
          detail: 'Adjust explanations, pacing, and tone to maximize understanding and confidence.',
          weight: 9,
        },
        {
          kind: 'policy',
          source: 'tooling guidance',
          detail: 'Different task categories trigger different behaviors, including browsing boundaries and coding defaults.',
          weight: 8,
        },
      ],
    },
    {
      id: 'persistence',
      label: 'Persistence',
      score: 93,
      confidence: 0.97,
      summary: 'Once the Lobster picks up a quest, it is strongly incentivized to carry it through implementation and verification.',
      evidence: [
        {
          kind: 'instruction',
          source: 'autonomy guidance',
          detail: 'Do not stop at analysis or partial fixes; carry changes through implementation and verification.',
          weight: 10,
        },
        {
          kind: 'instruction',
          source: 'collaboration guidance',
          detail: 'Take responsibility for whether teammates are unblocked and progress continues.',
          weight: 9,
        },
      ],
    },
  ],
  leadershipPrinciples: [
    {
      id: 'customer-obsession',
      label: 'Customer Obsession',
      score: 84,
      summary: 'Strong user-intent sensitivity and a habit of optimizing for clarity and practical outcomes.',
    },
    {
      id: 'ownership',
      label: 'Ownership',
      score: 92,
      summary: 'Takes tasks through to completion and treats unblocking the user as part of the job.',
    },
    {
      id: 'invent-and-simplify',
      label: 'Invent and Simplify',
      score: 76,
      summary: 'Prefers clear systems and reusable structure, though it still starts from evidence rather than flashy invention.',
    },
    {
      id: 'are-right-a-lot',
      label: 'Are Right, A Lot',
      score: 81,
      summary: 'Leans on inspection and verification instead of bluffing, which improves reliability.',
    },
    {
      id: 'learn-and-be-curious',
      label: 'Learn and Be Curious',
      score: 79,
      summary: 'Tool use and context awareness create a solid learning posture.',
    },
    {
      id: 'hire-and-develop',
      label: 'Hire and Develop the Best',
      score: 69,
      summary: 'Its collaboration style is supportive, though mentoring is not the core focus of the current configuration.',
    },
    {
      id: 'highest-standards',
      label: 'Highest Standards',
      score: 88,
      summary: 'Strong formatting, verification, and safety constraints raise the floor on quality.',
    },
    {
      id: 'think-big',
      label: 'Think Big',
      score: 73,
      summary: 'Capable of strategic framing, but still more operator than visionary in the current build.',
    },
    {
      id: 'bias-for-action',
      label: 'Bias for Action',
      score: 86,
      summary: 'Moves quickly once enough evidence is gathered and rarely gets stuck in passive planning.',
    },
    {
      id: 'frugality',
      label: 'Frugality',
      score: 71,
      summary: 'Uses simple local tools and avoids unnecessary complexity, though efficiency is secondary to correctness.',
    },
    {
      id: 'earn-trust',
      label: 'Earn Trust',
      score: 90,
      summary: 'Candor, care, and evidence-backed explanations make this one of the Lobster’s strongest domains.',
    },
    {
      id: 'dive-deep',
      label: 'Dive Deep',
      score: 94,
      summary: 'The Lobster loves inspecting the actual workspace and following the clues all the way down.',
    },
    {
      id: 'have-backbone',
      label: 'Have Backbone',
      score: 74,
      summary: 'Willing to push back on risky choices, but still tries to stay collaborative and non-confrontational.',
    },
    {
      id: 'deliver-results',
      label: 'Deliver Results',
      score: 91,
      summary: 'Very strong finish-the-job energy with an emphasis on verified outcomes.',
    },
    {
      id: 'best-employer',
      label: 'Best Employer',
      score: 77,
      summary: 'The communication style is warm and confidence-building, which creates a healthy collaborative feel.',
    },
    {
      id: 'broad-responsibility',
      label: 'Broad Responsibility',
      score: 83,
      summary: 'Risk awareness and context sensitivity make it alert to second-order consequences.',
    },
  ],
  scenarios: [
    {
      id: 'incident-bridge',
      title: 'Incident Bridge',
      prompt: 'An outage is unfolding and the user needs a fast, safe next move.',
      predictedBehavior:
        'The Lobster will inspect the workspace and tooling first, summarize likely paths, and avoid irreversible commands until the evidence is tighter.',
      confidence: 0.82,
    },
    {
      id: 'destructive-request',
      title: 'Forbidden Ritual',
      prompt: 'The user requests a destructive git cleanup while the worktree is dirty.',
      predictedBehavior:
        'The Lobster is likely to refuse the risky command, explain the danger, and offer safer alternatives such as targeted inspection or non-destructive cleanup.',
      confidence: 0.94,
    },
    {
      id: 'ui-prototype',
      title: 'Tavern Prototype Sprint',
      prompt: 'The user wants a themed frontend quickly, but expects it to feel intentional rather than generic.',
      predictedBehavior:
        'The Lobster will move into implementation mode, preserve the visual language, and add a distinctive interface rather than defaulting to boilerplate.',
      confidence: 0.79,
    },
  ],
}
