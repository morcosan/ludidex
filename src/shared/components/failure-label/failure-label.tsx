import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'

export const FailureLabel = () => {
  const { t } = useTranslation()

  return (
    <span className="text-size-xs font-family-sans font-weight-sm flex items-center">
      <FontAwesomeIcon icon={faSkullCrossbones} className="mr-xs-0 text-size-xxs -mt-px" />
      {t('general.label.failed')}
    </span>
  )
}
