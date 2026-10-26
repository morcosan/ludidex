import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import { RATING_LABELS } from '../../data/settings'
import { RatingField, type RatingFieldProps } from './rating-field'

const meta: Meta = {
  title: 'App / Components / Rating Field',
  ...defineMeta(RatingField, {
    props: {
      value: 5,
      labels: RATING_LABELS,
      readonly: false,
      className: '',
    },
    events: ['onChange'],

    render: (props: RatingFieldProps) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState<number>(props.value)

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

export default meta
export { Default }
