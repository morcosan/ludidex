import { TextField } from '@design-system'
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CardSection } from './card-section'

interface NotesControl extends FieldValues {
  notes: string
}

interface NotesSectionProps<T extends NotesControl> {
  editing: boolean
  control: Control<T>
  notes?: string
}

export const NotesSection = <T extends NotesControl>(props: NotesSectionProps<T>) => {
  const { editing, control, notes } = props
  const { t } = useTranslation()

  return (
    <CardSection title={t('game.label.notes')}>
      {editing ? (
        <Controller
          control={control}
          name={'notes' as FieldPath<T>}
          render={({ field }) => (
            <TextField
              id="card-notes"
              size="sm"
              value={field.value}
              multiline
              minRows={3}
              maxRows={8}
              className="w-full"
              onChange={field.onChange}
            />
          )}
        />
      ) : notes ? (
        <div className="px-card-px-sm py-card-py-sm shadow-inset-xs bg-color-black-alpha-1 rounded-sm">
          <p className="text-size-sm min-h-[3lh] whitespace-pre-wrap">{notes}</p>
        </div>
      ) : (
        <div className="text-size-sm whitespace-pre-wrap">{'--'}</div>
      )}
    </CardSection>
  )
}
