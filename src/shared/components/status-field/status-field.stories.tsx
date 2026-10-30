import { defineMeta, DocsPage } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { Fragment, useEffect, useState } from 'react'
import { CHARACTER_STATUSES, type CharacterStatus } from '../../data/settings'
import { StatusField, type StatusFieldProps } from './status-field'

const meta: Meta = {
  title: 'App / Components / Status Field',
  ...defineMeta(StatusField, {
    props: {
      value: undefined,
      readonly: false,
      className: '',
    },
    events: ['onChange'],

    render: (props: StatusFieldProps) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState<CharacterStatus | undefined>(props.value)

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setValue(props.value)
      }, [props.value])

      return <StatusField {...props} value={value} onChange={setValue} />
    },
  }),
}

const Default: StoryObj<typeof StatusField> = {
  tags: ['autodocs', 'controls'],
}

const StatusVariants = () => {
  const statuses: (CharacterStatus | undefined)[] = [...CHARACTER_STATUSES, undefined]
  const [values, setValues] = useState<(CharacterStatus | undefined)[]>(statuses)

  return (
    <DocsPage type="component">
      <div className="gap-y-xs-4 gap-x-sm-9 p-xs-8 grid grid-cols-2">
        <h3 className="text-size-lg font-weight-lg pb-xs-3">Editable</h3>
        <h3 className="text-size-lg font-weight-lg pb-xs-3">Readonly</h3>
        {statuses.map((status, index) => (
          <Fragment key={status ?? 'no-status'}>
            <StatusField
              value={values[index]}
              className="w-md-5"
              onChange={(value) =>
                setValues((current) => current.map((item, itemIndex) => (itemIndex === index ? value : item)))
              }
            />
            <StatusField value={status} readonly />
          </Fragment>
        ))}
      </div>
    </DocsPage>
  )
}

const Variants: StoryObj = {
  render: () => <StatusVariants />,
}

export default meta
export { Default, Variants }
