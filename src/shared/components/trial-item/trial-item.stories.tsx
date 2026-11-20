import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { GENSHIN_DOMAINS } from '../../data'
import { TrialItem } from './trial-item'

const meta: Meta = {
  title: 'App / Components / Trial Item',
  ...defineMeta(TrialItem, {
    props: {
      trial: GENSHIN_DOMAINS.find((item) => item.id === 'midsummer')?.trials[0],
      time: 120,
      selected: false,
      className: '',
    },
    events: ['onClick'],
    clearDefaults: ['trial'],
  }),
}

const Default: StoryObj<typeof TrialItem> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
