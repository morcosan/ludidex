import { MAX_TEAM_SIZE, RATING_VALUES, type RatingValue } from '../../../data'
import { type GenshinTeam } from '../../../state/types'
import { packTeamId } from '../../../state/utils'
import { useUserTags } from '../../../utils/use-user-tags'
import { formatTime, isFailedTrial, parseTime, parseUserInput } from '../../../utils/various'

// In react-hook-form, undefined = default value, null = empty value
export interface TeamDraft {
  charIds: (string | null)[]
  name: string
  rating: RatingValue | null
  tags: string[]
  trials: Record<string, string>
}

export const useDraftUtils = () => {
  const { sortTags } = useUserTags()

  const createDraft = (team: GenshinTeam): TeamDraft => ({
    charIds: Array.from({ length: MAX_TEAM_SIZE }, (_, index) => team.charIds[index] ?? null),
    name: team.name,
    rating: RATING_VALUES.find((rating) => rating === team.rating) ?? null,
    tags: sortTags(team.tags ?? []),
    trials: Object.fromEntries(
      Object.entries(team.trials ?? {}).map(([trialId, value]) => [
        trialId,
        isFailedTrial(value) ? String(value) : (formatTime(value) ?? ''),
      ]),
    ),
  })

  const buildTeam = (draft: TeamDraft): GenshinTeam => {
    const charIds = [...new Set(draft.charIds.filter((id): id is string => Boolean(id)))]
    const tags = [...new Set(draft.tags.filter(Boolean))]
    const trials: Record<string, number> = {}
    for (const [trialId, value] of Object.entries(draft.trials)) {
      const parsed = parseTime(value)
      if (parsed !== undefined) trials[trialId] = parsed
    }
    return {
      id: packTeamId(charIds),
      charIds,
      name: parseUserInput(draft.name),
      ...(draft.rating === null ? {} : { rating: draft.rating }),
      ...(tags.length === 0 ? {} : { tags }),
      ...(Object.keys(trials).length === 0 ? {} : { trials }),
    }
  }

  return { createDraft, buildTeam }
}
