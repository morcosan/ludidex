import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { GENSHIN_CHARACTERS } from '../../data'
import { type GenshinCharacterUserData } from '../../state/types'
import { useUserDataStore } from '../../state/use-user-data'
import { EMPTY_USER_DATA } from '../../state/utils'
import { CharacterCard } from './character-card'

const CHARACTER: GenshinCharacterUserData = {
  rating: 10,
  status: 'main',
  tierLists: {
    mainDps: 'F',
    subDps: 'D',
    support: 'C',
    outfit: 'B',
    personality: 'A',
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
}

const meta: Meta = {
  title: 'App / Components / Character Card',
  ...defineMeta(CharacterCard, {
    props: {
      character: GENSHIN_CHARACTERS.find((character) => character.id === 'vodyanitsa'),
      opened: true,
      className: 'h-xl-8',
    },
    events: ['onClose', 'onSave'],
  }),
  beforeEach: () => {
    useUserDataStore.setState({
      userData: {
        ...EMPTY_USER_DATA,
        genshin: { characters: { vodyanitsa: CHARACTER } },
      },
    })
  },
}

const Default: StoryObj<typeof CharacterCard> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
