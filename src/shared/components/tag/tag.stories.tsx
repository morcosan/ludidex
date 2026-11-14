import { TAG_COLORS } from '@app-shared/data'
import { defineMeta, DocsPage } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { Tag } from './tag'

const meta: Meta = {
  title: 'App / Components / Tag',
  ...defineMeta(Tag, {
    props: {
      value: 'DPS',
      color: undefined,
      className: '',
    },
    events: ['onRemove'],
    inlineRadios: ['color'],
  }),
}

const Default: StoryObj<typeof Tag> = {
  tags: ['autodocs', 'controls'],
}

const Variants: StoryObj = {
  render: () => {
    return (
      <DocsPage type="component">
        <div className="gap-xs-2 p-xs-8 flex flex-wrap">
          {TAG_COLORS.map((color) => (
            <Tag key={color} value={`color-${color}`} color={color} />
          ))}
        </div>
      </DocsPage>
    )
  },
}

export default meta
export { Default, Variants }
