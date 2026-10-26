import { RATING_LABELS } from '@app-shared/data/settings'
import { type RatingLabels } from '@app-shared/state/types'
import { useUserDataStore } from '@app-shared/state/use-user-data'
import { Button, Modal, TextField } from '@design-system'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const RATING_LABEL_KEYS = Object.keys(RATING_LABELS)
  .map(Number)
  .sort((a, b) => b - a)
  .map(String) as (keyof RatingLabels)[]

interface LabelsModalProps {
  opened: boolean
  onClose: () => void
}

export const LabelsModal = (props: LabelsModalProps) => {
  const { opened, onClose } = props
  const { t } = useTranslation()
  const ratingLabels = useUserDataStore((state) => state.userData?.preferences?.ratingLabels)
  const setRatingLabels = useUserDataStore((state) => state.setRatingLabels)
  const [draft, setDraft] = useState<Partial<RatingLabels>>({})

  useEffect(() => {
    if (opened) setDraft({ ...ratingLabels })
  }, [ratingLabels, opened])

  const handleClickSave = () => {
    const labels: Partial<RatingLabels> = {}
    for (const key of RATING_LABEL_KEYS) {
      const label = draft[key]
      if (label && label !== RATING_LABELS[key]) labels[key] = label
    }
    setRatingLabels(labels)
    onClose()
  }

  return (
    <Modal
      opened={opened}
      title={t('general.label.ratingLabels')}
      width="xs"
      actions={
        <Button variant="primary" onClick={handleClickSave}>
          {t('general.action.save')}
        </Button>
      }
      onClose={onClose}
    >
      <div className="gap-y-xs-3 flex flex-col">
        {RATING_LABEL_KEYS.map((key) => (
          <div key={key} className="gap-x-xs-3 flex items-center">
            <span className="text-size-sm flex-1">
              {key} / {RATING_LABELS[key]}
            </span>

            <TextField
              id={`rating-label-${key}`}
              value={draft[key] ?? ''}
              ariaLabel={`${t('general.label.ratingLabels')} ${key}`}
              className="w-lg-2"
              onChange={(value) => setDraft((labels) => ({ ...labels, [key]: value }))}
            />
          </div>
        ))}
      </div>
    </Modal>
  )
}
