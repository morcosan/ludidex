import { Popover as MantinePopover } from '@mantine/core'
import '@mantine/core/styles/Popover.css'
import { type KeyboardEvent, useImperativeHandle, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type SelectFieldProps } from './_types'
import { useStyles } from './_use-styles'

export type { SelectFieldProps, SelectOption, SelectValue } from './_types'

export const SelectField = (props: SelectFieldProps) => {
  const {
    ariaDescribedBy,
    ariaDescription,
    className,
    classNames,
    clearable,
    disabled,
    id,
    onBlur,
    onChange,
    onFocus,
    optionFn,
    options,
    placeholder,
    prefix,
    prefixWidth,
    ref,
    size = 'md',
    style,
    value,
  } = props
  const { t } = useTranslation()
  const { dropdownCss, fieldCss, optionCss } = useStyles({ ...props, size })
  const innerRef = useRef<HTMLInputElement>(null)
  const [opened, setOpened] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const selectedOption = options.find((option) => option.value === value)
  const canClear = clearable && !disabled && value !== null

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
      const nextIndex = ((startIndex + direction * step) % options.length + options.length) % options.length
      if (!options[nextIndex].disabled) return nextIndex
    }
    return -1
  }

  const open = (direction: 1 | -1 = 1) => {
    if (disabled) return
    setOpened(true)
    const selectedIndex = options.findIndex((option) => option.value === value && !option.disabled)
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : getNextEnabledIndex(direction === 1 ? -1 : options.length, direction))
  }

  const selectOption = (index: number) => {
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
      const direction = event.key === 'ArrowDown' ? 1 : -1
      navigateOptions(direction)
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

  return (
    <MantinePopover
      position="bottom-start"
      offset={2}
      width="target"
      middlewares={{
        size: {
          apply({ availableHeight, elements }) {
            elements.floating.style.maxHeight = `min(400px, ${availableHeight}px)`
            elements.floating.style.minHeight = `min(200px, ${elements.floating.scrollHeight}px)`
          },
        },
      }}
      opened={opened}
      onChange={setOpened}
      closeOnClickOutside
      closeOnEscape
      withRoles={false}
    >
      <MantinePopover.Target>
        <div
          css={fieldCss.styles}
          className={cx('a11y-outline-proxy', className)}
          style={style}
          onClick={() => {
            if (disabled) return
            if (opened) {
              setOpened(false)
            } else {
              open()
            }
          }}
          onClickCapture={(event) => disabled && event.stopPropagation()}
          onKeyDownCapture={(event) => disabled && event.stopPropagation()}
        >
          {prefix && (
            <span css={fieldCss.prefixStyles} style={{ width: prefixWidth ?? fieldCss.prefixWidth }}>
              {prefix}
            </span>
          )}
          <input
            ref={innerRef}
            id={id}
            type="text"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={opened}
            aria-controls={`${id}-options`}
            aria-activedescendant={opened && activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined}
            aria-description={ariaDescription}
            aria-describedby={ariaDescribedBy}
            aria-disabled={disabled || undefined}
            autoComplete="off"
            disabled={disabled}
            readOnly
            value={selectedOption?.label ?? ''}
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={handleKeyDown}
            css={fieldCss.inputStyles}
          />
          <span css={fieldCss.suffixStyles}>
            {canClear && (
              <button
                type="button"
                title={t('ds.action.clear')}
                aria-label={t('ds.action.clear')}
                css={fieldCss.clearButtonStyles}
                onMouseDown={(event) => event.preventDefault()}
                onClick={(event) => {
                  event.stopPropagation()
                  onChange?.(null)
                }}
              >
                ×
              </button>
            )}
            <span aria-hidden css={fieldCss.chevronStyles} />
          </span>
        </div>
      </MantinePopover.Target>
      <MantinePopover.Dropdown css={dropdownCss}>
        <div id={`${id}-options`} role="listbox" aria-label={placeholder}>
          {options.map((option, index) => {
            const isSelected = option.value === value
            return (
              <div
                key={option.value}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={isSelected}
                aria-disabled={option.disabled || undefined}
                css={optionCss}
                className={classNames?.option}
                data-selected={isSelected || undefined}
                data-disabled={option.disabled || undefined}
                onMouseEnter={() => !option.disabled && setActiveIndex(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectOption(index)}
              >
                {optionFn ? optionFn(option) : option.label}
                {isSelected && <span aria-hidden className="select-field-option-check">✓</span>}
              </div>
            )
          })}
        </div>
      </MantinePopover.Dropdown>
    </MantinePopover>
  )
}
