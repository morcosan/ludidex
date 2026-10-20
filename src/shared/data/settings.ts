export const MIN_LIKE_SCORE = -1
export const MAX_LIKE_SCORE = 5

export const LIKE_SCORE_TEXT = {
  '-1': 'Dislike',
  0: '--',
  1: 'Boring',
  2: 'OK-ish',
  3: 'Cool',
  4: 'Love',
  5: 'Favorite',
}

export const TIER_SCORES = ['SS', 'S', 'A', 'B', 'C', 'D'] as const

export const TIER_COLORS = {
  SS: '#FF2E63',
  S: '#FF7A1A',
  A: '#FFC61A',
  B: '#4ADE80',
  C: '#22B8F0',
  D: '#9B6BFF',
} as const
