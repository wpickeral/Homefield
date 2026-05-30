import { useState, useCallback } from 'react'
import type { SportDef } from './types'
import { useScoreboard } from './hooks/useScoreboard'
import { getSportTheme } from './utils/theme'
import Header from './components/Header'
import AddPlayerForm from './components/AddPlayerForm'
import Scoreboard from './components/Scoreboard'
import NameModal from './components/NameModal'
import SportModal from './components/SportModal'
import BaseballScoreboard from './components/BaseballScoreboard'
import FootballScoreboard from './components/FootballScoreboard'
import HomeRunCelebration from './components/HomeRunCelebration'
import FootballCelebration, { type FootballEventType } from './components/FootballCelebration'
import BaseRunCelebration, { type BaseRunEventType } from './components/BaseRunCelebration'

// Maps a football metric key to its celebration type
const FOOTBALL_EVENT_MAP: Partial<Record<string, FootballEventType>> = {
  touchdowns:    'touchdown',
  fieldGoals:    'fieldGoal',
  flags:         'penalty',
  interceptions: 'interception',
}

// Maps a baseball base-running metric key to its celebration type
const BASE_RUN_EVENT_MAP: Partial<Record<string, BaseRunEventType>> = {
  steals:  'stolen',
  doubles: 'double',
  triples: 'triple',
}

interface HrCelebration {
  playerName: string
  colorHex: string
  key: number
}

interface FbCelebration {
  type: FootballEventType
  playerName: string
  colorHex: string
  key: number
}

interface BrCelebration {
  type: BaseRunEventType
  playerName: string
  colorHex: string
  key: number
}

export default function App() {
  const [ownerName, setOwnerName] = useState('')
  const [sport, setSport] = useState<SportDef | null>(null)
  const [hrCelebration, setHrCelebration] = useState<HrCelebration | null>(null)
  const [fbCelebration, setFbCelebration] = useState<FbCelebration | null>(null)
  const [brCelebration, setBrCelebration] = useState<BrCelebration | null>(null)

  const metrics = sport?.metrics ?? []
  const theme = getSportTheme(sport)
  const { players, addPlayer, removePlayer, adjustScore, resetGame, clearPlayers } = useScoreboard(metrics)

  function changeSport() {
    clearPlayers()
    setSport(null)
  }

  function handleAdjustScore(id: string, metricKey: string, delta: number) {
    adjustScore(id, metricKey, delta)

    if (delta !== 1) return
    const player = players.find(p => p.id === id)
    if (!player) return

    // Baseball: home run
    if (metricKey === 'homeRuns') {
      setHrCelebration(prev => ({
        playerName: player.name,
        colorHex: player.colorHex,
        key: (prev?.key ?? 0) + 1,
      }))
      return
    }

    // Baseball: base running (stolen base, double, triple)
    if (sport?.id === 'baseball') {
      const brEventType = BASE_RUN_EVENT_MAP[metricKey]
      if (brEventType) {
        setBrCelebration(prev => ({
          type: brEventType,
          playerName: player.name,
          colorHex: player.colorHex,
          key: (prev?.key ?? 0) + 1,
        }))
        return
      }
    }

    // Football: touchdown, field goal, penalty, interception
    if (sport?.id === 'football') {
      const eventType = FOOTBALL_EVENT_MAP[metricKey]
      if (eventType) {
        setFbCelebration(prev => ({
          type: eventType,
          playerName: player.name,
          colorHex: player.colorHex,
          key: (prev?.key ?? 0) + 1,
        }))
      }
    }
  }

  const dismissHr = useCallback(() => setHrCelebration(null), [])
  const dismissFb = useCallback(() => setFbCelebration(null), [])
  const dismissBr = useCallback(() => setBrCelebration(null), [])

  const hasSportDisplay = players.length > 0 && sport !== null

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {ownerName === '' && <NameModal onSubmit={setOwnerName} />}
      {ownerName !== '' && sport === null && <SportModal onSelect={setSport} />}

      {hrCelebration && (
        <HomeRunCelebration
          key={hrCelebration.key}
          playerName={hrCelebration.playerName}
          colorHex={hrCelebration.colorHex}
          onDismiss={dismissHr}
        />
      )}

      {fbCelebration && (
        <FootballCelebration
          key={fbCelebration.key}
          type={fbCelebration.type}
          playerName={fbCelebration.playerName}
          colorHex={fbCelebration.colorHex}
          onDismiss={dismissFb}
        />
      )}

      {brCelebration && (
        <BaseRunCelebration
          key={brCelebration.key}
          type={brCelebration.type}
          playerName={brCelebration.playerName}
          colorHex={brCelebration.colorHex}
          onDismiss={dismissBr}
        />
      )}

      <Header
        ownerName={ownerName}
        sport={sport}
        theme={theme}
        hasPlayers={players.length > 0}
        onReset={resetGame}
        onChangeSport={changeSport}
      />

      <main className="flex-1 w-full mx-auto px-4 md:px-8 py-6 md:py-8 max-w-5xl">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_420px] lg:gap-8 lg:items-start">

          {/* ── Left column: live scoreboard display ── */}
          <div className="lg:sticky lg:top-8 flex flex-col gap-4">
            {hasSportDisplay && sport.id === 'baseball' && (
              <BaseballScoreboard players={players} metrics={metrics} />
            )}
            {hasSportDisplay && sport.id === 'football' && (
              <FootballScoreboard players={players} metrics={metrics} />
            )}
            {!hasSportDisplay && sport !== null && (
              <div className="hidden lg:flex flex-col items-center justify-center text-center py-20 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50">
                <span className="text-6xl mb-3" aria-hidden="true">{sport.emoji}</span>
                <p className="text-base font-semibold text-gray-500">Add your first player</p>
                <p className="text-sm text-gray-400 mt-1">to see the scoreboard</p>
              </div>
            )}
          </div>

          {/* ── Right column: input controls ── */}
          <div className="flex flex-col gap-6">
            {hasSportDisplay && (
              <div className="flex items-center gap-3 lg:hidden">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="text-xs font-bold tracking-widest uppercase text-gray-400">
                  Track Stats
                </span>
                <div className="flex-1 h-px bg-gray-300" />
              </div>
            )}

            <AddPlayerForm onAdd={addPlayer} theme={theme} />
            <Scoreboard
              players={players}
              metrics={metrics}
              sport={sport}
              theme={theme}
              onAdjust={handleAdjustScore}
              onRemove={removePlayer}
            />
          </div>

        </div>
      </main>
    </div>
  )
}
