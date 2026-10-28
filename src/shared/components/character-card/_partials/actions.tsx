import { IconButton } from '@design-system'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CheckCheckIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface ActionsProps {
  isEditing: boolean
  hasChanges: boolean
  onDiscard: () => void
  onClose: () => void
  onSave: () => void
  onEdit: () => void
}

export const Actions = ({ isEditing, hasChanges, onDiscard, onClose, onSave, onEdit }: ActionsProps) => {
  const { t } = useTranslation()

  return (
    <>
      {isEditing && hasChanges ? (
        <IconButton
          size="md"
          variant="caution"
          tooltip={t('general.action.discardChanges')}
          className="-top-xs-5 -right-xs-6 absolute! z-20"
          floating
          onClick={onDiscard}
        >
          <FontAwesomeIcon icon={faTrashCan} aria-hidden className="text-size-md text-color-button-caution-text" />
        </IconButton>
      ) : (
        <IconButton
          size="md"
          variant="default"
          tooltip={t('ds.action.close')}
          className="-top-xs-5 -right-xs-6 absolute! z-20"
          floating
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faXmark} aria-hidden className="text-size-md mt-xs-0" />
        </IconButton>
      )}

      {isEditing ? (
        <IconButton
          size="md"
          variant="primary"
          tooltip={t('general.action.saveChanges')}
          className="top-sm-5 -right-xs-6 absolute! z-20"
          floating
          onClick={onSave}
        >
          <CheckCheckIcon aria-hidden className="h-sm-0 w-sm-0" />
        </IconButton>
      ) : (
        <IconButton
          size="md"
          variant="default"
          tooltip={t('general.action.edit')}
          className="top-sm-5 -right-xs-6 absolute! z-20"
          floating
          onClick={onEdit}
        >
          <FontAwesomeIcon icon={faPenToSquare} aria-hidden className="text-size-md" />
        </IconButton>
      )}
    </>
  )
}
