import { Button } from '@design-system'
import { useWatch, type Control } from 'react-hook-form'
import { type Draft } from './tag-types'

interface TagsSaveButtonProps {
  control: Control<Draft>
  label: string
  onClick?: () => void
}

export const TagsSaveButton = (props: TagsSaveButtonProps) => {
  const { control, label, onClick } = props
  const tags = useWatch({ control, name: 'tags' })

  return (
    <Button variant={tags.some(({ name }) => name === '') ? 'danger' : 'primary'} onClick={onClick}>
      {label}
    </Button>
  )
}
