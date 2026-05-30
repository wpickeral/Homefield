export interface MetricDef {
  key: string
  label: string
  shortLabel: string
}

export interface SportDef {
  id: string
  label: string
  emoji: string
  metrics: MetricDef[]
}

export interface Player {
  id: string
  name: string
  scores: Record<string, number>
  colorHex: string
  colorLightHex: string
}
