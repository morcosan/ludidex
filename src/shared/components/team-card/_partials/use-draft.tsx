import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { type TeamCardProps } from '../_types'
import { useDraftUtils, type TeamDraft } from './use-draft-utils'

export const useDraft = (props: TeamCardProps) => {
  const { team, editing, onSave } = props
  const { createDraft, buildTeam } = useDraftUtils()
  const [isEditing, setIsEditing] = useState(Boolean(editing))
  const { control, formState, getValues, handleSubmit, reset } = useForm<TeamDraft>({
    defaultValues: createDraft(team),
    mode: 'onTouched',
  })
  const hasChanges = formState.isDirty

  const handleClickEdit = () => {
    reset(createDraft(team))
    setIsEditing(true)
  }

  const handleClickDiscard = () => {
    setIsEditing(false)
    reset(createDraft(team))
  }

  const handleClickSave = handleSubmit((values) => {
    setIsEditing(false)
    if (!hasChanges) return
    onSave?.(buildTeam(values, team))
  })

  useEffect(() => {
    setIsEditing(Boolean(editing))
    reset(createDraft(team))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team, editing])

  return {
    control,
    getValues,
    hasChanges,
    isEditing,
    handleClickDiscard,
    handleClickEdit,
    handleClickSave,
  }
}
