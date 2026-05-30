import { useState } from 'react'
import type { Player, MetricDef } from '../types'

export function useScoreboard(metrics: MetricDef[]) {
  const [players, setPlayers] = useState<Player[]>([])

  function makeInitialScores() {
    return Object.fromEntries(metrics.map(m => [m.key, 0]))
  }

  function addPlayer(name: string, colorHex: string, colorLightHex: string) {
    const trimmed = name.trim()
    if (!trimmed) return
    setPlayers(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: trimmed,
        scores: makeInitialScores(),
        colorHex,
        colorLightHex,
      },
    ])
  }

  function removePlayer(id: string) {
    setPlayers(prev => prev.filter(p => p.id !== id))
  }

  function adjustScore(id: string, metricKey: string, delta: number) {
    setPlayers(prev =>
      prev.map(p =>
        p.id === id
          ? {
              ...p,
              scores: {
                ...p.scores,
                [metricKey]: Math.max(0, p.scores[metricKey] + delta),
              },
            }
          : p,
      ),
    )
  }

  function resetGame() {
    setPlayers(prev => prev.map(p => ({ ...p, scores: makeInitialScores() })))
  }

  function clearPlayers() {
    setPlayers([])
  }

  return { players, addPlayer, removePlayer, adjustScore, resetGame, clearPlayers }
}
