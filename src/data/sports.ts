import type { SportDef } from '../types'

export const SPORTS: SportDef[] = [
  {
    id: 'football',
    label: 'Football',
    emoji: '🏈',
    metrics: [
      // Scoring (used in score calculation)
      { key: 'touchdowns',   label: 'Touchdowns',    shortLabel: 'TD'   },
      { key: 'fieldGoals',   label: 'Field Goals',   shortLabel: 'FG'   },
      { key: 'extraPoints',  label: 'Extra Points',  shortLabel: 'XP'   },
      // Offense
      { key: 'yardage',      label: 'Total Yards',   shortLabel: 'YDS'  },
      { key: 'downs',        label: 'First Downs',   shortLabel: '1DN'  },
      // Defense / Turnovers
      { key: 'interceptions', label: 'Interceptions', shortLabel: 'INT' },
      { key: 'sacks',        label: 'Sacks',          shortLabel: 'SCK'  },
      { key: 'flags',        label: 'Penalties',      shortLabel: 'PEN'  },
    ],
  },
  {
    id: 'baseball',
    label: 'Baseball',
    emoji: '⚾',
    metrics: [
      // The R-H-E standard columns
      { key: 'runs',        label: 'Runs',        shortLabel: 'R'   },
      { key: 'hits',        label: 'Hits',        shortLabel: 'H'   },
      { key: 'errors',      label: 'Errors',      shortLabel: 'E'   },
      // Offensive stats
      { key: 'homeRuns',    label: 'Home Runs',   shortLabel: 'HR'  },
      { key: 'doubles',     label: 'Doubles',     shortLabel: '2B'  },
      { key: 'triples',     label: 'Triples',     shortLabel: '3B'  },
      { key: 'rbis',        label: 'RBIs',        shortLabel: 'RBI' },
      { key: 'walks',       label: 'Walks',       shortLabel: 'BB'  },
      { key: 'strikeouts',  label: 'Strikeouts',  shortLabel: 'K'   },
      { key: 'steals',      label: 'Steals',      shortLabel: 'SB'  },
    ],
  },
]
