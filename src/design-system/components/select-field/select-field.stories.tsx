import { defineMeta, loremArray, loremFalse, loremFullName, SelectField } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import { type SelectFieldProps, type SelectOption } from './select-field'

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

    render: (props: SelectFieldProps) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState(props.value)

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setValue(props.value)
      }, [props.value])

      return (
        <SelectField
          {...props}
          value={value}
          // eslint-disable-next-line no-eval
          optionFn={props.optionFn && eval(props.optionFn as unknown as string)}
          onChange={setValue}
        />
      )
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
      <SelectField {...props} />
      <SelectField {...props} />
    </div>
  ),
}

export default meta
export { Default, Examples }
