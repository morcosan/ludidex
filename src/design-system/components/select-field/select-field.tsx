import { Popover as MantinePopover } from '@mantine/core'
import '@mantine/core/styles/Popover.css'
import { useTranslation } from 'react-i18next'
import { type SelectFieldProps } from './_types'
import { useEvents } from './_use-events'
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
    onFocus,
    optionFn,
    options,
    placeholder,
    prefix,
    prefixWidth,
    size = 'md',
    style,
    value,
  } = props
  const { t } = useTranslation()
  const { dropdownCss, fieldCss, optionCss } = useStyles({ ...props, size })
  const {
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
  } = useEvents(props)
  const selectedOption = options.find((option) => option.value === value)
  const canClear = clearable && !disabled && value !== null

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
      onChange={handlePopoverChange}
      closeOnClickOutside
      closeOnEscape
      withRoles={false}
    >
      <MantinePopover.Target>
        <div
          css={fieldCss.styles}
          className={cx('a11y-outline-proxy', className)}
          style={style}
          onClick={handleFieldClick}
          onClickCapture={handleFieldClickCapture}
          onKeyDownCapture={handleFieldKeyDownCapture}
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
            value={selectedOption?.label ?? ''}
            placeholder={placeholder}
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
                onMouseDown={handleClearMouseDown}
                onClick={handleClear}
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
                onMouseEnter={() => handleOptionMouseEnter(index)}
                onMouseDown={handleOptionMouseDown}
                onClick={() => handleOptionClick(index)}
              >
                {optionFn ? optionFn(option) : option.label}
                {isSelected && (
                  <span aria-hidden className="select-field-option-check">
                    ✓
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </MantinePopover.Dropdown>
    </MantinePopover>
  )
}
