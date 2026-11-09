import { Button } from '@design-system'
import { defineMeta } from '@storybook-docs'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import { GENSHIN_CHARACTERS_BY_ID, type GenshinCharacter } from '../../data/genshin'
import { type UserSettings } from '../../state/types'
import { CharacterModal, type CharacterModalProps, type CharacterModalSelection } from './character-modal'

const meta: Meta = {
  title: 'App / Components / Character Modal',
  ...defineMeta(CharacterModal, {
    slots: {
      title: 'Select characters',
    },
    props: {
      opened: false,
      userData: {
        characters: {
          aino: { status: 'maxed' },
          albedo: { status: 'building' },
          alhaitham: { status: 'missing' },
          alyosha: { status: 'pulling' },
        },
      },
      userSettings: null,
      selection: {
        slots: [GENSHIN_CHARACTERS_BY_ID['sandrone'], null, GENSHIN_CHARACTERS_BY_ID['vodyanitsa'], null],
        index: 1,
      },
      className: '',
    },
    events: ['onSelect', 'onChangeSlot', 'onChangeSettings', 'onClose'],
    clearDefaults: ['title', 'userData', 'userSettings', 'selection'],

    render: (props: CharacterModalProps) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [opened, setOpened] = useState(props.opened)
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [selection, setSelection] = useState<CharacterModalSelection | undefined>(props.selection)
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [userSettings, setUserSettings] = useState<UserSettings | null>(props.userSettings ?? null)

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

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setUserSettings(props.userSettings ?? null)
      }, [props.userSettings])

      return (
        <>
          <Button variant="default" onClick={() => setOpened(true)}>
            Open modal
          </Button>

          <CharacterModal
            {...props}
            opened={opened}
            selection={selection}
            userSettings={userSettings}
            onSelect={handleSelect}
            onChangeSlot={handleChangeSlot}
            onChangeSettings={setUserSettings}
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

const Default: StoryObj<typeof CharacterModal> = {
  tags: ['autodocs', 'controls'],
}

export default meta
export { Default }
