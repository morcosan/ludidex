import { Card, IconButton, Modal } from '@design-system'
import { XIcon } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { GENSHIN_CHARACTERS, type GenshinCharacter } from '../../data/genshin'
import { type GenshinUserData } from '../../state/types'
import { CharacterItem } from '../character-item/character-item'
import { EMPTY_FILTERS, FiltersBar, type FiltersBarValue } from '../filters-bar/filters-bar'

export interface CharacterModalSelection {
  slots: Array<GenshinCharacter | null>
  index: number
}

export interface CharacterModalProps extends ReactProps {
  // Slots
  title: ReactNode

  // Props
  opened: boolean
  userData?: GenshinUserData
  selection?: CharacterModalSelection
  className?: string

  // Events
  onSelect?: (character: GenshinCharacter | null, slotIndex?: number) => void
  onChangeSlot?: (slotIndex: number) => void
  onClose?: () => void
}

export const CharacterModal = (props: CharacterModalProps) => {
  const { opened, title, userData, selection, className, onSelect, onChangeSlot, onClose } = props
  const { t } = useTranslation()
  const [filters, setFilters] = useState<FiltersBarValue>(EMPTY_FILTERS)

  const characters = GENSHIN_CHARACTERS.filter((character) => {
    return (
      (filters.elements.length === 0 || filters.elements.includes(character.element)) &&
      (filters.weapons.length === 0 || filters.weapons.includes(character.weapon)) &&
      (filters.nations.length === 0 || filters.nations.includes(character.nation))
    )
  }).sort((characterA, characterB) => characterA.name.localeCompare(characterB.name))

  const isSlotSelected = (slotIndex: number) => selection?.index === slotIndex
  const isCharSelected = (char: GenshinCharacter) => selection?.slots.some((slot) => slot?.id === char.id)

  const onClickSlot = (slotIndex: number) => {
    if (isSlotSelected(slotIndex)) return
    onChangeSlot?.(slotIndex)
  }

  const onClickOption = (character: GenshinCharacter) => {
    selection ? onSelect?.(character, selection.index) : onSelect?.(character)
  }

  const onClickClearSlot = (slotIndex: number, event: ReactMouseEvent) => {
    event.stopPropagation()
    onSelect?.(null, slotIndex)
  }

  return (
    <Modal opened={opened} title={title} width="xl" height="full" noFooter data-character-modal onClose={onClose}>
      <div className={cx('flex h-full min-h-0 flex-col', className)}>
        {selection && (
          <ul className="gap-xs-3 mb-sm-0 py-xs-0 flex flex-wrap overflow-hidden">
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
                    <div className="w-md-1 bg-color-grey-5 aspect-square rounded-md" />
                  </Card>
                )}
              </li>
            ))}
          </ul>
        )}

        <FiltersBar value={filters} surface="paper" className="mb-xs-5" onChange={setFilters} />

        <div className="min-h-0 flex-1 overflow-y-auto">
          <ul className="gap-xs-3 py-xs-0 flex flex-wrap overflow-hidden">
            {characters.map((character) => (
              <li key={character.id}>
                <CharacterItem
                  character={character}
                  status={userData?.characters?.[character.id]?.status}
                  disabled={isCharSelected(character)}
                  tooltip={isCharSelected(character) ? t('game.status.alreadySelected') : undefined}
                  size="sm"
                  onClick={onClickOption}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  )
}
