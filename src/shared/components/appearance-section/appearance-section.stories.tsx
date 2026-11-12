import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { AppearanceSection } from './appearance-section'

const meta: Meta = {
  title: 'App / Components / Appearance Section',
  ...defineMeta(AppearanceSection, {
    props: {
      type: 'characters',
      className: '',
    },
    inlineRadios: ['type'],
  }),
}

const Default: StoryObj<typeof AppearanceSection> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
