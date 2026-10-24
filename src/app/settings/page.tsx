import { Breadcrumb, PageSection } from '@app-shared/components'
import { Button } from '@design-system'
import { useTranslation } from 'react-i18next'

export default function Page() {
  const { t } = useTranslation()

  return (
    <div className="flex h-full">
      <nav className="w-lg-1 gap-xs-2 mx-xs-9 flex flex-col">
        <Button linkHref={'#'} variant="menu-default">
          {t('general.label.preferences')}
        </Button>
        <Button linkHref={'#'} variant="menu-default">
          {t('general.label.dataExportImport')}
        </Button>
      </nav>

      <div className="gap-y-sm-0 px-sm-0 flex h-full flex-1 flex-col overflow-y-auto">
        <h1 className="mb-xs-7 flex">
          <Breadcrumb first large>
            {t('nav.label.settings')}
          </Breadcrumb>
        </h1>

        <PageSection title={t('general.label.preferences')} className="min-h-xl-9"></PageSection>

        <PageSection title={t('general.label.dataExportImport')} className="min-h-xl-9"></PageSection>
      </div>
    </div>
  )
}
