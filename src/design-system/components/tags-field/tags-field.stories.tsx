import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import { TagsField, type TagsFieldProps } from './tags-field'

const meta: Meta = {
  title: 'App / Components / Tags Field',
  ...defineMeta(TagsField, {
    props: {
      id: 'example-id',
      value: [],
      options: ['story', 'combat', 'support', 'main', 'sub-dps', 'tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6'],
      size: 'md',
      colors: {
        story: 'red',
        combat: 'blue',
        support: 'green',
        'main-dps': 'yellow',
      },
      disabled: false,
      className: 'w-xl-0',
    },
    events: ['onChange'],
    inlineRadios: ['size'],

    render: (props: TagsFieldProps) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState(props.value ?? [])

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setValue(props.value ?? [])
      }, [props.value])

      return <TagsField {...props} value={value} onChange={setValue} />
    },
  }),
}

const Default: StoryObj<typeof TagsField> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
