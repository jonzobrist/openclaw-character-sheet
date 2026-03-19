export type Evidence = {
  kind: string
  source: string
  detail: string
  weight?: number
}

export type Trait = {
  id: string
  label: string
  score: number
  confidence?: number
  summary: string
  evidence: Evidence[]
}

export type LeadershipPrinciple = {
  id: string
  label: string
  score: number
  summary: string
}

export type Scenario = {
  id: string
  title: string
  prompt: string
  predictedBehavior?: string
  confidence?: number
}

export type AgentProfile = {
  agent: {
    name: string
    workspacePath: string
    model?: string
    tools: string[]
    skills: string[]
    constraints: string[]
    archetype?: string
    temperament?: string
    summary?: string
    workspaceStats?: {
      fileCount: number
      instructionFileCount: number
      configFileCount: number
      skillFileCount: number
    }
    sourceFiles?: string[]
  }
  traits: Trait[]
  leadershipPrinciples: LeadershipPrinciple[]
  scenarios: Scenario[]
}
