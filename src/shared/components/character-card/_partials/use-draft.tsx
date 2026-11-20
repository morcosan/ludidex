import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useUserDataStore } from '../../../state/use-user-data'
import { type CharacterCardProps } from '../_types'
import { useDraftUtils, type CharacterDraft } from './use-draft-utils'

export const useDraft = (props: CharacterCardProps) => {
  const { character, onSave } = props
  const userData = useUserDataStore((state) => state.userData?.genshin?.characters?.[character.id])
  const { createDraft, buildCharacter } = useDraftUtils()
  const [isEditing, setIsEditing] = useState(false)
  const { control, formState, handleSubmit, reset } = useForm<CharacterDraft>({ defaultValues: createDraft(userData) })
  const hasChanges = formState.isDirty

  const handleClickEdit = () => {
    reset(createDraft(userData))
    setIsEditing(true)
  }

  const handleClickDiscard = () => {
    setIsEditing(false)
    reset(createDraft(userData))
  }

  const handleClickSave = handleSubmit((values) => {
    setIsEditing(false)
    if (!hasChanges) return
    onSave?.(buildCharacter(values))
  })

  useEffect(() => {
    setIsEditing(false)
    reset(createDraft(userData))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character, userData])

  return {
    control,
    hasChanges,
    isEditing,
    handleClickDiscard,
    handleClickEdit,
    handleClickSave,
  }
}
