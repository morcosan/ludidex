import { sortByName } from '@app-shared/utils/various'
import { Modal } from '@design-system'
import { useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { GENSHIN_CHARACTERS, type GenshinCharacter } from '../../data'
import { useUserDataStore } from '../../state/use-user-data'
import { useUserSettingsStore } from '../../state/use-user-settings'
import { useCharacterLabel } from '../../utils/use-character-label'
import { AppearanceSection } from '../appearance-section/appearance-section'
import { CharacterItem } from '../character-item/character-item'
import { EMPTY_FILTERS, FiltersSection, type Filters } from '../filters-section/filters-section'
import { SelectionSlots, type CharacterModalSelection } from './_partials/selection-slots'
import { SlotCorner } from './_partials/slot-corner'

export { type CharacterModalSelection }

export interface CharacterModalProps {
  // Slots
  title: ReactNode

  // Props
  opened: boolean
  selection?: CharacterModalSelection
  className?: string

  // Events
  onSelect?: (character: GenshinCharacter | null, slotIndex?: number) => void
  onChangeSlot?: (slotIndex: number) => void
  onClose?: () => void
}

export const CharacterModal = (props: CharacterModalProps) => {
  const { opened, title, selection } = props
  const { onSelect, onChangeSlot, onClose } = props
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS)
  const { t } = useTranslation()
  const userData = useUserDataStore((state) => state.userData?.genshin)
  const userSettings = useUserSettingsStore((state) => state.userSettings)
  const { getLabel } = useCharacterLabel()

  const lcSearch = (filters.search ?? '').trim().toLocaleLowerCase()

  const characters = GENSHIN_CHARACTERS.filter((character) => {
    const status = userData?.characters?.[character.id]?.status
    const hasSearch = character.name.toLocaleLowerCase().includes(lcSearch)
    return (
      hasSearch &&
      (!filters.elements?.length || filters.elements.includes(character.element)) &&
      (!filters.statuses?.length || (status && filters.statuses.includes(status))) &&
      (!filters.weapons?.length || filters.weapons.includes(character.weapon)) &&
      (!filters.nations?.length || filters.nations.includes(character.nation))
    )
  }).sort(sortByName)

  const getCharSlotIndex = (char: GenshinCharacter) => selection?.slots.findIndex((slot) => slot?.id === char.id) ?? -1

  const onClickOption = (character: GenshinCharacter) => {
    if (!selection) {
      onSelect?.(character)
      return
    }

    const slotIndex = getCharSlotIndex(character)
    if (slotIndex > -1) {
      onSelect?.(null, slotIndex)
      onChangeSlot?.(slotIndex)
    } else {
      onSelect?.(character, selection.index)
    }
  }

  return (
    <Modal
      opened={opened}
      title={title}
      width="xl"
      height="full"
      noFooter
      classNames={{ body: 'gap-sm-1 flex h-full' }}
      data-character-modal
      onClose={onClose}
    >
      {/* LEFT SIDE */}
      <div className="gap-sm-0 w-character-card flex min-h-0 flex-col">
        {selection && (
          <SelectionSlots
            selection={selection}
            onChangeSlot={onChangeSlot}
            onClearSlot={(slotIndex) => onSelect?.(null, slotIndex)}
          />
        )}

        <div className="pr-xs-0 gap-sm-2 flex min-h-0 flex-1 flex-col overflow-y-auto">
          <FiltersSection filters={filters} surface="paper" onChange={setFilters} />
          <AppearanceSection type="characters" className="pb-xs-9" />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        {characters.length === 0 ? (
          <p className="text-size-sm text-color-text-subtle">{t('general.notice.noCharacters')}</p>
        ) : (
          <ul className="gap-xs-3 py-xs-0 flex flex-wrap">
            {characters.map((character) => {
              const slotIndex = getCharSlotIndex(character)
              return (
                <li key={character.id} className="relative">
                  <CharacterItem
                    character={character}
                    status={userData?.characters?.[character.id]?.status}
                    selected={slotIndex > -1}
                    size={userSettings.charItemSize}
                    labelTop={userSettings.charLabelTop && getLabel(character, userSettings.charLabelTop)}
                    labelBottom={userSettings.charLabelBottom && getLabel(character, userSettings.charLabelBottom)}
                    onClick={onClickOption}
                  >
                    {slotIndex > -1 && <SlotCorner digit={String(slotIndex + 1)} variant="item" />}
                  </CharacterItem>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </Modal>
  )
}
