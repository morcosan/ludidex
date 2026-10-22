import { clamp, isEqual } from 'lodash-es'
import { useEffect, useMemo, useState } from 'react'
import { type GenshinCharacterUserData } from '../../../data/genshin/user-data'
import { MAX_LIKE_SCORE, MIN_LIKE_SCORE } from '../../../data/settings'
import { type CharacterCardProps } from '../_types'

type DataDraft = { [key: string]: string | DataDraft }

const draftValue = (value: unknown): string | DataDraft => {
  if (Array.isArray(value)) return value.join(', ')
  if (typeof value === 'object' && value !== null) return createDraft(value)
  return value === undefined ? '' : String(value)
}

const createDraft = (data: object): DataDraft => {
  return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, draftValue(value)]))
}

const createUserDraft = (userData?: GenshinCharacterUserData): DataDraft => {
  return userData ? createDraft(userData) : {}
}

const setDraftValue = (draft: DataDraft, [key, ...rest]: string[], value: string): DataDraft => {
  if (!key) return draft
  if (!rest.length) return { ...draft, [key]: value }

  const current = draft[key]
  const child = typeof current === 'object' ? current : {}
  return { ...draft, [key]: setDraftValue(child, rest, value) }
}

const toNumber = (value?: string) => {
  if (!value?.trim()) return undefined
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

const buildData = (draft: DataDraft): Record<string, unknown> => {
  const data: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(draft)) {
    if (typeof value === 'object') {
      const nested = buildData(value)
      if (Object.keys(nested).length) data[key] = nested
      continue
    }

    if (key === 'tags') {
      const tags = value
        .split(/[,\n]/)
        .map((tag) => tag.trim())
        .filter(Boolean)
      if (tags.length) data[key] = tags
      continue
    }

    const number = toNumber(value)
    if (number !== undefined) {
      data[key] = key === 'likeScore' ? clamp(number, MIN_LIKE_SCORE, MAX_LIKE_SCORE) : number
    }
  }

  return data
}

const useDraft = (props: CharacterCardProps) => {
  const { character, userData, onSave } = props
  const [draft, setDraft] = useState<DataDraft>(() => createUserDraft(userData))
  const [isEditing, setIsEditing] = useState(false)
  const draftData = useMemo(() => buildData(draft), [draft])
  const savedData = useMemo(() => buildData(createUserDraft(userData)), [userData])
  const hasChanges = !isEqual(draftData, savedData)

  const getDraftValue = (path: string | undefined, field: string) => {
    if (!path) return (draft[field] as string | undefined) ?? ''
    const section = draft[path]
    return typeof section === 'object' ? ((section[field] as string | undefined) ?? '') : ''
  }

  const handleDraftChange =
    (...path: string[]) =>
    (value: string) => {
      setDraft((current) => setDraftValue(current, path, value))
    }

  const handleClickEdit = () => {
    setDraft(createUserDraft(userData))
    setIsEditing(true)
  }

  const handleClickDiscard = () => {
    setIsEditing(false)
    setDraft(createUserDraft(userData))
  }

  const handleClickSave = () => {
    setIsEditing(false)
    if (!hasChanges) return
    onSave?.(draftData as GenshinCharacterUserData)
  }

  useEffect(() => {
    setIsEditing(false)
    setDraft(createUserDraft(userData))
  }, [character, userData])

  return {
    draft,
    hasChanges,
    isEditing,
    getDraftValue,
    handleClickDiscard,
    handleClickEdit,
    handleClickSave,
    handleDraftChange,
  }
}

export { toNumber, useDraft }
