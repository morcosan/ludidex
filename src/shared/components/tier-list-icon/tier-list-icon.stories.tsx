import { defineMeta, DocsPage } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { TIER_LIST_VALUES } from '../../data/settings'
import { TierListIcon } from './tier-list-icon'

const meta: Meta = {
  title: 'App / Components / Tier List Icon',
  ...defineMeta(TierListIcon, {
    props: {
      value: 'S',
      className: '',
    },
    inlineRadios: ['value'],
  }),
}

const Default: StoryObj<typeof TierListIcon> = {
  tags: ['autodocs', 'controls'],
}

const Values: StoryObj<typeof TierListIcon> = {
  render() {
    return (
      <DocsPage type="component">
        <div className="gap-xs-3 flex flex-wrap items-center">
          {TIER_LIST_VALUES.map((value) => (
            <TierListIcon key={value} value={value} />
          ))}
        </div>
      </DocsPage>
    )
  },
}

export default meta
export { Default, Values }
