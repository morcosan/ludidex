import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useUserDataStore } from '../../../state/use-user-data'
import { type DomainCardProps } from '../_types'
import { type DomainDraft, useDraftUtils } from './use-draft-utils'

export const useDraft = (props: DomainCardProps) => {
  const { domain, onSave } = props
  const userData = useUserDataStore((state) => state.userData?.genshin?.domains?.[domain.id])
  const { createDraft, buildDomain } = useDraftUtils()
  const [isEditing, setIsEditing] = useState(false)
  const { control, formState, handleSubmit, reset } = useForm<DomainDraft>({ defaultValues: createDraft(userData) })
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
    onSave?.(buildDomain(values))
  })

  useEffect(() => {
    setIsEditing(false)
    reset(createDraft(userData))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain, userData])

  return {
    control,
    hasChanges,
    isEditing,
    handleClickDiscard,
    handleClickEdit,
    handleClickSave,
  }
}
