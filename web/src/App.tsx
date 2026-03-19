import { useMemo, useState } from 'react'
import './App.css'
import { RadarChart } from './components/RadarChart'
import { openclawLobsterProfile } from './data/openclawLobsterProfile'
import type { LeadershipPrinciple } from './types/profile'

function App() {
  const profile = openclawLobsterProfile
  const [selectedTraitId, setSelectedTraitId] = useState(profile.traits[0]?.id ?? '')

  const selectedTrait = useMemo(
    () => profile.traits.find((trait) => trait.id === selectedTraitId) ?? profile.traits[0],
    [profile.traits, selectedTraitId],
  )

  const topPrinciples = [...profile.leadershipPrinciples]
    .sort((left, right) => right.score - left.score)
    .slice(0, 4)

  return (
    <main className="sheet-shell">
      <section className="hero-panel panel">
        <div className="hero-copy">
          <p className="eyebrow">OpenClaw Character Sheet</p>
          <h1>{profile.agent.name}</h1>
          <p className="hero-subtitle">{profile.agent.archetype}</p>
          <p className="hero-summary">{profile.agent.summary}</p>

          <div className="tag-row">
            <span className="sigil">Model: {profile.agent.model}</span>
            <span className="sigil">Quest Status: Ready</span>
            <span className="sigil">Workspace: Prototype Fixture</span>
          </div>
        </div>
        <div className="hero-crest">
          <div className="crest-card">
            <span className="crest-title">Agent Crest</span>
            <div className="crest-art" aria-hidden="true">
              <span className="claw claw-left" />
              <span className="lobster-shell" />
              <span className="claw claw-right" />
            </div>
            <p className="crest-caption">{profile.agent.temperament}</p>
          </div>
        </div>
      </section>

      <section className="overview-grid">
        <div className="panel">
          <div className="section-heading">
            <p className="eyebrow">Loadout</p>
            <h2>Kit and commandments</h2>
          </div>

          <div className="inventory-grid">
            <StatBlock title="Tools" values={profile.agent.tools} />
            <StatBlock title="Skills" values={profile.agent.skills} />
            <StatBlock title="Constraints" values={profile.agent.constraints} />
          </div>
        </div>

        <RadarChart traits={profile.traits} />
      </section>

      <section className="character-grid">
        <div className="panel">
          <div className="section-heading">
            <p className="eyebrow">Core Attributes</p>
            <h2>Trait ledger</h2>
          </div>

          <div className="traits-grid">
            {profile.traits.map((trait) => (
              <button
                key={trait.id}
                className={`trait-card ${selectedTrait?.id === trait.id ? 'selected' : ''}`}
                onClick={() => setSelectedTraitId(trait.id)}
                type="button"
              >
                <span className="trait-score">{trait.score}</span>
                <span className="trait-name">{trait.label}</span>
                <span className="trait-summary">{trait.summary}</span>
              </button>
            ))}
          </div>
        </div>

        {selectedTrait ? (
          <div className="panel evidence-panel">
            <div className="section-heading">
              <p className="eyebrow">Evidence Panel</p>
              <h2>{selectedTrait.label}</h2>
            </div>

            <p className="detail-summary">{selectedTrait.summary}</p>
            <div className="meter-shell">
              <div className="meter-fill" style={{ width: `${selectedTrait.score}%` }} />
            </div>
            <p className="confidence-copy">
              Confidence {Math.round((selectedTrait.confidence ?? 0) * 100)}%
            </p>

            <div className="evidence-list">
              {selectedTrait.evidence.map((item) => (
                <article key={`${selectedTrait.id}-${item.source}-${item.detail}`} className="evidence-item">
                  <p className="evidence-source">
                    {item.source} <span>{item.kind}</span>
                  </p>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <section className="panel">
        <div className="section-heading">
          <p className="eyebrow">Leadership Codex</p>
          <h2>Simplified Amazon principle ratings</h2>
        </div>

        <div className="codex-highlights">
          {topPrinciples.map((principle) => (
            <div key={principle.id} className="highlight-card">
              <span className="highlight-score">{principle.score}</span>
              <div>
                <h3>{principle.label}</h3>
                <p>{principle.summary}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="principles-grid">
          {profile.leadershipPrinciples.map((principle) => (
            <PrincipleCard key={principle.id} principle={principle} />
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <p className="eyebrow">Encounter Deck</p>
          <h2>Scenario previews</h2>
        </div>

        <div className="scenario-grid">
          {profile.scenarios.map((scenario) => (
            <article key={scenario.id} className="scenario-card">
              <p className="scenario-title">{scenario.title}</p>
              <p className="scenario-prompt">{scenario.prompt}</p>
              <p className="scenario-behavior">{scenario.predictedBehavior}</p>
              <p className="scenario-confidence">
                Confidence {Math.round((scenario.confidence ?? 0) * 100)}%
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

function StatBlock({ title, values }: { title: string; values: string[] }) {
  return (
    <section className="stat-block">
      <h3>{title}</h3>
      <div className="pill-list">
        {values.map((value) => (
          <span key={value} className="pill">
            {value}
          </span>
        ))}
      </div>
    </section>
  )
}

function PrincipleCard({ principle }: { principle: LeadershipPrinciple }) {
  return (
    <article className="principle-card">
      <div className="principle-header">
        <h3>{principle.label}</h3>
        <span>{principle.score}</span>
      </div>
      <div className="meter-shell compact">
        <div className="meter-fill" style={{ width: `${principle.score}%` }} />
      </div>
      <p>{principle.summary}</p>
    </article>
  )
}

export default App
