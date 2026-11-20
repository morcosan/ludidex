import { MAX_TEAM_SIZE, RATING_VALUES, type RatingValue } from '../../../data'
import { type GenshinTeam } from '../../../state/types'
import { packTeamId } from '../../../state/utils'
import { useUserTags } from '../../../utils/use-user-tags'
import { parseUserInput } from '../../../utils/various'

// In react-hook-form, undefined = default value, null = empty value
export interface TeamDraft {
  charIds: (string | null)[]
  name: string
  rating: RatingValue | null
  tags: string[]
}

export const useDraftUtils = () => {
  const { sortTags } = useUserTags()

  const createDraft = (team: GenshinTeam): TeamDraft => ({
    charIds: Array.from({ length: MAX_TEAM_SIZE }, (_, index) => team.charIds[index] ?? null),
    name: team.name,
    rating: RATING_VALUES.find((rating) => rating === team.rating) ?? null,
    tags: sortTags(team.tags ?? []),
  })

  const buildTeam = (draft: TeamDraft): GenshinTeam => {
    const charIds = [...new Set(draft.charIds.filter((id): id is string => Boolean(id)))]
    const tags = [...new Set(draft.tags.filter(Boolean))]
    return {
      id: packTeamId(charIds),
      charIds,
      name: parseUserInput(draft.name),
      ...(draft.rating === null ? {} : { rating: draft.rating }),
      ...(tags.length === 0 ? {} : { tags }),
    }
  }

  return { createDraft, buildTeam }
}
