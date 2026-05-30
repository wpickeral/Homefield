import type { Player, MetricDef } from '../types'
import { useFootballState } from '../hooks/useFootballState'

interface FootballScoreboardProps {
  players: Player[]
  metrics: MetricDef[]
}

// Levi's Stadium (NFL) night shot
const STADIUM_IMG =
  'https://images.pexels.com/photos/200986/pexels-photo-200986.jpeg?auto=compress&cs=tinysrgb&w=1400'

const MEDALS = ['🥇', '🥈', '🥉']
const QUARTER_LABELS = ['Q1', 'Q2', 'Q3', 'Q4', 'OT']
const DOWN_LABELS = ['1st', '2nd', '3rd', '4th']

function calcScore(player: Player): number {
  return (
    (player.scores['touchdowns']  ?? 0) * 6 +
    (player.scores['fieldGoals']  ?? 0) * 3 +
    (player.scores['extraPoints'] ?? 0) * 1
  )
}

function fmt(s: number): string {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

export default function FootballScoreboard({ players, metrics }: FootballScoreboardProps) {
  const {
    quarter, goToQuarter,
    timeLeft,
    isRunning, toggleClock, resetClock,
    possession, togglePossession,
    down, setDown,
    yardsToGo, adjustYards, firstDown,
  } = useFootballState()

  const sorted = [...players].sort((a, b) => calcScore(b) - calcScore(a))

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl relative">

      {/* ── Background: stadium photo ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-slate-900"
        style={{ backgroundImage: `url(${STADIUM_IMG})` }}
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
            <span aria-hidden="true" className="text-3xl">🏈</span>
            <span className="text-base font-black tracking-[0.2em] uppercase text-amber-400">
              Scoreboard
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" aria-hidden="true" />
            <span className="text-sm font-bold tracking-widest uppercase text-white/50">Live</span>
          </div>
        </div>

        {/* ── Game State Panel ── */}
        <div className="px-5 py-5 space-y-5 border-b border-white/10 bg-black/40">

          {/* Row 1: Quarter selector + Clock */}
          <div className="flex items-center justify-between gap-4 flex-wrap">

            {/* Quarter pills — large, iPad-friendly */}
            <div className="flex gap-2">
              {QUARTER_LABELS.map((label, i) => {
                const q = i + 1
                return (
                  <button
                    key={q}
                    onClick={() => goToQuarter(q)}
                    className={`min-w-[52px] py-3 rounded-xl text-base font-black transition-colors ${
                      quarter === q
                        ? 'bg-amber-400 text-slate-900'
                        : 'bg-white/15 text-white/70 hover:bg-white/25'
                    }`}
                  >
                    {label}
                  </button>
                )
              })}
            </div>

            {/* Clock display + controls */}
            <div className="flex items-center gap-3">
              <span
                className={`text-5xl font-black font-mono tabular-nums leading-none ${
                  timeLeft === 0 ? 'text-red-400' : 'text-white'
                }`}
              >
                {fmt(timeLeft)}
              </span>
              <button
                onClick={toggleClock}
                aria-label={isRunning ? 'Pause clock' : 'Start clock'}
                className="w-14 h-14 rounded-full bg-amber-400 text-slate-900 font-black flex items-center justify-center hover:bg-amber-300 active:scale-95 transition-all text-2xl"
              >
                {isRunning ? '⏸' : '▶'}
              </button>
              <button
                onClick={resetClock}
                aria-label="Reset clock to 15:00"
                className="w-14 h-14 rounded-full bg-white/15 text-white/70 flex items-center justify-center hover:bg-white/25 active:scale-95 transition-all text-2xl"
              >
                ↺
              </button>
            </div>
          </div>

          {/* Row 2: Down & distance */}
          <div className="space-y-2">
            <span className="text-sm font-bold uppercase tracking-widest text-white/50">
              Down &amp; Distance
            </span>
            <div className="flex items-center gap-3 flex-wrap">
              {/* Down buttons */}
              <div className="flex gap-2">
                {DOWN_LABELS.map((label, i) => {
                  const d = i + 1
                  return (
                    <button
                      key={d}
                      onClick={() => setDown(d)}
                      className={`px-5 py-3 rounded-xl text-base font-black transition-colors ${
                        down === d
                          ? d === 4
                            ? 'bg-red-500 text-white'
                            : 'bg-amber-400 text-slate-900'
                          : 'bg-white/15 text-white/70 hover:bg-white/25'
                      }`}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>

              <span className="text-white/40 text-xl font-bold">&amp;</span>

              {/* Yards to go */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => adjustYards(-1)}
                  className="w-11 h-11 rounded-xl bg-white/15 text-white/70 text-xl font-bold hover:bg-white/25 active:scale-95 flex items-center justify-center transition-all"
                >
                  −
                </button>
                <span className="w-14 text-center text-3xl font-black text-white tabular-nums">
                  {yardsToGo}
                </span>
                <button
                  onClick={() => adjustYards(1)}
                  className="w-11 h-11 rounded-xl bg-white/15 text-white/70 text-xl font-bold hover:bg-white/25 active:scale-95 flex items-center justify-center transition-all"
                >
                  +
                </button>
                <span className="text-sm text-white/50 font-semibold">yds</span>
              </div>

              <button
                onClick={firstDown}
                className="px-4 py-3 rounded-xl bg-emerald-700 text-white text-sm font-bold hover:bg-emerald-600 active:scale-95 transition-all shrink-0"
              >
                ↩ 1st &amp; 10
              </button>
            </div>
          </div>

          {/* Row 3: Possession */}
          {players.length > 0 && (
            <div className="space-y-2">
              <span className="text-sm font-bold uppercase tracking-widest text-white/50">
                Possession
              </span>
              <div className="flex gap-2 flex-wrap">
                {players.map(player => {
                  const hasBall = possession === player.id
                  return (
                    <button
                      key={player.id}
                      onClick={() => togglePossession(player.id)}
                      aria-pressed={hasBall}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl text-base font-bold transition-all active:scale-95"
                      style={{
                        backgroundColor: hasBall ? player.colorHex : 'rgba(255,255,255,0.12)',
                        color: hasBall ? '#fff' : 'rgba(255,255,255,0.65)',
                      }}
                    >
                      {hasBall && <span aria-hidden="true">🏈</span>}
                      {player.name}
                    </button>
                  )
                })}
                {possession && (
                  <button
                    onClick={() => togglePossession(possession)}
                    className="px-4 py-3 rounded-xl text-sm text-white/40 hover:text-white/70 bg-white/5 hover:bg-white/10 transition-all"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Stats Table ── */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th scope="col" className="px-3 py-3 text-center text-sm font-bold tracking-widest uppercase text-white/30 w-10">#</th>
                <th scope="col" className="text-left px-4 py-3 text-sm font-bold tracking-widest uppercase text-white/50 min-w-[120px]">Team</th>
                <th scope="col" className="px-4 py-3 text-center text-sm font-black tracking-widest uppercase text-amber-400 w-20">Score</th>
                {metrics.map(m => (
                  <th key={m.key} scope="col" className="px-3 py-3 text-center text-sm font-bold tracking-widest uppercase text-white/35 w-14">
                    {m.shortLabel}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((player, i) => {
                const score = calcScore(player)
                const hasBall = possession === player.id
                return (
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
                        <span className="text-base font-bold text-white whitespace-nowrap">{player.name}</span>
                        {hasBall && <span className="text-base" aria-label="Has possession">🏈</span>}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center tabular-nums">
                      <span className="text-3xl font-black font-mono" style={{ color: player.colorHex }}>{score}</span>
                    </td>
                    {metrics.map(m => (
                      <td key={m.key} className="px-3 py-4 text-center font-mono text-base font-bold text-white/80 tabular-nums">
                        {player.scores[m.key] ?? 0}
                      </td>
                    ))}
                  </tr>
                )
              })}
              {players.length === 0 && (
                <tr>
                  <td colSpan={3 + metrics.length} className="px-4 py-12 text-center text-white/30 text-base">
                    Add players to see the scoreboard
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer summary */}
        <div className="px-5 py-3 border-t border-white/10 bg-black/30 flex items-center justify-between">
          <span className="text-sm font-bold text-white/50">
            {QUARTER_LABELS[quarter - 1]} · {fmt(timeLeft)}
          </span>
          <span className={`text-sm font-black ${down === 4 ? 'text-red-400' : 'text-amber-400'}`}>
            {DOWN_LABELS[down - 1]} &amp; {yardsToGo}
          </span>
        </div>

      </div>
    </div>
  )
}
