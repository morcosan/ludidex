import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { TIER_LIST_LABELS, type TierListValue } from '../../data'
import { useUserDataStore } from '../../state/use-user-data'
import { TierListField } from '../tier-list-field/tier-list-field'
import { CardSection, type SectionItem } from './card-section'

interface TierListRow {
  name: string
  label: string
}

interface TierListsSectionProps<T extends FieldValues> {
  editing: boolean
  control: Control<T>
  rows: TierListRow[]
}

export const TierListsSection = <T extends FieldValues>(props: TierListsSectionProps<T>) => {
  const { editing, control, rows } = props
  const { t } = useTranslation()
  const userPrefs = useUserDataStore((state) => state.userData?.preferences)
  const tierListLabels = { ...TIER_LIST_LABELS, ...userPrefs?.tierListLabels }

  return (
    <CardSection
      title={t('game.label.tierLists')}
      items={rows.map(({ name, label }): SectionItem => {
        return {
          key: name,
          label,
          value: (
            <Controller
              control={control}
              name={`tierLists.${name}` as FieldPath<T>}
              render={({ field: tierField }) => (
                <TierListField
                  value={(tierField.value as TierListValue | null) ?? undefined}
                  labels={tierListLabels}
                  readonly={!editing}
                  iconPos="right"
                  className="w-md-6"
                  onChange={(value) => tierField.onChange(value ?? null)}
                />
              )}
            />
          ),
        }
      })}
    />
  )
}
