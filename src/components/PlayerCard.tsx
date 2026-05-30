import { useState } from 'react'
import type { Player, MetricDef } from '../types'
import type { SportTheme } from '../utils/theme'

interface PlayerCardProps {
  player: Player
  metrics: MetricDef[]
  theme: SportTheme
  onAdjust: (id: string, metricKey: string, delta: number) => void
  onRemove: (id: string) => void
}

export default function PlayerCard({ player, metrics, onAdjust, onRemove }: PlayerCardProps) {
  const [confirmingRemove, setConfirmingRemove] = useState(false)
  const [poppingKey, setPoppingKey] = useState<string | null>(null)

  function handleAdjust(metricKey: string, delta: number) {
    onAdjust(player.id, metricKey, delta)
    if (delta === 1) {
      setPoppingKey(metricKey)
      setTimeout(() => setPoppingKey(null), 450)
    }
  }

  return (
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden border-l-4"
      style={{ borderColor: player.colorHex }}
    >
      {/* Card header */}
      <div
        className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100"
        style={{ backgroundColor: player.colorLightHex }}
      >
        <div className="flex items-center gap-3">
          <span
            className="w-3.5 h-3.5 rounded-full shrink-0 ring-2 ring-white"
            style={{ backgroundColor: player.colorHex }}
            aria-hidden="true"
          />
          <span className="text-base font-bold text-gray-900 tracking-tight">
            {player.name}
          </span>
        </div>

        {!confirmingRemove ? (
          <button
            onClick={() => setConfirmingRemove(true)}
            aria-label={`Remove ${player.name}`}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors text-xl leading-none rounded-lg"
          >
            ×
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Remove?</span>
            <button
              onClick={() => onRemove(player.id)}
              className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
            >
              Yes
            </button>
            <span className="text-gray-300 text-xs">·</span>
            <button
              onClick={() => setConfirmingRemove(false)}
              className="text-xs font-semibold text-gray-500 hover:text-gray-700 transition-colors"
            >
              No
            </button>
          </div>
        )}
      </div>

      {/* Metric rows — KeepTheScore-style control panel */}
      <div className="divide-y divide-gray-50">
        {metrics.map(metric => {
          const value = player.scores[metric.key] ?? 0
          const isPopping = poppingKey === metric.key

          return (
            <div key={metric.key} className="flex items-center px-5 py-3.5 gap-4">
              {/* Metric label */}
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 flex-1 min-w-0">
                {metric.label}
              </span>

              {/* Controls */}
              <div className="flex items-center gap-3 shrink-0">
                {/* Subtract — secondary, smaller */}
                <button
                  onClick={() => handleAdjust(metric.key, -1)}
                  disabled={value === 0}
                  aria-label={`Subtract 1 from ${metric.label}`}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-25 disabled:cursor-not-allowed transition-colors text-base font-bold"
                >
                  −
                </button>

                {/* Current value */}
                <span
                  key={isPopping ? `${metric.key}-pop` : metric.key}
                  className={`w-10 text-center text-2xl font-black tabular-nums ${isPopping ? 'animate-score-pop' : ''}`}
                  style={{ color: player.colorHex }}
                >
                  {value}
                </span>

                {/* Add — primary, rectangular, team color — KeepTheScore pattern */}
                <button
                  onClick={() => handleAdjust(metric.key, 1)}
                  aria-label={`Add 1 to ${metric.label}`}
                  className="min-w-[68px] h-10 px-4 rounded-xl text-white text-sm font-black tracking-wide transition-all hover:opacity-90 active:scale-95 flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: player.colorHex }}
                >
                  +1
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
