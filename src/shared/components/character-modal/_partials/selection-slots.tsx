import { Card, IconButton } from '@design-system'
import { XIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { type GenshinCharacter } from '../../../data/genshin'
import { type GenshinUserData } from '../../../state/types'
import { CharacterItem } from '../../character-item/character-item'

export interface CharacterModalSelection {
  slots: (GenshinCharacter | null)[]
  index: number
}

interface SelectionSlotsProps {
  selection: CharacterModalSelection
  userData?: GenshinUserData
  onChangeSlot?: (slotIndex: number) => void
  onClearSlot?: (slotIndex: number) => void
}

export const SelectionSlots = (props: SelectionSlotsProps) => {
  const { selection, userData, onChangeSlot, onClearSlot } = props
  const { t } = useTranslation()

  const isSlotSelected = (slotIndex: number) => selection.index === slotIndex

  const onClickSlot = (slotIndex: number) => {
    if (isSlotSelected(slotIndex)) return
    onChangeSlot?.(slotIndex)
  }

  const onClickClearSlot = (slotIndex: number, event: ReactMouseEvent) => {
    event.stopPropagation()
    onClearSlot?.(slotIndex)
  }

  return (
    <ul className="py-xs-0 gap-xs-5 flex">
      {selection.slots.map((slot, index) => (
        <li key={index} className="relative">
          {slot ? (
            <>
              <CharacterItem
                character={slot}
                status={userData?.characters?.[slot.id]?.status}
                size="sm"
                selected={isSlotSelected(index)}
                onClick={() => onClickSlot(index)}
              />
              <IconButton
                tooltip={t('general.action.clear')}
                size="xs"
                floating
                className="-top-xs-2 -right-xs-2 absolute! z-10"
                onClick={(event) => onClickClearSlot(index, event)}
              >
                <XIcon aria-hidden className="h-xs-6 w-xs-6" />
              </IconButton>
            </>
          ) : (
            <Card
              state={isSlotSelected(index) ? 'selected' : 'active'}
              classNames={{ surface: 'p-px!' }}
              onClick={() => onClickSlot(index)}
            >
              <div
                className={cx(
                  'w-md-1 aspect-square rounded-md',
                  isSlotSelected(index) ? 'bg-color-black-alpha-3' : 'bg-color-black-alpha-5',
                )}
              />
            </Card>
          )}
        </li>
      ))}
    </ul>
  )
}
