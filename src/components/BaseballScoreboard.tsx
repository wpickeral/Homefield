import type { Player, MetricDef } from '../types'
import { useBaseballState } from '../hooks/useBaseballState'

interface BaseballScoreboardProps {
  players: Player[]
  metrics: MetricDef[]
}

const BALLPARK_IMG =
  'https://images.pexels.com/photos/264279/pexels-photo-264279.jpeg?auto=compress&cs=tinysrgb&w=1400'

const MEDALS = ['🥇', '🥈', '🥉']

const INNING_ORDINALS = [
  '', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th',
  '10th', '11th', '12th', '13th', '14th', '15th',
]

function ordinal(n: number): string {
  return INNING_ORDINALS[n] ?? `${n}th`
}

export default function BaseballScoreboard({ players, metrics }: BaseballScoreboardProps) {
  const { inning, isTop, outs, addOut, removeOut, nextHalf, prevHalf } = useBaseballState()

  const sorted = [...players].sort((a, b) => {
    const runsDiff = (b.scores['runs'] ?? 0) - (a.scores['runs'] ?? 0)
    if (runsDiff !== 0) return runsDiff
    const hitsDiff = (b.scores['hits'] ?? 0) - (a.scores['hits'] ?? 0)
    if (hitsDiff !== 0) return hitsDiff
    return (b.scores['homeRuns'] ?? 0) - (a.scores['homeRuns'] ?? 0)
  })

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl relative">

      {/* ── Background: ballpark photo ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-slate-900"
        style={{ backgroundImage: `url(${BALLPARK_IMG})` }}
        aria-hidden="true"
      />
      {/* Heavy overlay — keeps image as subtle texture, content fully readable */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.62) 50%, rgba(0,0,0,0.75) 100%)' }}
        aria-hidden="true"
      />

      {/* ── Scoreboard content ── */}
      <div className="relative z-10">

        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="text-3xl">⚾</span>
            <span className="text-base font-black tracking-[0.2em] uppercase text-rose-400">
              Box Score
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" aria-hidden="true" />
            <span className="text-sm font-bold tracking-widest uppercase text-white/50">Live</span>
          </div>
        </div>

        {/* ── Game State Panel ── */}
        <div className="px-5 py-5 border-b border-white/10 bg-black/40 space-y-5">

          {/* Inning + Outs row */}
          <div className="flex items-center justify-between gap-4">

            {/* Inning display */}
            <div>
              <div className="text-sm font-bold uppercase tracking-widest text-white/50 mb-2">
                Inning
              </div>
              <div className="flex items-baseline gap-3">
                <span className={`text-4xl font-black leading-none ${isTop ? 'text-rose-400' : 'text-sky-400'}`}>
                  {isTop ? '▲' : '▼'}
                </span>
                <span className="text-6xl font-black text-white font-mono leading-none tabular-nums">
                  {ordinal(inning)}
                </span>
                <span className={`text-lg font-bold uppercase tracking-wide ${isTop ? 'text-rose-400' : 'text-sky-400'}`}>
                  {isTop ? 'Top' : 'Bot'}
                </span>
              </div>
            </div>

            {/* Outs display */}
            <div className="text-right">
              <div className="text-sm font-bold uppercase tracking-widest text-white/50 mb-3">
                Outs
              </div>
              <div className="flex gap-3 justify-end">
                {[0, 1, 2].map(i => (
                  <span
                    key={i}
                    className={`w-10 h-10 rounded-full border-2 transition-colors ${
                      i < outs
                        ? 'bg-rose-400 border-rose-400'
                        : 'bg-transparent border-white/30'
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <div className="text-sm font-semibold text-white/40 mt-2">
                {outs === 0 ? 'No outs' : outs === 1 ? '1 out' : `${outs} outs`}
              </div>
            </div>
          </div>

          {/* Controls row */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={prevHalf}
              className="px-5 py-3.5 rounded-xl bg-white/15 text-white/80 text-base font-bold hover:bg-white/25 active:scale-95 transition-all"
            >
              ◀ Prev Half
            </button>
            <button
              onClick={addOut}
              className="px-6 py-3.5 rounded-xl bg-rose-700 text-white text-base font-bold hover:bg-rose-600 active:scale-95 transition-all"
            >
              + Out
            </button>
            <button
              onClick={removeOut}
              className="px-5 py-3.5 rounded-xl bg-white/15 text-white/80 text-base font-bold hover:bg-white/25 active:scale-95 transition-all"
            >
              − Out
            </button>
            <button
              onClick={nextHalf}
              className="px-5 py-3.5 rounded-xl bg-white/15 text-white/80 text-base font-bold hover:bg-white/25 active:scale-95 transition-all ml-auto"
            >
              Next Half ▶
            </button>
          </div>
        </div>

        {/* ── Stats Table ── */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th scope="col" className="px-3 py-3 text-center text-sm font-bold tracking-widest uppercase text-white/30 w-10">#</th>
                <th scope="col" className="text-left px-4 py-3 text-sm font-bold tracking-widest uppercase text-white/50 min-w-[120px]">Player</th>
                {metrics.map(m => (
                  <th key={m.key} scope="col" className="px-3 py-3 text-center text-sm font-black tracking-widest uppercase text-rose-400 w-14">
                    {m.shortLabel}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((player, i) => (
                <tr
                  key={player.id}
                  className={i % 2 === 0 ? 'bg-black/25' : 'bg-black/10'}
                  style={{ borderLeft: `4px solid ${player.colorHex}` }}
                >
                  <td className="px-3 py-4 text-center">
                    {i < MEDALS.length
                      ? <span className="text-xl">{MEDALS[i]}</span>
                      : <span className="text-sm font-bold text-white/30">#{i + 1}</span>}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2.5">
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: player.colorHex }} aria-hidden="true" />
                      <span className="text-base font-bold whitespace-nowrap" style={{ color: player.colorHex }}>
                        {player.name}
                      </span>
                    </div>
                  </td>
                  {metrics.map(m => (
                    <td key={m.key} className="px-3 py-4 text-center font-mono text-lg font-bold text-white tabular-nums">
                      {player.scores[m.key] ?? 0}
                    </td>
                  ))}
                </tr>
              ))}
              {players.length === 0 && (
                <tr>
                  <td colSpan={2 + metrics.length} className="px-4 py-12 text-center text-white/30 text-base">
                    Add players to see the box score
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer summary */}
        <div className="px-5 py-3 border-t border-white/10 bg-black/30 flex items-center justify-between">
          <span className={`text-sm font-bold ${isTop ? 'text-rose-400' : 'text-sky-400'}`}>
            {isTop ? '▲ Top' : '▼ Bottom'} of the {ordinal(inning)}
          </span>
          <span className="text-sm font-bold text-white/50">
            {outs === 0 ? 'No outs' : outs === 1 ? '1 out' : `${outs} outs`}
          </span>
        </div>

      </div>
    </div>
  )
}
