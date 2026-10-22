export const LIKE_SCORE_LABELS = {
  '-1': 'Dislike',
  0: '--',
  1: 'Boring',
  2: 'OK-ish',
  3: 'Cool',
  4: 'Love',
  5: 'Favorite',
} as const

export const MIN_LIKE_SCORE = Math.min(...Object.keys(LIKE_SCORE_LABELS).map(Number))
export const MAX_LIKE_SCORE = Math.max(...Object.keys(LIKE_SCORE_LABELS).map(Number))

export const TIER_SCORE_MARKS = {
  0: '-',
  1: 'D',
  2: 'C',
  3: 'B',
  4: 'A',
  5: 'S',
  6: 'SS',
} as const

export const TIER_SCORE_COLORS = {
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
