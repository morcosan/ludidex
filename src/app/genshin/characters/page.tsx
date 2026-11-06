import { Breadcrumb, CharacterCard, FiltersBar } from '@app-shared/components'
import { GENSHIN_CHARACTERS, type GenshinCharacter } from '@app-shared/data/genshin'
import { type GenshinCharacterUserData } from '@app-shared/state/types'
import { useUserDataStore } from '@app-shared/state/use-user-data'
import { useUserSettingsStore } from '@app-shared/state/use-user-settings'
import { useClickOutside } from '@app-shared/utils/use-click-outside'
import { useFilterParams } from '@app-shared/utils/use-filter-params'
import { useViewOptions } from '@app-shared/utils/use-view-options'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { matchesFilters } from '../_shared/config'
import { PreviewDrawer } from '../_shared/preview-drawer'
import { CharacterListing } from './_partials/character-listing'
import { CHARACTER_FILTERS, CHARACTER_VIEW_TYPES } from './_partials/config'
import { SidePanel } from './_partials/side-panel'

export default function Page() {
  const { t } = useTranslation()
  const userData = useUserDataStore((state) => state.userData)
  const setGenshinCharacter = useUserDataStore((state) => state.setGenshinCharacter)
  const userPrefs = useUserDataStore((state) => state.userData?.preferences)
  const charItemSize = useUserSettingsStore((state) => state.userSettings?.charItemSize ?? 'md')
  const setCharItemSize = useUserSettingsStore((state) => state.setCharItemSize)
  const charLabelTop = useUserSettingsStore((state) => state.userSettings?.charLabelTop ?? null)
  const charLabelBottom = useUserSettingsStore((state) => state.userSettings?.charLabelBottom ?? null)
  const setCharLabelTop = useUserSettingsStore((state) => state.setCharLabelTop)
  const setCharLabelBottom = useUserSettingsStore((state) => state.setCharLabelBottom)
  const { filters, handleFiltersChange } = useFilterParams(CHARACTER_FILTERS)
  const [previewCharacter, setPreviewCharacter] = useState<GenshinCharacter | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const { viewType, viewOptions, viewLabel, handleViewChange } = useViewOptions(CHARACTER_VIEW_TYPES, 'default')

  useClickOutside({
    enabled: isPreviewOpen,
    allowlist: ['[data-character-item]', '[data-preview-drawer]'],
    callback: () => setIsPreviewOpen(false),
  })

  const characters = GENSHIN_CHARACTERS.filter((character) => matchesFilters(character, filters)).sort((charA, charB) =>
    charA.name.localeCompare(charB.name),
  )

  const filtersCount = filters.elements.length + filters.weapons.length + filters.nations.length

  const handleClickCharacter = (character: GenshinCharacter) => {
    if (isPreviewOpen && previewCharacter?.id === character.id) {
      setIsPreviewOpen(false)
      return
    }
    setPreviewCharacter(character)
    setIsPreviewOpen(true)
  }

  const handleClosePreview = () => {
    setIsPreviewOpen(false)
  }

  const handleSaveCharacter = (data: GenshinCharacterUserData) => {
    if (!previewCharacter) return
    setGenshinCharacter(previewCharacter.id, data)
  }

  return (
    <div className="flex h-full">
      {/* LEFT SIDE */}
      <div className="flex h-full flex-1 flex-col">
        <FiltersBar value={filters} className="mb-xs-5" onChange={handleFiltersChange} />

        <h1 className="flex">
          <Breadcrumb first>
            {t('general.label.characters')} ({characters.length})
          </Breadcrumb>
          <Breadcrumb>{viewLabel}</Breadcrumb>
          {filtersCount > 0 && <Breadcrumb>{t('general.format.withFilters', { count: filtersCount })}</Breadcrumb>}
        </h1>

        <CharacterListing
          characters={characters}
          viewType={viewType}
          itemSize={charItemSize}
          selectedItemId={isPreviewOpen ? previewCharacter?.id : undefined}
          className={viewType === 'default' ? 'mt-xs-9' : 'mt-xs-7'}
          onClickItem={handleClickCharacter}
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="min-w-xl-0 mx-xs-3 relative h-full">
        <SidePanel
          itemSize={charItemSize}
          viewType={viewType}
          viewOptions={viewOptions}
          charLabelTop={charLabelTop}
          charLabelBottom={charLabelBottom}
          className="-mr-xs-3 pr-xs-3 h-full overflow-y-auto"
          onChangeItemSize={setCharItemSize}
          onChangeCharLabelTop={setCharLabelTop}
          onChangeCharLabelBottom={setCharLabelBottom}
          onChangeView={handleViewChange}
        />

        {/* CHARACTER PREVIEW */}
        <PreviewDrawer opened={isPreviewOpen}>
          {previewCharacter && (
            <CharacterCard
              character={previewCharacter}
              userPrefs={userPrefs}
              userData={userData?.genshin?.characters?.[previewCharacter.id]}
              opened={isPreviewOpen}
              className="h-full"
              onSave={handleSaveCharacter}
              onClose={handleClosePreview}
            />
          )}
        </PreviewDrawer>
      </div>
    </div>
  )
}
