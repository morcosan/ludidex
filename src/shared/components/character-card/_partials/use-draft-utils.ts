import { RATING_VALUES, type CharacterStatus, type RatingValue, type TierListValue } from '../../../data'
import { type GenshinCharacterUserData } from '../../../state/types'
import { useUserTags } from '../../../utils/use-user-tags'
import { toNumber } from '../../../utils/various'
import { type GenshinStats, type GenshinTalents, type GenshinTierScores } from '../_types'

const TIER_LIST_FIELDS = [
  ...['mainDps', 'subDps', 'support', 'exploration', 'outfit', 'personality'],
] as const satisfies readonly (keyof GenshinTierScores)[]

const STAT_FIELDS = [
  ...['level', 'hp', 'atk', 'def', 'critDmg', 'critRate', 'elemDmg', 'em', 'er'],
] as const satisfies readonly (keyof GenshinStats)[]

const TALENT_FIELDS = ['conLv', 'attackLv', 'skillLv', 'burstLv'] as const satisfies readonly (keyof GenshinTalents)[]

export interface CharacterDraft {
  rating?: RatingValue
  status?: CharacterStatus
  tags: string[]
  tierLists: Record<keyof GenshinTierScores, TierListValue | undefined>
  stats: Record<keyof GenshinStats, string>
  talents: Record<keyof GenshinTalents, string>
}

export const useDraftUtils = () => {
  const { sortTags } = useUserTags()

  const toDraftValue = (value?: number) => (value === undefined ? '' : String(value))

  const createNumberDraft = <K extends string>(
    fields: readonly K[],
    values?: Partial<Record<K, number>>,
  ): Record<K, string> => {
    const draft = {} as Record<K, string>
    for (const field of fields) {
      draft[field] = toDraftValue(values?.[field])
    }
    return draft
  }

  const buildNumberRecord = <K extends string>(
    fields: readonly K[],
    values: Record<K, string>,
  ): Partial<Record<K, number>> => {
    const result: Partial<Record<K, number>> = {}
    for (const field of fields) {
      const value = toNumber(values[field])
      if (value !== undefined) result[field] = value
    }
    return result
  }

  const buildTierLists = (tierLists: CharacterDraft['tierLists']): GenshinTierScores => {
    const result: GenshinTierScores = {}
    for (const field of TIER_LIST_FIELDS) {
      const value = tierLists[field]
      if (value !== undefined) result[field] = value
    }
    return result
  }

  const createDraft = (userData?: GenshinCharacterUserData): CharacterDraft => {
    const tierLists = {} as CharacterDraft['tierLists']
    for (const field of TIER_LIST_FIELDS) {
      tierLists[field] = userData?.tierLists?.[field]
    }

    return {
      rating: RATING_VALUES.find((rating) => rating === userData?.rating),
      status: userData?.status,
      tags: sortTags(userData?.tags ?? []),
      tierLists,
      stats: createNumberDraft(STAT_FIELDS, userData?.stats),
      talents: createNumberDraft(TALENT_FIELDS, userData?.talents),
    }
  }

  const buildCharacter = (draft: CharacterDraft): GenshinCharacterUserData => {
    const tags = [...new Set(draft.tags.filter(Boolean))]
    const tierLists = buildTierLists(draft.tierLists)
    const stats = buildNumberRecord(STAT_FIELDS, draft.stats)
    const talents = buildNumberRecord(TALENT_FIELDS, draft.talents)

    return {
      ...(draft.rating === undefined ? {} : { rating: draft.rating }),
      ...(draft.status === undefined ? {} : { status: draft.status }),
      ...(tags.length === 0 ? {} : { tags }),
      ...(Object.keys(tierLists).length === 0 ? {} : { tierLists }),
      ...(Object.keys(stats).length === 0 ? {} : { stats }),
      ...(Object.keys(talents).length === 0 ? {} : { talents }),
    }
  }

  return { createDraft, buildCharacter }
}
