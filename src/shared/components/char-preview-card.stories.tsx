import { Button, defineMeta } from '@src-storybook'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { CHARACTERS } from '../data/genshin/characters'
import { CharPreviewCard } from './char-preview-card'

const meta: Meta = {
  title: 'Components / Character Preview',
  ...defineMeta(CharPreviewCard, {
    props: {
      character: CHARACTERS.find((character) => character.id === 'vodyanitsa'),
      className: 'bg-color-white w-xl-0',
    },
    events: ['onClose'],
  }),
}

const Default: StoryObj<typeof Button> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
