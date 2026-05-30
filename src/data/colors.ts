export interface TeamColor {
  id: string
  label: string
  hex: string
  lightHex: string
}

export const TEAM_COLORS: TeamColor[] = [
  { id: 'red',     label: 'Red',     hex: '#ef4444', lightHex: '#fee2e2' },
  { id: 'blue',    label: 'Blue',    hex: '#3b82f6', lightHex: '#dbeafe' },
  { id: 'emerald', label: 'Emerald', hex: '#10b981', lightHex: '#d1fae5' },
  { id: 'purple',  label: 'Purple',  hex: '#a855f7', lightHex: '#f3e8ff' },
  { id: 'orange',  label: 'Orange',  hex: '#f97316', lightHex: '#ffedd5' },
  { id: 'amber',   label: 'Amber',   hex: '#f59e0b', lightHex: '#fef3c7' },
  { id: 'pink',    label: 'Pink',    hex: '#ec4899', lightHex: '#fce7f3' },
  { id: 'teal',    label: 'Teal',    hex: '#14b8a6', lightHex: '#ccfbf1' },
]
