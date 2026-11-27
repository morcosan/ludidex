import { type CSSProperties, type Ref } from 'react'

export type TagsFieldSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface TagsFieldProps extends ReactProps {
  /**
   * Props
   */
  id: string
  value: string[]
  options: string[]
  size?: TagsFieldSize
  disabled?: boolean
  tagStyleFn?: (value: string) => CSSProperties | undefined
  className?: string

  /**
   * Events
   */
  onChange?: (value: string[]) => void

  /**
   * Reference
   */
  /**
   * Reference object with imperative methods
   * @param setValue(value:string[]):void - Sets the current value
   * @param getValue():string[]           - Returns the current value
   * @param focus():void                  - Triggers focus on the `<input>` element
   * @param blur():void                   - Triggers blur on the `<input>` element
   */
  ref?: Ref<TagsFieldHandle>
}

export interface TagsFieldHandle extends HTMLDivElement {
  setValue(value: string[]): void
  getValue(): string[]
  focus(): void
  blur(): void
}
