import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { FailureLabel } from './failure-label'

const meta: Meta = {
  title: 'App / Components / Failure Label',
  ...defineMeta(FailureLabel, {}),
}

const Default: StoryObj<typeof FailureLabel> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
