import { PageSection } from '@app-shared/components'
import { type CharacterLabel, type ItemSize } from '@app-shared/state/types'
import { type ViewOption } from '@app-shared/utils/use-view-options'
import { SelectField, type SelectOption } from '@design-system'
import { useTranslation } from 'react-i18next'
import { ViewListing } from '../../_shared/view-listing'
import { type CharacterViewType } from './config'

interface SideFiltersProps extends ReactProps {
  viewType: CharacterViewType
  viewOptions: readonly ViewOption<CharacterViewType>[]
  itemSize: ItemSize
  charLabelTop: CharacterLabel | null
  charLabelBottom: CharacterLabel | null
  onChangeView: (viewType: CharacterViewType) => void
  onChangeItemSize: (size: ItemSize) => void
  onChangeCharLabelTop: (label: CharacterLabel | null) => void
  onChangeCharLabelBottom: (label: CharacterLabel | null) => void
}

export const SidePanel = (props: SideFiltersProps) => {
  const {
    itemSize,
    charLabelTop,
    charLabelBottom,
    viewType,
    viewOptions,
    className,
    onChangeItemSize,
    onChangeCharLabelTop,
    onChangeCharLabelBottom,
    onChangeView,
  } = props
  const { t } = useTranslation()

  const itemSizeOptions: SelectOption<ItemSize>[] = [
    { value: 'sm', label: t('general.label.small') },
    { value: 'md', label: t('general.label.medium') },
    { value: 'lg', label: t('general.label.large') },
  ]

  const charLabelOptions: SelectOption<CharacterLabel | ''>[] = [
    { value: '', label: '--' },
    { value: 'rating', label: t('general.label.rating') },
    { value: 'status', label: t('general.label.status') },
    { value: 'level', label: t('game.label.level') },
    { value: 'hp', label: t('game.stats.hp') },
    { value: 'atk', label: t('game.stats.atk') },
    { value: 'def', label: t('game.stats.def') },
    { value: 'em', label: t('game.stats.em') },
    { value: 'er', label: t('game.stats.er') },
    { value: 'critRate', label: t('game.stats.critRate') },
    { value: 'critDmg', label: t('game.stats.critDmg') },
  ]

  const settingClass = cx('gap-xs-2 flex items-center justify-between')
  const fieldClass = cx('w-md-8')

  return (
    <div className={cx('px-xs-8 py-xs-4 gap-y-sm-5 flex flex-col', className)}>
      {/* VIEW TYPES */}
      <ViewListing viewType={viewType} viewOptions={viewOptions} onChangeView={onChangeView} />

      {/* VIEW SETTINGS */}
      <PageSection title={t('general.label.viewSettings')} className="pb-sm-9" classNames={{ body: 'gap-xs-3' }}>
        {/* LABEL TOP */}
        <div className={settingClass}>
          <span className="text-size-sm">{t('general.label.labelOnTop')}</span>
          <SelectField
            id="char-label-top"
            value={charLabelTop ?? ''}
            options={charLabelOptions}
            size="xs"
            clearable={Boolean(charLabelTop)}
            className={fieldClass}
            onChange={(value) => onChangeCharLabelTop(value ? (value as CharacterLabel) : null)}
          />
        </div>
        {/* LABEL BOTTOM */}
        <div className={settingClass}>
          <span className="text-size-sm">{t('general.label.labelOnBottom')}</span>
          <SelectField
            id="char-label-bottom"
            value={charLabelBottom ?? ''}
            options={charLabelOptions}
            size="xs"
            clearable={Boolean(charLabelBottom)}

            className={fieldClass}
            onChange={(value) => onChangeCharLabelBottom(value ? (value as CharacterLabel) : null)}
          />
        </div>
        {/* DISPLAY SIZE */}
        <div className={settingClass}>
          <span className="text-size-sm">{t('general.label.displaySize')}</span>
          <SelectField
            id="char-item-size"
            value={itemSize}
            options={itemSizeOptions}
            size="xs"
            className={fieldClass}
            onChange={(value) => value && onChangeItemSize(value as ItemSize)}
          />
        </div>
      </PageSection>
    </div>
  )
}
