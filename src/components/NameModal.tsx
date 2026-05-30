import { useState, type FormEvent } from 'react'
import { useFocusTrap } from '../hooks/useFocusTrap'

interface NameModalProps {
  onSubmit: (name: string) => void
}

export default function NameModal({ onSubmit }: NameModalProps) {
  const [name, setName] = useState('')
  const trapRef = useFocusTrap()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    onSubmit(trimmed)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div ref={trapRef} className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4">
        <div className="flex justify-center gap-2 mb-6">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-gray-200" aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome!</h2>
        <p className="text-gray-500 text-sm mb-6">Enter your name to personalize your scoreboard.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-base"
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="px-5 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-base"
          >
            Let's Play →
          </button>
        </form>
      </div>
    </div>
  )
}
