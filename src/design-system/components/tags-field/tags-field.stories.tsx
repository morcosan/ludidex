import { defineMeta, Keyboard } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { createRef, type CSSProperties, useEffect, useState } from 'react'
import { TagsField, type TagsFieldHandle, type TagsFieldProps } from './tags-field'

const tagStyles: Record<string, CSSProperties> = {
  story: { backgroundColor: '#FEF3C7', color: '#92400E', borderColor: '#FCD34D' },
  combat: { backgroundColor: '#FEE2E2', color: '#991B1B', borderColor: '#FCA5A5' },
  support: { backgroundColor: '#DCFCE7', color: '#166534', borderColor: '#86EFAC' },
  'main-dps': { backgroundColor: '#DBEAFE', color: '#1E40AF', borderColor: '#93C5FD' },
  'sub-dps': { backgroundColor: '#DBEAFE', color: '#1E40AF', borderColor: '#93C5FD' },
}

const storyRef = createRef<TagsFieldHandle | null>()
const meta: Meta = {
  title: 'Design System / Components / Tags Field',
  ...defineMeta(TagsField, {
    props: {
      id: 'example-id',
      value: ['story', 'combat', 'support'],
      options: ['story', 'combat', 'support', 'main-dps', 'sub-dps', 'tag1', 'tag2', 'tag3', 'tag4', 'tag 5', 'tag 6'],
      size: 'md',
      disabled: false,
      tagStyleFn: undefined,
      className: 'w-xl-0',
    },
    events: ['onChange'],
    inlineRadios: ['size'],
    hasRef: true,
    shortcuts: [
      {
        keys: [Keyboard.ALT, Keyboard.DIGIT_1],
        label: "setValue(['test'])",
        fn: () => storyRef.current?.setValue(['test']),
      },
      { keys: [Keyboard.ALT, Keyboard.DIGIT_2], label: 'getValue()', fn: () => alert(storyRef.current?.getValue()) },
      { keys: [Keyboard.ALT, Keyboard.DIGIT_3], label: 'focus()', fn: () => storyRef.current?.focus() },
      { keys: [Keyboard.ALT, Keyboard.DIGIT_4], label: 'blur()', fn: () => storyRef.current?.blur() },
    ],

    render: (props: TagsFieldProps) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState(props.value ?? [])

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setValue(props.value ?? [])
      }, [props.value])

      return (
        <TagsField {...props} ref={storyRef} tagStyleFn={(tag) => tagStyles[tag]} value={value} onChange={setValue} />
      )
    },
  }),
}

const Default: StoryObj<typeof TagsField> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
