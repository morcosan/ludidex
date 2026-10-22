import { LikeScore } from '@app-shared/components/like-score/like-score'
import { TierScore } from '@app-shared/components/tier-score/tier-score'
import { ArrowDownWideNarrow, Grip } from 'lucide-react'
import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'

export interface ViewOption {
  value: View
  label: string
  icon: ReactNode
}

export type View = (typeof VIEWS)[number]

export const VIEW_URL_KEY = 'view'

export const VIEWS = [
  'default',
  'tier-favorite',
  'tier-main-dps',
  'tier-sub-dps',
  'tier-support',
  'tier-exploration',
  'tier-outfit',
  'tier-personality',
  'rank-level',
  'rank-hp',
  'rank-atk',
  'rank-def',
  'rank-em',
  'rank-er',
  'rank-crit-rate',
  'rank-crit-dmg',
  'rank-base-attack',
] as const

const isValidView = (value: string | null): value is View => {
  return !!value && (VIEWS as readonly string[]).includes(value)
}

export const useViewOptions = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const viewParam = searchParams.get(VIEW_URL_KEY)
  const view: View = isValidView(viewParam) ? viewParam : 'default'

  const getTierLabel = (label: string) => `${t('game.label.tierList')}: ${label}`
  const getRankLabel = (label: string) => `${t('game.label.ranking')}: ${label}`

  const tierIcon = <TierScore value={5} noLabel />
  const rankIcon = <ArrowDownWideNarrow aria-hidden className="h-xs-9 w-xs-9" />

  const viewOptions: ViewOption[] = [
    {
      value: 'default',
      label: `${t('general.label.listing')} (${t('general.label.default')})`,
      icon: <Grip aria-hidden className="h-xs-8 w-xs-8" />,
    },
    { value: 'tier-favorite', label: getTierLabel(t('general.label.favorite')), icon: <LikeScore value={5} noLabel /> },
    { value: 'tier-main-dps', label: getTierLabel(t('game.label.mainDps')), icon: tierIcon },
    { value: 'tier-sub-dps', label: getTierLabel(t('game.label.subDps')), icon: tierIcon },
    { value: 'tier-support', label: getTierLabel(t('game.label.support')), icon: tierIcon },
    { value: 'tier-exploration', label: getTierLabel(t('game.label.exploration')), icon: tierIcon },
    { value: 'tier-outfit', label: getTierLabel(t('game.label.outfit')), icon: tierIcon },
    { value: 'tier-personality', label: getTierLabel(t('game.label.personality')), icon: tierIcon },
    { value: 'rank-level', label: getRankLabel(t('game.label.level')), icon: rankIcon },
    { value: 'rank-hp', label: getRankLabel(t('game.stats.hp')), icon: rankIcon },
    { value: 'rank-atk', label: getRankLabel(t('game.stats.atk')), icon: rankIcon },
    { value: 'rank-def', label: getRankLabel(t('game.stats.def')), icon: rankIcon },
    { value: 'rank-em', label: getRankLabel(t('game.stats.em')), icon: rankIcon },
    { value: 'rank-er', label: getRankLabel(t('game.stats.er')), icon: rankIcon },
    { value: 'rank-crit-rate', label: getRankLabel(t('game.stats.critRate')), icon: rankIcon },
    { value: 'rank-crit-dmg', label: getRankLabel(t('game.stats.critDmg')), icon: rankIcon },
    { value: 'rank-base-attack', label: getRankLabel(t('game.stats.baseAttackLv10')), icon: rankIcon },
  ]

  const viewLabel = viewOptions.find((option) => option.value === view)?.label

  const handleViewChange = (view: View) => {
    setSearchParams((params) => {
      params.set(VIEW_URL_KEY, view)
      return params
    })
  }

  return { view, viewOptions, viewLabel, handleViewChange }
}
