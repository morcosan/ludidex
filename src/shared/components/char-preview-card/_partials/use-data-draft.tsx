import { clamp, isEqual } from 'lodash-es'
import { useEffect, useState } from 'react'
import { type GenshinCharacterUserData } from '../../../data/genshin/user-data'
import { MAX_LIKE_SCORE, MIN_LIKE_SCORE } from '../../../data/settings'
import { type CharacterPreviewProps } from '../_types'

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

const useDataDraft = (props: CharacterPreviewProps) => {
  const { character, userData, onSave } = props
  const [dataDraft, setDataDraft] = useState<DataDraft>(() => createUserDraft(userData))
  const [isEditing, setIsEditing] = useState(false)

  const handleDraftChange =
    (...path: string[]) =>
    (value: string) => {
      setDataDraft((current) => setDraftValue(current, path, value))
    }

  const handleEdit = () => {
    setDataDraft(createUserDraft(userData))
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleSave = () => {
    setIsEditing(false)
    const data = buildData(dataDraft)
    if (isEqual(data, buildData(createUserDraft(userData)))) return
    onSave?.(data as GenshinCharacterUserData)
  }

  useEffect(() => {
    setIsEditing(false)
    setDataDraft(createUserDraft(userData))
  }, [character, userData])

  return {
    dataDraft,
    isEditing,
    handleCancel,
    handleDraftChange,
    handleEdit,
    handleSave,
    setDataDraft,
    setIsEditing,
  }
}

export { toNumber, useDataDraft }
