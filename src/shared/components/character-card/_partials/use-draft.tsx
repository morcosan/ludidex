import { isEqual } from 'lodash-es'
import { useEffect, useState } from 'react'
import { RATING_VALUES, type CharacterStatus, type RatingValue, type TierListValue } from '../../../data/settings'
import { type GenshinCharacterUserData } from '../../../state/types'
import { parseTags, toNumber } from '../../../utils/various'
import {
  type CharacterCardProps,
  type GenshinStats,
  type GenshinTalents,
  type GenshinTierScores,
  type StatSectionPath,
} from '../_types'

const TIER_LIST_FIELDS = [
  ...['mainDps', 'subDps', 'support', 'exploration', 'outfit', 'personality'],
] as const satisfies readonly (keyof GenshinTierScores)[]

const STAT_FIELDS = [
  ...['level', 'hp', 'atk', 'def', 'critDmg', 'critRate', 'elemDmg', 'em', 'er'],
] as const satisfies readonly (keyof GenshinStats)[]

const TALENT_FIELDS = ['conLv', 'attackLv', 'skillLv', 'burstLv'] as const satisfies readonly (keyof GenshinTalents)[]

interface CharacterDraft {
  rating?: RatingValue
  status?: CharacterStatus
  tags: string
  tierLists: Record<keyof GenshinTierScores, TierListValue | undefined>
  stats: Record<keyof GenshinStats, string>
  talents: Record<keyof GenshinTalents, string>
}

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
    tags: userData?.tags?.join(', ') ?? '',
    tierLists,
    stats: createNumberDraft(STAT_FIELDS, userData?.stats),
    talents: createNumberDraft(TALENT_FIELDS, userData?.talents),
  }
}

const buildCharacter = (draft: CharacterDraft): GenshinCharacterUserData => {
  const tags = parseTags(draft.tags)
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

export const useDraft = (props: CharacterCardProps) => {
  const { character, userData, onSave } = props
  const [draft, setDraft] = useState<CharacterDraft>(() => createDraft(userData))
  const [isEditing, setIsEditing] = useState(false)
  const hasChanges = !isEqual(buildCharacter(draft), buildCharacter(createDraft(userData)))

  const handleRatingChange = (rating?: RatingValue) => {
    setDraft((current) => ({ ...current, rating }))
  }

  const handleStatusChange = (status?: CharacterStatus) => {
    setDraft((current) => ({ ...current, status }))
  }

  const handleTagsChange = (tags: string) => {
    setDraft((current) => ({ ...current, tags }))
  }

  const handleTierListChange = (field: keyof GenshinTierScores, value?: TierListValue) => {
    setDraft((current) => ({ ...current, tierLists: { ...current.tierLists, [field]: value } }))
  }

  const handleStatChange = (path: StatSectionPath, field: string, value: string) => {
    setDraft((current) =>
      path === 'stats'
        ? { ...current, stats: { ...current.stats, [field]: value } }
        : { ...current, talents: { ...current.talents, [field]: value } },
    )
  }

  const getStatValue = (path: StatSectionPath, field: string) => {
    return (draft[path] as Record<string, string>)[field] ?? ''
  }

  const handleClickEdit = () => {
    setDraft(createDraft(userData))
    setIsEditing(true)
  }

  const handleClickDiscard = () => {
    setIsEditing(false)
    setDraft(createDraft(userData))
  }

  const handleClickSave = () => {
    setIsEditing(false)
    if (!hasChanges) return
    onSave?.(buildCharacter(draft))
  }

  useEffect(() => {
    setIsEditing(false)
    setDraft(createDraft(userData))
  }, [character, userData])

  return {
    draft,
    hasChanges,
    isEditing,
    getStatValue,
    handleRatingChange,
    handleStatusChange,
    handleTagsChange,
    handleTierListChange,
    handleStatChange,
    handleClickDiscard,
    handleClickEdit,
    handleClickSave,
  }
}
