import { useEffect } from 'react'

export type BaseRunEventType = 'stolen' | 'double' | 'triple'

interface EventConfig {
  emoji: string
  label: string
  subtitle: string
  animationClass: string
  durationMs: number
}

const EVENT_CONFIG: Record<BaseRunEventType, EventConfig> = {
  stolen: {
    emoji: '⚡',
    label: 'STOLEN BASE!',
    subtitle: 'Safe!',
    animationClass: 'animate-stolenbase',
    durationMs: 2400,
  },
  double: {
    emoji: '⚾',
    label: 'DOUBLE!',
    subtitle: '2-base hit',
    animationClass: 'animate-double',
    durationMs: 2400,
  },
  triple: {
    emoji: '🌟',
    label: 'TRIPLE!',
    subtitle: 'Three-bagger!',
    animationClass: 'animate-triple',
    durationMs: 2800,
  },
}

interface BaseRunCelebrationProps {
  type: BaseRunEventType
  playerName: string
  colorHex: string
  onDismiss: () => void
}

export default function BaseRunCelebration({
  type,
  playerName,
  colorHex,
  onDismiss,
}: BaseRunCelebrationProps) {
  const config = EVENT_CONFIG[type]

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
      {/* Team-color radial glow */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at center, ${colorHex} 0%, transparent 70%)`,
        }}
      />

      <div className={`${config.animationClass} flex flex-col items-center gap-2 select-none`}>
        <span className="text-8xl md:text-9xl drop-shadow-2xl" aria-hidden="true">
          {config.emoji}
        </span>
        <div
          className="text-4xl md:text-6xl font-black tracking-tight drop-shadow-2xl"
          style={{ color: colorHex, textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
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
