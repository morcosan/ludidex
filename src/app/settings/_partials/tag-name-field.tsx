import { TextField } from '@design-system'
import { useController, useWatch, type Control } from 'react-hook-form'
import { type Draft } from './tag-types'

interface TagNameFieldProps {
  control: Control<Draft>
  index: number
  onBlur: () => void
}

export const TagNameField = (props: TagNameFieldProps) => {
  const { control, index, onBlur } = props
  const { field } = useController({ control, name: `tags.${index}.name` })
  const invalid = useWatch({ control, name: `tags.${index}.invalid` })

  return (
    <TextField
      id={`tag-name-${index}`}
      value={field.value}
      size="xs"
      invalid={invalid}
      ariaDescribedBy={`tag-${index}`}
      onBlur={() => {
        field.onBlur()
        onBlur()
      }}
      onChange={field.onChange}
    />
  )
}
