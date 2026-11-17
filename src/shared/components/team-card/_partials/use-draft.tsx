import { isEqual } from 'lodash-es'
import { useEffect, useState } from 'react'
import { type RatingValue } from '../../../data'
import { packTeamId } from '../../../state/utils'
import { parseUserInput } from '../../../utils/various'
import { type TeamCardProps } from '../_types'
import { useDraftUtils, type TeamDraft } from './use-draft-utils'

export const useDraft = (props: TeamCardProps) => {
  const { team, editing, onSave } = props
  const { createDraft, buildTeamData } = useDraftUtils()
  const [isEditing, setIsEditing] = useState(Boolean(editing))
  const [draft, setDraft] = useState<TeamDraft>(() => createDraft(team))
  const characterIds = [...new Set(draft.charIds.filter((id) => id !== null))]
  const hasFieldChanges = !isEqual(buildTeamData(draft), buildTeamData(createDraft(team)))
  const hasMemberChanges = !isEqual(characterIds, team.charIds)
  const hasChanges = characterIds.length > 0 && (hasFieldChanges || hasMemberChanges)

  const handleNameChange = (name: string) => {
    setDraft((state) => ({ ...state, name }))
  }

  const handleRatingChange = (rating?: RatingValue) => {
    setDraft((state) => ({ ...state, rating }))
  }

  const handleMemberChange = (index: number, charId: string | null) => {
    setDraft((state) => {
      const charIds = [...state.charIds]
      charIds[index] = charId
      return { ...state, charIds }
    })
  }

  const handleTagsChange = (tags: string[]) => {
    setDraft((state) => ({ ...state, tags: tags.map(parseUserInput) }))
  }

  const handleClickEdit = () => {
    setDraft(createDraft(team))
    setIsEditing(true)
  }

  const handleClickDiscard = () => {
    setIsEditing(false)
    setDraft(createDraft(team))
  }

  const saveChanges = () => {
    setIsEditing(false)
    if (!hasChanges) {
      setDraft(createDraft(team))
      return
    }
    onSave?.({
      ...buildTeamData(draft),
      name: parseUserInput(draft.name),
      id: packTeamId(characterIds),
      charIds: characterIds,
    })
  }

  useEffect(() => {
    setIsEditing(Boolean(editing))
    setDraft(createDraft(team))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team, editing])

  return {
    draft,
    hasChanges,
    isEditing,
    handleClickDiscard,
    handleClickEdit,
    handleMemberChange,
    handleNameChange,
    handleRatingChange,
    handleTagsChange,
    saveChanges,
  }
}
