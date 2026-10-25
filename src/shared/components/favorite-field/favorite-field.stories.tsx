import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { FAVORITE_LABELS } from '../../data/settings'
import { useEffect, useState } from 'react'
import { FavoriteField, type FavoriteFieldProps } from './favorite-field'

const meta: Meta = {
  title: 'App / Components / Favorite Field',
  ...defineMeta(FavoriteField, {
    props: {
      value: 5,
      labels: FAVORITE_LABELS,
      readonly: false,
      className: '',
    },
    events: ['onChange'],

    render: (props: FavoriteFieldProps) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState<number>(props.value)

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setValue(props.value)
      }, [props.value])

      return <FavoriteField {...props} value={value} onChange={setValue} />
    },
  }),
}

const Default: StoryObj<typeof FavoriteField> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
