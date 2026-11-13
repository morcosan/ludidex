import { IconButton, type IconButtonSize, TextField, type TextFieldSize } from '@design-system'
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { debounce } from 'lodash-es'
import { type CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface SearchFieldProps extends ReactProps {
  /**
   * Props
   */
  id: string
  value: string
  label: string
  size?: TextFieldSize
  disabled?: boolean
  className?: string
  style?: CSSProperties

  /**
   * Events
   */
  onChange?: (value: string) => void
  onBlur?: () => void
}

export const SearchField = (props: SearchFieldProps) => {
  const { id, value, label, size = 'md', disabled, onChange, onBlur, className, style } = props
  const { t } = useTranslation()
  const [innerValue, setInnerValue] = useState(value)
  const debouncedFnRef = useRef<ReturnType<typeof debounce>>(null)
  const onChangeRef = useRef(onChange)
  const isPendingRef = useRef(false)

  const iconClass = ((): string => {
    if (size === 'xs') return 'ml-xs-1 -mr-xs-0 text-size-xs'
    if (size === 'sm') return 'ml-xs-1 -mr-xs-1 text-size-sm'
    if (size === 'md') return 'ml-xs-2 -mr-xs-2 text-size-md'
    if (size === 'lg') return 'ml-xs-3 -mr-xs-2 text-size-md'
    if (size === 'xl') return 'ml-xs-4 -mr-xs-3 text-size-md'
    return ''
  })()

  const clearButtonSize = ((): IconButtonSize => {
    if (size === 'xs') return 'xs'
    if (size === 'sm') return 'xs'
    if (size === 'md') return 'sm'
    if (size === 'lg') return 'sm'
    if (size === 'xl') return 'md'
    return 'xs'
  })()

  const handleQueryChange = useCallback((value: string) => {
    setInnerValue(value)
    isPendingRef.current = true
    debouncedFnRef.current?.(value)
  }, [])

  useEffect(() => {
    debouncedFnRef.current = debounce((value: string) => {
      isPendingRef.current = false
      onChangeRef.current?.(value)
    }, 300)
    return () => debouncedFnRef.current?.cancel()
  }, [])

  useEffect(() => {
    if (isPendingRef.current) return
    setInnerValue(value)
  }, [value])

  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  return (
    <TextField
      value={innerValue}
      disabled={disabled}
      id={id}
      size={size}
      placeholder={t('general.placeholder.search')}
      ariaLabel={label}
      prefix={<FontAwesomeIcon icon={faMagnifyingGlass} className={cx(iconClass, disabled && 'opacity-40')} />}
      suffix={
        innerValue && (
          <IconButton
            tooltip={t('general.action.clearSearch')}
            state={disabled ? 'disabled' : 'active'}
            variant="optional"
            size={clearButtonSize}
            onClick={() => handleQueryChange('')}
          >
            <FontAwesomeIcon icon={faXmark} className="h-xs-7" />
          </IconButton>
        )
      }
      className={className}
      style={style}
      onChange={handleQueryChange}
      onBlur={onBlur}
    />
  )
}
