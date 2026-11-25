import { ArrowDownWideNarrowIcon, GripIcon, SwordsIcon } from 'lucide-react'
import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'
import { RatingIcon } from '../components/rating-icon/rating-icon'
import { StatusIcon } from '../components/status-icon/status-icon'
import { TierListIcon } from '../components/tier-list-icon/tier-list-icon'
import { GENSHIN_DOMAINS, GENSHIN_DOMAIN_IDS } from '../data'

export const VIEW_URL_KEY = 'view'
export const TAB_URL_KEY = 'tab'

export const VIEW_TYPES = [
  'default',
  'rating',
  'status',
  'tier-main-dps',
  'tier-sub-dps',
  'tier-support',
  'tier-exploration',
  'tier-story',
  'tier-personality',
  'tier-synergy',
  'tier-aesthetic',
  'tier-affinity',
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

export type DomainViewType = (typeof GENSHIN_DOMAIN_IDS)[number]
export type ViewType = (typeof VIEW_TYPES)[number] | DomainViewType

export interface ViewOption<T extends ViewType> {
  value: T
  label: string
  icon: ReactNode
}

interface UseViewOptionsProps<T extends ViewType> {
  viewTypes: readonly T[]
  defaultView: T
}

export const useViewOptions = <T extends ViewType>(props: UseViewOptionsProps<T>) => {
  const { viewTypes, defaultView } = props
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const viewParam = searchParams.get(VIEW_URL_KEY)
  const tabParam = searchParams.get(TAB_URL_KEY)

  const getTierLabel = (label: string) => `${t('game.label.tierList')}: ${label}`
  const getSortLabel = (label: string) => `${t('general.label.sorting')}: ${label}`

  const tierIcon = <TierListIcon value="S" />
  const sortIcon = <ArrowDownWideNarrowIcon strokeWidth={1.5} aria-hidden className="h-xs-9 w-xs-9" />

  const baseViewOptions: ViewOption<ViewType>[] = [
    {
      value: 'default',
      label: `${t('general.label.listing')} (${t('general.label.default')})`,
      icon: <GripIcon aria-hidden className="h-xs-8 w-xs-8" />,
    },
    { value: 'rating', label: t('general.label.rating'), icon: <RatingIcon value={10} /> },
    { value: 'status', label: t('general.label.status'), icon: <StatusIcon value="main" /> },
    { value: 'tier-main-dps', label: getTierLabel(t('game.label.mainDps')), icon: tierIcon },
    { value: 'tier-sub-dps', label: getTierLabel(t('game.label.subDps')), icon: tierIcon },
    { value: 'tier-support', label: getTierLabel(t('game.label.support')), icon: tierIcon },
    { value: 'tier-exploration', label: getTierLabel(t('game.label.exploration')), icon: tierIcon },
    { value: 'tier-synergy', label: getTierLabel(t('game.label.synergy')), icon: tierIcon },
    { value: 'tier-story', label: getTierLabel(t('game.label.story')), icon: tierIcon },
    { value: 'tier-aesthetic', label: getTierLabel(t('game.label.aesthetic')), icon: tierIcon },
    { value: 'tier-personality', label: getTierLabel(t('game.label.personality')), icon: tierIcon },
    { value: 'tier-affinity', label: getTierLabel(t('game.label.affinity')), icon: tierIcon },
    { value: 'sort-level', label: getSortLabel(t('game.label.level')), icon: sortIcon },
    { value: 'sort-hp', label: getSortLabel(t('game.stats.hp')), icon: sortIcon },
    { value: 'sort-atk', label: getSortLabel(t('game.stats.atk')), icon: sortIcon },
    { value: 'sort-def', label: getSortLabel(t('game.stats.def')), icon: sortIcon },
    { value: 'sort-em', label: getSortLabel(t('game.stats.em')), icon: sortIcon },
    { value: 'sort-er', label: getSortLabel(t('game.stats.er')), icon: sortIcon },
    { value: 'sort-crit-rate', label: getSortLabel(t('game.stats.critRate')), icon: sortIcon },
    { value: 'sort-crit-dmg', label: getSortLabel(t('game.stats.critDmg')), icon: sortIcon },
    { value: 'sort-base-attack', label: getSortLabel(t('game.stats.baseAttackLv10')), icon: sortIcon },
  ]

  const domainViewOptions: ViewOption<DomainViewType>[] = GENSHIN_DOMAINS.map(({ id, name }) => ({
    value: id,
    label: `Domain: ${name}`,
    icon: <SwordsIcon strokeWidth={1.5} aria-hidden className="h-xs-8 w-xs-8" />,
  }))

  const allViewOptions: ViewOption<ViewType>[] = [...baseViewOptions, ...domainViewOptions]

  const viewOptions = viewTypes.map((value): ViewOption<T> => {
    const option = allViewOptions.find((other) => other.value === value)
    return { value, label: option?.label || '', icon: option?.icon }
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

  const handleTabChange = (newTab: string) => {
    setSearchParams((params) => {
      params.set(TAB_URL_KEY, newTab)
      return params
    })
  }

  return { viewType, tabParam, viewOptions, viewLabel, handleViewChange, handleTabChange }
}
