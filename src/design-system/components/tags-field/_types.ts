import { type CSSProperties } from 'react'

export type TagsFieldSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface TagsFieldProps extends ReactProps {
  id: string
  value: string[]
  options: string[]
  size?: TagsFieldSize
  disabled?: boolean
  className?: string
  getTagStyle?: (value: string) => CSSProperties | undefined
  onChange?: (value: string[]) => void
}
