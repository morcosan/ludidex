import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import { type CharacterStatus } from '../../data/settings'
import { StatusField, type StatusFieldProps } from './status-field'

const meta: Meta = {
  title: 'App / Components / Status Field',
  ...defineMeta(StatusField, {
    props: {
      value: undefined,
      readonly: false,
      className: '',
    },
    events: ['onChange'],

    render: (props: StatusFieldProps) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState<CharacterStatus | undefined>(props.value)

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setValue(props.value)
      }, [props.value])

      return <StatusField {...props} value={value} onChange={setValue} />
    },
  }),
}

const Default: StoryObj<typeof StatusField> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
