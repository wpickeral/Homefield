import { useEffect } from 'react'

export type FootballEventType = 'touchdown' | 'fieldGoal' | 'penalty' | 'interception'

interface EventConfig {
  emoji: string
  label: string
  subtitle: string
  animationClass: string
  durationMs: number
  colorOverride?: string
}

const PENALTY_COLOR = '#f59e0b' // amber-500 — always yellow for flags

const EVENT_CONFIG: Record<FootballEventType, EventConfig> = {
  touchdown: {
    emoji: '🏈',
    label: 'TOUCHDOWN!',
    subtitle: '6 points',
    animationClass: 'animate-touchdown',
    durationMs: 3000,
  },
  fieldGoal: {
    emoji: '🏈',
    label: 'FIELD GOAL!',
    subtitle: '3 points',
    animationClass: 'animate-fieldgoal',
    durationMs: 2400,
  },
  penalty: {
    emoji: '🚩',
    label: 'FLAG ON THE PLAY!',
    subtitle: 'Penalty',
    animationClass: 'animate-flagthrow',
    durationMs: 2600,
    colorOverride: PENALTY_COLOR,
  },
  interception: {
    emoji: '🏈',
    label: 'INTERCEPTION!',
    subtitle: 'Big play!',
    animationClass: 'animate-intercept',
    durationMs: 2600,
  },
}

interface FootballCelebrationProps {
  type: FootballEventType
  playerName: string
  colorHex: string
  onDismiss: () => void
}

export default function FootballCelebration({
  type,
  playerName,
  colorHex,
  onDismiss,
}: FootballCelebrationProps) {
  const config = EVENT_CONFIG[type]
  const displayColor = config.colorOverride ?? colorHex

  useEffect(() => {
    const t = setTimeout(onDismiss, config.durationMs)
    return () => clearTimeout(t)
  }, [onDismiss, config.durationMs])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      role="status"
      aria-live="polite"
    >
      {/* Sport-color radial glow */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at center, ${displayColor} 0%, transparent 70%)`,
        }}
      />

      <div className={`${config.animationClass} flex flex-col items-center gap-2 select-none`}>
        <span className="text-8xl md:text-9xl drop-shadow-2xl" aria-hidden="true">
          {config.emoji}
        </span>
        <div
          className="text-4xl md:text-6xl font-black tracking-tight drop-shadow-2xl"
          style={{ color: displayColor, textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
        >
          {config.label}
        </div>
        <div className="text-lg md:text-2xl font-bold text-white drop-shadow-lg">
          {config.subtitle} · {playerName}
        </div>
      </div>
    </div>
  )
}
