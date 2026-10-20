import { Button, defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import { TierScore, type TierScoreProps, type TierScoreValue } from './tier-score'

const meta: Meta = {
  title: 'Components / Tier Score',
  ...defineMeta(TierScore, {
    props: {
      value: 'S',
      editable: false,
      disabled: false,
      noLabel: false,
      className: '',
    },
    events: ['onChange'],

    render: (props: TierScoreProps) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState<TierScoreValue | undefined>(props.value)

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setValue(props.value)
      }, [props.value])

      return <TierScore {...props} value={value} onChange={setValue} />
    },
  }),
}

const Default: StoryObj<typeof Button> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
