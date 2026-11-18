import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { GENSHIN_DOMAINS } from '../../data'
import { DomainCard } from './domain-card'

const meta: Meta = {
  title: 'App / Components / Domain Card',
  ...defineMeta(DomainCard, {
    props: {
      domain: GENSHIN_DOMAINS.find((domain) => domain.id === 'midsummer'),
      className: 'h-xl-8',
    },
    clearDefaults: ['domain'],
  }),
}

const Default: StoryObj<typeof DomainCard> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
