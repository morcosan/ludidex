import { ArrowDownWideNarrowIcon, GripIcon } from 'lucide-react'
import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'
import { RatingIcon } from '../components/rating-icon/rating-icon'
import { StatusIcon } from '../components/status-icon/status-icon'
import { TierListIcon } from '../components/tier-list-icon/tier-list-icon'

export const VIEW_URL_KEY = 'view'

export const VIEW_TYPES = [
  'default',
  'rating',
  'status',
  'tier-main-dps',
  'tier-sub-dps',
  'tier-support',
  'tier-exploration',
  'tier-outfit',
  'tier-personality',
  'sort-level',
  'sort-hp',
  'sort-atk',
  'sort-def',
  'sort-em',
  'sort-er',
  'sort-crit-rate',
  'sort-crit-dmg',
  'sort-base-attack',
] as const

export type ViewType = (typeof VIEW_TYPES)[number]

export interface ViewOption<T extends ViewType> {
  value: T
  label: string
  icon: ReactNode
}

interface ViewOptionDetails {
  label: string
  icon: ReactNode
}

export const useViewOptions = <T extends ViewType>(viewTypes: readonly T[], defaultView: T) => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const viewParam = searchParams.get(VIEW_URL_KEY)

  const getTierLabel = (label: string) => `${t('game.label.tierList')}: ${label}`
  const getSortLabel = (label: string) => `${t('general.label.sorting')}: ${label}`

  const tierIcon = <TierListIcon value="S" />
  const sortIcon = <ArrowDownWideNarrowIcon aria-hidden className="h-xs-9 w-xs-9" />

  const viewOptionDetails: Record<ViewType, ViewOptionDetails> = {
    default: {
      label: `${t('general.label.listing')} (${t('general.label.default')})`,
      icon: <GripIcon aria-hidden className="h-xs-8 w-xs-8" />,
    },
    rating: { label: t('general.label.rating'), icon: <RatingIcon value={10} /> },
    status: { label: t('general.label.status'), icon: <StatusIcon value="main" /> },
    'tier-main-dps': { label: getTierLabel(t('game.label.mainDps')), icon: tierIcon },
    'tier-sub-dps': { label: getTierLabel(t('game.label.subDps')), icon: tierIcon },
    'tier-support': { label: getTierLabel(t('game.label.support')), icon: tierIcon },
    'tier-exploration': { label: getTierLabel(t('game.label.exploration')), icon: tierIcon },
    'tier-outfit': { label: getTierLabel(t('game.label.outfit')), icon: tierIcon },
    'tier-personality': { label: getTierLabel(t('game.label.personality')), icon: tierIcon },
    'sort-level': { label: getSortLabel(t('game.label.level')), icon: sortIcon },
    'sort-hp': { label: getSortLabel(t('game.stats.hp')), icon: sortIcon },
    'sort-atk': { label: getSortLabel(t('game.stats.atk')), icon: sortIcon },
    'sort-def': { label: getSortLabel(t('game.stats.def')), icon: sortIcon },
    'sort-em': { label: getSortLabel(t('game.stats.em')), icon: sortIcon },
    'sort-er': { label: getSortLabel(t('game.stats.er')), icon: sortIcon },
    'sort-crit-rate': { label: getSortLabel(t('game.stats.critRate')), icon: sortIcon },
    'sort-crit-dmg': { label: getSortLabel(t('game.stats.critDmg')), icon: sortIcon },
    'sort-base-attack': { label: getSortLabel(t('game.stats.baseAttackLv10')), icon: sortIcon },
  }

  const viewOptions = viewTypes.map((value): ViewOption<T> => {
    const details = viewOptionDetails[value]
    return { value, label: details.label, icon: details.icon }
  })

  const isValidView = (value: string | null): value is T => {
    return !!value && viewTypes.some((viewType) => viewType === value)
  }

  const viewType = isValidView(viewParam) ? viewParam : defaultView
  const viewLabel = viewOptions.find((option) => option.value === viewType)?.label

  const handleViewChange = (newViewType: T) => {
    setSearchParams((params) => {
      params.set(VIEW_URL_KEY, newViewType)
      return params
    })
  }

  return { viewType, viewOptions, viewLabel, handleViewChange }
}
