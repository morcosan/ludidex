import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { GENSHIN_DOMAINS } from '../../data'
import { useUserDataStore } from '../../state/use-user-data'
import { EMPTY_USER_DATA } from '../../state/utils'
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
  beforeEach: () => {
    useUserDataStore.setState({
      userData: {
        ...EMPTY_USER_DATA,
        genshin: { domains: { midsummer: { notes: 'A good place to farm artifacts' } } },
      },
    })
  },
}

const Default: StoryObj<typeof DomainCard> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
