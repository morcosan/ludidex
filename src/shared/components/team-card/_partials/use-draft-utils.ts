import { MAX_TEAM_SIZE, RATING_VALUES, type RatingValue, type TierListValue } from '../../../data'
import { type GenshinTeam } from '../../../state/types'
import { packTeamId } from '../../../state/utils'
import { useUserTags } from '../../../utils/use-user-tags'
import { parseUserInput } from '../../../utils/various'
import { type GenshinTierLists } from '../_types'

const TIER_LIST_FIELDS = [
  ...['synergy', 'story', 'aesthetic', 'affinity'],
] as const satisfies readonly (keyof GenshinTierLists)[]

// In react-hook-form, undefined = default value, null = empty value
export interface TeamDraft {
  charIds: (string | null)[]
  name: string
  rating: RatingValue | null
  tags: string[]
  notes: string
  tierLists: Record<keyof GenshinTierLists, TierListValue | null>
}

export const useDraftUtils = () => {
  const { sortTags } = useUserTags()

  const buildTierLists = (tierLists: TeamDraft['tierLists']): GenshinTierLists => {
    const result: GenshinTierLists = {}
    for (const field of TIER_LIST_FIELDS) {
      const value = tierLists[field]
      if (value !== null) result[field] = value
    }
    return result
  }

  const createDraft = (team: GenshinTeam): TeamDraft => {
    const tierLists = {} as TeamDraft['tierLists']
    for (const field of TIER_LIST_FIELDS) {
      tierLists[field] = team.tierLists?.[field] ?? null
    }

    return {
      tierLists,
      charIds: Array.from({ length: MAX_TEAM_SIZE }, (_, index) => team.charIds[index] ?? null),
      name: team.name,
      rating: RATING_VALUES.find((rating) => rating === team.rating) ?? null,
      tags: sortTags(team.tags ?? []),
      notes: team.notes ?? '',
    }
  }

  const buildTeam = (draft: TeamDraft, team: GenshinTeam): GenshinTeam => {
    const charIds = [...new Set(draft.charIds.filter((id): id is string => Boolean(id)))]
    const tags = [...new Set(draft.tags.filter(Boolean))]
    const tierLists = buildTierLists(draft.tierLists)
    return {
      id: packTeamId(charIds),
      charIds,
      name: parseUserInput(draft.name),
      ...(draft.rating === null ? {} : { rating: draft.rating }),
      ...(tags.length === 0 ? {} : { tags }),
      ...(draft.notes ? { notes: draft.notes } : {}),
      ...(Object.keys(tierLists).length === 0 ? {} : { tierLists }),
      ...(team.trials === undefined ? {} : { trials: team.trials }),
    }
  }

  return { createDraft, buildTeam }
}
