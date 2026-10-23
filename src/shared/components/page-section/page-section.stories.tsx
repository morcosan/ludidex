import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { PageSection } from './page-section'

const meta: Meta = {
  title: 'App / Components / Page Section',
  ...defineMeta(PageSection, {
    slots: {
      children: 'Section content',
    },
    props: {
      title: 'Section title',
      surface: 'page',
      titleClassName: '',
      bodyClassName: '',
      className: '',
      style: {},
    },
    inlineRadios: ['surface'],
  }),
}

const Default: StoryObj<typeof PageSection> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
