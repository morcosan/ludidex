import { Breadcrumb, SearchField } from '@app-shared/components'
import { Button } from '@design-system'
import { type ParseKeys } from 'i18next'
import { type ComponentType, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useSearchParams } from 'react-router'
import { TextHighlight } from './_partials/text-highlight'
import { type SectionProps } from './_partials/types'
import { useSearchMap } from './_partials/use-search-map'
import { DataSection } from './_sections/data-section'
import { PrefsSection } from './_sections/prefs-section'

interface SettingSection {
  id: string
  labelKey: ParseKeys
  component: ComponentType<SectionProps>
}

export default function Page() {
  const { t } = useTranslation()
  const searchMap = useSearchMap()
  const { hash } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [keyword, setKeyword] = useState(searchParams.get('search') ?? '')

  const handleSearchChange = useCallback(
    (value: string) => {
      setKeyword(value)
      setSearchParams((params) => {
        if (value) params.set('search', value)
        else params.delete('search')
        return params
      })
    },
    [setSearchParams],
  )

  useEffect(() => {
    setKeyword(searchParams.get('search') ?? '')
  }, [searchParams])

  const sections: SettingSection[] = [
    { id: 'prefs', labelKey: 'general.label.preferences', component: PrefsSection },
    { id: 'data', labelKey: 'general.label.dataExportImport', component: DataSection },
  ]
  const keywords = keyword.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean)
  const activeSections = sections.filter(
    ({ id }) =>
      keywords.length === 0 ||
      searchMap[id]?.some((text) => keywords.some((word) => text.toLocaleLowerCase().includes(word))),
  )

  useEffect(() => {
    const sectionId = hash.replace(/^#/, '')
    if (!sectionId) return
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash])

  return (
    <div className="flex h-full">
      {/* LEFT SIDE */}
      <nav className="w-lg-1 gap-xs-2 mx-xs-9 flex flex-col">
        {sections.map(({ id, labelKey }) => (
          <Button
            key={id}
            linkHref={`${searchParams.size ? `?${searchParams.toString()}` : ''}#${id}`}
            variant="menu-default"
            state={activeSections.some((section) => section.id === id) ? 'active' : 'disabled'}
          >
            {t(labelKey)}
          </Button>
        ))}
      </nav>

      {/* RIGHT SIDE */}
      <div className="flex h-full min-w-0 flex-1 flex-col">
        {/* HEADER */}
        <div className="max-w-xxl-0 mx-auto w-full">
          <div className="gap-xs-5 flex flex-col">
            <SearchField
              id={'settings-search'}
              value={keyword}
              label={t('general.action.searchSettings')}
              size="sm"
              className="w-full"
              onChange={handleSearchChange}
            />
            <h1 className="mb-xs-7 flex">
              <Breadcrumb first>{t('nav.label.settings')}</Breadcrumb>
              {keyword && <Breadcrumb>{t('general.label.withSearch', { keyword })}</Breadcrumb>}
            </h1>
          </div>
        </div>

        {/* SECTIONS */}
        <div className="mt-xs-4 min-h-0 flex-1 overflow-y-auto">
          <div className="max-w-xxl-0 px-xs-1 mx-auto w-full">
            {activeSections.map(({ component: Section, id, labelKey }) => (
              <Section
                key={id}
                id={id}
                title={<TextHighlight text={t(labelKey)} keyword={keyword} />}
                keyword={keyword}
                className="min-h-lg-0"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
