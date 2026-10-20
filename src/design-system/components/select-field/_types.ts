import { type ComboboxItem } from '@mantine/core'
import { type CSSProperties } from 'react'

export type SelectOption = ComboboxItem
export type SelectValue = string | null
export type SelectFieldSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface SelectFieldProps extends ReactProps<HTMLInputElement> {
  /**
   * Props
   */
  /** Unique id attribute for the `input` element */
  id: string
  value: SelectValue
  options: SelectOption[]
  /** Property that determines the height and padding for the field */
  size?: SelectFieldSize
  placeholder?: string
  clearable?: boolean
  disabled?: boolean
  ariaDescription?: string
  ariaDescribedBy?: string
  /** CSS class attribute for the wrapper element */
  className?: string
  /** CSS style attribute for the wrapper element */
  style?: CSSProperties

  /**
   * Events
   */
  onChange?: (value: string | null) => void
}
