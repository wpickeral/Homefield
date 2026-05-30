import { useState, useEffect } from 'react'

export const QUARTER_SECONDS = 15 * 60 // 15 minutes

export function useFootballState() {
  const [quarter, setQuarter] = useState(1)
  const [timeLeft, setTimeLeft] = useState(QUARTER_SECONDS)
  const [isRunning, setIsRunning] = useState(false)
  const [possession, setPossession] = useState<string | null>(null)
  const [down, setDown] = useState(1)
  const [yardsToGo, setYardsToGo] = useState(10)

  useEffect(() => {
    if (!isRunning) return
    const id = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [isRunning])

  function toggleClock() {
    setIsRunning(r => !r)
  }

  function resetClock() {
    setIsRunning(false)
    setTimeLeft(QUARTER_SECONDS)
  }

  function goToQuarter(q: number) {
    setIsRunning(false)
    setTimeLeft(QUARTER_SECONDS)
    setDown(1)
    setYardsToGo(10)
    setQuarter(q)
  }

  function firstDown() {
    setDown(1)
    setYardsToGo(10)
  }

  function adjustYards(delta: number) {
    setYardsToGo(y => Math.max(1, Math.min(99, y + delta)))
  }

  function togglePossession(playerId: string) {
    setPossession(prev => (prev === playerId ? null : playerId))
  }

  return {
    quarter, goToQuarter,
    timeLeft,
    isRunning, toggleClock, resetClock,
    possession, togglePossession,
    down, setDown,
    yardsToGo, adjustYards, firstDown,
  }
}
