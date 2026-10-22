import { type GenshinCharacter } from '@app-shared/data/genshin/characters'
import { type DisplaySize } from '@app-shared/state/use-user-settings'
import { useTranslation } from 'react-i18next'
import { CharacterItem } from './character-item'
import { type View } from './use-view-options'
import { RankView } from './views/rank-view'
import { TierView } from './views/tier-view'

export interface DisplayClass {
  image: string
  list: string
  name: string
  tierRow: string
}

const DISPLAY_CLASSES: Record<DisplaySize, DisplayClass> = {
  small: {
    image: 'h-md-2 w-md-2',
    list: 'gap-xs-5 m-xs-5',
    name: 'w-md-2 text-size-xs',
    tierRow: 'min-h-md-5',
  },
  medium: {
    image: 'h-md-4 w-md-4',
    list: 'gap-xs-7 m-xs-6',
    name: 'w-md-4 text-size-xs',
    tierRow: 'min-h-md-7',
  },
  large: {
    image: 'h-md-7 w-md-7',
    list: 'gap-xs-9 m-xs-8',
    name: 'w-md-7 text-size-sm',
    tierRow: 'min-h-lg-0',
  },
}

interface CharacterListingProps {
  characters: GenshinCharacter[]
  view: View
  displaySize: DisplaySize
  selectedItemId?: string
  onClickItem: (character: GenshinCharacter) => void
}

export const CharacterListing = (props: CharacterListingProps) => {
  const { characters, view, displaySize, selectedItemId, onClickItem } = props
  const { t } = useTranslation()

  const isTierView = view.startsWith('tier-')
  const isRankView = view.startsWith('rank-')

  const displayClass = DISPLAY_CLASSES[displaySize]
  const contentClass = cx('flex h-fit flex-1 flex-wrap', displayClass.list)

  const renderItem = (character: GenshinCharacter) => (
    <li key={character.id}>
      <CharacterItem
        character={character}
        imageClassName={displayClass.image}
        labelClassName={displayClass.name}
        selected={selectedItemId === character.id}
        onClick={onClickItem}
      />
    </li>
  )

  return (
    <div className="pr-xs-3 flex min-h-0 flex-1 overflow-y-auto">
      {characters.length === 0 && !isRankView ? (
        <p className="text-size-sm text-color-text-subtle">{t('game.status.empty')}</p>
      ) : isTierView ? (
        <TierView
          characters={characters}
          view={view}
          displayClass={displayClass}
          contentClass={contentClass}
          renderItem={renderItem}
        />
      ) : isRankView ? (
        <RankView
          characters={characters}
          view={view}
          displayClass={displayClass}
          contentClass={contentClass}
          renderItem={renderItem}
        />
      ) : (
        <ul className={cx('m-0! p-0!', contentClass)}>{characters.map(renderItem)}</ul>
      )}
    </div>
  )
}
