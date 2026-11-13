import { Breadcrumb, CharacterCard, FiltersBar, type Filters } from '@app-shared/components'
import { type GenshinCharacter } from '@app-shared/data'
import { type GenshinCharacterUserData } from '@app-shared/state/types'
import { useUserDataStore } from '@app-shared/state/use-user-data'
import { useCharacterListing } from '@app-shared/utils/use-character-listing'
import { useClickOutside } from '@app-shared/utils/use-click-outside'
import { useUrlFilters } from '@app-shared/utils/use-url-filters'
import { useViewOptions } from '@app-shared/utils/use-view-options'
import { countFilters } from '@app-shared/utils/various'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PreviewDrawer } from '../_shared/preview-drawer'
import { CharacterListing } from './_partials/character-listing'
import { CHARACTER_FILTERS, CHARACTER_VIEW_TYPES } from './_partials/config'
import { SidePanel } from './_partials/side-panel'

export default function Page() {
  const { t } = useTranslation()
  const setGenshinCharacter = useUserDataStore((state) => state.setGenshinCharacter)
  const { viewType, viewOptions, viewLabel, handleViewChange } = useViewOptions(CHARACTER_VIEW_TYPES, 'default')
  const [previewCharacter, setPreviewCharacter] = useState<GenshinCharacter | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [filters, setFilters] = useUrlFilters(CHARACTER_FILTERS)
  const { listedCharacters } = useCharacterListing(filters)

  useClickOutside({
    enabled: isPreviewOpen,
    allowlist: ['[data-character-item]', '[data-preview-drawer]'],
    callback: () => setIsPreviewOpen(false),
  })

  const filtersCount = countFilters(filters)
  const topBarFilters: Filters = {
    search: filters.search,
    elements: filters.elements,
  }
  const sectionFilters: Filters = {
    statuses: filters.statuses,
    weapons: filters.weapons,
    nations: filters.nations,
  }

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters({ ...filters, ...newFilters })
  }

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
        <FiltersBar filters={topBarFilters} className="mb-xs-5 justify-between" onChange={handleFiltersChange} />

        <h1 className="flex">
          <Breadcrumb first>
            {t('general.label.characters')} ({listedCharacters.length})
          </Breadcrumb>
          <Breadcrumb>{viewLabel}</Breadcrumb>
          {filtersCount > 0 && <Breadcrumb>{t('general.format.withFilters', { count: filtersCount })}</Breadcrumb>}
          {filters.search && <Breadcrumb>{t('general.format.withSearch', { keyword: filters.search })}</Breadcrumb>}
        </h1>

        <CharacterListing
          characters={listedCharacters}
          viewType={viewType}
          selectedItemId={isPreviewOpen ? previewCharacter?.id : undefined}
          className={viewType === 'default' ? 'mt-xs-9' : 'mt-xs-7'}
          onClickItem={handleClickCharacter}
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-character-card mx-xs-3 relative h-full">
        <SidePanel
          filters={sectionFilters}
          otherFilters={topBarFilters}
          viewType={viewType}
          viewOptions={viewOptions}
          className="-mr-xs-3 pr-xs-3 h-full overflow-y-auto"
          onChangeFilters={handleFiltersChange}
          onChangeView={handleViewChange}
        />

        {/* CHARACTER PREVIEW */}
        <PreviewDrawer opened={isPreviewOpen}>
          {previewCharacter && (
            <CharacterCard
              character={previewCharacter}
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
