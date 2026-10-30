import { defineMeta, DocsPage } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { CHARACTER_STATUSES } from '../../data/settings'
import { StatusIcon } from './status-icon'

const meta: Meta = {
  title: 'App / Components / Status Icon',
  ...defineMeta(StatusIcon, {
    props: {
      value: 'main',
      large: false,
      className: '',
    },
    inlineRadios: ['value'],
  }),
}

const Default: StoryObj<typeof StatusIcon> = {
  tags: ['autodocs', 'controls'],
}

const Values: StoryObj<typeof StatusIcon> = {
  render() {
    return (
      <DocsPage type="component">
        <div className="gap-xs-3 flex flex-wrap items-center">
          {CHARACTER_STATUSES.map((value) => (
            <StatusIcon key={value} value={value} />
          ))}
        </div>
      </DocsPage>
    )
  },
}

export default meta
export { Default, Values }
