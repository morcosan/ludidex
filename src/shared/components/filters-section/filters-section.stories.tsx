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
      },
      search: '',
      className: '',
      classNames: { body: '' },
    },
    events: ['onChange'],
    clearDefaults: ['filters'],

    render: (props: FiltersSectionProps) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState(props.filters)
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [search, setSearch] = useState(props.search || '')

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setValue(props.filters)
      }, [props.filters])

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setSearch(props.search || '')
      }, [props.search])

      return <FiltersSection {...props} filters={value} search={search} onChange={setValue} onSearch={setSearch} />
    },
  }),
}

const Default: StoryObj<typeof FiltersSection> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
