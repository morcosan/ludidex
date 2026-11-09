import { SelectField, type SelectOption } from '@design-system'
import { useTranslation } from 'react-i18next'
import { type CharacterLabel, type ItemSize, type UserSettings } from '../../state/types'
import { PageSection } from '../page-section/page-section'

export interface AppearanceSectionProps extends ReactProps {
  userSettings?: UserSettings | null
  onChange?: (userSettings: UserSettings) => void
}

export const AppearanceSection = (props: AppearanceSectionProps) => {
  const { userSettings, className, onChange } = props
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
    <PageSection title={t('general.label.appearance')} className={className} classNames={{ body: 'gap-xs-3' }}>
      <div className={settingClass}>
        <span className="text-size-sm">{t('general.label.labelOnTop')}</span>
        <SelectField
          id="char-label-top"
          value={userSettings?.charLabelTop ?? ''}
          options={charLabelOptions}
          size="xs"
          clearable={Boolean(userSettings?.charLabelTop)}
          className={fieldClass}
          onChange={(value) =>
            userSettings && onChange?.({ ...userSettings, charLabelTop: value ? (value as CharacterLabel) : null })
          }
        />
      </div>
      <div className={settingClass}>
        <span className="text-size-sm">{t('general.label.labelOnBottom')}</span>
        <SelectField
          id="char-label-bottom"
          value={userSettings?.charLabelBottom ?? ''}
          options={charLabelOptions}
          size="xs"
          clearable={Boolean(userSettings?.charLabelBottom)}
          className={fieldClass}
          onChange={(value) =>
            userSettings && onChange?.({ ...userSettings, charLabelBottom: value ? (value as CharacterLabel) : null })
          }
        />
      </div>
      <div className={settingClass}>
        <span className="text-size-sm">{t('general.label.itemSize')}</span>
        <SelectField
          id="char-item-size"
          value={userSettings?.charItemSize ?? 'md'}
          options={itemSizeOptions}
          size="xs"
          className={fieldClass}
          onChange={(value) =>
            value && userSettings && onChange?.({ ...userSettings, charItemSize: value as ItemSize })
          }
        />
      </div>
    </PageSection>
  )
}
