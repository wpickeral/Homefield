import type { Player, MetricDef, SportDef } from '../types'
import type { SportTheme } from '../utils/theme'
import PlayerCard from './PlayerCard'

interface ScoreboardProps {
  players: Player[]
  metrics: MetricDef[]
  sport: SportDef | null
  theme: SportTheme
  onAdjust: (id: string, metricKey: string, delta: number) => void
  onRemove: (id: string) => void
}

export default function Scoreboard({ players, metrics, sport, theme, onAdjust, onRemove }: ScoreboardProps) {
  if (players.length === 0) {
    return (
      <div className="flex flex-col items-center text-center py-14 gap-3">
        <span className="text-6xl" aria-hidden="true">{sport?.emoji ?? '🏆'}</span>
        <p className="text-base font-semibold text-gray-700">
          {sport ? `Ready to track some ${sport.label.toLowerCase()}?` : 'Ready to play?'}
        </p>
        <p className="text-sm text-gray-400">
          Add your first player above to get started ↑
        </p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-4">
      {players.map(player => (
        <li key={player.id}>
          <PlayerCard
            player={player}
            metrics={metrics}
            theme={theme}
            onAdjust={onAdjust}
            onRemove={onRemove}
          />
        </li>
      ))}
    </ul>
  )
}
