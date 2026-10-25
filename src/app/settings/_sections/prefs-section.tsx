import { PageSection } from '@app-shared/components'
import { Button } from '@design-system'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LabelsModal } from '../_partials/labels-modal'
import { TextHighlight } from '../_partials/text-highlight'
import { type SectionProps } from '../_partials/types'

export const PrefsSection = (props: SectionProps) => {
  const { id, title, keyword, className } = props
  const { t } = useTranslation()
  const [isEditingLabels, setIsEditingLabels] = useState(false)

  return (
    <PageSection id={id} title={title} className={className} bodyClassName="pt-xs-5">
      <div className="flex items-center">
        <TextHighlight text={t('general.label.favoriteLabels')} keyword={keyword} />:
        <Button
          state={isEditingLabels ? 'loading' : 'active'}
          className="ml-xs-3"
          onClick={() => setIsEditingLabels(true)}
        >
          <FontAwesomeIcon icon={faPenToSquare} aria-hidden className="text-size-md mr-xs-1" />
          <TextHighlight text={t('general.action.editLabels')} keyword={keyword} />
        </Button>
      </div>

      <LabelsModal opened={isEditingLabels} onClose={() => setIsEditingLabels(false)} />
    </PageSection>
  )
}
