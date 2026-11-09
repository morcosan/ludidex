import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { TeamCard } from './team-card'

const meta: Meta = {
  title: 'App / Components / Team Card',
  ...defineMeta(TeamCard, {
    props: {
      team: {
        id: 'sandrone_odette_vodyanitsa_yae-miko',
        charIds: ['sandrone', 'odette', 'vodyanitsa', 'yae-miko'],
        name: 'Stellar Sandrone DPS',
        rating: 10,
        tags: ['DPS', 'Main'],
      },
      userPrefs: {
        ratingLabels: {},
      },
      userSettings: null,
      opened: true,
      editing: false,
      className: 'h-xl-8',
    },
    events: ['onClose', 'onSave', 'onDelete', 'onChangeSettings'],
    clearDefaults: ['team', 'userPrefs', 'userSettings'],
  }),
}

const Default: StoryObj<typeof TeamCard> = {
  tags: ['autodocs', 'controls'],
}

const NewTeam: StoryObj<typeof TeamCard> = {
  args: {
    team: {
      id: 'empty-team-0',
      name: '',
      charIds: [],
    },
    editing: true,
  },
}

export default meta
export { Default, NewTeam }
