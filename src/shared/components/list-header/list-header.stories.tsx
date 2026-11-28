import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { ListHeader } from './list-header'

const meta: Meta = {
  title: 'App / Components / List Header',
  ...defineMeta(ListHeader, {
    props: {
      title: 'Items',
      itemCount: 123,
      viewLabel: '',
      filterCount: 2,
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
  args: { itemCount: 0, surface: 'paper' },
}

const NoCount: StoryObj<typeof ListHeader> = {
  args: { itemCount: undefined },
}

export default meta
export { Default, NoCount, PaperEmpty }
