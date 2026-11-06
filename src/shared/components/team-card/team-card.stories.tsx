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
      opened: true,
      className: 'bg-color-white w-xl-0 h-xl-8',
    },
    events: ['onClose', 'onSave', 'onDelete'],
  }),
}

const Default: StoryObj<typeof TeamCard> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
