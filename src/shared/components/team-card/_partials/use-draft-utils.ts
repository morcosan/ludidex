import { MAX_TEAM_SIZE, RATING_VALUES, type RatingValue } from '../../../data'
import { type GenshinTeam, type GenshinTeamUserData } from '../../../state/types'
import { useUserTags } from '../../../utils/use-user-tags'

export interface TeamDraft {
  charIds: (string | null)[]
  name: string
  rating?: RatingValue
  tags: string[]
}

export const useDraftUtils = () => {
  const { sortTags } = useUserTags()

  const createDraft = (team: GenshinTeam): TeamDraft => ({
    charIds: Array.from({ length: MAX_TEAM_SIZE }, (_, index) => team.charIds[index] ?? null),
    name: team.name,
    rating: RATING_VALUES.find((rating) => rating === team.rating),
    tags: sortTags(team.tags ?? []),
  })

  const buildTeamData = (draft: TeamDraft): GenshinTeamUserData => {
    const tags = [...new Set(draft.tags.filter(Boolean))]
    return {
      name: draft.name,
      ...(draft.rating === undefined ? {} : { rating: draft.rating }),
      ...(tags.length === 0 ? {} : { tags }),
    }
  }

  return { createDraft, buildTeamData }
}
