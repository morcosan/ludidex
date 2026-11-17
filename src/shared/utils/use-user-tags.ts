import { type CSSProperties } from 'react'
import { TAG_STYLES, type TagColor } from '../data'
import { useUserDataStore } from '../state/use-user-data'

export const getTagColorStyle = (color: TagColor): CSSProperties => {
  const { bg, text, border } = TAG_STYLES[color]
  return { backgroundColor: bg, color: text, borderColor: border }
}

export const useUserTags = () => {
  const userData = useUserDataStore((state) => state.userData)
  const tagColors = userData?.preferences?.tagColors ?? {}
  const userGenshin = userData?.genshin

  const getTagColor = (tag?: string): TagColor | null => {
    const normalizedTag = tag?.toLowerCase()
    return Object.entries(tagColors).find(([key]) => key.toLowerCase() === normalizedTag)?.[1] || null
  }

  const getTagStyle = (tag?: string): CSSProperties | undefined => {
    const color = getTagColor(tag)
    return color ? getTagColorStyle(color) : undefined
  }

  const sortTags = (tags: string[]) => {
    return [...tags].sort((a, b) => {
      const isColoredA = Boolean(getTagColor(a))
      const isColoredB = Boolean(getTagColor(b))
      if (isColoredA !== isColoredB) return isColoredA ? -1 : 1
      return a.localeCompare(b, undefined, { sensitivity: 'base' })
    })
  }

  const tagOptions = sortTags([
    ...new Set([
      ...Object.keys(tagColors),
      ...Object.values(userGenshin?.teams ?? {}).flatMap((userTeam) => userTeam.tags ?? []),
      ...Object.values(userGenshin?.characters ?? {}).flatMap((userCharacter) => userCharacter?.tags ?? []),
    ]),
  ])

  const tagOptionsWithColor = tagOptions.filter((tag) => getTagColor(tag))
  const tagOptionsWithoutColor = tagOptions.filter((tag) => !getTagColor(tag))

  return { getTagStyle, getTagColor, sortTags, tagOptions, tagOptionsWithColor, tagOptionsWithoutColor }
}
