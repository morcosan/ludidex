import { defineMeta, DocsPage } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { GENSHIN_ELEMENTS } from '../../data'
import { ElementIcon } from './element-icon'

const meta: Meta = {
  title: 'App / Components / Element Icon',
  ...defineMeta(ElementIcon, {
    props: {
      type: 'anemo',
      className: 'size-sm-3',
      style: {},
    },
    inlineRadios: ['type'],
  }),
}

const Default: StoryObj<typeof ElementIcon> = {
  tags: ['autodocs', 'controls'],
}

const Types: StoryObj<typeof ElementIcon> = {
  render() {
    return (
      <DocsPage type="component">
        <div className="gap-xs-3 flex flex-wrap">
          {GENSHIN_ELEMENTS.map((type) => (
            <ElementIcon key={type} type={type} className="size-sm-3" />
          ))}
        </div>
      </DocsPage>
    )
  },
}

export default meta
export { Default, Types }
