import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { AvatarAura } from './avatar-aura'

const meta: Meta = {
  title: 'App / Components / Avatar Aura',
  ...defineMeta(AvatarAura, {
    props: {
      scale: 1,
      className: 'w-lg-0 border',
    },
  }),
}

const Default: StoryObj<typeof AvatarAura> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
