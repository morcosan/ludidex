export const RATING_LABELS = {
  '-1': 'Dislike',
  0: '--',
  1: 'Boring',
  2: 'Decent',
  3: 'Good',
  4: 'Great',
  5: 'Favorite',
} as const

export const RATING_MIN_VALUE = Math.min(...Object.keys(RATING_LABELS).map(Number))
export const RATING_MAX_VALUE = Math.max(...Object.keys(RATING_LABELS).map(Number))

export const TIER_LIST_MARKS = {
  0: '-',
  1: 'D',
  2: 'C',
  3: 'B',
  4: 'A',
  5: 'S',
  6: 'SS',
} as const

export const TIER_LIST_COLORS = {
  0: '#97919E',
  1: '#9B6BFF',
  2: '#22B8F0',
  3: '#4ADE80',
  4: '#FFC61A',
  5: '#FF7A1A',
  6: '#FF2E63',
} as const

export const BACKGROUND_SWAP_INTERVAL = 15_000
export const BACKGROUND_SWAP_DURATION = 3_000

export const CHARACTER_STATUSES = ['active', 'benched', 'pulling', 'missing', 'skipped'] as const
