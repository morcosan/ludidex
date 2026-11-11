import { Button } from '@design-system'
import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import { GENSHIN_CHARACTERS_BY_ID, type GenshinCharacter } from '../../data'
import { useUserDataStore } from '../../state/use-user-data'
import { EMPTY_USER_DATA } from '../../state/utils'
import { CharacterModal, type CharacterModalProps, type CharacterModalSelection } from './character-modal'

const meta: Meta = {
  title: 'App / Components / Character Modal',
  ...defineMeta(CharacterModal, {
    slots: {
      title: 'Select characters',
    },
    props: {
      opened: false,
      selection: {
        slots: [GENSHIN_CHARACTERS_BY_ID['sandrone'], null, GENSHIN_CHARACTERS_BY_ID['vodyanitsa'], null],
        index: 1,
      },
      className: '',
    },
    events: ['onSelect', 'onChangeSlot', 'onClose'],
    clearDefaults: ['title', 'selection'],

    render: (props: CharacterModalProps) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [opened, setOpened] = useState(props.opened)
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [selection, setSelection] = useState<CharacterModalSelection | undefined>(props.selection)

      const handleSelect = (character: GenshinCharacter | null, slotIndex?: number) => {
        if (slotIndex !== undefined) {
          setSelection((state) => {
            if (!state) return undefined
            const slots = [...state.slots]
            slots[slotIndex] = character
            return { slots, index: slotIndex }
          })
        }
        props.onSelect?.(character, slotIndex)
      }

      const handleChangeSlot = (slotIndex: number) => {
        setSelection((state) => (state ? { ...state, index: slotIndex } : undefined))
        props.onChangeSlot?.(slotIndex)
      }

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setOpened(props.opened)
      }, [props.opened])

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setSelection(props.selection)
      }, [props.selection])

      return (
        <>
          <Button variant="default" onClick={() => setOpened(true)}>
            Open modal
          </Button>

          <CharacterModal
            {...props}
            opened={opened}
            selection={selection}
            onSelect={handleSelect}
            onChangeSlot={handleChangeSlot}
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
          characters: {
            aino: { status: 'maxed', stats: { level: 80 } },
            albedo: { status: 'building', stats: { level: 56 } },
            alhaitham: { status: 'missing', stats: { level: 60 } },
            alyosha: { status: 'pulling', stats: { level: 90 } },
          },
        },
      },
    })
  },
}

const Default: StoryObj<typeof CharacterModal> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
