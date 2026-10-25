import { FAVORITE_LABELS } from '@app-shared/data/settings'
import { useUserDataStore, type FavoriteLabels } from '@app-shared/state/use-user-data'
import { Button, Modal, TextField } from '@design-system'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const FAVORITE_LABEL_KEYS = Object.keys(FAVORITE_LABELS)
  .map(Number)
  .sort((a, b) => b - a)
  .map(String) as (keyof FavoriteLabels)[]

interface LabelsModalProps {
  opened: boolean
  onClose: () => void
}

export const LabelsModal = (props: LabelsModalProps) => {
  const { opened, onClose } = props
  const { t } = useTranslation()
  const favoriteLabels = useUserDataStore((state) => state.userData?.preferences?.favoriteLabels)
  const setFavoriteLabels = useUserDataStore((state) => state.setFavoriteLabels)
  const [draft, setDraft] = useState<Partial<FavoriteLabels>>({})

  useEffect(() => {
    if (opened) setDraft({ ...favoriteLabels })
  }, [favoriteLabels, opened])

  const handleClickSave = () => {
    const labels: Partial<FavoriteLabels> = {}
    for (const key of FAVORITE_LABEL_KEYS) {
      const label = draft[key]
      if (label && label !== FAVORITE_LABELS[key]) labels[key] = label
    }
    setFavoriteLabels(labels)
    onClose()
  }

  return (
    <Modal
      opened={opened}
      title={t('general.label.favoriteLabels')}
      width="xs"
      actions={
        <Button variant="primary" onClick={handleClickSave}>
          {t('general.action.save')}
        </Button>
      }
      onClose={onClose}
    >
      <div className="gap-y-xs-3 flex flex-col">
        {FAVORITE_LABEL_KEYS.map((key) => (
          <div key={key} className="gap-x-xs-3 flex items-center">
            <span className="text-size-sm flex-1">
              {key} / {FAVORITE_LABELS[key]}
            </span>

            <TextField
              id={`favorite-label-${key}`}
              value={draft[key] ?? ''}
              ariaLabel={`${t('general.label.favoriteLabels')} ${key}`}
              className="w-lg-2"
              onChange={(value) => setDraft((labels) => ({ ...labels, [key]: value }))}
            />
          </div>
        ))}
      </div>
    </Modal>
  )
}
