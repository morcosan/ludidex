import { RatingField, TierListField } from '@app-shared/components'
import { ArrowDownWideNarrowIcon, BadgeCheckIcon, GripIcon } from 'lucide-react'
import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'

export interface ViewOption {
  value: ViewType
  label: string
  icon: ReactNode
}

export type ViewType = (typeof VIEW_TYPES)[number]

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

const isValidView = (value: string | null): value is ViewType => {
  return !!value && (VIEW_TYPES as readonly string[]).includes(value)
}

export const useViewOptions = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const viewParam = searchParams.get(VIEW_URL_KEY)
  const viewType: ViewType = isValidView(viewParam) ? viewParam : 'default'

  const getTierLabel = (label: string) => `${t('game.label.tierList')}: ${label}`
  const getSortLabel = (label: string) => `${t('general.label.sorting')}: ${label}`

  const tierIcon = <TierListField value={5} readonly noLabel />
  const sortIcon = <ArrowDownWideNarrowIcon aria-hidden className="h-xs-9 w-xs-9" />

  const viewOptions: ViewOption[] = [
    {
      value: 'default',
      label: `${t('general.label.listing')} (${t('general.label.default')})`,
      icon: <GripIcon aria-hidden className="h-xs-8 w-xs-8" />,
    },
    {
      value: 'rating',
      label: t('general.label.rating'),
      icon: <RatingField value={5} readonly />,
    },
    {
      value: 'status',
      label: t('general.label.status'),
      icon: <BadgeCheckIcon strokeWidth={2} className="w-xs-9 text-color-green-9" />,
    },
    { value: 'tier-main-dps', label: getTierLabel(t('game.label.mainDps')), icon: tierIcon },
    { value: 'tier-sub-dps', label: getTierLabel(t('game.label.subDps')), icon: tierIcon },
    { value: 'tier-support', label: getTierLabel(t('game.label.support')), icon: tierIcon },
    { value: 'tier-exploration', label: getTierLabel(t('game.label.exploration')), icon: tierIcon },
    { value: 'tier-outfit', label: getTierLabel(t('game.label.outfit')), icon: tierIcon },
    { value: 'tier-personality', label: getTierLabel(t('game.label.personality')), icon: tierIcon },
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

  const viewLabel = viewOptions.find((option) => option.value === viewType)?.label

  const handleViewChange = (viewType: ViewType) => {
    setSearchParams((params) => {
      params.set(VIEW_URL_KEY, viewType)
      return params
    })
  }

  return { viewType, viewOptions, viewLabel, handleViewChange }
}
