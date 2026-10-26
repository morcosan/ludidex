import { clamp, isEqual } from 'lodash-es'
import { useEffect, useMemo, useState } from 'react'
import { RATING_MAX_VALUE, RATING_MIN_VALUE } from '../../../data/settings'
import { type GenshinCharacterUserData } from '../../../state/types'
import { type CharacterCardProps } from '../_types'

type GenericDataDraft<T> = {
  [K in keyof T]?: T[K] extends object ? GenericDataDraft<T[K]> : string
}
type DataDraft = GenericDataDraft<GenshinCharacterUserData>

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

  const current = (draft as any)[key]
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

    if (key === ('tags' satisfies keyof typeof draft)) {
      const tags = value
        .split(/[,\n]/)
        .map((tag) => tag.trim())
        .filter(Boolean)
      if (tags.length) data[key] = tags
      continue
    }

    if (key === ('status' satisfies keyof typeof draft)) {
      if (value) data[key] = value
      continue
    }

    const number = toNumber(value)
    if (number !== undefined) {
      data[key] =
        key === ('rating' satisfies keyof typeof draft) ? clamp(number, RATING_MIN_VALUE, RATING_MAX_VALUE) : number
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
    if (!path) return ((draft as any)[field] as string | undefined) ?? ''
    const section = (draft as any)[path]
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
