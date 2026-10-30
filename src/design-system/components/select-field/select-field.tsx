import { ClassNames } from '@emotion/react'
import { Select, type SelectProps } from '@mantine/core'
import '@mantine/core/styles/CloseButton.css'
import '@mantine/core/styles/Combobox.css'
import '@mantine/core/styles/Popover.css'
import { useEffect, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { type SelectFieldProps } from './_types'
import { useStyles } from './_use-styles'

export type { SelectFieldProps, SelectOption, SelectValue } from './_types'

export const SelectField = (props: SelectFieldProps) => {
  const {
    ariaDescribedBy,
    ariaDescription,
    className,
    clearable,
    disabled,
    id,
    onBlur,
    onChange,
    onFocus,
    optionFn,
    optionClass,
    options,
    placeholder,
    prefix,
    ref,
    size = 'md',
    style,
    value,
  } = props
  const { t } = useTranslation()
  const { dropdownCss, fieldCss } = useStyles({ ...props, size })
  const innerRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => innerRef.current as HTMLInputElement)

  useEffect(() => {
    if (disabled) innerRef.current?.setAttribute('aria-disabled', String(disabled))
    if (ariaDescription) innerRef.current?.setAttribute('aria-description', ariaDescription)
    if (ariaDescribedBy) innerRef.current?.setAttribute('aria-describedby', ariaDescribedBy)
  }, [disabled, ariaDescribedBy, ariaDescription])

  const getSelectProps = (css: Function): SelectProps => ({
    id: id,
    value: value,
    data: options,
    renderOption: optionFn ? ({ option }) => optionFn(option) : undefined,
    leftSection: prefix,
    placeholder: placeholder,
    clearable: clearable && !disabled,
    allowDeselect: false,
    withScrollArea: false,
    comboboxProps: {
      offset: 2,
      middlewares: {
        size: {
          apply({ availableHeight, elements }) {
            elements.floating.style.maxHeight = `min(400px, ${availableHeight}px)`
            elements.floating.style.minHeight = `min(200px, ${elements.floating.scrollHeight}px)`
          },
        },
      },
    },
    className: cx('a11y-outline-proxy', className),
    style: style,
    classNames: {
      root: css`
        ${fieldCss.styles}
      `,
      input: cx(clearable && !disabled && 'clearable', disabled && 'disabled'),
      dropdown: css`
        ${dropdownCss.styles}
      `,
      option: optionClass,
    },
    clearButtonProps: { title: t('ds.action.clear') },
    onChange: onChange,
    onFocus: onFocus,
    onBlur: onBlur,
    onClickCapture: (event) => disabled && event.stopPropagation(),
    onKeyDownCapture: (event) => disabled && event.stopPropagation(),
  })

  return <ClassNames>{({ css }) => <Select {...getSelectProps(css)} ref={innerRef} />}</ClassNames>
}
