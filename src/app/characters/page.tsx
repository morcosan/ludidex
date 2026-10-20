import { CharPreviewCard } from '@app-shared/components/char-preview-card/char-preview-card'
import { CHARACTERS, type GenshinCharacter } from '@app-shared/data/genshin/characters'
import { type GenshinCharacterUserData } from '@app-shared/data/genshin/user-data'
import { useUserConfigStore } from '@app-shared/state/use-user-config'
import { useUserDataStore } from '@app-shared/state/use-user-data'
import { useState } from 'react'
import { CharacterListing } from './_partials/character-listing'
import { SideFilters, type ViewMode } from './_partials/side-filters'
import { TopFilters, type CharacterFilters } from './_partials/top-filters'

export default function Page() {
  const userData = useUserDataStore((state) => state.userData)
  const setGenshinCharacter = useUserDataStore((state) => state.setGenshinCharacter)
  const displaySize = useUserConfigStore((state) => state.userConfig?.displaySize ?? 'medium')
  const setDisplaySize = useUserConfigStore((state) => state.setDisplaySize)
  const [viewMode, setViewMode] = useState<ViewMode>('default')
  const [filters, setFilters] = useState<CharacterFilters>({ elements: [], weapons: [], nations: [] })
  const [previewCharacter, setPreviewCharacter] = useState<GenshinCharacter | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const characters = CHARACTERS.filter(({ element, weapon, nation }) => {
    return (
      (filters.elements.length === 0 || filters.elements.includes(element)) &&
      (filters.weapons.length === 0 || filters.weapons.includes(weapon)) &&
      (filters.nations.length === 0 || filters.nations.includes(nation))
    )
  }).sort((charA, charB) => charA.name.localeCompare(charB.name))

  const handleCardClick = (character: GenshinCharacter) => {
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
      <div className={cx('flex h-full flex-1 flex-col', viewMode === 'default' ? 'gap-sm-0' : 'gap-xs-8')}>
        <TopFilters value={filters} onChange={setFilters} />

        <CharacterListing
          characters={characters}
          displaySize={displaySize}
          viewMode={viewMode}
          selectedId={isPreviewOpen ? previewCharacter?.id : undefined}
          onCardClick={handleCardClick}
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="min-w-xl-0 mx-xs-7 relative h-full">
        <SideFilters
          displaySize={displaySize}
          onDisplaySizeChange={setDisplaySize}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
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
            <CharPreviewCard
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
