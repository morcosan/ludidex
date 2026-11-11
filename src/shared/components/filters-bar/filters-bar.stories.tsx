import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import { FiltersBar, type FiltersBarProps } from './filters-bar'

const meta: Meta = {
  title: 'App / Components / Filters Bar',
  ...defineMeta(FiltersBar, {
    props: {
      filters: {
        elements: [],
        weapons: [],
        nations: [],
      },
      className: '',
    },
    events: ['onChange'],
    clearDefaults: ['filters'],

    render: (props: FiltersBarProps) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState(props.filters)

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setValue(props.filters)
      }, [props.filters])

      return <FiltersBar {...props} filters={value} onChange={setValue} />
    },
  }),
}

const Default: StoryObj<typeof FiltersBar> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
