import { Breadcrumb, FiltersBar, TeamCard } from '@app-shared/components'
import { type GenshinTeam, unpackTeamId } from '@app-shared/state/types'
import { useUserDataStore } from '@app-shared/state/use-user-data'
import { useUserSettingsStore } from '@app-shared/state/use-user-settings'
import { useClickOutside } from '@app-shared/utils/use-click-outside'
import { useFilterParams } from '@app-shared/utils/use-filter-params'
import { useViewOptions } from '@app-shared/utils/use-view-options'
import { IconButton } from '@design-system'
import { PlusIcon } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { filterTeamsByChars } from '../_shared/config'
import { PreviewDrawer } from '../_shared/preview-drawer'
import { TEAM_FILTERS, TEAM_VIEW_TYPES } from './_partials/config'
import { SidePanel } from './_partials/side-panel'
import { TeamListing } from './_partials/team-listing'

export default function Page() {
  const { t } = useTranslation()
  const teamData = useUserDataStore((state) => state.userData?.genshin?.teams)
  const gameData = useUserDataStore((state) => state.userData?.genshin)
  const userTeams = useMemo((): GenshinTeam[] => {
    return Object.entries(teamData ?? {})
      .map(([id, team]): GenshinTeam => ({ ...team, id, charIds: unpackTeamId(id) }))
      .sort((teamA, teamB) => teamA.name.localeCompare(teamB.name))
  }, [teamData])
  const setGenshinTeam = useUserDataStore((state) => state.setGenshinTeam)
  const userPrefs = useUserDataStore((state) => state.userData?.preferences)
  const userSettings = useUserSettingsStore((state) => state.userSettings)
  const teamItemSize = userSettings?.teamItemSize ?? 'md'
  const setTeamItemSize = useUserSettingsStore((state) => state.setTeamItemSize)
  const setUserSettings = useUserSettingsStore((state) => state.setUserSettings)
  const { filters, handleFiltersChange } = useFilterParams(TEAM_FILTERS)
  const [previewTeamId, setPreviewTeamId] = useState<string | undefined>(undefined)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const { viewType, viewOptions, viewLabel, handleViewChange } = useViewOptions(TEAM_VIEW_TYPES, 'default')
  const [emptyTeams, setEmptyTeams] = useState<GenshinTeam[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const canScrollRef = useRef(false)

  useClickOutside({
    enabled: isPreviewOpen,
    allowlist: ['[data-team-item]', '[data-preview-drawer]', '[data-character-modal]', '[data-team-delete-modal]'],
    callback: () => setIsPreviewOpen(false),
  })

  const previewTeam = [...userTeams, ...emptyTeams].find((team) => team.id === previewTeamId)
  const isEmptyPreview = emptyTeams.some((team) => team.id === previewTeamId)
  const currTeams = [...filterTeamsByChars(userTeams, filters), ...emptyTeams]
  const filtersCount = filters.elements.length + filters.weapons.length + filters.nations.length

  const handleClickTeam = (team: GenshinTeam) => {
    if (isPreviewOpen && previewTeamId === team.id) {
      setIsPreviewOpen(false)
      return
    }
    setPreviewTeamId(team.id)
    setIsPreviewOpen(true)
  }

  const handleClosePreview = () => {
    setIsPreviewOpen(false)
  }

  const handleSaveTeam = (team: GenshinTeam) => {
    if (!previewTeamId) return
    setGenshinTeam(previewTeamId, null)
    setGenshinTeam(team.id, team)
    setPreviewTeamId(team.id)
    setEmptyTeams((state) => state.filter((emptyTeam) => emptyTeam.id !== previewTeamId))
  }

  const handleDeleteTeam = (team: GenshinTeam) => {
    const isEmptyTeam = emptyTeams.some((emptyTeam) => emptyTeam.id === team.id)
    if (isEmptyTeam) {
      setEmptyTeams((state) => state.filter((emptyTeam) => emptyTeam.id !== team.id))
    } else {
      setGenshinTeam(team.id, null)
    }
    setPreviewTeamId(undefined)
    setIsPreviewOpen(false)
  }

  const handleClickNewTeam = () => {
    canScrollRef.current = true
    const id = `empty-team-${emptyTeams.length}`
    setEmptyTeams((state) => [...state, { id, name: '', charIds: [] }])
    setPreviewTeamId(id)
    setIsPreviewOpen(true)
  }

  useEffect(() => {
    if (!canScrollRef.current) return
    canScrollRef.current = false
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [emptyTeams])

  return (
    <div className="flex h-full">
      {/* LEFT SIDE */}
      <div className="relative flex h-full flex-1 flex-col">
        <FiltersBar value={filters} className="mb-xs-5" onChange={handleFiltersChange} />

        <h1 className="flex">
          <Breadcrumb first>
            {t('general.label.teams')} ({currTeams.length})
          </Breadcrumb>
          <Breadcrumb>{viewLabel}</Breadcrumb>
          {filtersCount > 0 && <Breadcrumb>{t('general.format.withFilters', { count: filtersCount })}</Breadcrumb>}
        </h1>

        {/* LISTING */}
        <TeamListing
          teams={currTeams}
          viewType={viewType}
          itemSize={teamItemSize}
          selectedTeamId={isPreviewOpen ? previewTeamId : undefined}
          scrollRef={scrollRef}
          className={viewType === 'default' ? 'mt-xs-9' : 'mt-xs-7'}
          onClickItem={handleClickTeam}
        />

        {/* NEW TEAM BUTTON */}
        <IconButton
          tooltip={t('general.action.createNewTeam')}
          variant="primary"
          size="lg"
          floating
          className="bottom-xs-3 right-xs-8 z-sticky absolute!"
          onClick={handleClickNewTeam}
        >
          <PlusIcon aria-hidden className="h-sm-0 w-sm-0" />
        </IconButton>
      </div>

      {/* RIGHT SIDE */}
      <div className="min-w-character-card mx-xs-3 relative h-full">
        <SidePanel
          itemSize={teamItemSize}
          viewType={viewType}
          viewOptions={viewOptions}
          className="-mr-xs-3 pr-xs-3 h-full overflow-y-auto"
          onChangeItemSize={setTeamItemSize}
          onChangeView={handleViewChange}
        />

        {/* TEAM PREVIEW */}
        <PreviewDrawer opened={isPreviewOpen}>
          {previewTeam && (
            <TeamCard
              team={previewTeam}
              userData={gameData}
              userPrefs={userPrefs}
              userSettings={userSettings}
              opened={isPreviewOpen}
              editing={isEmptyPreview}
              className="h-full"
              onSave={handleSaveTeam}
              onClose={handleClosePreview}
              onDelete={handleDeleteTeam}
              onChangeSettings={setUserSettings}
            />
          )}
        </PreviewDrawer>
      </div>
    </div>
  )
}
