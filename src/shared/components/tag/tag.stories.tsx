import { Button, defineMeta } from '@src-storybook'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { Tag } from './tag'

const meta: Meta = {
  title: 'Components / Tag',
  ...defineMeta(Tag, {
    slots: {
      children: 'DPS',
    },
    props: {
      className: '',
    },
  }),
}

const Default: StoryObj<typeof Button> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
