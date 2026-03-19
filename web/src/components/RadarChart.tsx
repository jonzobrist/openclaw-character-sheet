import type { Trait } from '../types/profile'

type RadarChartProps = {
  traits: Trait[]
}

const SIZE = 360
const CENTER = SIZE / 2
const MAX_RADIUS = 124

function polarPoint(index: number, total: number, radius: number) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2
  return {
    x: CENTER + Math.cos(angle) * radius,
    y: CENTER + Math.sin(angle) * radius,
  }
}

export function RadarChart({ traits }: RadarChartProps) {
  const polygonPoints = traits
    .map((trait, index) => {
      const radius = (trait.score / 100) * MAX_RADIUS
      const point = polarPoint(index, traits.length, radius)
      return `${point.x},${point.y}`
    })
    .join(' ')

  return (
    <div className="radar-card">
      <div className="section-heading">
        <p className="eyebrow">Temperament Wheel</p>
        <h2>Behavioral silhouette</h2>
      </div>

      <svg
        className="radar-chart"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label="Radar chart of the agent's behavioral traits"
      >
        {[0.25, 0.5, 0.75, 1].map((multiplier) => (
          <polygon
            key={multiplier}
            className="radar-grid"
            points={traits
              .map((_, index) => {
                const point = polarPoint(index, traits.length, MAX_RADIUS * multiplier)
                return `${point.x},${point.y}`
              })
              .join(' ')}
          />
        ))}

        {traits.map((_, index) => {
          const edge = polarPoint(index, traits.length, MAX_RADIUS)
          return (
            <line
              key={index}
              className="radar-axis"
              x1={CENTER}
              y1={CENTER}
              x2={edge.x}
              y2={edge.y}
            />
          )
        })}

        <polygon className="radar-fill" points={polygonPoints} />

        {traits.map((trait, index) => {
          const radius = (trait.score / 100) * MAX_RADIUS
          const point = polarPoint(index, traits.length, radius)
          const labelPoint = polarPoint(index, traits.length, MAX_RADIUS + 24)

          return (
            <g key={trait.id}>
              <circle className="radar-node" cx={point.x} cy={point.y} r="5" />
              <text className="radar-label" x={labelPoint.x} y={labelPoint.y}>
                {trait.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
