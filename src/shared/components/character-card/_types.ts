import type { GenshinCharacter } from '../../data/genshin/characters'
import type { GenshinCharacterUserData, UserPrefs } from '../../state/types'

export interface CharacterCardProps extends ReactProps {
  character: GenshinCharacter
  userData?: GenshinCharacterUserData
  userPrefs?: UserPrefs
  opened?: boolean
  className?: string
  onSave?: (data: GenshinCharacterUserData) => void
  onClose?: () => void
}

export type StatSectionPath = 'stats' | 'talents'

export interface StatRow {
  label: string
  value?: string
  field?: string
  percent?: boolean
}

export interface StatSection {
  label: string
  path?: StatSectionPath
  rows: StatRow[]
}

export interface StatField {
  label: string
  percent?: boolean
}

export type GenshinStats = NonNullable<GenshinCharacterUserData['stats']>
export type GenshinTalents = NonNullable<GenshinCharacterUserData['talents']>
export type GenshinTierScores = NonNullable<GenshinCharacterUserData['tierLists']>
