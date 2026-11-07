import { CharacterItem } from '@app-shared/components'
import { GENSHIN_CHARACTERS, type GenshinCharacter } from '@app-shared/data/genshin'
import { RATING_LABELS, type RatingValue } from '@app-shared/data/settings'
import { type CharacterLabel, type ItemSize } from '@app-shared/state/types'
import { useUserDataStore } from '@app-shared/state/use-user-data'
import { type ViewType } from '@app-shared/utils/use-view-options'
import { formatInteger, formatPercent } from '@app-shared/utils/various'
import { useTranslation } from 'react-i18next'
import { RankingView } from '../../_shared/ranking-view'
import { SortingView } from '../../_shared/sorting-view'
import { type CharacterViewType, type SortingViewType, VIEW_CONFIGS } from './config'

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
  labelTop: CharacterLabel | null
  labelBottom: CharacterLabel | null
  selectedItemId?: string
  onClickItem: (character: GenshinCharacter) => void
}

export const CharacterListing = (props: CharacterListingProps) => {
  const { characters, viewType, itemSize, labelTop, labelBottom, selectedItemId, className, onClickItem } = props
  const { t } = useTranslation()
  const userData = useUserDataStore((state) => state.userData?.genshin)
  const userPrefs = useUserDataStore((state) => state.userData?.preferences)
  const ratingLabels = { ...RATING_LABELS, ...userPrefs?.ratingLabels }

  const isTierListView = viewType.startsWith('tier-') || viewType === 'rating' || viewType === 'status'
  const isSortingView = viewType.startsWith('sort-')
  const sortingConfig = isSortingView ? VIEW_CONFIGS[viewType as SortingViewType] : undefined

  const classNames = SIZE_CLASSES[itemSize]
  const contentClass = cx('py-xs-0 flex h-fit flex-1 flex-wrap', classNames.list)

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

  const getLabel = (character: GenshinCharacter, label: CharacterLabel | null): string | undefined => {
    if (!label) return undefined

    const data = userData?.characters?.[character.id]

    if (label === 'status') return data?.status ? t(`game.label.${data.status}`) : undefined
    if (label === 'rating')
      return data?.rating
        ? t('game.format.rating', {
            value: data.rating,
            label: ratingLabels[data.rating as RatingValue],
          })
        : undefined

    const value = data?.stats?.[label]
    if (value === undefined) return undefined

    const isPercent = label === 'er' || label === 'critRate' || label === 'critDmg'
    const formatted = isPercent ? formatPercent(value, true) : formatInteger(value, true)
    return t(`game.format.${label}`, { value: formatted })
  }

  const getSortLabel = (character: GenshinCharacter, existingLabel: CharacterLabel | null): string | undefined => {
    if (!viewType.startsWith('sort-')) return undefined

    const config = VIEW_CONFIGS[viewType as SortingViewType]
    if (config.label === existingLabel) return undefined

    const value = config.getValue(character, userData?.characters?.[character.id])
    if (value === undefined) return undefined

    const formattedValue = config.formatValue(value, true)
    if (viewType === 'sort-level') return t('game.format.level', { value: formattedValue })
    if (viewType === 'sort-hp') return t('game.format.hp', { value: formattedValue })
    if (viewType === 'sort-atk') return t('game.format.atk', { value: formattedValue })
    if (viewType === 'sort-def') return t('game.format.def', { value: formattedValue })
    if (viewType === 'sort-em') return t('game.format.em', { value: formattedValue })
    if (viewType === 'sort-er') return t('game.format.er', { value: formattedValue })
    if (viewType === 'sort-crit-rate') return t('game.format.critRate', { value: formattedValue })
    if (viewType === 'sort-crit-dmg') return t('game.format.critDmg', { value: formattedValue })
    if (viewType === 'sort-base-attack') return t('game.format.baseAttack', { value: formattedValue })
  }

  const renderItem = (character: GenshinCharacter) => (
    <li key={character.id}>
      <CharacterItem
        character={character}
        status={userData?.characters?.[character.id]?.status}
        size={itemSize}
        labelTop={labelTop ? getLabel(character, labelTop) : getSortLabel(character, labelBottom)}
        labelBottom={getLabel(character, labelBottom)}
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
      ) : sortingConfig ? (
        <SortingView
          items={characters}
          itemsPool={GENSHIN_CHARACTERS}
          valueStep={sortingConfig.step}
          emptyText={t('general.notice.noCharacters')}
          classNames={{
            row: classNames.row,
            content: contentClass,
          }}
          getValue={(character) => sortingConfig.getValue(character, userData?.characters?.[character.id])}
          formatValue={sortingConfig.formatValue}
          renderItem={renderItem}
        />
      ) : (
        <ul className={cx('m-0!', contentClass)}>{characters.map(renderItem)}</ul>
      )}
    </div>
  )
}
