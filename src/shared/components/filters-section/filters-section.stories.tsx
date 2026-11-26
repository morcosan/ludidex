import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import { FiltersSection, type FiltersSectionProps } from './filters-section'

const meta: Meta = {
  title: 'App / Components / Filters Section',
  ...defineMeta(FiltersSection, {
    props: {
      type: 'characters',
      filters: {
        elements: [],
        statuses: [],
        weaponTypes: [],
        nations: [],
        tags: [],
        search: '',
      },
      otherFilters: {},
      surface: 'glass',
      className: '',
    },
    events: ['onChange'],
    clearDefaults: ['type', 'filters', 'otherFilters', 'surface'],

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

const Domains: StoryObj<typeof FiltersSection> = {
  args: { type: 'domains', filters: { domainTypes: [], nations: [] } },
}

export default meta
export { Default, Domains }
