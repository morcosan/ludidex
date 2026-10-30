export type RatingValue = 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1
export const RATING_VALUES: RatingValue[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1] as const

export const RATING_LABELS = {
  10: 'Perfect',
  9: 'Superb',
  8: 'Great',
  7: 'Good',
  6: 'Fine',
  5: 'Average',
  4: 'Mediocre',
  3: 'Subpar',
  2: 'Bad',
  1: 'Awful',
} as const

export const RATING_COLORS = {
  10: '#F2456B',
  9: '#E5484D',
  8: '#D23A3A',
  7: '#B82E2E',
  6: '#9C2424',
  5: '#801C1C',
  4: '#651515',
  3: '#4C0F0F',
  2: '#360A0A',
  1: '#220606',
} as const

export type TierListValue = 'SS' | 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

export const TIER_LIST_VALUES: TierListValue[] = ['SS', 'S', 'A', 'B', 'C', 'D', 'E', 'F'] as const

export const TIER_LIST_LABELS = {
  SS: 'Epic',
  S: 'Elite',
  A: 'Great',
  B: 'Good',
  C: 'Decent',
  D: 'Weak',
  E: 'Poor',
  F: 'Worst',
} as const

export const TIER_LIST_COLORS = {
  SS: '#F0478F',
  S: '#E5484D',
  A: '#FF9A1F',
  B: '#D4C81E',
  C: '#6FC93A',
  D: '#1DB88A',
  E: '#5B93BD',
  F: '#9CA3AF',
} as const

export const BACKGROUND_SWAP_INTERVAL = 15_000
export const BACKGROUND_SWAP_DURATION = 3_000

export type CharacterStatus = 'maxed' | 'main' | 'building' | 'benched' | 'unused' | 'pulling' | 'missing' | 'ignored'

export const CHARACTER_STATUSES: CharacterStatus[] = [
  'maxed',
  'main',
  'building',
  'benched',
  'unused',
  'pulling',
  'missing',
  'ignored',
] as const

export const STATUS_COLORS = {
  maxed: '#F0478F',
  main: '#3DBE5C',
  building: '#2BA8E0',
  benched: '#8B7CF6',
  unused: '#A8754F',
  pulling: '#FF9A1F',
  missing: '#E5484D',
  ignored: '#7C8494',
} as const
