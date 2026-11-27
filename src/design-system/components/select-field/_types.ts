import { type ComboboxItem } from '@mantine/core'
import { type CSSProperties, type ReactNode, type Ref } from 'react'

export type SelectOption<T extends string = string> = ComboboxItem<T>
export type SelectValue = string | null
export type SelectFieldSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface SelectFieldProps extends ReactProps {
  /**
   * Props
   */
  /** Unique id attribute for the `input` element */
  id: string
  value: SelectValue
  options: SelectOption[]
  optionFn?: (option: SelectOption) => ReactNode
  /** Property that determines the height and padding for the field */
  size?: SelectFieldSize
  placeholder?: string
  clearable?: boolean
  disabled?: boolean
  ariaDescription?: string
  ariaDescribedBy?: string
  prefix?: ReactNode
  /** CSS style attribute for the wrapper element */
  className?: string
  classNames?: {
    option?: string
  }
  /** CSS class attribute for dropdown options */
  style?: CSSProperties

  /**
   * Events
   */
  onChange?: (value: string | null) => void

  /**
   * Reference
   */
  /**
   * Reference object with imperative methods
   * @param setValue(value:SelectValue):void  - Sets the current value
   * @param getValue():SelectValue            - Returns the current value
   * @param focus():void                      - Triggers focus on the `<input>`
   * @param blur():void                       - Triggers blur on the `<input>`
   */
  ref?: Ref<SelectFieldHandle>
}

export interface SelectFieldHandle extends HTMLDivElement {
  setValue(value: SelectValue): void
  getValue(): SelectValue
  focus(): void
  blur(): void
}
