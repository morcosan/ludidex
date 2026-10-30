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
  const [isEditingRating, setIsEditingRating] = useState(false)
  const [isEditingTierList, setIsEditingTierList] = useState(false)

  return (
    <PageSection id={id} title={title} className={className} bodyClass="pt-xs-5 gap-y-xs-3 flex flex-col">
      <div className="flex items-center">
        <TextHighlight text={t('general.label.ratingLabels')} keyword={keyword} />:
        <Button
          state={isEditingRating ? 'loading' : 'active'}
          className="ml-xs-3"
          onClick={() => setIsEditingRating(true)}
        >
          <FontAwesomeIcon icon={faPenToSquare} aria-hidden className="text-size-md mr-xs-1" />
          <TextHighlight text={t('general.action.editLabels')} keyword={keyword} />
        </Button>
      </div>

      <div className="flex items-center">
        <TextHighlight text={t('general.label.tierListLabels')} keyword={keyword} />:
        <Button
          state={isEditingTierList ? 'loading' : 'active'}
          className="ml-xs-3"
          onClick={() => setIsEditingTierList(true)}
        >
          <FontAwesomeIcon icon={faPenToSquare} aria-hidden className="text-size-md mr-xs-1" />
          <TextHighlight text={t('general.action.editLabels')} keyword={keyword} />
        </Button>
      </div>

      <LabelsModal opened={isEditingRating} variant="rating" onClose={() => setIsEditingRating(false)} />
      <LabelsModal opened={isEditingTierList} variant="tier-list" onClose={() => setIsEditingTierList(false)} />
    </PageSection>
  )
}
