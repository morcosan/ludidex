import { Button, defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { CHARACTERS } from '../../data/genshin/characters'
import { CharacterCard } from './character-card'

const meta: Meta = {
  title: 'Components / Character Card',
  ...defineMeta(CharacterCard, {
    props: {
      character: CHARACTERS.find((character) => character.id === 'vodyanitsa'),
      userData: {
        likeScore: 5,
        tierScores: {
          mainDps: 1,
          subDps: 2,
          support: 3,
          exploration: 0,
          outfit: 4,
          personality: 5,
        },
        stats: {
          level: 90,
          hp: 18000,
          atk: 1200,
          def: 800,
          critDmg: 180,
          critRate: 60,
          elemDmg: 46.6,
          em: 120,
          er: 130,
        },
        talents: {
          conLv: 6,
          attackLv: 10,
          skillLv: 10,
          burstLv: 10,
        },
        tags: ['DPS', 'Main'],
      },
      isOpen: true,
      className: 'bg-color-white w-xl-0 h-xl-8',
    },
    events: ['onClose', 'onSave'],
  }),
}

const Default: StoryObj<typeof Button> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
