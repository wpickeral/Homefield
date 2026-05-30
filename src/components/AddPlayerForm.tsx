import { useState, type FormEvent } from 'react'
import type { SportTheme } from '../utils/theme'
import { TEAM_COLORS } from '../data/colors'

interface AddPlayerFormProps {
  onAdd: (name: string, colorHex: string, colorLightHex: string) => void
  theme: SportTheme
}

export default function AddPlayerForm({ onAdd, theme }: AddPlayerFormProps) {
  const [name, setName] = useState('')
  const [colorIndex, setColorIndex] = useState(0)

  const selectedColor = TEAM_COLORS[colorIndex]

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    onAdd(name, selectedColor.hex, selectedColor.lightHex)
    setName('')
    setColorIndex(prev => (prev + 1) % TEAM_COLORS.length)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {/* Name input + submit button */}
      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Player name"
          className={`flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 ${theme.focusRing} text-base`}
        />
        <button
          type="submit"
          disabled={!name.trim()}
          className={`px-5 py-3 text-white font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-base ${theme.accentBg} ${theme.accentHover}`}
        >
          Add
        </button>
      </div>

      {/* Team color picker */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium uppercase tracking-wide text-gray-400 shrink-0">
          Team color
        </span>
        <div className="flex gap-2 flex-wrap">
          {TEAM_COLORS.map((color, i) => {
            const isSelected = i === colorIndex
            return (
              <button
                key={color.id}
                type="button"
                onClick={() => setColorIndex(i)}
                aria-label={`${color.label} team color`}
                aria-pressed={isSelected}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full transition-transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: color.hex,
                  boxShadow: isSelected ? `0 0 0 3px white, 0 0 0 5px ${color.hex}` : undefined,
                }}
              >
                {isSelected && (
                  <span className="text-white text-sm font-black leading-none" aria-hidden="true">
                    ✓
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </form>
  )
}
