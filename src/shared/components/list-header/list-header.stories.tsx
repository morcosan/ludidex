import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { ListHeader } from './list-header'

const meta: Meta = {
  title: 'App / Components / List Header',
  ...defineMeta(ListHeader, {
    props: {
      title: 'Items',
      itemsCount: 123,
      viewLabel: '',
      filtersCount: 2,
      search: '',
      surface: 'glass',
      className: '',
    },
  }),
}

const Default: StoryObj<typeof ListHeader> = {
  tags: ['autodocs', 'controls'],
}

const PaperEmpty: StoryObj<typeof ListHeader> = {
  args: { itemsCount: 0, surface: 'paper' },
}

const NoCount: StoryObj<typeof ListHeader> = {
  args: { itemsCount: undefined },
}

export default meta
export { Default, NoCount, PaperEmpty }
