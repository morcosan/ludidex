import { RATING_VALUES, type RatingValue } from '../../data/settings'
import { type RatingLabels } from '../../state/types'
import { useFieldBase } from '../_shared/use-field-base'
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

  return useFieldBase({
    id: 'rating-field',
    value,
    values: RATING_VALUES,
    readonly,
    className,
    getLabel: (rating) => labels[rating],
    renderIcon: (rating, iconClassName) => <RatingIcon value={rating} className={iconClassName} />,
    onChange,
  })
}
