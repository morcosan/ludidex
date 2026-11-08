import { SelectField, type SelectOption } from '@design-system'
import { type ReactNode } from 'react'

interface UseFieldBaseProps<T extends string | number> {
  id: string
  value?: T
  values: readonly T[]
  labelWidth?: 'xs' | 'sm'
  iconPos?: 'left' | 'right'
  readonly?: boolean
  className?: string
  getLabel: (value: T) => string
  renderIcon?: (value: T, className: string) => ReactNode
  onChange?: (value: T | undefined) => void
}

export const useFieldBase = <T extends string | number>(props: UseFieldBaseProps<T>) => {
  const {
    values,
    value,
    id,
    readonly,
    className,
    getLabel,
    renderIcon,
    labelWidth = 'xs',
    iconPos = 'left',
    onChange,
  } = props
  const options: SelectOption[] = [
    ...values.map((item) => ({ value: String(item), label: getLabel(item) })),
    { value: '', label: '--' },
  ]
  const label = value === undefined ? '--' : getLabel(value)
  const selectedValue = value === undefined ? '' : String(value)
  const labelClassName = cx(
    labelWidth === 'sm' ? 'min-w-sm-0' : 'min-w-xs-9',
    'flex-center text-size-sm flex leading-1',
  )

  const getOptionValue = (option: SelectOption) => values.find((item) => String(item) === option.value)

  const optionFn = (option: SelectOption) => {
    const optionValue = getOptionValue(option)
    return (
      <>
        {optionValue !== undefined && renderIcon?.(optionValue, cx('mr-xs-1'))}
        <span className={labelClassName}>{option.label}</span>
      </>
    )
  }

  const handleChange = (selected: string | null) => {
    onChange?.(values.find((item) => String(item) === selected))
  }

  if (readonly) {
    return (
      <div className={cx('h-field-h-xs flex max-w-full items-center', iconPos === 'right' && 'justify-end', className)}>
        {value && iconPos === 'left' && renderIcon?.(value, 'mr-xs-1')}
        <span className={cx(labelClassName, 'font-weight-md')}>{label}</span>
        {value && iconPos === 'right' && renderIcon?.(value, 'ml-xs-1')}
      </div>
    )
  }

  return (
    <SelectField
      id={id}
      size="xs"
      value={selectedValue}
      prefix={value && renderIcon?.(value, '')}
      options={options}
      optionFn={optionFn}
      className={className}
      classNames={{ option: 'pl-xs-1!' }}
      onChange={handleChange}
    />
  )
}
