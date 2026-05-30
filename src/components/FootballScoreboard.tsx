import type { Player, MetricDef } from '../types'

interface FootballScoreboardProps {
  players: Player[]
  metrics: MetricDef[]
}

const MEDALS = ['🥇', '🥈', '🥉']

function calcScore(player: Player): number {
  return (
    (player.scores['touchdowns']  ?? 0) * 6 +
    (player.scores['fieldGoals']  ?? 0) * 3 +
    (player.scores['extraPoints'] ?? 0) * 1
  )
}

export default function FootballScoreboard({ players, metrics }: FootballScoreboardProps) {
  const sorted = [...players].sort((a, b) => calcScore(b) - calcScore(a))

  return (
    <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-700">
      {/* Header bar */}
      <div className="bg-slate-800 px-5 py-3 flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="text-2xl">🏈</span>
          <span className="text-sm font-black tracking-[0.2em] uppercase text-amber-400">
            Scoreboard
          </span>
        </div>
        {/* Live indicator */}
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" aria-hidden="true" />
          <span className="text-xs font-bold tracking-widest uppercase text-slate-400">Live</span>
        </div>
      </div>

      <div className="bg-slate-900 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-800/80">
              {/* Rank */}
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-bold tracking-widest uppercase text-slate-500 w-12"
              >
                #
              </th>
              {/* Team name */}
              <th
                scope="col"
                className="text-left px-4 py-3 text-xs font-bold tracking-widest uppercase text-slate-400 min-w-[130px]"
              >
                Team
              </th>
              {/* Score (derived) */}
              <th
                scope="col"
                className="px-4 py-3 text-center text-xs font-black tracking-widest uppercase text-amber-400 w-20"
              >
                Score
              </th>
              {/* Individual metric columns */}
              {metrics.map(m => (
                <th
                  key={m.key}
                  scope="col"
                  className="px-4 py-3 text-center text-xs font-bold tracking-widest uppercase text-slate-500 w-14"
                >
                  {m.shortLabel}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((player, i) => {
              const score = calcScore(player)

              return (
                <tr
                  key={player.id}
                  className={i % 2 === 0 ? 'bg-slate-900' : 'bg-slate-800/30'}
                  style={{ borderLeft: `3px solid ${player.colorHex}` }}
                >
                  {/* Rank */}
                  <td className="px-3 py-4 text-center">
                    {i < MEDALS.length ? (
                      <span className="text-xl" aria-label={`Rank ${i + 1}`}>{MEDALS[i]}</span>
                    ) : (
                      <span className="text-sm font-bold text-slate-500" aria-label={`Rank ${i + 1}`}>
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
                      <span className="text-sm font-bold text-slate-100 whitespace-nowrap">
                        {player.name}
                      </span>
                    </div>
                  </td>
                  {/* Score */}
                  <td className="px-4 py-4 text-center tabular-nums">
                    <span
                      className="text-3xl font-black font-mono"
                      style={{ color: player.colorHex }}
                    >
                      {score}
                    </span>
                  </td>
                  {/* Per-metric stats */}
                  {metrics.map(m => (
                    <td
                      key={m.key}
                      className="px-4 py-4 text-center font-mono text-base font-semibold text-slate-300 tabular-nums"
                    >
                      {player.scores[m.key] ?? 0}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
