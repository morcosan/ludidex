import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { TeamItem } from './team-item'

const meta: Meta = {
  title: 'App / Components / Team Item',
  ...defineMeta(TeamItem, {
    props: {
      team: {
        id: 'sandrone_odette_vodyanitsa_yae-miko',
        charIds: ['sandrone', 'odette', 'vodyanitsa', 'yae-miko'],
        name: 'Stellar Sandrone DPS',
        rating: 10,
        tags: ['DPS', 'Main'],
      },
      size: 'md',
      selected: false,
    },
    events: ['onClick'],
    inlineRadios: ['size'],
    clearDefaults: ['team', 'size'],
  }),
}

const Default: StoryObj<typeof TeamItem> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
