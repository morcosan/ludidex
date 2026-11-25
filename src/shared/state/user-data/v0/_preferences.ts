import { z } from 'zod'
import { RATING_LABELS, TAG_COLORS, TIER_LIST_LABELS } from '../../../data'

const UserPreferencesSchema_v0 = z.object({
  ratingLabels: z
    .object(Object.fromEntries(Object.keys(RATING_LABELS).map((key) => [key, z.string().optional()])))
    .optional(),
  tierListLabels: z
    .object(Object.fromEntries(Object.keys(TIER_LIST_LABELS).map((key) => [key, z.string().optional()])))
    .optional(),
  tagColors: z.record(z.string(), z.enum(TAG_COLORS)).optional(),
})

export { UserPreferencesSchema_v0 }
