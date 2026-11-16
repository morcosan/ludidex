import { isEqual } from 'lodash-es'
import { useEffect, useState } from 'react'
import { MAX_TEAM_SIZE, RATING_VALUES, type RatingValue } from '../../../data'
import { type GenshinTeam, type GenshinTeamUserData } from '../../../state/types'
import { packTeamId } from '../../../state/utils'
import { parseTag } from '../../../utils/use-user-tags'
import { parseUserInput } from '../../../utils/various'
import { type TeamCardProps } from '../_types'

interface TeamDraft {
  charIds: (string | null)[]
  name: string
  rating?: RatingValue
  tags: string[]
}

const createDraft = (team: GenshinTeam): TeamDraft => ({
  charIds: Array.from({ length: MAX_TEAM_SIZE }, (_, index) => team.charIds[index] ?? null),
  name: team.name,
  rating: RATING_VALUES.find((rating) => rating === team.rating),
  tags: (team.tags ?? []).map(parseTag).filter(Boolean),
})

const buildTeamData = (draft: TeamDraft): GenshinTeamUserData => {
  const tags = [...new Set(draft.tags.map(parseTag).filter(Boolean))]
  return {
    name: draft.name,
    ...(draft.rating === undefined ? {} : { rating: draft.rating }),
    ...(tags.length === 0 ? {} : { tags }),
  }
}

export const useDraft = (props: TeamCardProps) => {
  const { team, editing, onSave } = props
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
