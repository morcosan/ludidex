import { type RatingLabels } from '@app-shared/state/types'
import { SelectField, type SelectOption } from '@design-system'
import { RATING_LABELS, RATING_VALUES, type RatingValue } from '../../data/settings'
import { RatingIcon } from '../rating-icon/rating-icon'

export interface RatingFieldProps extends ReactProps {
  value?: RatingValue
  labels: RatingLabels
  readonly?: boolean
  className?: string
  onChange?: (value: RatingValue | undefined) => void
}

export const RatingField = (props: RatingFieldProps) => {
  const { value, labels, readonly, className, onChange } = props
  const options: SelectOption[] = [
    ...RATING_VALUES.map((rating) => ({ value: String(rating), label: labels[rating] })),
    { value: '', label: '--' },
  ]
  const label = value ? labels[value as keyof typeof RATING_LABELS] : '--'

  if (readonly)
    return (
      <span className={cx('h-field-h-xs flex max-w-full items-center', className)}>
        {value && <RatingIcon value={value} className="mr-xs-0" />}
        <span className="min-w-xs-9 flex-center font-weight-lg text-size-sm flex leading-1">{label}</span>
      </span>
    )
  return (
    <SelectField
      id="rating-field"
      size="xs"
      value={value ? String(value) : ''}
      prefix={value ? <RatingIcon value={value} /> : undefined}
      options={options}
      optionFn={(option) => {
        const rating = RATING_VALUES.find((rating) => String(rating) === option.value)
        return (
          <span className="px-xs-1 flex items-center">
            {rating && <RatingIcon value={rating} className="mr-xs-1" />}
            <span className="min-w-xs-9 flex-center text-size-sm flex leading-1"> {option.label}</span>
          </span>
        )
      }}
      optionClass="px-0!"
      className={className}
      onChange={(selected) => onChange?.(RATING_VALUES.find((rating) => String(rating) === selected))}
    />
  )
}
