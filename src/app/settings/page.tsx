import { Breadcrumb, PageSection } from '@app-shared/components'
import { Button } from '@design-system'
import { type ParseKeys } from 'i18next'
import { type ReactNode, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'

interface SettingSection {
  id: string
  labelKey: ParseKeys
  content: ReactNode
}

export default function Page() {
  const { t } = useTranslation()
  const { hash } = useLocation()
  const contentRef = useRef<HTMLDivElement>(null)

  const sections: SettingSection[] = [
    { id: 'preferences', labelKey: 'general.label.preferences', content: '' },
    { id: 'data-export', labelKey: 'general.label.dataExportImport', content: '' },
  ]

  useEffect(() => {
    const sectionId = hash.replace(/^#/, '')
    if (!sectionId) return
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash])

  return (
    <div className="flex h-full">
      <nav className="w-lg-1 gap-xs-2 mx-xs-9 flex flex-col">
        {sections.map(({ id, labelKey }) => (
          <Button key={id} linkHref={`#${id}`} variant="menu-default">
            {t(labelKey)}
          </Button>
        ))}
      </nav>

      <div ref={contentRef} className="gap-y-sm-0 px-sm-0 flex h-full flex-1 flex-col overflow-y-auto">
        <h1 className="mb-xs-7 flex">
          <Breadcrumb first large>
            {t('nav.label.settings')}
          </Breadcrumb>
        </h1>

        {sections.map(({ id, labelKey }) => (
          <PageSection key={id} id={id} title={t(labelKey)} className="min-h-xxl-2 scroll-mt-sm-0" />
        ))}
      </div>
    </div>
  )
}
