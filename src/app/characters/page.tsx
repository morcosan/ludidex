import { Breadcrumb, CharacterCard } from '@app-shared/components'
import { CHARACTERS, type GenshinCharacter } from '@app-shared/data/genshin/characters'
import { type GenshinCharacterUserData } from '@app-shared/data/genshin/user-data'
import { useUserDataStore } from '@app-shared/state/use-user-data'
import { useUserSettingsStore } from '@app-shared/state/use-user-settings'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CharacterListing } from './_partials/character-listing'
import { SideFilters } from './_partials/side-filters'
import { TopFilters } from './_partials/top-filters'
import { useFilterParams } from './_partials/use-filter-params'
import { useViewOptions } from './_partials/use-view-options'

export default function Page() {
  const { t } = useTranslation()
  const userData = useUserDataStore((state) => state.userData)
  const setGenshinCharacter = useUserDataStore((state) => state.setGenshinCharacter)
  const displaySize = useUserSettingsStore((state) => state.userSettings?.displaySize ?? 'medium')
  const setDisplaySize = useUserSettingsStore((state) => state.setDisplaySize)
  const { filters, handleFiltersChange } = useFilterParams()
  const [previewCharacter, setPreviewCharacter] = useState<GenshinCharacter | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const { view, viewOptions, viewLabel, handleViewChange } = useViewOptions()

  const characters = CHARACTERS.filter(({ element, weapon, nation }) => {
    return (
      (filters.elements.length === 0 || filters.elements.includes(element)) &&
      (filters.weapons.length === 0 || filters.weapons.includes(weapon)) &&
      (filters.nations.length === 0 || filters.nations.includes(nation))
    )
  }).sort((charA, charB) => charA.name.localeCompare(charB.name))

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
        <TopFilters value={filters} className="mb-xs-5" onChange={handleFiltersChange} />

        <h1 className={cx('flex', view === 'default' ? 'mb-sm-0' : 'mb-xs-8')}>
          <Breadcrumb first>
            {t('nav.label.characters')} ({characters.length})
          </Breadcrumb>
          <Breadcrumb>{viewLabel}</Breadcrumb>
          {filtersCount > 0 && <Breadcrumb>{t('general.label.withFilters', { count: filtersCount })}</Breadcrumb>}
        </h1>

        <CharacterListing
          characters={characters}
          view={view}
          displaySize={displaySize}
          selectedItemId={isPreviewOpen ? previewCharacter?.id : undefined}
          onClickItem={handleClickCharacter}
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="min-w-xl-0 mx-xs-3 relative h-full">
        <SideFilters
          displaySize={displaySize}
          view={view}
          viewOptions={viewOptions}
          className="-mr-xs-3 pr-xs-3 h-full overflow-y-auto"
          onChangeDisplaySize={setDisplaySize}
          onChangeView={handleViewChange}
        />

        {/* CHARACTER PREVIEW */}
        <div
          className={cx(
            '-top-xs-2 -bottom-xs-2 z-navbar absolute right-0',
            'duration-md transition-transform ease-in-out',
            isPreviewOpen ? 'translate-x-0' : 'translate-x-[110%]',
          )}
        >
          {previewCharacter && (
            <CharacterCard
              character={previewCharacter}
              userData={userData?.genshin.characters[previewCharacter.id]}
              isOpen={isPreviewOpen}
              className="h-full"
              onSave={handleSaveCharacter}
              onClose={handleClosePreview}
            />
          )}
        </div>
      </div>
    </div>
  )
}
