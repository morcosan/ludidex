import type { GenshinCharacter } from '../../data'
import type { GenshinCharacterUserData } from '../../state/types'

export interface CharacterCardProps extends ReactProps {
  character: GenshinCharacter
  opened?: boolean
  className?: string
  onSave?: (data: GenshinCharacterUserData) => void
  onClose?: () => void
}

export type DataBasePath = 'stats' | 'talents'
export type DataFieldName = `stats.${keyof GenshinStats}` | `talents.${keyof GenshinTalents}`

export interface DataRow<T = string> {
  name: T
  label: string
  value?: string
  percent?: boolean
}

export interface DataSection {
  label: string
  rows: DataRow[]
  path?: DataBasePath
  mono?: boolean
}

export type GenshinStats = NonNullable<GenshinCharacterUserData['stats']>
export type GenshinTalents = NonNullable<GenshinCharacterUserData['talents']>
export type GenshinTierLists = NonNullable<GenshinCharacterUserData['tierLists']>
