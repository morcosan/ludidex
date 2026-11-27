import { defineMeta, Keyboard, loremArray, loremFalse, loremFullName, SelectField } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { createRef, useEffect, useState } from 'react'
import { type SelectFieldHandle, type SelectFieldProps, type SelectOption } from './select-field'

const getOptionFn = (optionFn: SelectFieldProps['optionFn'] | string) => {
  if (typeof optionFn !== 'string') return optionFn
  // eslint-disable-next-line no-eval
  return eval(optionFn)
}

const storyRef = createRef<SelectFieldHandle | null>()
const meta: Meta = {
  title: 'Design System / Components / Select Field',
  ...defineMeta(SelectField, {
    props: {
      id: 'example-id',
      value: '0',
      options: loremArray(10, 20).map((_, index): SelectOption => ({
        value: String(index),
        label: loremFullName(),
        disabled: loremFalse(),
      })),
      optionFn: '(option) => option.label' as any,
      size: 'md',
      placeholder: '',
      clearable: false,
      disabled: false,
      ariaDescription: '',
      ariaDescribedBy: '',
      prefix: '',
      className: '',
      classNames: { option: '' },
      style: {},
    },
    events: ['onChange'],
    inlineRadios: ['size'],
    clearDefaults: ['options', 'value'],
    hasRef: true,
    shortcuts: [
      { keys: [Keyboard.ALT, Keyboard.DIGIT_1], label: "setValue('0')", fn: () => storyRef.current?.setValue('0') },
      { keys: [Keyboard.ALT, Keyboard.DIGIT_2], label: 'getValue()', fn: () => alert(storyRef.current?.getValue()) },
      { keys: [Keyboard.ALT, Keyboard.DIGIT_3], label: 'focus()', fn: () => storyRef.current?.focus() },
      { keys: [Keyboard.ALT, Keyboard.DIGIT_4], label: 'blur()', fn: () => storyRef.current?.blur() },
    ],

    render: (props: SelectFieldProps) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState(props.value)

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setValue(props.value)
      }, [props.value])

      return <SelectField {...props} ref={storyRef} value={value} optionFn={getOptionFn(props.optionFn)} onChange={setValue} />
    },
  }),
}

const Default: StoryObj<typeof SelectField> = {
  tags: ['controls', 'autodocs'],
}

const Examples: StoryObj<typeof SelectField> = {
  tags: ['controls'],

  render: (props: SelectFieldProps) => (
    <div className="p-sm-0 flex min-h-0 flex-1 flex-col justify-between">
      <SelectField {...props} optionFn={getOptionFn(props.optionFn)} />
      <SelectField {...props} optionFn={getOptionFn(props.optionFn)} />
    </div>
  ),
}

export default meta
export { Default, Examples }
