import { defineMeta, loremLongText } from '@src-storybook'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { LoadingScreen } from './loading-screen'

const meta: Meta = {
  title: 'Design System / Components / Loading Screen',
  ...defineMeta(LoadingScreen, {
    slots: {
      children: loremLongText(),
    },
    props: {
      logo: 'Logo',
      minTimeout: 0,
      maxTimeout: 3000,
    },
  }),
}

const Default: StoryObj<typeof LoadingScreen> = {
  tags: ['controls', 'autodocs'],
}

export default meta
export { Default }
