import type { GenshinCharacter } from '../../data/genshin/characters'
import type { GenshinCharacterUserData, UserPrefs } from '../../state/types'

export interface CharacterCardProps extends ReactProps {
  character: GenshinCharacter
  userData?: GenshinCharacterUserData
  userPrefs?: UserPrefs
  isOpen?: boolean
  className?: string
  onSave?: (data: GenshinCharacterUserData) => void
  onClose?: () => void
}

export interface StatRow {
  label: string
  value?: string
  field?: string
  percent?: boolean
}

export interface StatSection {
  label: string
  path?: string
  rows: StatRow[]
}

export interface StatField {
  label: string
  percent?: boolean
}

export type GenshinStats = NonNullable<GenshinCharacterUserData['stats']>
export type GenshinTalents = NonNullable<GenshinCharacterUserData['talents']>
export type GenshinTierScores = NonNullable<GenshinCharacterUserData['tierLists']>
