import { Breadcrumb, PageSection, SearchField } from '@app-shared/components'
import { Button } from '@design-system'
import { type ParseKeys } from 'i18next'
import { type ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'
import { DataSettings } from './_sections/data-settings'

interface SettingSection {
  id: string
  labelKey: ParseKeys
  content: ReactNode
}

export default function Page() {
  const { t } = useTranslation()
  const { hash } = useLocation()
  const [keyword, setKeyword] = useState('')

  const sections: SettingSection[] = [
    { id: 'preferences', labelKey: 'general.label.preferences', content: '' },
    { id: 'data-export', labelKey: 'general.label.dataExportImport', content: <DataSettings /> },
  ]
  const filteredSections = sections.filter(({ labelKey }) =>
    t(labelKey).toLocaleLowerCase().includes(keyword.trim().toLocaleLowerCase()),
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
        {filteredSections.map(({ id, labelKey }) => (
          <Button key={id} linkHref={`#${id}`} variant="menu-default">
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
              onChange={setKeyword}
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
            {filteredSections.map(({ id, labelKey, content }) => (
              <PageSection key={id} id={id} title={t(labelKey)} bodyClassName="pt-xs-5 min-h-lg-0">
                {content}
              </PageSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
