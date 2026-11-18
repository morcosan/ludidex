import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { GENSHIN_DOMAINS } from '../../data'
import { DomainItem } from './domain-item'

const meta: Meta = {
  title: 'App / Components / Domain Item',
  ...defineMeta(DomainItem, {
    props: {
      domain: GENSHIN_DOMAINS.find((domain) => domain.id === 'midsummer'),
      selected: false,
      className: '',
    },
    events: ['onClick'],
    clearDefaults: ['domain'],
  }),
}

const Default: StoryObj<typeof DomainItem> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
