import { defineMeta, DocsPage } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { RATING_VALUES } from '../../data/settings'
import { RatingIcon } from './rating-icon'

const meta: Meta = {
  title: 'App / Components / Rating Icon',
  ...defineMeta(RatingIcon, {
    props: {
      value: 10,
      large: false,
      className: '',
    },
    inlineRadios: ['value'],
  }),
}

const Default: StoryObj<typeof RatingIcon> = {
  tags: ['autodocs', 'controls'],
}

const Values: StoryObj<typeof RatingIcon> = {
  render() {
    return (
      <DocsPage type="component">
        <div className="gap-xs-3 flex flex-wrap items-center">
          {RATING_VALUES.map((value) => (
            <RatingIcon key={value} value={value} />
          ))}
        </div>
      </DocsPage>
    )
  },
}

export default meta
export { Default, Values }
