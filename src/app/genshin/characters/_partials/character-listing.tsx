import { CharacterItem } from '@app-shared/components'
import { GENSHIN_CHARACTERS, type GenshinCharacter } from '@app-shared/data'
import { type CharacterLabel, type ItemSize } from '@app-shared/state/types'
import { useUserDataStore } from '@app-shared/state/use-user-data'
import { useUserSettingsStore } from '@app-shared/state/use-user-settings'
import { useCharacterLabel } from '@app-shared/utils/use-character-label'
import { type ViewType } from '@app-shared/utils/use-view-options'
import { formatInteger } from '@app-shared/utils/various'
import { ScrollArea } from '@design-system'
import { useTranslation } from 'react-i18next'
import { RankingView } from '../../_shared/ranking-view'
import { SortingView } from '../../_shared/sorting-view'
import { type CharacterViewType, type SortingViewType, VIEW_CONFIGS } from '../_config'

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
  selectedItemId?: string
  search?: string
  onClickItem: (character: GenshinCharacter) => void
}

export const CharacterListing = (props: CharacterListingProps) => {
  const { characters, viewType, selectedItemId, search, className, onClickItem } = props
  const { t } = useTranslation()
  const userData = useUserDataStore((state) => state.userData?.genshin)
  const userSettings = useUserSettingsStore((state) => state.userSettings)
  const { getCharLabel } = useCharacterLabel()

  const isRankingView = viewType.startsWith('tier-') || viewType === 'rating' || viewType === 'status'
  const isSortingView = viewType.startsWith('sort-')
  const sortingConfig = isSortingView ? VIEW_CONFIGS[viewType as SortingViewType] : undefined

  const classNames = SIZE_CLASSES[userSettings.charItemSize]
  const contentClass = cx('py-xs-0 flex h-fit flex-1 flex-wrap', classNames.list)

  const getValue = (character: GenshinCharacter, viewType: ViewType) => {
    const characterUserData = userData?.characters?.[character.id]
    if (viewType === 'rating') return characterUserData?.rating
    if (viewType === 'status') return characterUserData?.status
    if (viewType === 'tier-main-dps') return characterUserData?.tierLists?.mainDps
    if (viewType === 'tier-sub-dps') return characterUserData?.tierLists?.subDps
    if (viewType === 'tier-support') return characterUserData?.tierLists?.support
    if (viewType === 'tier-exploration') return characterUserData?.tierLists?.exploration
    if (viewType === 'tier-story') return characterUserData?.tierLists?.story
    if (viewType === 'tier-aesthetic') return characterUserData?.tierLists?.aesthetic
    if (viewType === 'tier-personality') return characterUserData?.tierLists?.personality
    return undefined
  }

  const getSortCharLabel = (character: GenshinCharacter, existingLabel: CharacterLabel | null): string | undefined => {
    if (!viewType.startsWith('sort-')) return undefined

    const config = VIEW_CONFIGS[viewType as SortingViewType]
    if (config.label === existingLabel) return undefined

    const value = config.getValue(character, userData?.characters?.[character.id])
    if (value === undefined) return undefined

    const formattedValue = `${formatInteger(value, config.step >= 1_000)}${config.type === 'percent' ? '%' : ''}`
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
        search={search}
        status={userData?.characters?.[character.id]?.status}
        size={userSettings.charItemSize}
        labelTop={
          userSettings.charLabelTop
            ? getCharLabel(character, userSettings.charLabelTop)
            : getSortCharLabel(character, userSettings.charLabelBottom)
        }
        labelBottom={getCharLabel(character, userSettings.charLabelBottom)}
        selected={selectedItemId === character.id}
        onClick={onClickItem}
      />
    </li>
  )

  return (
    <ScrollArea className={cx('flex flex-1', className)}>
      {characters.length === 0 ? (
        <p className="text-size-sm text-color-text-subtle">{t('general.notice.noCharacters')}</p>
      ) : isRankingView ? (
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
          type={sortingConfig.type}
          items={characters}
          itemsPool={GENSHIN_CHARACTERS}
          valueStep={sortingConfig.step}
          getValue={(character) => sortingConfig.getValue(character, userData?.characters?.[character.id])}
          renderItem={renderItem}
          classNames={{
            row: classNames.row,
            content: contentClass,
          }}
        />
      ) : (
        <ul className={cx('m-0!', contentClass)}>{characters.map(renderItem)}</ul>
      )}
    </ScrollArea>
  )
}
