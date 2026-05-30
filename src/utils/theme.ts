import type { SportDef } from '../types'

export interface SportTheme {
  headerBg: string
  accentBg: string
  accentHover: string
  accentText: string
  cardBorderAccent: string
  scoreColor: string
  btnPlus: string
  focusRing: string
}

export function getSportTheme(sport: SportDef | null): SportTheme {
  if (sport?.id === 'football') {
    return {
      headerBg: 'bg-emerald-700',
      accentBg: 'bg-emerald-600',
      accentHover: 'hover:bg-emerald-700',
      accentText: 'text-emerald-700',
      cardBorderAccent: 'border-l-4 border-emerald-500',
      scoreColor: 'text-emerald-700',
      btnPlus: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200',
      focusRing: 'focus:ring-emerald-400',
    }
  }
  if (sport?.id === 'baseball') {
    return {
      headerBg: 'bg-rose-700',
      accentBg: 'bg-rose-600',
      accentHover: 'hover:bg-rose-700',
      accentText: 'text-rose-700',
      cardBorderAccent: 'border-l-4 border-rose-500',
      scoreColor: 'text-rose-700',
      btnPlus: 'bg-rose-100 text-rose-700 hover:bg-rose-200',
      focusRing: 'focus:ring-rose-400',
    }
  }
  return {
    headerBg: 'bg-indigo-700',
    accentBg: 'bg-indigo-600',
    accentHover: 'hover:bg-indigo-700',
    accentText: 'text-indigo-700',
    cardBorderAccent: 'border-l-4 border-indigo-500',
    scoreColor: 'text-indigo-700',
    btnPlus: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
    focusRing: 'focus:ring-indigo-400',
  }
}
