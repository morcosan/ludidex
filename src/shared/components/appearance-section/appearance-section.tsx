import { SelectField, type SelectOption } from '@design-system'
import { useTranslation } from 'react-i18next'
import { type CharacterLabel, type CharacterSorting, type ItemSize } from '../../state/types'
import { useUserSettingsStore } from '../../state/use-user-settings'
import { PageSection } from '../page-section/page-section'

export interface AppearanceSectionProps extends ReactProps {
  type: 'characters' | 'teams'
}

export const AppearanceSection = (props: AppearanceSectionProps) => {
  const { type, className } = props
  const { t } = useTranslation()
  const userSettings = useUserSettingsStore((state) => state.userSettings)
  const updateUserSettings = useUserSettingsStore((state) => state.updateUserSettings)

  const itemSizeOptions: SelectOption<ItemSize>[] = [
    { value: 'sm', label: t('general.label.small') },
    { value: 'md', label: t('general.label.medium') },
    { value: 'lg', label: t('general.label.large') },
  ]

  const charSortingOptions: SelectOption<CharacterSorting>[] = [
    { value: 'name', label: t('general.label.name') },
    { value: 'level', label: t('game.label.level') },
    { value: 'rating', label: t('general.label.rating') },
    { value: 'status', label: t('general.label.status') },
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

  const rowClass = cx('gap-xs-2 flex items-center justify-between')
  const charFieldClass = cx('w-md-8')
  const charFieldClassNames = { option: 'text-size-xs!' }

  return (
    <PageSection title={t('general.label.appearance')} className={className} classNames={{ body: 'gap-xs-3' }}>
      {type === 'characters' && (
        <>
          <div className={rowClass}>
            <span className="text-size-sm">{t('general.label.sorting')}</span>
            <SelectField
              id="char-sorting"
              value={userSettings.charSorting}
              options={charSortingOptions}
              size="xs"
              className={charFieldClass}
              classNames={charFieldClassNames}
              onChange={(value) => value && updateUserSettings({ charSorting: value as CharacterSorting })}
            />
          </div>
          <div className={rowClass}>
            <span className="text-size-sm">{t('general.label.labelOnTop')}</span>
            <SelectField
              id="char-label-top"
              value={userSettings.charLabelTop ?? ''}
              options={charLabelOptions}
              size="xs"
              clearable={Boolean(userSettings.charLabelTop)}
              className={charFieldClass}
              classNames={charFieldClassNames}
              onChange={(value) => updateUserSettings({ charLabelTop: value ? (value as CharacterLabel) : null })}
            />
          </div>
          <div className={rowClass}>
            <span className="text-size-sm">{t('general.label.labelOnBottom')}</span>
            <SelectField
              id="char-label-bottom"
              value={userSettings.charLabelBottom ?? ''}
              options={charLabelOptions}
              size="xs"
              clearable={Boolean(userSettings.charLabelBottom)}
              className={charFieldClass}
              classNames={charFieldClassNames}
              onChange={(value) => updateUserSettings({ charLabelBottom: value ? (value as CharacterLabel) : null })}
            />
          </div>
          <div className={rowClass}>
            <span className="text-size-sm">{t('general.label.itemSize')}</span>
            <SelectField
              id="item-size"
              value={userSettings.charItemSize}
              options={itemSizeOptions}
              size="xs"
              className={charFieldClass}
              classNames={charFieldClassNames}
              onChange={(value) => value && updateUserSettings({ charItemSize: value as ItemSize })}
            />
          </div>
        </>
      )}

      {type === 'teams' && (
        <>
          <div className={rowClass}>
            <span className="text-size-sm">{t('general.label.itemSize')}</span>
            <SelectField
              id="item-size"
              value={userSettings.teamItemSize}
              options={itemSizeOptions}
              size="xs"
              className="w-md-4"
              onChange={(value) => value && updateUserSettings({ teamItemSize: value as ItemSize })}
            />
          </div>
        </>
      )}
    </PageSection>
  )
}
