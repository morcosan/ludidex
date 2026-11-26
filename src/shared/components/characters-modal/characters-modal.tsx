import { Modal } from '@design-system'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type GenshinCharacter } from '../../data'
import { useUserDataStore } from '../../state/use-user-data'
import { useUserSettingsStore } from '../../state/use-user-settings'
import { useCharacterLabel } from '../../utils/use-character-label'
import { useCharacterListing } from '../../utils/use-character-listing'
import { countFilters } from '../../utils/various'
import { AppearanceSection } from '../appearance-section/appearance-section'
import { CharacterItem } from '../character-item/character-item'
import { FiltersSection, type Filters } from '../filters-section/filters-section'
import { ListHeader } from '../list-header/list-header'
import { SelectionSlots, type CharactersModalSelection } from './_partials/selection-slots'
import { SlotCorner } from './_partials/slot-corner'

export { type CharactersModalSelection }

export interface CharactersModalProps {
  opened: boolean
  title: string
  selection?: CharactersModalSelection
  className?: string
  onSelect?: (character: GenshinCharacter | null, slotIndex?: number) => void
  onChangeSlot?: (slotIndex: number) => void
  onClose?: () => void
}

export const CharactersModal = (props: CharactersModalProps) => {
  const { opened, title, selection } = props
  const { onSelect, onChangeSlot, onClose } = props
  const { t } = useTranslation()
  const userData = useUserDataStore((state) => state.userData?.genshin)
  const userSettings = useUserSettingsStore((state) => state.userSettings)
  const [filters, setFilters] = useState<Filters>({
    elements: [],
    statuses: [],
    nations: [],
    weaponTypes: [],
    tags: [],
    search: '',
  })
  const { getCharLabel } = useCharacterLabel()
  const { listedCharacters } = useCharacterListing(filters)

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
      classNames={{ body: 'gap-sm-0 flex h-full overflow-visible! pr-0!' }}
      data-characters-modal
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
          <FiltersSection type="characters" filters={filters} surface="paper" onChange={setFilters} />
          <AppearanceSection type="characters" className="pb-xs-9" />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative flex-1">
        <ListHeader
          title={t('general.label.characters')}
          itemsCount={listedCharacters.length}
          filtersCount={countFilters(filters)}
          search={filters.search}
          surface="paper"
          className="-top-xs-7 absolute left-0 z-10 -translate-y-full"
        />

        <div className="size-full overflow-x-hidden overflow-y-auto">
          {listedCharacters.length === 0 ? (
            <p className="text-size-sm text-color-text-subtle">{t('general.notice.noCharacters')}</p>
          ) : (
            <ul className="gap-xs-3 py-xs-0 flex flex-wrap">
              {listedCharacters.map((character) => {
                const slotIndex = getCharSlotIndex(character)
                return (
                  <li key={character.id} className="relative">
                    <CharacterItem
                      character={character}
                      status={userData?.characters?.[character.id]?.status}
                      selected={slotIndex > -1}
                      size={userSettings.charItemSize}
                      labelTop={userSettings.charLabelTop && getCharLabel(character, userSettings.charLabelTop)}
                      labelBottom={userSettings.charLabelBottom && getCharLabel(character, userSettings.charLabelBottom)}
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
      </div>
    </Modal>
  )
}
