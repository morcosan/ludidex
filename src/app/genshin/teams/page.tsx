import { Breadcrumb, FiltersBar, TeamCard, type Filters } from '@app-shared/components'
import { type GenshinTeam } from '@app-shared/state/types'
import { useUserDataStore } from '@app-shared/state/use-user-data'
import { unpackTeamId } from '@app-shared/state/utils'
import { useClickOutside } from '@app-shared/utils/use-click-outside'
import { useFilterParams } from '@app-shared/utils/use-filter-params'
import { useViewOptions } from '@app-shared/utils/use-view-options'
import { sortByName } from '@app-shared/utils/various'
import { IconButton } from '@design-system'
import { PlusIcon } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PreviewDrawer } from '../_shared/preview-drawer'
import { useFilterUtils } from '../_shared/use-filter-utils'
import { TEAM_FILTERS, TEAM_VIEW_TYPES } from './_partials/config'
import { SidePanel } from './_partials/side-panel'
import { TeamListing } from './_partials/team-listing'

export default function Page() {
  const { t } = useTranslation()
  const teamData = useUserDataStore((state) => state.userData?.genshin?.teams)
  const { countFilters, filterTeams } = useFilterUtils()
  const userTeams = useMemo((): GenshinTeam[] => {
    return Object.entries(teamData ?? {})
      .map(([id, team]): GenshinTeam => ({ ...team, id, charIds: unpackTeamId(id) }))
      .sort(sortByName)
  }, [teamData])
  const setGenshinTeam = useUserDataStore((state) => state.setGenshinTeam)
  const { filters, handleFiltersChange: updateFilterParams } = useFilterParams(TEAM_FILTERS)
  const { viewType, viewOptions, viewLabel, handleViewChange } = useViewOptions(TEAM_VIEW_TYPES, 'default')
  const [previewTeamId, setPreviewTeamId] = useState<string | undefined>(undefined)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
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
  const currTeams = [...filterTeams(userTeams, filters), ...emptyTeams]
  const filtersCount = countFilters(filters)
  const topBarFilters: Filters = { search: filters.search, elements: filters.elements }
  const sectionFilters: Filters = { statuses: filters.statuses, weapons: filters.weapons, nations: filters.nations }

  const handleFiltersChange = (newFilters: Filters) => {
    updateFilterParams({ ...filters, ...newFilters })
  }

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
        <FiltersBar
          filters={topBarFilters}
          type="teams"
          className="mb-xs-5 justify-between"
          onChange={handleFiltersChange}
        />

        <h1 className="flex">
          <Breadcrumb first>
            {t('general.label.teams')} ({currTeams.length})
          </Breadcrumb>
          <Breadcrumb>{viewLabel}</Breadcrumb>
          {filtersCount > 0 && <Breadcrumb>{t('general.format.withFilters', { count: filtersCount })}</Breadcrumb>}
          {filters.search && <Breadcrumb>{t('general.format.withSearch', { keyword: filters.search })}</Breadcrumb>}
        </h1>

        {/* LISTING */}
        <TeamListing
          teams={currTeams}
          viewType={viewType}
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
      <div className="w-character-card mx-xs-3 relative h-full">
        <SidePanel
          filters={sectionFilters}
          otherFilters={topBarFilters}
          viewType={viewType}
          viewOptions={viewOptions}
          className="-mr-xs-3 pr-xs-3 h-full overflow-y-auto"
          onChangeFilters={handleFiltersChange}
          onChangeView={handleViewChange}
        />

        {/* TEAM PREVIEW */}
        <PreviewDrawer opened={isPreviewOpen}>
          {previewTeam && (
            <TeamCard
              team={previewTeam}
              opened={isPreviewOpen}
              editing={isEmptyPreview}
              className="h-full"
              onSave={handleSaveTeam}
              onClose={handleClosePreview}
              onDelete={handleDeleteTeam}
            />
          )}
        </PreviewDrawer>
      </div>
    </div>
  )
}
