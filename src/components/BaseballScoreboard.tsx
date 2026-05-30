import type { Player, MetricDef } from '../types'

interface BaseballScoreboardProps {
  players: Player[]
  metrics: MetricDef[]
}

const MEDALS = ['🥇', '🥈', '🥉']

export default function BaseballScoreboard({ players, metrics }: BaseballScoreboardProps) {
  const sorted = [...players].sort((a, b) => {
    // Primary sort: runs scored (the actual score)
    const runsDiff = (b.scores['runs'] ?? 0) - (a.scores['runs'] ?? 0)
    if (runsDiff !== 0) return runsDiff
    // Tiebreaker: hits, then home runs
    const hitsDiff = (b.scores['hits'] ?? 0) - (a.scores['hits'] ?? 0)
    if (hitsDiff !== 0) return hitsDiff
    return (b.scores['homeRuns'] ?? 0) - (a.scores['homeRuns'] ?? 0)
  })

  return (
    <div className="rounded-2xl overflow-hidden shadow-xl border border-neutral-700">
      {/* Header bar */}
      <div className="bg-neutral-800 px-5 py-3 flex items-center justify-between border-b border-neutral-700">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="text-2xl">⚾</span>
          <span className="text-sm font-black tracking-[0.2em] uppercase text-rose-400">
            Box Score
          </span>
        </div>
        {/* Live indicator */}
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" aria-hidden="true" />
          <span className="text-xs font-bold tracking-widest uppercase text-neutral-400">Live</span>
        </div>
      </div>

      <div className="bg-neutral-900 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-neutral-800/80">
              {/* Rank column */}
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-bold tracking-widest uppercase text-neutral-500 w-12"
              >
                #
              </th>
              {/* Player name */}
              <th
                scope="col"
                className="text-left px-4 py-3 text-xs font-bold tracking-widest uppercase text-neutral-400 min-w-[130px]"
              >
                Player
              </th>
              {/* Metric columns */}
              {metrics.map(m => (
                <th
                  key={m.key}
                  scope="col"
                  className="px-4 py-3 text-center text-xs font-black tracking-widest uppercase text-rose-400 w-16"
                >
                  {m.shortLabel}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((player, i) => (
              <tr
                key={player.id}
                className={i % 2 === 0 ? 'bg-neutral-900' : 'bg-neutral-800/30'}
                style={{ borderLeft: `3px solid ${player.colorHex}` }}
              >
                {/* Rank */}
                <td className="px-3 py-4 text-center">
                  {i < MEDALS.length ? (
                    <span className="text-xl" aria-label={`Rank ${i + 1}`}>{MEDALS[i]}</span>
                  ) : (
                    <span className="text-sm font-bold text-neutral-500" aria-label={`Rank ${i + 1}`}>
                      #{i + 1}
                    </span>
                  )}
                </td>
                {/* Name */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: player.colorHex }}
                      aria-hidden="true"
                    />
                    <span className="text-sm font-bold whitespace-nowrap" style={{ color: player.colorHex }}>
                      {player.name}
                    </span>
                  </div>
                </td>
                {/* Metric values */}
                {metrics.map(m => (
                  <td
                    key={m.key}
                    className="px-4 py-4 text-center font-mono text-xl font-black text-white tabular-nums"
                  >
                    {player.scores[m.key] ?? 0}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
