import { LikeScore } from '@app-shared/components/like-score/like-score'
import { TierScore } from '@app-shared/components/tier-score/tier-score'
import { LayoutGrid } from 'lucide-react'
import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'

export interface ListViewOption {
  value: ListView
  label: string
  icon: ReactNode
}

export type ListView = (typeof LIST_VIEW)[number]

export const LIST_VIEW_URL_KEY = 'view'

export const LIST_VIEW = [
  'default',
  'tier-favorite',
  'tier-main-dps',
  'tier-sub-dps',
  'tier-support',
  'tier-exploration',
  'tier-outfit',
  'tier-personality',
] as const

const isListView = (value: string | null): value is ListView => {
  return !!value && (LIST_VIEW as readonly string[]).includes(value)
}

export const useListView = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const viewParam = searchParams.get(LIST_VIEW_URL_KEY)
  const listView: ListView = isListView(viewParam) ? viewParam : 'default'

  const tierListLabel = (label: string) => `${t('game.label.tierList')}: ${label}`

  const listViewOptions: ListViewOption[] = [
    {
      value: 'default',
      label: `${t('general.label.listing')} (${t('general.label.default')})`,
      icon: <LayoutGrid aria-hidden className="h-sm-0 w-sm-0" />,
    },
    {
      value: 'tier-favorite',
      label: tierListLabel(t('general.label.favorite')),
      icon: <LikeScore value={5} noLabel />,
    },
    {
      value: 'tier-main-dps',
      label: tierListLabel(t('game.label.mainDps')),
      icon: <TierScore value={5} noLabel />,
    },
    {
      value: 'tier-sub-dps',
      label: tierListLabel(t('game.label.subDps')),
      icon: <TierScore value={5} noLabel />,
    },
    {
      value: 'tier-support',
      label: tierListLabel(t('game.label.support')),
      icon: <TierScore value={5} noLabel />,
    },
    {
      value: 'tier-exploration',
      label: tierListLabel(t('game.label.exploration')),
      icon: <TierScore value={5} noLabel />,
    },
    {
      value: 'tier-outfit',
      label: tierListLabel(t('game.label.outfit')),
      icon: <TierScore value={5} noLabel />,
    },
    {
      value: 'tier-personality',
      label: tierListLabel(t('game.label.personality')),
      icon: <TierScore value={5} noLabel />,
    },
  ]

  const listViewLabel = listViewOptions.find((option) => option.value === listView)?.label

  const handleListViewChange = (viewType: ListView) => {
    setSearchParams((params) => {
      params.set(LIST_VIEW_URL_KEY, viewType)
      return params
    })
  }

  return { listViewOptions, listViewLabel, listView, handleListViewChange }
}
