import { RatingField, TierListField } from '@app-shared/components'
import {
  RATING_LABELS,
  RATING_VALUES,
  TIER_LIST_LABELS,
  TIER_LIST_VALUES,
  type TierListValue,
} from '@app-shared/data/settings'
import { useUserDataStore } from '@app-shared/state/use-user-data'
import { Button, Modal, TextField } from '@design-system'
import { type ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

type LabelsModalVariant = 'rating' | 'tier-list'
type LabelValues = Record<string, string | undefined>

interface ModalConfig {
  title: string
  keys: string[]
  defaultLabels: Record<string, string>
  labels?: LabelValues
  renderLabel: (key: string) => ReactNode
  setLabels: (labels: LabelValues) => void
}

interface LabelsModalProps {
  opened: boolean
  variant: LabelsModalVariant
  onClose: () => void
}

export const LabelsModal = (props: LabelsModalProps) => {
  const { opened, variant, onClose } = props
  const { t } = useTranslation()
  const ratingLabels = useUserDataStore((state) => state.userData?.preferences?.ratingLabels)
  const tierListLabels = useUserDataStore((state) => state.userData?.preferences?.tierListLabels)
  const setRatingLabels = useUserDataStore((state) => state.setRatingLabels)
  const setTierListLabels = useUserDataStore((state) => state.setTierListLabels)
  const [draft, setDraft] = useState<LabelValues>({})

  const variantConfig: ModalConfig =
    variant === 'rating'
      ? {
          title: t('general.label.ratingLabels'),
          keys: RATING_VALUES.map(String),
          defaultLabels: RATING_LABELS,
          labels: ratingLabels,
          setLabels: setRatingLabels,
          renderLabel: (key: string) => (
            <RatingField
              value={RATING_VALUES.find((value) => String(value) === key)}
              labels={RATING_LABELS}
              readonly
            />
          ),
        }
      : {
          title: t('general.label.tierListLabels'),
          keys: TIER_LIST_VALUES,
          defaultLabels: TIER_LIST_LABELS,
          labels: tierListLabels,
          setLabels: setTierListLabels,
          renderLabel: (key: string) => {
            const value = key as TierListValue
            return <TierListField value={value} labels={TIER_LIST_LABELS} readonly />
          },
        }

  const { title, keys, defaultLabels, labels, renderLabel, setLabels } = variantConfig

  const handleClickSave = () => {
    const overrides: Record<string, string> = {}
    for (const key of keys) {
      const label = draft[key]
      if (label && label !== defaultLabels[key]) overrides[key] = label
    }
    setLabels(overrides)
    onClose()
  }

  useEffect(() => {
    if (opened) setDraft({ ...labels })
  }, [labels, opened])

  return (
    <Modal
      opened={opened}
      title={title}
      width="xs"
      actions={
        <Button variant="primary" onClick={handleClickSave}>
          {t('general.action.save')}
        </Button>
      }
      onClose={onClose}
    >
      <div className="gap-y-xs-3 flex flex-col">
        {keys.map((key) => (
          <div key={key} className="gap-x-xs-3 flex items-center">
            <span className="text-size-sm flex-1">{renderLabel(key)}</span>

            <TextField
              id={`label-${key}`}
              value={draft[key] ?? ''}
              ariaLabel={`${title} ${key}`}
              className="w-lg-2"
              onChange={(value) => setDraft((current) => ({ ...current, [key]: value }))}
            />
          </div>
        ))}
      </div>
    </Modal>
  )
}
