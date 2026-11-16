import { type CSSProperties } from 'react'
import { TAG_STYLES, type TagColor } from '../data'
import { useUserDataStore } from '../state/use-user-data'

export const parseTag = (value: string) => {
  return value
    .normalize('NFC')
    .replace(/[^\p{L}\p{N}-]+/gu, '-')
    .replace(/^-+|-+$/g, '')
}
export const parseInput = (value: string) => {
  return value
    .normalize('NFC')
    .replace(/[^\p{L}\p{N}-]+/gu, '-')
    .replace(/^-+/, '')
}
export const getTagColorStyle = (color: TagColor): CSSProperties => {
  const { bg, text, border } = TAG_STYLES[color]
  return { backgroundColor: bg, color: text, borderColor: border }
}

export const useUserTags = () => {
  const userData = useUserDataStore((state) => state.userData)
  const tagColors = userData?.preferences?.tagColors ?? {}
  const userGenshin = userData?.genshin

  const tagOptions = [
    ...new Set([
      ...Object.keys(tagColors),
      ...Object.values(userGenshin?.teams ?? {}).flatMap((userTeam) => userTeam.tags ?? []),
      ...Object.values(userGenshin?.characters ?? {}).flatMap((userCharacter) => userCharacter?.tags ?? []),
    ]),
  ]

  const getTagColor = (tag?: string): TagColor | null => {
    const parsedTag = parseTag(tag || '').toLowerCase()
    return Object.entries(tagColors).find(([key]) => parseTag(key).toLowerCase() === parsedTag)?.[1] || null
  }

  const getTagStyle = (tag?: string): CSSProperties | undefined => {
    const color = getTagColor(tag)
    return color ? getTagColorStyle(color) : undefined
  }

  const tagOptionsWithColor = tagOptions.filter((tag) => getTagColor(tag))
  const tagOptionsWithoutColor = tagOptions.filter((tag) => !getTagColor(tag))

  return { getTagStyle, getTagColor, tagOptions, tagOptionsWithColor, tagOptionsWithoutColor }
}
