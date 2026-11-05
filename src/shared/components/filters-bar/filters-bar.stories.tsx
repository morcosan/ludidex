import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import { FiltersBar, type FiltersBarProps } from './filters-bar'

const meta: Meta = {
  title: 'App / Components / Filters Bar',
  ...defineMeta(FiltersBar, {
    props: {
      value: {
        elements: [],
        weapons: [],
        nations: [],
      },
      className: '',
    },
    events: ['onChange'],
    clearDefaults: ['value'],

    render: (props: FiltersBarProps) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState(props.value)

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setValue(props.value)
      }, [props.value])

      return <FiltersBar {...props} value={value} onChange={setValue} />
    },
  }),
}

const Default: StoryObj<typeof FiltersBar> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
