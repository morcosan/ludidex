import { defineMeta, loremLongText } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { ScrollArea } from './scroll-area'

const meta: Meta = {
  title: 'Design System / Components / Scroll Area',
  ...defineMeta(ScrollArea, {
    slots: {
      children: loremLongText(20),
    },
    props: {
      className: 'w-xl-0! h-lg-3 border',
      style: {},
    },
    hasRef: true,
  }),
}

const Default: StoryObj<typeof ScrollArea> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
