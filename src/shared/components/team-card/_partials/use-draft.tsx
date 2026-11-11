import { isEqual } from 'lodash-es'
import { useEffect, useState } from 'react'
import { MAX_TEAM_SIZE, RATING_VALUES, type RatingValue } from '../../../data'
import { type GenshinTeam, type GenshinTeamUserData } from '../../../state/types'
import { packTeamId } from '../../../state/utils'
import { formatUserInput, parseTags } from '../../../utils/various'
import { type TeamCardProps } from '../_types'

interface TeamDraft {
  charIds: (string | null)[]
  name: string
  rating?: RatingValue
  tags: string
}

const createDraft = (team: GenshinTeam): TeamDraft => ({
  charIds: Array.from({ length: MAX_TEAM_SIZE }, (_, index) => team.charIds[index] ?? null),
  name: team.name,
  rating: RATING_VALUES.find((rating) => rating === team.rating),
  tags: team.tags?.join(', ') ?? '',
})

const buildTeamData = (draft: TeamDraft): GenshinTeamUserData => {
  const tags = parseTags(draft.tags)

  return {
    name: draft.name,
    ...(draft.rating === undefined ? {} : { rating: draft.rating }),
    ...(tags.length === 0 ? {} : { tags }),
  }
}

export const useDraft = (props: TeamCardProps) => {
  const { team, editing, onSave } = props
  const [draft, setDraft] = useState<TeamDraft>(() => createDraft(team))
  const [isEditing, setIsEditing] = useState(Boolean(editing))

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

  const handleTagsChange = (tags: string) => {
    setDraft((state) => ({ ...state, tags }))
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
      name: formatUserInput(draft.name),
      id: packTeamId(characterIds),
      charIds: characterIds,
    })
  }

  useEffect(() => {
    setIsEditing(Boolean(editing))
    setDraft(createDraft(team))
  }, [team, editing])

  return {
    draft,
    hasChanges,
    isEditing,
    handleMemberChange,
    handleNameChange,
    handleRatingChange,
    handleTagsChange,
    handleClickEdit,
    handleClickDiscard,
    saveChanges,
  }
}
