import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { Popover, type PopoverProps } from './popover'

const meta: Meta = {
  title: 'Design System / Components / Popover',
  ...defineMeta(Popover, {
    slots: {
      trigger: '<button class="bg-color-grey-6 p-xs-2">Trigger</button>',
      children: 'Popover content',
    },
    props: {
      opened: undefined,
      position: 'top',
      className: 'max-w-md-9 truncate',
      style: {},
    },
    inlineRadios: ['position'],

    render(props: PopoverProps) {
      return <Popover {...props} trigger={<div dangerouslySetInnerHTML={{ __html: props.trigger as string }} />} />
    },
  }),
}

const Default: StoryObj<typeof Popover> = {
  tags: ['controls', 'autodocs'],
}

export default meta
export { Default }
