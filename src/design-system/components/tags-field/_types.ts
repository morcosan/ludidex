import { type TagColor } from '../tag/tag'

export type TagsFieldSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface TagsFieldProps extends ReactProps {
  id: string
  value?: string[]
  options?: string[]
  size?: TagsFieldSize
  colors?: Record<string, TagColor>
  disabled?: boolean
  className?: string
  parseTag?: (value: string) => string
  onChange?: (value: string[]) => void
}
