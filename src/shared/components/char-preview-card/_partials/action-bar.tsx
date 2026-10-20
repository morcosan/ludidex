import { Button } from '@design-system'
import { useTranslation } from 'react-i18next'

interface Props {
  editing: boolean
  onSave: () => void
  onCancel: () => void
  onEdit: () => void
}

export const ActionBar = ({ editing, onSave, onCancel, onEdit }: Props) => {
  const { t } = useTranslation()

  return (
    <div
      className={cx(
        'mt-xs-4 px-xs-8 pb-xs-6 pt-xs-7 mt-auto flex justify-between',
        editing && 'border-color-border-subtle bg-color-white-alpha-14 sticky bottom-0 z-10 border-t',
        editing && 'pb-xs-7 translate-y-xs-0',
      )}
    >
      {editing ? (
        <>
          <Button variant="primary" size="xs" className="min-w-md-0" onClick={onSave}>
            {t('general.action.save')}
          </Button>
          <Button variant="default" size="xs" onClick={onCancel}>
            {t('general.action.cancel')}
          </Button>
        </>
      ) : (
        <Button variant="secondary" size="xs" className="min-w-sm-9" onClick={onEdit}>
          {t('general.action.edit')}
        </Button>
      )}
    </div>
  )
}
