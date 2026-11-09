import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { PageSection } from './page-section'

const meta: Meta = {
  title: 'App / Components / Page Section',
  ...defineMeta(PageSection, {
    slots: {
      children: 'Content',
      actions: 'Actions',
    },
    props: {
      title: 'Title',
      surface: 'glass',
      className: 'w-lg-9',
      classNames: { header: '', body: '' },
      style: {},
    },
    inlineRadios: ['surface'],
    clearDefaults: ['title'],
  }),
}

const Default: StoryObj<typeof PageSection> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
