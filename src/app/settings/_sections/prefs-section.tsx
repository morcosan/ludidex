import { PageSection } from '@app-shared/components'
import { Button } from '@design-system'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LabelsModal } from '../_partials/labels-modal'
import { TagsModal } from '../_partials/tags-modal'
import { TextHighlight } from '../_partials/text-highlight'
import { type SectionProps } from '../_partials/types'

export const PrefsSection = (props: SectionProps) => {
  const { id, title, keyword, className, classNames } = props
  const { t } = useTranslation()
  const [isEditingRating, setIsEditingRating] = useState(false)
  const [isEditingTierList, setIsEditingTierList] = useState(false)
  const [isEditingTags, setIsEditingTags] = useState(false)

  return (
    <PageSection id={id} title={title} className={className} classNames={{ body: 'pt-xs-5 gap-y-xs-3 flex flex-col' }}>
      {/* RATINGS */}
      <div className="flex items-center">
        <TextHighlight
          text={`${t('general.label.ratingLabels')}:`}
          keyword={keyword}
          className={classNames?.label}
        />
        <Button
          state={isEditingRating ? 'loading' : 'active'}
          className="ml-xs-3"
          onClick={() => setIsEditingRating(true)}
        >
          <FontAwesomeIcon icon={faPenToSquare} aria-hidden className="text-size-md mr-xs-1" />
          <TextHighlight text={t('general.action.editLabels')} keyword={keyword} />
        </Button>
      </div>

      {/* TIER LISTS */}
      <div className="flex items-center">
        <TextHighlight
          text={`${t('general.label.tierListLabels')}:`}
          keyword={keyword}
          className={classNames?.label}
        />
        <Button
          state={isEditingTierList ? 'loading' : 'active'}
          className="ml-xs-3"
          onClick={() => setIsEditingTierList(true)}
        >
          <FontAwesomeIcon icon={faPenToSquare} aria-hidden className="text-size-md mr-xs-1" />
          <TextHighlight text={t('general.action.editLabels')} keyword={keyword} />
        </Button>
      </div>

      {/* TAGS */}
      <div className="flex items-center">
        <TextHighlight text={`${t('general.label.tags')}:`} keyword={keyword} className={classNames?.label} />
        <Button
          state={isEditingTags ? 'loading' : 'active'}
          className="ml-xs-3"
          onClick={() => setIsEditingTags(true)}
        >
          <FontAwesomeIcon icon={faPenToSquare} aria-hidden className="text-size-md mr-xs-1" />
          <TextHighlight text={t('general.action.editTags')} keyword={keyword} />
        </Button>
      </div>

      <LabelsModal opened={isEditingRating} variant="rating" onClose={() => setIsEditingRating(false)} />
      <LabelsModal opened={isEditingTierList} variant="tier-list" onClose={() => setIsEditingTierList(false)} />
      <TagsModal opened={isEditingTags} onClose={() => setIsEditingTags(false)} />
    </PageSection>
  )
}
