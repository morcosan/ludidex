import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import { FiltersSection, type FiltersSectionProps } from './filters-section'

const meta: Meta = {
  title: 'App / Components / Filters Section',
  ...defineMeta(FiltersSection, {
    props: {
      filters: {
        elements: [],
        statuses: [],
        weapons: [],
        nations: [],
        search: '',
      },
      className: '',
    },
    events: ['onChange'],
    clearDefaults: ['filters'],

    render: (props: FiltersSectionProps) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState(props.filters)

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setValue(props.filters)
      }, [props.filters])

      return <FiltersSection {...props} filters={value} onChange={setValue} />
    },
  }),
}

const Default: StoryObj<typeof FiltersSection> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
