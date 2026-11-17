import { isEqual } from 'lodash-es'
import { useEffect, useState } from 'react'
import { type CharacterStatus, type RatingValue, type TierListValue } from '../../../data'
import { useUserDataStore } from '../../../state/use-user-data'
import { parseUserInput } from '../../../utils/various'
import { type CharacterCardProps, type GenshinTierScores, type StatSectionPath } from '../_types'
import { useDraftUtils, type CharacterDraft } from './use-draft-utils'

export const useDraft = (props: CharacterCardProps) => {
  const { character, onSave } = props
  const userData = useUserDataStore((state) => state.userData?.genshin?.characters?.[character.id])
  const { createDraft, buildCharacter } = useDraftUtils()
  const [draft, setDraft] = useState<CharacterDraft>(() => createDraft(userData))
  const [isEditing, setIsEditing] = useState(false)
  const hasChanges = !isEqual(buildCharacter(draft), buildCharacter(createDraft(userData)))

  const handleRatingChange = (rating?: RatingValue) => {
    setDraft((state) => ({ ...state, rating }))
  }

  const handleStatusChange = (status?: CharacterStatus) => {
    setDraft((state) => ({ ...state, status }))
  }

  const handleTagsChange = (tags: string[]) => {
    setDraft((state) => ({ ...state, tags: tags.map(parseUserInput) }))
  }

  const handleTierListChange = (field: keyof GenshinTierScores, value?: TierListValue) => {
    setDraft((state) => ({ ...state, tierLists: { ...state.tierLists, [field]: value } }))
  }

  const handleStatChange = (path: StatSectionPath, field: string, value: string) => {
    setDraft((state) =>
      path === 'stats'
        ? { ...state, stats: { ...state.stats, [field]: value } }
        : { ...state, talents: { ...state.talents, [field]: value } },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
