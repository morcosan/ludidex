import { Breadcrumb, PageSection } from '@app-shared/components'
import { useTranslation } from 'react-i18next'

export default function Page() {
  const { t } = useTranslation()

  return (
    <div className="gap-y-sm-0 px-sm-0 flex flex-col overflow-y-auto">
      <h1 className="mb-xs-7 flex">
        <Breadcrumb first large>
          {t('nav.label.settings')}
        </Breadcrumb>
      </h1>

      <PageSection title={t('general.label.dataExportImport')} className=""></PageSection>
    </div>
  )
}
