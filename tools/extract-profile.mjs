import fs from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
const workspacePath = args.find((arg) => !arg.startsWith('--'))
const outIndex = args.indexOf('--out')
const outputPath = outIndex >= 0 ? args[outIndex + 1] : undefined

if (!workspacePath) {
  console.error('Usage: node tools/extract-profile.mjs <workspace-path> [--out output-file]')
  process.exit(1)
}

const normalizedWorkspacePath = path.resolve(workspacePath)

if (!fs.existsSync(normalizedWorkspacePath)) {
  console.error(`Workspace not found: ${normalizedWorkspacePath}`)
  process.exit(1)
}

const TEXT_EXTENSIONS = new Set(['.md', '.txt', '.json', '.yaml', '.yml', '.toml'])
const MAX_FILES = 250
const INSTRUCTION_FILE_HINTS = ['agent', 'instruction', 'prompt', 'system', 'readme', 'policy']
const CONFIG_FILE_HINTS = ['json', 'yaml', 'yml', 'toml']
const SKILL_FILE_HINTS = ['skill']
const IGNORED_DIRECTORIES = new Set(['.git', 'node_modules', 'dist', 'coverage'])
const IGNORED_FILENAMES = new Set(['package-lock.json', 'generated-profile.json'])

const traitRules = [
  {
    id: 'autonomy',
    label: 'Autonomy',
    positive: [
      /make reasonable assumptions/gi,
      /continue unless blocked/gi,
      /persist until/gi,
      /execute end-to-end/gi,
    ],
    negative: [/ask for approval/gi, /pause for confirmation/gi],
    summary: 'How strongly the agent is encouraged to act independently.',
  },
  {
    id: 'caution',
    label: 'Caution',
    positive: [
      /verify/gi,
      /non-destructive/gi,
      /do not use destructive/gi,
      /avoid risky/gi,
      /high-stakes/gi,
    ],
    negative: [/move fast/gi, /speed over validation/gi],
    summary: 'How strongly the agent is pushed toward safe, reversible behavior.',
  },
  {
    id: 'verbosity',
    label: 'Verbosity',
    positive: [/detailed/gi, /thorough/gi, /explain/gi, /walkthrough/gi],
    negative: [/concise/gi, /minimal/gi, /brief/gi],
    summary: 'How much explanation the agent is expected to provide.',
  },
  {
    id: 'tool-bias',
    label: 'Tool Bias',
    positive: [/run commands/gi, /use tools/gi, /browse/gi, /inspect files/gi],
    negative: [/casual conversation/gi, /do not browse/gi],
    summary: 'How strongly the agent is steered toward tool use and verification.',
  },
  {
    id: 'structure',
    label: 'Structure',
    positive: [/formatting rules/gi, /sections/gi, /schema/gi, /structured/gi],
    negative: [/freeform/gi, /casual/gi],
    summary: 'How much structure and formatting discipline the agent is given.',
  },
  {
    id: 'escalation',
    label: 'Escalation',
    positive: [/stop and ask/gi, /ask the user/gi, /surface uncertainty/gi],
    negative: [/do not stop at analysis/gi, /go ahead and actually implement/gi],
    summary: 'How readily the agent is expected to escalate uncertainty or risk.',
  },
  {
    id: 'context',
    label: 'Context Sensitivity',
    positive: [/depends on the user/gi, /adapt/gi, /environment/gi, /context/gi],
    negative: [/uniform/gi, /regardless of context/gi],
    summary: 'How much the agent is told to adapt based on surrounding context.',
  },
  {
    id: 'persistence',
    label: 'Persistence',
    positive: [/persist until/gi, /fully handled/gi, /unblocked/gi, /ownership/gi],
    negative: [/partial/gi, /stop early/gi],
    summary: 'How strongly the agent is pushed to finish the job end-to-end.',
  },
]

const leadershipPrinciples = [
  ['customer-obsession', 'Customer Obsession', ['context', 'caution']],
  ['ownership', 'Ownership', ['autonomy', 'persistence']],
  ['invent-and-simplify', 'Invent and Simplify', ['structure', 'tool-bias']],
  ['are-right-a-lot', 'Are Right, A Lot', ['caution', 'context']],
  ['learn-and-be-curious', 'Learn and Be Curious', ['context', 'tool-bias']],
  ['hire-and-develop', 'Hire and Develop the Best', ['context', 'verbosity']],
  ['highest-standards', 'Insist on the Highest Standards', ['caution', 'structure']],
  ['think-big', 'Think Big', ['autonomy', 'context']],
  ['bias-for-action', 'Bias for Action', ['autonomy', 'persistence']],
  ['frugality', 'Frugality', ['structure', 'caution']],
  ['earn-trust', 'Earn Trust', ['verbosity', 'caution']],
  ['dive-deep', 'Dive Deep', ['tool-bias', 'context']],
  ['have-backbone', 'Have Backbone; Disagree and Commit', ['autonomy', 'escalation']],
  ['deliver-results', 'Deliver Results', ['persistence', 'structure']],
  ['best-employer', "Strive to be Earth's Best Employer", ['context', 'verbosity']],
  ['broad-responsibility', 'Success and Scale Bring Broad Responsibility', ['caution', 'context']],
]

function walk(dir, bucket = []) {
  if (bucket.length >= MAX_FILES) {
    return bucket
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && IGNORED_DIRECTORIES.has(entry.name)) {
      continue
    }

    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      walk(fullPath, bucket)
    } else if (
      TEXT_EXTENSIONS.has(path.extname(entry.name).toLowerCase()) &&
      !IGNORED_FILENAMES.has(entry.name)
    ) {
      bucket.push(fullPath)
    }

    if (bucket.length >= MAX_FILES) {
      break
    }
  }

  return bucket
}

function findMatches(content, patterns) {
  const details = []

  for (const pattern of patterns) {
    const matches = content.match(pattern) ?? []
    for (const match of matches) {
      details.push(match)
    }
  }

  return details
}

function fileLabel(filePath) {
  return path.relative(normalizedWorkspacePath, filePath) || path.basename(filePath)
}

function basenameWithoutExtension(filePath) {
  return path.basename(filePath, path.extname(filePath)).toLowerCase()
}

const files = walk(normalizedWorkspacePath)
const fileContents = files.map((filePath) => ({
  filePath,
  content: fs.readFileSync(filePath, 'utf8'),
}))

const instructionFiles = files.filter((filePath) => {
  const name = basenameWithoutExtension(filePath)
  return INSTRUCTION_FILE_HINTS.some((hint) => name.includes(hint))
})

const configFiles = files.filter((filePath) => CONFIG_FILE_HINTS.includes(path.extname(filePath).slice(1).toLowerCase()))
const skillFiles = files.filter((filePath) => {
  const name = basenameWithoutExtension(filePath)
  return SKILL_FILE_HINTS.some((hint) => name.includes(hint))
})

const toolPatterns = [
  ['shell', /\bshell\b|\bexec_command\b/gi],
  ['web', /\bweb\b|\bbrowse\b|\bsearch\b/gi],
  ['git', /\bgit\b/gi],
  ['files', /\bapply_patch\b|\brg\b|\bfiles\b/gi],
]

const discoveredTools = new Set()
const discoveredSkills = new Set()
const constraints = new Set()

for (const { content } of fileContents) {
  for (const [toolName, pattern] of toolPatterns) {
    if (pattern.test(content)) {
      discoveredTools.add(toolName)
    }
  }

  for (const skillMatch of content.matchAll(/\$([A-Za-z0-9-]+)/g)) {
    const skillName = skillMatch[1]

    if (skillName === 'schema' || skillName === 'id') {
      continue
    }

    discoveredSkills.add(skillName)
  }

  for (const constraintMatch of content.matchAll(/do not [^\n.]+/gi)) {
    constraints.add(constraintMatch[0].trim())
  }
}

const explicitModelEvidence = [
  ...fileContents.flatMap(({ filePath, content }) => {
    const matches = [...content.matchAll(/\b(gpt-[a-z0-9.-]+|claude-[a-z0-9.-]+|sonnet|opus|haiku)\b/gi)]
    return matches.slice(0, 4).map((match) => ({
      model: match[1],
      filePath,
    }))
  }),
]

const detectedModel = explicitModelEvidence[0]?.model

const traits = traitRules.map((rule) => {
  const evidence = []
  let score = 50

  for (const { filePath, content } of fileContents) {
    const positiveMatches = findMatches(content, rule.positive)
    const negativeMatches = findMatches(content, rule.negative)

    for (const match of positiveMatches.slice(0, 4)) {
      evidence.push({
        kind: 'positive-signal',
        source: fileLabel(filePath),
        detail: `Matched "${match}"`,
        weight: 8,
      })
      score += 8
    }

    for (const match of negativeMatches.slice(0, 3)) {
      evidence.push({
        kind: 'negative-signal',
        source: fileLabel(filePath),
        detail: `Matched "${match}"`,
        weight: -7,
      })
      score -= 7
    }
  }

  score = Math.max(0, Math.min(100, score))

  return {
    id: rule.id,
    label: rule.label,
    score,
    confidence: Math.min(1, 0.35 + evidence.length * 0.08),
    summary: rule.summary,
    evidence: evidence.slice(0, 8),
  }
})

const traitScoreMap = Object.fromEntries(traits.map((trait) => [trait.id, trait.score]))

const leadershipRatings = leadershipPrinciples.map(([id, label, dependencies]) => {
  const dependencyScores = dependencies.map((dependency) => traitScoreMap[dependency] ?? 50)
  const score = Math.round(
    dependencyScores.reduce((sum, value) => sum + value, 0) / dependencyScores.length,
  )

  return {
    id,
    label,
    score,
    summary: `${label} is inferred from ${dependencies.join(' + ')} signals.`,
  }
})

const profile = {
  agent: {
    name: path.basename(normalizedWorkspacePath),
    archetype: 'OpenClaw Workspace',
    workspacePath: normalizedWorkspacePath,
    model: detectedModel,
    temperament:
      'Measured, evidence-seeking, and tool-forward. This profile is heuristic and should be reviewed by a human.',
    summary:
      'Generated from workspace text files using lightweight pattern matching. Treat this as an inspection aid, not a final behavioral judgment.',
    tools: [...discoveredTools].sort(),
    skills: [...discoveredSkills].sort(),
    constraints: [...constraints].slice(0, 8),
    workspaceStats: {
      fileCount: files.length,
      instructionFileCount: instructionFiles.length,
      configFileCount: configFiles.length,
      skillFileCount: skillFiles.length,
    },
    sourceFiles: [...new Set([...instructionFiles, ...configFiles, ...skillFiles])]
      .slice(0, 8)
      .map((filePath) => fileLabel(filePath)),
  },
  traits,
  leadershipPrinciples: leadershipRatings,
  scenarios: [
    {
      id: 'urgent-prod',
      title: 'Urgent Production Incident',
      prompt: 'A user reports an outage and asks for the fastest safe next action.',
      predictedBehavior:
        'The agent will likely inspect available evidence, prefer tool use, and avoid destructive remediation without confirmation.',
      confidence: 0.69,
    },
    {
      id: 'risky-command',
      title: 'Risky Command Request',
      prompt: 'A user asks to run a destructive command in a dirty workspace.',
      predictedBehavior:
        'The agent will likely warn about risk, avoid destructive commands, and propose safer alternatives first.',
      confidence: 0.77,
    },
  ],
}

const output = JSON.stringify(profile, null, 2)

if (outputPath) {
  const normalizedOutputPath = path.resolve(outputPath)
  fs.mkdirSync(path.dirname(normalizedOutputPath), { recursive: true })
  fs.writeFileSync(normalizedOutputPath, `${output}\n`)
} else {
  console.log(output)
}
