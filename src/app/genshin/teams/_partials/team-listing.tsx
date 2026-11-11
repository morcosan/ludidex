import { TeamItem } from '@app-shared/components'
import { type GenshinTeam, type ItemSize } from '@app-shared/state/types'
import { useUserSettingsStore } from '@app-shared/state/use-user-settings'
import { type ViewType } from '@app-shared/utils/use-view-options'
import { type RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import { RankingView } from '../../_shared/ranking-view'
import { type TeamViewType } from './config'

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
  viewType: TeamViewType
  selectedTeamId?: string
  scrollRef?: RefObject<HTMLDivElement | null>
  onClickItem?: (team: GenshinTeam) => void
}

export const TeamListing = (props: TeamListingProps) => {
  const { teams, viewType, selectedTeamId, scrollRef, className, onClickItem } = props
  const { t } = useTranslation()
  const userSettings = useUserSettingsStore((state) => state.userSettings)
  const classNames = SIZE_CLASSES[userSettings.teamItemSize]

  const isTierListView = viewType === 'rating'
  const contentClass = cx('py-xs-0 flex h-fit flex-1 flex-wrap', classNames.list)

  const getValue = (team: GenshinTeam, viewType: ViewType) => {
    if (viewType === 'rating') return team.rating
    return undefined
  }

  const renderItem = (team: GenshinTeam) => (
    <li key={team.id}>
      <TeamItem
        team={team}
        size={userSettings.teamItemSize}
        selected={team.id === selectedTeamId}
        onClick={onClickItem}
      />
    </li>
  )

  return (
    <div ref={scrollRef} className={cx('pr-xs-3 flex min-h-0 flex-1 overflow-y-auto', className)}>
      {teams.length === 0 ? (
        <p className="text-size-sm text-color-text-subtle">{t('general.notice.noTeams')}</p>
      ) : isTierListView ? (
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
      ) : (
        <ul className={cx('m-0! p-0!', contentClass)}>{teams.map(renderItem)}</ul>
      )}
    </div>
  )
}
