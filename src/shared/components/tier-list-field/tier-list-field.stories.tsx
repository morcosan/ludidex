import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import { TierListField, type TierListFieldProps } from './tier-list-field'

const meta: Meta = {
  title: 'App / Components / Tier List Field',
  ...defineMeta(TierListField, {
    props: {
      value: 6,
      readonly: false,
      noLabel: false,
      className: '',
    },
    events: ['onChange'],

    render: (props: TierListFieldProps) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState<number>(props.value)

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setValue(props.value)
      }, [props.value])

      return <TierListField {...props} value={value} onChange={setValue} />
    },
  }),
}

const Default: StoryObj<typeof TierListField> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
