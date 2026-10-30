import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { CHARACTERS } from '../../data/genshin/characters'
import { CharacterAvatar } from './character-avatar'

const meta: Meta = {
  title: 'App / Components / Character Avatar',
  ...defineMeta(CharacterAvatar, {
    props: {
      character: CHARACTERS.find((character) => character.id === 'vodyanitsa'),
      status: 'main',
      className: 'h-md-4 w-md-4',
    },
    clearDefaults: ['character'],
    inlineRadios: ['status'],
  }),
}

const Default: StoryObj<typeof CharacterAvatar> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
