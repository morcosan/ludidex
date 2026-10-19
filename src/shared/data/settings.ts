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
  SS: '#FF3B5C',
  S: '#FF7F2A',
  A: '#FFC83D',
  B: '#7ED957',
  C: '#3FA7D6',
  D: '#8E8E9A',
}
