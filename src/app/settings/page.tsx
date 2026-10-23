import { Breadcrumb } from '@app-shared/components'
import { useTranslation } from 'react-i18next'

export default function Page() {
  const { t } = useTranslation()

  return (
    <div>
      <h1 className="mb-xs-7 px-xs-7 flex">
        <Breadcrumb first large>
          {t('nav.label.settings')}
        </Breadcrumb>
      </h1>
    </div>
  )
}
