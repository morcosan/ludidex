import { IconButton } from '@design-system'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CheckCheckIcon, Undo2Icon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface ActionsProps {
  editing: boolean
  hasChanges?: boolean
  onDiscard?: () => void
  onClose?: () => void
  onSave?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export const CardActions = ({ editing, onDiscard, onClose, onSave, onEdit, onDelete }: ActionsProps) => {
  const { t } = useTranslation()

  return (
    <>
      {/* CLOSE / DISCARD BUTTON */}
      <IconButton
        tooltip={editing ? t('ds.action.discardChanges') : t('ds.action.close')}
        size="lg"
        floating
        className="-top-xs-5 -right-xs-5 absolute! z-20"
        onClick={editing ? onDiscard : onClose}
      >
        {editing ? (
          <Undo2Icon aria-hidden className="h-xs-9 w-xs-9" />
        ) : (
          <FontAwesomeIcon icon={faXmark} aria-hidden className="text-size-md" />
        )}
      </IconButton>

      {/* EDIT / SAVE BUTTON */}
      <IconButton
        tooltip={editing ? t('ds.action.saveChanges') : t('ds.action.edit')}
        variant={editing ? 'primary' : 'default'}
        size="lg"
        floating
        className="top-sm-4 -right-xs-5 absolute! z-20"
        onClick={editing ? onSave : onEdit}
      >
        {editing ? (
          <CheckCheckIcon aria-hidden className="size-sm-0 p-px" />
        ) : (
          <FontAwesomeIcon icon={faPenToSquare} aria-hidden className="text-size-md mb-px ml-px" />
        )}
      </IconButton>

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
