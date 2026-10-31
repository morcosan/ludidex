import { type KeyboardEvent, useImperativeHandle, useRef, useState } from 'react'
import { type SelectFieldProps } from './_types'

export const useEvents = (props: SelectFieldProps) => {
  const { disabled, onChange, options, ref, value } = props
  const innerRef = useRef<HTMLInputElement>(null)
  const [opened, setOpened] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  useImperativeHandle(ref, () => innerRef.current as HTMLInputElement)

  const getNextEnabledIndex = (index: number, direction: 1 | -1) => {
    for (let nextIndex = index + direction; nextIndex >= 0 && nextIndex < options.length; nextIndex += direction) {
      if (!options[nextIndex].disabled) return nextIndex
    }
    return -1
  }

  const getWrappedEnabledIndex = (index: number, direction: 1 | -1) => {
    if (options.length === 0) return -1
    const startIndex = index < 0 ? (direction === 1 ? -1 : 0) : index
    for (let step = 1; step <= options.length; step += 1) {
      const nextIndex = (((startIndex + direction * step) % options.length) + options.length) % options.length
      if (!options[nextIndex].disabled) return nextIndex
    }
    return -1
  }

  const open = () => {
    if (disabled) return
    setOpened(true)
    const selectedIndex = options.findIndex((option) => option.value === value && !option.disabled)
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : getNextEnabledIndex(-1, 1))
  }

  const handleOptionClick = (index: number) => {
    const option = options[index]
    if (!option || option.disabled) return
    onChange?.(option.value)
    setOpened(false)
    innerRef.current?.focus()
  }

  const navigateOptions = (direction: 1 | -1) => {
    const selectedIndex = options.findIndex((option) => option.value === value && !option.disabled)
    const currentIndex = opened && activeIndex >= 0 ? activeIndex : selectedIndex
    const startIndex = currentIndex >= 0 ? currentIndex : direction === 1 ? -1 : options.length
    const nextIndex = getWrappedEnabledIndex(startIndex, direction)
    if (nextIndex < 0) return
    setOpened(true)
    setActiveIndex(nextIndex)
    onChange?.(options[nextIndex].value)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      navigateOptions(event.key === 'ArrowDown' ? 1 : -1)
    } else if (event.key === 'Home' && opened) {
      event.preventDefault()
      const firstIndex = getNextEnabledIndex(-1, 1)
      setActiveIndex(firstIndex)
      if (firstIndex >= 0) onChange?.(options[firstIndex].value)
    } else if (event.key === 'End' && opened) {
      event.preventDefault()
      const lastIndex = getNextEnabledIndex(options.length, -1)
      setActiveIndex(lastIndex)
      if (lastIndex >= 0) onChange?.(options[lastIndex].value)
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (opened) {
        setOpened(false)
      } else {
        open()
      }
    } else if (event.key === 'Escape' && opened) {
      event.preventDefault()
      setOpened(false)
    }
  }

  const handleClear = (event: ReactMouseEvent) => {
    event.stopPropagation()
    onChange?.(null)
  }

  const handleClearMouseDown = (event: ReactMouseEvent) => {
    event.preventDefault()
  }

  const handleFieldClick = () => {
    if (opened) {
      setOpened(false)
    } else {
      open()
    }
  }

  const handleFieldClickCapture = (event: ReactMouseEvent) => {
    if (disabled) event.stopPropagation()
  }

  const handleFieldKeyDownCapture = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) event.stopPropagation()
  }

  const handleOptionMouseDown = (event: ReactMouseEvent) => {
    event.preventDefault()
  }

  const handleOptionMouseEnter = (index: number) => {
    if (!options[index].disabled) setActiveIndex(index)
  }

  const handlePopoverChange = (isOpened: boolean) => {
    setOpened(isOpened)
  }

  return {
    activeIndex,
    innerRef,
    opened,
    handleClear,
    handleClearMouseDown,
    handleFieldClick,
    handleFieldClickCapture,
    handleFieldKeyDownCapture,
    handleKeyDown,
    handleOptionClick,
    handleOptionMouseDown,
    handleOptionMouseEnter,
    handlePopoverChange,
    setActiveIndex,
  }
}
