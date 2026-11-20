import { Button } from '@design-system'
import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import { TrialModal, type TrialModalProps } from './trial-modal'

const meta: Meta = {
  title: 'App / Components / Trial Modal',
  ...defineMeta(TrialModal, {
    slots: {
      title: 'Select trials',
    },
    props: {
      opened: false,
      selection: {
        purification1: 120,
        danceofsteel1: 155,
      },
    },
    events: ['onSelect', 'onClose'],
    clearDefaults: ['title', 'selection'],

    render: (props: TrialModalProps) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [opened, setOpened] = useState(props.opened)
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [selection, setSelection] = useState(props.selection)

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setOpened(props.opened)
      }, [props.opened])

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setSelection(props.selection)
      }, [props.selection])

      const handleSelect = (trials: string[]) => {
        setSelection((current) => Object.fromEntries(trials.map((trialId) => [trialId, current[trialId] ?? 0])))
        props.onSelect?.(trials)
      }

      return (
        <>
          <Button variant="default" onClick={() => setOpened(true)}>
            Open modal
          </Button>

          <TrialModal
            {...props}
            opened={opened}
            selection={selection}
            onSelect={handleSelect}
            onClose={() => {
              setOpened(false)
              props.onClose?.()
            }}
          />
        </>
      )
    },
  }),
}

const Default: StoryObj<typeof TrialModal> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
