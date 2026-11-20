import { useTranslation } from 'react-i18next'
import { useUserDataStore } from '../../../state/use-user-data'
import type {
  CharacterCardProps,
  DataRow,
  DataSection,
  GenshinStats,
  GenshinTalents,
  GenshinTierLists,
} from '../_types'

export const useDataRows = (props: CharacterCardProps) => {
  const { character } = props
  const userData = useUserDataStore((state) => state.userData?.genshin?.characters?.[character.id])
  const { t } = useTranslation()

  const formatValue = (value?: unknown): string => {
    if (value === undefined) return '--'
    return typeof value === 'number' ? value.toLocaleString('en-US', { maximumFractionDigits: 1 }) : String(value)
  }

  const buildStatRows = <T extends object>(data: T, fields: DataRow<Extract<keyof T, string>>[]): DataRow[] => {
    return fields.map(({ name, label, percent }): DataRow => {
      return { name, label, percent, value: formatValue(data[name]) }
    })
  }

  const tierListRows: DataRow<keyof GenshinTierLists>[] = [
    { name: 'mainDps', label: t('game.label.mainDps') },
    { name: 'subDps', label: t('game.label.subDps') },
    { name: 'support', label: t('game.label.support') },
    { name: 'exploration', label: t('game.label.exploration') },
    { name: 'outfit', label: t('game.label.outfit') },
    { name: 'personality', label: t('game.label.personality') },
  ]

  const talentRows: DataRow<keyof GenshinTalents>[] = [
    { name: 'conLv', label: t('game.stats.constellation') },
    { name: 'attackLv', label: t('game.stats.normalAttack') },
    { name: 'skillLv', label: t('game.stats.elemSkill') },
    { name: 'burstLv', label: t('game.stats.elemBurst') },
  ]
  const statRows: DataRow<keyof GenshinStats>[] = [
    { name: 'level', label: t('game.label.level') },
    { name: 'hp', label: t('game.stats.hp') },
    { name: 'atk', label: t('game.stats.atk') },
    { name: 'def', label: t('game.stats.def') },
    { name: 'em', label: t('game.stats.em') },
    { name: 'er', label: t('game.stats.er'), percent: true },
    { name: 'critRate', label: t('game.stats.critRate'), percent: true },
    { name: 'critDmg', label: t('game.stats.critDmg'), percent: true },
    {
      name: 'elemDmg',
      label: t('game.stats.elemDmg', { element: t(`game.elements.${character.element}`) }),
      percent: true,
    },
  ]
  const dataSections: DataSection[] = [
    {
      label: t('game.label.talents'),
      rows: buildStatRows(userData?.talents || {}, talentRows),
      path: 'talents',
      mono: true,
    },
    {
      label: t('game.label.stats'),
      rows: buildStatRows(userData?.stats || {}, statRows),
      path: 'stats',
      mono: true,
    },
    {
      label: t('game.label.baseStats'),
      rows: [
        { name: 'specialBonus', label: t('game.stats.specialBonus'), value: character.bonusStat },
        {
          name: 'normalAttackDmg',
          label: t('game.stats.normalAttackDmg'),
          value: character.na1HitDmg.map((value) => `${value}%`).join(' - '),
        },
      ],
    },
  ]

  return {
    dataSections,
    tierListRows,
  }
}
