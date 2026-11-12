import { Card } from '@design-system'
import { useTranslation } from 'react-i18next'
import { type GenshinCharacter } from '../../../data'
import { useUserDataStore } from '../../../state/use-user-data'
import { CharacterItem } from '../../character-item/character-item'
import { SlotCorner } from './slot-corner'

export interface CharacterModalSelection {
  slots: (GenshinCharacter | null)[]
  index: number
}

interface SelectionSlotsProps {
  selection: CharacterModalSelection
  onChangeSlot?: (slotIndex: number) => void
  onClearSlot?: (slotIndex: number) => void
}

export const SelectionSlots = (props: SelectionSlotsProps) => {
  const { selection, onChangeSlot, onClearSlot } = props
  const { t } = useTranslation()
  const characters = useUserDataStore((state) => state.userData?.genshin?.characters)

  const isSlotSelected = (slotIndex: number) => selection.index === slotIndex

  const onClickSlot = (slotIndex: number) => {
    onChangeSlot?.(slotIndex)
    onClearSlot?.(slotIndex)
  }

  const getSlotTooltip = (slot: GenshinCharacter | null, slotIndex: number) => {
    return t('game.format.memberSlot', {
      count: slotIndex + 1,
      ordinal: true,
      value: slot?.name ?? t('general.label.empty'),
    })
  }

  return (
    <ul className="py-xs-0 gap-xs-5 flex">
      {selection.slots.map((slot, index) => (
        <li key={index}>
          {slot ? (
            <CharacterItem
              character={slot}
              status={characters?.[slot.id]?.status}
              size="sm"
              selected={isSlotSelected(index)}
              tooltip={getSlotTooltip(slot, index)}
              onClick={() => onClickSlot(index)}
            >
              <SlotCorner digit={String(index + 1)} variant={isSlotSelected(index) ? 'item' : 'slot'} />
            </CharacterItem>
          ) : (
            <Card
              tooltip={getSlotTooltip(slot, index)}
              state={isSlotSelected(index) ? 'selected' : 'active'}
              classNames={{ surface: 'p-px!', content: 'relative' }}
              onClick={() => onClickSlot(index)}
            >
              <div
                className={cx(
                  'w-md-1 aspect-square rounded-md',
                  isSlotSelected(index) ? 'bg-color-black-alpha-3' : 'bg-color-black-alpha-5',
                )}
              />
              <SlotCorner digit={String(index + 1)} variant={isSlotSelected(index) ? 'item' : 'slot'} />
            </Card>
          )}
        </li>
      ))}
    </ul>
  )
}
