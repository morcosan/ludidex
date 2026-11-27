import { TeamItem } from '@app-shared/components'
import { GENSHIN_DOMAIN_IDS } from '@app-shared/data'
import { type GenshinTeam, type ItemSize } from '@app-shared/state/types'
import { useUserSettingsStore } from '@app-shared/state/use-user-settings'
import { type ViewType } from '@app-shared/utils/use-view-options'
import { ScrollArea } from '@design-system'
import { type RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import { RankingView } from '../../_shared/ranking-view'
import { SortingView } from '../../_shared/sorting-view'
import { DOMAIN_VIEW_STEP, type TeamViewType } from '../_config'

interface ItemSizeClass {
  list: string
  row: string
}

const SIZE_CLASSES: Record<ItemSize, ItemSizeClass> = {
  sm: {
    list: 'gap-xs-4 m-xs-4',
    row: 'min-h-sm-9',
  },
  md: {
    list: 'gap-xs-5 m-xs-4',
    row: 'min-h-md-0',
  },
  lg: {
    list: 'gap-xs-6 m-xs-5',
    row: 'min-h-md-2',
  },
}

interface TeamListingProps extends ReactProps {
  teams: GenshinTeam[]
  teamsPool: GenshinTeam[]
  search?: string
  viewType: TeamViewType
  selectedTrialId?: string
  selectedTeamId?: string
  scrollRef?: RefObject<HTMLDivElement | null>
  onClickItem?: (team: GenshinTeam) => void
}

export const TeamListing = (props: TeamListingProps) => {
  const { teams, teamsPool, viewType, selectedTrialId, selectedTeamId, scrollRef, search, className } = props
  const { onClickItem } = props
  const { t } = useTranslation()
  const userSettings = useUserSettingsStore((state) => state.userSettings)
  const classNames = SIZE_CLASSES[userSettings.teamItemSize]

  const isRankingView = viewType === 'rating' || viewType.startsWith('tier-')
  const isSortingView = GENSHIN_DOMAIN_IDS.includes(viewType)
  const contentClass = cx('py-xs-0 flex h-fit flex-1 flex-wrap', classNames.list)

  const getValue = (team: GenshinTeam, viewType: ViewType) => {
    if (viewType === 'rating') return team.rating
    if (viewType === 'tier-synergy') return team.tierLists?.synergy
    if (viewType === 'tier-story') return team.tierLists?.story
    if (viewType === 'tier-aesthetic') return team.tierLists?.aesthetic
    if (viewType === 'tier-affinity') return team.tierLists?.affinity
    return undefined
  }

  const renderItem = (team: GenshinTeam) => (
    <li key={team.id}>
      <TeamItem
        team={team}
        search={search}
        size={userSettings.teamItemSize}
        selected={team.id === selectedTeamId}
        onClick={onClickItem}
      />
    </li>
  )

  return (
    <ScrollArea ref={scrollRef} className={cx('flex flex-1', className)}>
      {teams.length === 0 ? (
        <p className="text-size-sm text-color-text-subtle">{t('general.notice.noTeams')}</p>
      ) : isRankingView ? (
        <RankingView
          items={teams}
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
          type="timer"
          items={teams}
          itemsPool={teamsPool}
          valueStep={DOMAIN_VIEW_STEP}
          getValue={(team) => (selectedTrialId ? team.trials?.[selectedTrialId] : undefined)}
          renderItem={renderItem}
          sortOrder="asc"
          classNames={{
            row: classNames.row,
            content: contentClass,
          }}
        />
      ) : (
        <ul className={cx('m-0! p-0!', contentClass)}>{teams.map(renderItem)}</ul>
      )}
    </ScrollArea>
  )
}
