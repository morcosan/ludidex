import { IconButton } from '@design-system'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CheckCheckIcon, Undo2Icon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface ActionsProps {
  editing: boolean
  hasChanges: boolean
  onDiscard: () => void
  onClose: () => void
  onSave: () => void
  onEdit: () => void
  onDelete?: () => void
}

export const CardActions = ({ editing, onDiscard, onClose, onSave, onEdit, onDelete }: ActionsProps) => {
  const { t } = useTranslation()

  return (
    <>
      {editing ? (
        <IconButton
          tooltip={t('general.action.discardChanges')}
          size="md"
          floating
          className="-top-xs-5 -right-xs-5 absolute! z-20"
          onClick={onDiscard}
        >
          <Undo2Icon aria-hidden className="h-xs-9 w-xs-9" />
        </IconButton>
      ) : (
        <IconButton
          tooltip={t('ds.action.close')}
          size="md"
          floating
          className="-top-xs-5 -right-xs-5 absolute! z-20"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faXmark} aria-hidden className="text-size-md" />
        </IconButton>
      )}

      {editing ? (
        <IconButton
          tooltip={t('general.action.saveChanges')}
          variant="primary"
          size="md"
          floating
          className="top-sm-4 -right-xs-5 absolute! z-20"
          onClick={onSave}
        >
          <CheckCheckIcon aria-hidden className="h-sm-0 w-sm-0" />
        </IconButton>
      ) : (
        <IconButton
          tooltip={t('general.action.edit')}
          size="md"
          floating
          className="top-sm-4 -right-xs-5 absolute! z-20"
          onClick={onEdit}
        >
          <FontAwesomeIcon icon={faPenToSquare} aria-hidden className="text-size-md" />
        </IconButton>
      )}

      {editing && onDelete && (
        <IconButton
          tooltip={t('general.action.deleteTeam')}
          variant="caution"
          size="md"
          floating
          className="bottom-sm-0 -right-xs-5 absolute! z-20"
          onClick={onDelete}
        >
          <FontAwesomeIcon icon={faTrashCan} aria-hidden className="text-size-md" />
        </IconButton>
      )}
    </>
  )
}
