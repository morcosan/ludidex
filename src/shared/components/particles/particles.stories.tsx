import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { Particles } from './particles'

const meta: Meta = {
  title: 'App / Components / Particles',
  ...defineMeta(Particles, {
    props: {
      color: '#FF0000',
      count: 8,
      size: 'xs',
      shape: 'circle',
      className: '',
    },
    inlineRadios: ['shape', 'size'],
    clearDefaults: ['color'],

    render: (props) => (
      <div className="h-md-1 w-md-1 bg-color-white relative">
        <Particles {...props} />
      </div>
    ),
  }),
}

const Default: StoryObj<typeof Particles> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
