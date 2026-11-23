import { TextField, type TextFieldHandle } from '@design-system'
import { useCallback } from 'react'
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
  const setFieldRef = useCallback((handle: TextFieldHandle | null) => field.ref(handle), [field])

  return (
    <TextField
      id={`tag-name-${index}`}
      value={field.value}
      size="xs"
      invalid={invalid}
      ariaDescribedBy={`tag-${index}`}
      ref={setFieldRef}
      onBlur={() => {
        field.onBlur()
        onBlur()
      }}
      onChange={field.onChange}
    />
  )
}
