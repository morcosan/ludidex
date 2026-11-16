import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { Tag } from './tag'

const meta: Meta = {
  title: 'Design System / Components / Tag',
  ...defineMeta(Tag, {
    props: {
      value: 'DPS',
      size: 'sm',
      removable: false,
      className: '',
      style: {},
    },
    events: ['onRemove'],
    inlineRadios: ['size'],
  }),
}

const Default: StoryObj<typeof Tag> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
