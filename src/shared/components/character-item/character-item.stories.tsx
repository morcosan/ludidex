import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { CHARACTERS } from '../../data/genshin/characters'
import { CharacterItem } from './character-item'

const meta: Meta = {
  title: 'App / Components / Character Item',
  ...defineMeta(CharacterItem, {
    props: {
      character: CHARACTERS.find((character) => character.id === 'vodyanitsa'),
      status: 'main',
      size: 'md',
      selected: false,
      disabled: false,
      tooltip: '',
    },
    events: ['onClick'],
    inlineRadios: ['status', 'size'],
    clearDefaults: ['character', 'status'],
  }),
}

const Default: StoryObj<typeof CharacterItem> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
