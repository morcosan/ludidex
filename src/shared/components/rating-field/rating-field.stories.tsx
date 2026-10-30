import { defineMeta, DocsPage } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { Fragment, useEffect, useState } from 'react'
import { RATING_LABELS, RATING_VALUES, type RatingValue } from '../../data/settings'
import { RatingField, type RatingFieldProps } from './rating-field'

const meta: Meta = {
  title: 'App / Components / Rating Field',
  ...defineMeta(RatingField, {
    props: {
      value: 10,
      labels: RATING_LABELS,
      readonly: false,
      className: '',
    },
    events: ['onChange'],

    render: (props: RatingFieldProps) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState<RatingValue | undefined>(props.value)

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setValue(props.value)
      }, [props.value])

      return <RatingField {...props} value={value} onChange={setValue} />
    },
  }),
}

const Default: StoryObj<typeof RatingField> = {
  tags: ['autodocs', 'controls'],
}

const RatingVariants = () => {
  const ratings: (RatingValue | undefined)[] = [...RATING_VALUES, undefined]
  const [values, setValues] = useState<(RatingValue | undefined)[]>(ratings)

  return (
    <DocsPage type="component">
      <div className="gap-y-xs-4 gap-x-sm-9 p-xs-8 grid grid-cols-2">
        <h3 className="text-size-lg font-weight-lg pb-xs-3">Editable</h3>
        <h3 className="text-size-lg font-weight-lg pb-xs-3">Readonly</h3>
        {ratings.map((rating, index) => (
          <Fragment key={rating ?? 'no-rating'}>
            <RatingField
              value={values[index]}
              labels={RATING_LABELS}
              onChange={(value) =>
                setValues((current) => current.map((item, itemIndex) => (itemIndex === index ? value : item)))
              }
            />
            <RatingField value={rating} labels={RATING_LABELS} readonly />
          </Fragment>
        ))}
      </div>
    </DocsPage>
  )
}

const Variants: StoryObj = {
  render: () => <RatingVariants />,
}

export default meta
export { Default, Variants }
