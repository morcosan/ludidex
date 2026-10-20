import { LikeScore } from '@app-shared/components/like-score/like-score'
import { TierScore } from '@app-shared/components/tier-score/tier-score'
import { type DisplaySize } from '@app-shared/state/use-user-config'
import { Button, SelectField, type SelectOption } from '@design-system'
import { LayoutGrid } from 'lucide-react'
import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

export type ViewMode =
  | 'default'
  | 'tier-like-score'
  | 'tier-main-dps'
  | 'tier-sub-dps'
  | 'tier-support'
  | 'tier-exploration'
  | 'tier-outfit'

interface SideFiltersProps {
  displaySize: DisplaySize
  onDisplaySizeChange: (size: DisplaySize) => void
  viewMode: ViewMode
  onViewModeChange: (viewMode: ViewMode) => void
}

export const SideFilters = (props: SideFiltersProps) => {
  const { displaySize, onDisplaySizeChange, viewMode, onViewModeChange } = props
  const { t } = useTranslation()

  const sectionClass = cx('text-size-xs pb-xs-3 text-color-text-placeholder tracking-wider uppercase')

  const tierListLabel = (label: string) => `${t('game.label.tierList')}: ${label}`

  const viewModeOptions: { value: ViewMode; label: string; icon: ReactNode }[] = [
    {
      value: 'default',
      label: `${t('general.label.listing')} (${t('general.label.default')})`,
      icon: <LayoutGrid aria-hidden className="h-sm-0 w-sm-0" />,
    },
    {
      value: 'tier-like-score',
      label: tierListLabel(t('general.label.favorite')),
      icon: <LikeScore value={4} noLabel />,
    },
    {
      value: 'tier-main-dps',
      label: tierListLabel(t('game.label.mainDps')),
      icon: <TierScore value="S" noLabel />,
    },
    {
      value: 'tier-sub-dps',
      label: tierListLabel(t('game.label.subDps')),
      icon: <TierScore value="S" noLabel />,
    },
    {
      value: 'tier-support',
      label: tierListLabel(t('game.label.support')),
      icon: <TierScore value="S" noLabel />,
    },
    {
      value: 'tier-exploration',
      label: tierListLabel(t('game.label.exploration')),
      icon: <TierScore value="S" noLabel />,
    },
    {
      value: 'tier-outfit',
      label: tierListLabel(t('game.label.outfitDesign')),
      icon: <TierScore value="S" noLabel />,
    },
  ]

  const displaySizeOptions: SelectOption[] = [
    { value: 'small', label: t('general.label.small') },
    { value: 'medium', label: t('general.label.medium') },
    { value: 'large', label: t('general.label.large') },
  ]

  return (
    <div className="px-xs-8 py-xs-4 gap-y-sm-5 flex h-full flex-col overflow-y-auto">
      {/* VIEW MODE */}
      <div className="flex flex-col">
        <div className={sectionClass}>{t('general.label.viewMode')}</div>

        <div className="gap-xs-0 flex flex-col">
          {viewModeOptions.map(({ value, label, icon }) => (
            <Button
              key={value}
              variant="menu-default"
              size="lg"
              state={viewMode === value ? 'selected' : 'active'}
              className="w-full"
              onClick={() => onViewModeChange(value)}
            >
              <span className="gap-xs-2 flex items-center">
                {icon}
                {label}
              </span>
            </Button>
          ))}
        </div>
      </div>

      {/* VIEW OPTIONS */}
      <div className="divide-color-border-subtle flex flex-col divide-y">
        <div className={sectionClass}>{t('general.label.viewOptions')}</div>

        <div className="gap-xs-2 py-xs-3 flex items-center justify-between">
          <span className="text-size-sm">{t('general.label.displaySize')}</span>

          <SelectField
            id="characters-display-size"
            size="sm"
            value={displaySize}
            options={displaySizeOptions}
            className="w-md-4"
            onChange={(value) => value && onDisplaySizeChange(value as DisplaySize)}
          />
        </div>
      </div>
    </div>
  )
}
