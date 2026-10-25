import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { Breadcrumb } from './breadcrumb'

const meta: Meta = {
  title: 'App / Components / Breadcrumb',
  ...defineMeta(Breadcrumb, {
    slots: {
      children: 'Title',
    },
    props: {
      first: false,
      large: false,
      className: '',
      style: {},
    },
  }),
}

const Default: StoryObj<typeof Breadcrumb> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
