import type { GenshinCharacter } from '../../data/genshin/characters'
import type { GenshinCharacterUserData } from '../../data/genshin/user-data'

export interface CharacterPreviewProps extends ReactProps {
  character: GenshinCharacter
  userData?: GenshinCharacterUserData
  isOpen?: boolean
  onSave?: (data: GenshinCharacterUserData) => void
  onClose?: () => void
}

export interface StatRow {
  label: string
  value: string
  field?: string
  percent?: boolean
}

export interface StatSection {
  label: string
  path?: string
  rows: StatRow[]
}

export interface StatFieldConfig {
  label: string
  percent?: boolean
}

export type GenshinStats = NonNullable<GenshinCharacterUserData['stats']>
export type GenshinTalents = NonNullable<GenshinCharacterUserData['talents']>
export type GenshinTierScores = NonNullable<GenshinCharacterUserData['tierScores']>
