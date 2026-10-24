import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { SearchField } from './search-field'

const meta: Meta = {
  title: 'App / Components / Search Field',
  ...defineMeta(SearchField, {
    props: {
      id: 'example-id',
      value: '',
      label: 'Search label',
      size: 'md',
      disabled: false,
      className: '',
      style: {},
    },
    events: ['onChange', 'onBlur'],
    inlineRadios: ['size'],
    clearDefaults: ['value', 'label'],
  }),
}

const Default: StoryObj<typeof SearchField> = {
  tags: ['controls', 'autodocs'],
}

export default meta
export { Default }
