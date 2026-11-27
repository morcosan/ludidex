import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { TextHighlight } from './text-highlight'

const meta: Meta = {
  title: 'Design System / Components / Text Highlight',
  ...defineMeta(TextHighlight, {
    props: {
      text: 'Search results with highlight for keywords',
      keyword: 'highlight',
      className: '',
      style: {},
    },
    clearDefaults: ['text', 'keyword'],
    hasRef: true,
  }),
}

const Default: StoryObj<typeof TextHighlight> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
