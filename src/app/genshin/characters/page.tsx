import { CharacterCard, type Filters } from '@app-shared/components'
import { type GenshinCharacter } from '@app-shared/data'
import { type GenshinCharacterUserData } from '@app-shared/state/types'
import { useUserDataStore } from '@app-shared/state/use-user-data'
import { useCharacterListing } from '@app-shared/utils/use-character-listing'
import { useClickOutside } from '@app-shared/utils/use-click-outside'
import { useUrlFilters } from '@app-shared/utils/use-url-filters'
import { useUserTags } from '@app-shared/utils/use-user-tags'
import { useViewOptions } from '@app-shared/utils/use-view-options'
import { countFilters } from '@app-shared/utils/various'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PageTemplate } from '../_shared/page-template'
import { PreviewDrawer } from '../_shared/preview-drawer'
import { CHARACTER_FILTERS, CHARACTER_VIEW_TYPES } from './_config'
import { CharacterListing } from './_partials/character-listing'

export default function Page() {
  const { t } = useTranslation()
  const setGenshinCharacter = useUserDataStore((state) => state.setGenshinCharacter)
  const viewOptionsHook = useViewOptions({ viewTypes: CHARACTER_VIEW_TYPES, defaultView: 'default' })
  const { viewType, viewOptions, viewLabel, handleViewChange } = viewOptionsHook
  const { tagOptions } = useUserTags()
  const [previewCharacter, setPreviewCharacter] = useState<GenshinCharacter | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [filters, setFilters] = useUrlFilters({ ...CHARACTER_FILTERS, tags: tagOptions })
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
    tags: filters.tags,
  }

  const handleClosePreview = () => setIsPreviewOpen(false)
  const handleChangeFilters = (newFilters: Filters) => setFilters({ ...filters, ...newFilters })

  const handleClickCharacter = (character: GenshinCharacter) => {
    if (isPreviewOpen && previewCharacter?.id === character.id) {
      setIsPreviewOpen(false)
      return
    }
    setPreviewCharacter(character)
    setIsPreviewOpen(true)
  }

  const handleSaveCharacter = (data: GenshinCharacterUserData) => {
    if (!previewCharacter) return
    setGenshinCharacter(previewCharacter.id, data)
  }

  return (
    <PageTemplate
      type="characters"
      title={t('general.label.characters')}
      itemsCount={listedCharacters.length}
      filtersCount={filtersCount}
      topBarFilters={topBarFilters}
      sectionFilters={sectionFilters}
      search={filters.search}
      viewLabel={viewLabel}
      viewType={viewType}
      viewOptions={viewOptions}
      leftSide={
        <CharacterListing
          characters={listedCharacters}
          viewType={viewType}
          selectedItemId={isPreviewOpen ? previewCharacter?.id : undefined}
          className={viewType === 'default' ? 'mt-xs-9' : 'mt-xs-7'}
          onClickItem={handleClickCharacter}
        />
      }
      rightSide={
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
      }
      onChangeFilters={handleChangeFilters}
      onChangeView={handleViewChange}
    />
  )
}
