import { Button, defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import { LikeScore, type LikeScoreProps } from './like-score'

const meta: Meta = {
  title: 'Components / Like Score',
  ...defineMeta(LikeScore, {
    props: {
      value: 3,
      editable: false,
      disabled: false,
      className: '',
    },
    events: ['onChange'],

    render: (props: LikeScoreProps) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState<number>(props.value)

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setValue(props.value)
      }, [props.value])

      return <LikeScore {...props} value={value} onChange={setValue} />
    },
  }),
}

const Default: StoryObj<typeof Button> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
