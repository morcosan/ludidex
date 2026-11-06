import { CharacterItem } from '@app-shared/components'
import { type GenshinCharacter } from '@app-shared/data/genshin'
import { type ItemSize } from '@app-shared/state/types'
import { useUserDataStore } from '@app-shared/state/use-user-data'
import { type ViewType } from '@app-shared/utils/use-view-options'
import { useTranslation } from 'react-i18next'
import { RankingView } from '../../_shared/ranking-view'
import { type CharacterViewType } from './config'
import { SortingView } from './views/sorting-view'

export interface ItemSizeClass {
  list: string
  row: string
}

const SIZE_CLASSES: Record<ItemSize, ItemSizeClass> = {
  sm: {
    list: 'gap-xs-3 m-xs-3',
    row: 'min-h-md-1',
  },
  md: {
    list: 'gap-xs-4 m-xs-4',
    row: 'min-h-md-5',
  },
  lg: {
    list: 'gap-xs-6 m-xs-6',
    row: 'min-h-md-7',
  },
}

interface CharacterListingProps extends ReactProps {
  characters: GenshinCharacter[]
  viewType: CharacterViewType
  itemSize: ItemSize
  selectedItemId?: string
  onClickItem: (character: GenshinCharacter) => void
}

export const CharacterListing = (props: CharacterListingProps) => {
  const { characters, viewType, itemSize, selectedItemId, className, onClickItem } = props
  const { t } = useTranslation()
  const userData = useUserDataStore((state) => state.userData?.genshin)

  const isTierListView = viewType.startsWith('tier-') || viewType === 'rating' || viewType === 'status'
  const isSortingView = viewType.startsWith('sort-')

  const classNames = SIZE_CLASSES[itemSize]
  const contentClass = cx('py-xs-0 flex h-fit flex-1 flex-wrap overflow-hidden', classNames.list)

  const getValue = (character: GenshinCharacter, viewType: ViewType) => {
    const characterUserData = userData?.characters?.[character.id]
    if (viewType === 'rating') return characterUserData?.rating
    if (viewType === 'status') return characterUserData?.status
    if (viewType === 'tier-main-dps') return characterUserData?.tierLists?.mainDps
    if (viewType === 'tier-sub-dps') return characterUserData?.tierLists?.subDps
    if (viewType === 'tier-support') return characterUserData?.tierLists?.support
    if (viewType === 'tier-exploration') return characterUserData?.tierLists?.exploration
    if (viewType === 'tier-outfit') return characterUserData?.tierLists?.outfit
    if (viewType === 'tier-personality') return characterUserData?.tierLists?.personality
    return undefined
  }

  const renderItem = (character: GenshinCharacter) => (
    <li key={character.id}>
      <CharacterItem
        character={character}
        status={userData?.characters?.[character.id]?.status}
        size={itemSize}
        selected={selectedItemId === character.id}
        onClick={onClickItem}
      />
    </li>
  )

  return (
    <div className={cx('pr-xs-3 flex min-h-0 flex-1 overflow-y-auto', className)}>
      {characters.length === 0 && !isSortingView ? (
        <p className="text-size-sm text-color-text-subtle">{t('general.notice.noCharacters')}</p>
      ) : isTierListView ? (
        <RankingView
          items={characters}
          viewType={viewType}
          classNames={{
            row: classNames.row,
            list: classNames.list,
            content: contentClass,
          }}
          getValue={getValue}
          renderItem={renderItem}
        />
      ) : isSortingView ? (
        <SortingView
          characters={characters}
          viewType={viewType}
          classNames={{
            row: classNames.row,
            content: contentClass,
          }}
          renderItem={renderItem}
        />
      ) : (
        <ul className={cx('m-0!', contentClass)}>{characters.map(renderItem)}</ul>
      )}
    </div>
  )
}
