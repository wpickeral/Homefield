import { useState } from 'react'
import type { SportDef } from '../types'
import type { SportTheme } from '../utils/theme'

interface HeaderProps {
  ownerName: string
  sport: SportDef | null
  theme: SportTheme
  hasPlayers: boolean
  onReset: () => void
  onChangeSport: () => void
}

export default function Header({ ownerName, sport, theme, hasPlayers, onReset, onChangeSport }: HeaderProps) {
  const [confirmingReset, setConfirmingReset] = useState(false)

  function handleConfirmReset() {
    onReset()
    setConfirmingReset(false)
  }

  return (
    <header className={`flex items-center justify-between px-6 py-4 ${theme.headerBg} text-white shadow-lg`}>
      <div>
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-black tracking-tight leading-tight">
            {ownerName ? `${ownerName}'s` : 'Home Field'}
          </h1>
          {ownerName && (
            <span className="text-lg font-bold text-white/70 tracking-tight">Home Field</span>
          )}
        </div>
        {sport && (
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-sm text-white/75">
              <span aria-hidden="true">{sport.emoji}</span> {sport.label}
            </span>
            <span className="text-white/30">·</span>
            <button
              onClick={onChangeSport}
              className="text-xs text-white/60 hover:text-white underline underline-offset-2 transition-colors"
            >
              Change sport
            </button>
          </div>
        )}
      </div>

      {hasPlayers && (
        <div className="shrink-0">
          {!confirmingReset ? (
            <button
              onClick={() => setConfirmingReset(true)}
              className="px-4 py-2 text-sm font-semibold bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
            >
              New Game
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-black/20 rounded-lg px-3 py-2">
              <span className="text-xs text-white/80 whitespace-nowrap">Reset scores?</span>
              <button
                onClick={handleConfirmReset}
                className="text-sm font-bold text-white hover:text-red-200 transition-colors"
              >
                Yes
              </button>
              <span className="text-white/30 text-xs">·</span>
              <button
                onClick={() => setConfirmingReset(false)}
                className="text-sm font-semibold text-white/60 hover:text-white transition-colors"
              >
                No
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
