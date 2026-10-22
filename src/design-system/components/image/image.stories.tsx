import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { Image } from './image'

const meta: Meta = {
  title: 'Design System / Components / Image',
  ...defineMeta(Image, {
    props: {
      srcs: [
        'https://broken.com/image.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbHyHHJaS1vO3fpZRq9fYpROAQhLeFvAkPR0qCHSKtMg&s=10',
      ],
      alt: '',
      loading: 'lazy',
    },
    inlineRadios: ['loading'],
  }),
}

const Default: StoryObj<typeof Image> = {
  tags: ['controls', 'autodocs'],
}

export default meta
export { Default }
