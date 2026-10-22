import { useTranslation } from 'react-i18next'
import type {
  CharacterCardProps,
  GenshinStats,
  GenshinTalents,
  GenshinTierScores,
  StatField,
  StatRow,
  StatSection,
} from '../_types'

export const useData = (props: CharacterCardProps) => {
  const { character, userData } = props
  const { t } = useTranslation()

  const buildStatRows = <T extends object>(data: T, fields: Record<keyof T, StatField>): StatRow[] => {
    const formatValue = (value?: unknown, suffix = '') => (value === undefined ? '--' : `${value}${suffix}`)
    return Object.entries(fields as Record<string, StatField>).map(([field, { label, percent }]) => {
      return { label, field, percent, value: formatValue(data[field as keyof T], percent ? '%' : '') }
    })
  }
  const talentFields: Record<keyof GenshinTalents, StatField> = {
    conLv: { label: t('game.stats.constellation') },
    attackLv: { label: t('game.stats.normalAttack') },
    skillLv: { label: t('game.stats.elemSkill') },
    burstLv: { label: t('game.stats.elemBurst') },
  }
  const statFields: Record<keyof GenshinStats, StatField> = {
    level: { label: t('game.label.level') },
    hp: { label: t('game.stats.hp') },
    atk: { label: t('game.stats.atk') },
    def: { label: t('game.stats.def') },
    em: { label: t('game.stats.em') },
    er: { label: t('game.stats.er'), percent: true },
    critRate: { label: t('game.stats.critRate'), percent: true },
    critDmg: { label: t('game.stats.critDmg'), percent: true },
    elemDmg: { label: t('game.stats.elemDmg', { element: character.element }), percent: true },
  }
  const tierFields: Record<keyof GenshinTierScores, string> = {
    mainDps: t('game.label.mainDps'),
    subDps: t('game.label.subDps'),
    support: t('game.label.support'),
    exploration: t('game.label.exploration'),
    outfit: t('game.label.outfit'),
    personality: t('game.label.personality'),
  }
  const statSections: StatSection[] = [
    {
      label: t('game.label.talents'),
      path: 'talents',
      rows: buildStatRows(userData?.talents || {}, talentFields),
    },
    {
      label: t('game.label.stats'),
      path: 'stats',
      rows: buildStatRows(userData?.stats || {}, statFields),
    },
    {
      label: t('game.label.baseStats'),
      rows: [
        { label: t('game.stats.specialBonus'), value: character.bonusStat },
        {
          label: t('game.stats.normalAttackDmg'),
          value: character.na1HitDmg.map((value) => `${value}%`).join(' - '),
        },
      ],
    },
  ]

  return {
    statSections,
    tierFields,
  }
}
