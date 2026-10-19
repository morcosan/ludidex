import { Card, Image } from '@src-ds'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CharPreviewCard } from '../../shared/components/char-preview-card/char-preview-card'
import { CHARACTERS, type GenshinCharacter } from '../../shared/data/genshin/characters'
import { GenshinElementColor } from '../../shared/data/genshin/core'
import type { GenshinCharacterUserData } from '../../shared/data/genshin/user-data'
import { useUserDataStore } from '../../shared/state/use-user-data'
import { TopFilters, type CharacterFilters } from './_partials/top-filters'

export default function Page() {
  const { t } = useTranslation()
  const userData = useUserDataStore((state) => state.userData)
  const setGenshinCharacter = useUserDataStore((state) => state.setGenshinCharacter)
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
      <div className="gap-sm-0 flex h-full flex-1 flex-col">
        <TopFilters value={filters} onChange={setFilters} />

        {/* CHARACTERS */}
        <div className="flex min-h-0 flex-1">
          {/* CHARACTERS */}
          <div className="pr-xs-3 min-h-0 flex-1 overflow-y-auto">
            {characters.length === 0 ? (
              <p className="text-size-sm text-color-text-subtle">{t('game.status.empty')}</p>
            ) : (
              <ul className="gap-xs-8 flex flex-wrap">
                {characters.map((character) => (
                  <li key={character.id}>
                    <Card
                      state={isPreviewOpen && previewCharacter?.id === character.id ? 'selected' : 'active'}
                      surfaceClassName="p-xs-0!"
                      contentClassName="relative flex w-full flex-col"
                      onClick={() => handleCardClick(character)}
                    >
                      <Image
                        src={character.iconUrls}
                        alt=""
                        loading="lazy"
                        className="h-md-5 w-md-5 pointer-events-none rounded-md bg-(--element-color) object-cover"
                        style={{ '--element-color': GenshinElementColor[character.element] }}
                      />
                      <span className="text-color-black text-size-xs truncate rounded-b-md pt-px text-center">
                        {character.name}
                      </span>
                    </Card>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="min-w-xl-0 mx-xs-7 relative h-full">
        {/* FILTERS */}
        <div className="h-full overflow-y-auto">More filters</div>

        {/* CHARACTER PREVIEW */}
        <div
          className={cx(
            '-top-xs-2 -bottom-xs-2 absolute right-0',
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
