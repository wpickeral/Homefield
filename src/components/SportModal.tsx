import type { SportDef } from '../types'
import { SPORTS } from '../data/sports'
import { useFocusTrap } from '../hooks/useFocusTrap'

interface SportModalProps {
  onSelect: (sport: SportDef) => void
}

const sportDescriptions: Record<string, string> = {
  football: 'Downs, yardage, touchdowns & flags',
  baseball: 'Home runs, hits, RBIs, steals & more',
}

export default function SportModal({ onSelect }: SportModalProps) {
  const trapRef = useFocusTrap()

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div ref={trapRef} className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4">
        <div className="flex justify-center gap-2 mb-6">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-200" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Pick a sport</h2>
        <p className="text-gray-500 text-sm mb-6">Choose what you're keeping score for.</p>
        <div className="flex flex-col gap-3">
          {SPORTS.map(sport => (
            <button
              key={sport.id}
              onClick={() => onSelect(sport)}
              className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-indigo-400 hover:bg-indigo-50 active:scale-[0.98] transition-all text-left"
            >
              <span className="text-4xl" aria-hidden="true">{sport.emoji}</span>
              <div>
                <div className="text-base font-bold text-gray-900">{sport.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{sportDescriptions[sport.id]}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
