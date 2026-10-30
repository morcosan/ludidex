import { defineMeta, DocsPage } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { Fragment, useEffect, useState } from 'react'
import { TIER_LIST_LABELS, TIER_LIST_VALUES, type TierListValue } from '../../data/settings'
import { TierListField, type TierListFieldProps } from './tier-list-field'

const meta: Meta = {
  title: 'App / Components / Tier List Field',
  ...defineMeta(TierListField, {
    props: {
      value: 'S',
      labels: TIER_LIST_LABELS,
      iconPos: 'left',
      readonly: false,
      className: '',
    },
    events: ['onChange'],
    inlineRadios: ['iconPos'],

    render: (props: TierListFieldProps) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState<TierListValue | undefined>(props.value)

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setValue(props.value)
      }, [props.value])

      return <TierListField {...props} value={value} onChange={setValue} />
    },
  }),
}

const Default: StoryObj<typeof TierListField> = {
  tags: ['autodocs', 'controls'],
}

const TierListVariants = () => {
  const tiers: (TierListValue | undefined)[] = [...TIER_LIST_VALUES, undefined]
  const [values, setValues] = useState<(TierListValue | undefined)[]>(tiers)

  return (
    <DocsPage type="component">
      <div className="gap-y-xs-4 gap-x-sm-9 p-xs-8 grid grid-cols-2">
        <h3 className="text-size-lg font-weight-lg pb-xs-3">Editable</h3>
        <h3 className="text-size-lg font-weight-lg pb-xs-3">Readonly</h3>
        {tiers.map((tier, index) => (
          <Fragment key={tier ?? 'no-tier'}>
            <TierListField
              value={values[index]}
              labels={TIER_LIST_LABELS}
              onChange={(value) =>
                setValues((current) => current.map((item, itemIndex) => (itemIndex === index ? value : item)))
              }
            />
            <TierListField value={tier} labels={TIER_LIST_LABELS} readonly />
          </Fragment>
        ))}
      </div>
    </DocsPage>
  )
}

const Variants: StoryObj = {
  render: () => <TierListVariants />,
}

export default meta
export { Default, Variants }
