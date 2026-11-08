import { type ReactNode } from 'react'
import { type CharacterStatus, RATING_LABELS, type RatingValue } from '../../data/settings'
import { type UserPrefs } from '../../state/types'
import { RatingField } from '../rating-field/rating-field'
import { StatusField } from '../status-field/status-field'

interface CardBannerProps {
  banner?: ReactNode
  editing?: boolean
  userPrefs?: UserPrefs
  ratingValue?: RatingValue
  statusValue?: CharacterStatus
  onChangeRating?: (value: RatingValue | undefined) => void
  onChangeStatus?: (value: CharacterStatus | undefined) => void
}

export const CardBanner = (props: CardBannerProps) => {
  const { banner, editing, userPrefs, ratingValue, statusValue, onChangeRating, onChangeStatus } = props
  const ratingLabels = { ...RATING_LABELS, ...userPrefs?.ratingLabels }
  const showStatus = statusValue !== undefined || onChangeStatus !== undefined

  return (
    <div className="relative">
      {banner}

      <div className="top-xs-0 left-xs-0 right-xs-0 gap-y-xs-0 absolute z-10 flex flex-col">
        <div className="px-xs-2 py-xs-0 bg-color-white max-w-fit rounded-md">
          <RatingField
            value={ratingValue}
            labels={ratingLabels}
            readonly={!editing}
            className={cx(editing ? 'w-md-7 my-xs-1' : 'mr-xs-0')}
            onChange={onChangeRating}
          />
        </div>
        {showStatus && (
          <div className="px-xs-2 py-xs-0 bg-color-white max-w-fit rounded-md">
            <StatusField
              value={statusValue}
              readonly={!editing}
              className={cx(editing ? 'w-md-7 my-xs-1' : 'mr-xs-0')}
              onChange={onChangeStatus}
            />
          </div>
        )}
      </div>
    </div>
  )
}
