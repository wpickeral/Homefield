import { useEffect } from 'react'

interface HomeRunCelebrationProps {
  playerName: string
  colorHex: string
  onDismiss: () => void
}

export default function HomeRunCelebration({ playerName, colorHex, onDismiss }: HomeRunCelebrationProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 2800)
    return () => clearTimeout(t)
  }, [onDismiss])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      role="status"
      aria-live="polite"
    >
      {/* Radial glow behind the content */}
      <div
        className="absolute inset-0 opacity-20"
        style={{ background: `radial-gradient(circle at center, ${colorHex} 0%, transparent 70%)` }}
      />

      <div className="animate-homerun flex flex-col items-center gap-2 select-none">
        <span className="text-8xl md:text-9xl drop-shadow-2xl" aria-hidden="true">⚾</span>
        <div
          className="text-4xl md:text-6xl font-black tracking-tight drop-shadow-2xl"
          style={{ color: colorHex, textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
        >
          HOME RUN!
        </div>
        <div className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
          {playerName}
        </div>
      </div>
    </div>
  )
}
