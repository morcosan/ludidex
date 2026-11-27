import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { type GenshinTeam } from '../../state/types'
import { useUserDataStore } from '../../state/use-user-data'
import { EMPTY_USER_DATA } from '../../state/utils'
import { TeamCard } from './team-card'

const team: GenshinTeam = {
  id: 'sandrone_odette_vodyanitsa_yae-miko',
  charIds: ['sandrone', 'odette', 'vodyanitsa', 'yae-miko'],
  name: 'Stellar Sandrone DPS',
  rating: 10,
  tags: ['DPS', 'Main'],
  notes: 'Strong synergy with a flexible rotation',
  tierLists: { synergy: 'S', story: 'A', aesthetic: 'B', affinity: 'SS' },
  trials: { purification1: 1, purification2: 3 },
}

const meta: Meta = {
  title: 'App / Components / Team Card',
  ...defineMeta(TeamCard, {
    props: {
      team,
      opened: true,
      editing: false,
      unsaved: false,
      className: 'h-xl-8',
    },
    events: ['onClose', 'onSave', 'onDelete'],
    clearDefaults: ['team'],
  }),
  beforeEach: () => {
    useUserDataStore.setState({
      userData: {
        ...EMPTY_USER_DATA,
        genshin: {
          characters: {
            sandrone: { status: 'main' },
            odette: { status: 'main' },
            vodyanitsa: { status: 'main' },
            'yae-miko': { status: 'main' },
          },
          teams: {
            [team.id]: {
              name: team.name,
              rating: team.rating,
              tags: team.tags,
              notes: team.notes,
              tierLists: team.tierLists,
              trials: team.trials,
            },
          },
        },
      },
    })
  },
}

const Default: StoryObj<typeof TeamCard> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
