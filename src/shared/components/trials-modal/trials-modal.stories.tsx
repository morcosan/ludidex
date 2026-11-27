import { Button } from '@design-system'
import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import { useUserDataStore } from '../../state/use-user-data'
import { EMPTY_USER_DATA } from '../../state/utils'
import { TrialsModal, type TrialsModalProps } from './trials-modal'

const TEAM_ID = 'sandrone_odette_vodyanitsa_yae-miko'

const meta: Meta = {
  title: 'App / Components / Trials Modal',
  ...defineMeta(TrialsModal, {
    props: {
      opened: false,
      title: 'Stellar Sandrone DPS',
      teamId: TEAM_ID,
    },
    events: ['onClose'],
    clearDefaults: ['title'],

    render: (props: TrialsModalProps) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [opened, setOpened] = useState(props.opened)

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setOpened(props.opened)
      }, [props.opened])

      return (
        <>
          <Button variant="default" onClick={() => setOpened(true)}>
            Open modal
          </Button>

          <TrialsModal
            {...props}
            opened={opened}
            onClose={() => {
              setOpened(false)
              props.onClose?.()
            }}
          />
        </>
      )
    },
  }),
  beforeEach: () => {
    useUserDataStore.setState({
      userData: {
        ...EMPTY_USER_DATA,
        genshin: {
          teams: {
            [TEAM_ID]: {
              name: 'Stellar Sandrone DPS',
              trials: { purification1: 120, danceofsteel1: 155 },
            },
          },
        },
      },
    })
  },
}

const Default: StoryObj<typeof TrialsModal> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
