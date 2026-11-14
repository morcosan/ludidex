import type { ParseKeys } from 'i18next'

type GameId = 'genshin'
type Game = {
  id: GameId
  nameKey: ParseKeys
}
const GAMES: Game[] = [
  {
    id: 'genshin',
    nameKey: 'game.label.genshin',
  },
] as const

type RatingValue = 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1
const RATING_VALUES: RatingValue[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1] as const
const RATING_LABELS = {
  10: 'Favorite',
  9: 'Amazing',
  8: 'Superb',
  7: 'Great',
  6: 'Good',
  5: 'Nice',
  4: 'Fine',
  3: 'Dull',
  2: 'Lame',
  1: 'Awful',
} as const
const RATING_COLORS = {
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

type TierListValue = 'SS' | 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
const TIER_LIST_VALUES: TierListValue[] = ['SS', 'S', 'A', 'B', 'C', 'D', 'E', 'F'] as const
const TIER_LIST_LABELS = {
  SS: 'Epic',
  S: 'Elite',
  A: 'Great',
  B: 'Good',
  C: 'Fine',
  D: 'Dull',
  E: 'Weak',
  F: 'Poor',
} as const
const TIER_LIST_COLORS = {
  SS: '#F0478F',
  S: '#E5484D',
  A: '#FF9A1F',
  B: '#D4C81E',
  C: '#6FC93A',
  D: '#1DB88A',
  E: '#5B93BD',
  F: '#9CA3AF',
} as const

const BACKGROUND_SWAP_INTERVAL = 15_000
const BACKGROUND_SWAP_DURATION = 3_000

type CharacterStatus = 'maxed' | 'main' | 'building' | 'benched' | 'unused' | 'pulling' | 'missing' | 'ignored'
const CHARACTER_STATUSES: CharacterStatus[] = [
  'maxed',
  'main',
  'building',
  'benched',
  'unused',
  'pulling',
  'missing',
  'ignored',
] as const
const STATUS_COLORS = {
  maxed: '#F0478F',
  main: '#3DBE5C',
  building: '#2BA8E0',
  benched: '#8B7CF6',
  unused: '#A8754F',
  pulling: '#FF9A1F',
  missing: '#E5484D',
  ignored: '#7C8494',
} as const

const MAX_TEAM_SIZE = 4

type TagColor = 'blue' | 'green' | 'red' | 'yellow'
const TAG_COLORS = ['blue', 'green', 'red', 'yellow'] as const

export * from './genshin/_artifacts'
export * from './genshin/_characters'
export * from './genshin/_core'
export * from './genshin/_weapons'
export {
  BACKGROUND_SWAP_DURATION,
  BACKGROUND_SWAP_INTERVAL,
  CHARACTER_STATUSES,
  GAMES,
  MAX_TEAM_SIZE,
  RATING_COLORS,
  RATING_LABELS,
  RATING_VALUES,
  STATUS_COLORS,
  TAG_COLORS,
  TIER_LIST_COLORS,
  TIER_LIST_LABELS,
  TIER_LIST_VALUES,
  type CharacterStatus,
  type Game,
  type GameId,
  type RatingValue,
  type TagColor,
  type TierListValue,
}
