import { Card } from '@design-system'
import { useRef, type ReactNode } from 'react'
import { type CharacterStatus, type RatingValue } from '../../data'
import { useStickyOnTop } from '../../utils/use-sticky-on-top'
import { CardBanner } from './card-banner'

interface CardTemplateProps extends ReactProps {
  banner: ReactNode
  title: ReactNode | ((sticky: boolean) => ReactNode)
  editing?: boolean
  actions?: ReactNode
  modals?: ReactNode
  ratingValue?: RatingValue
  statusValue?: CharacterStatus
  className?: string
  classNames?: { content?: string }
  onChangeRating?: (value: RatingValue | undefined) => void
  onChangeStatus?: (value: CharacterStatus | undefined) => void
}

export const CardTemplate = (props: CardTemplateProps) => {
  const {
    actions,
    banner,
    children,
    className,
    classNames,
    editing,
    modals,
    ratingValue,
    statusValue,
    title,
    onChangeRating,
    onChangeStatus,
  } = props
  const scrollRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const isTitleSticky = useStickyOnTop({ scrollRef, stickyRef: titleRef })

  return (
    <Card className={cx('w-character-card', className)} classNames={{ surface: 'p-0!', content: 'flex flex-col' }}>
      <div ref={scrollRef} className="p-xs-0 pb-xs-2! flex h-full flex-col overflow-y-auto">
        <CardBanner
          banner={banner}
          editing={editing}
          ratingValue={ratingValue}
          statusValue={statusValue}
          onChangeRating={onChangeRating}
          onChangeStatus={onChangeStatus}
        />

        <div
          ref={titleRef}
          className={cx(
            'my-xs-2 -top-xs-0 px-xs-8 py-xs-2 sticky z-10',
            'bg-color-bg-card rounded-t-md',
            isTitleSticky && 'border-color-border-subtle shadow-below-sm',
          )}
        >
          <div
            className={cx(
              'min-h-field-h-md text-size-xl leading-sm flex flex-col justify-center',
              !editing && 'font-weight-lg',
            )}
          >
            {typeof title === 'function' ? title(isTitleSticky) : title}
          </div>
        </div>

        <div className={cx('px-xs-8 pb-xs-4 gap-y-sm-2 flex flex-col', classNames?.content)}>{children}</div>

        {actions}
      </div>

      {modals}
    </Card>
  )
}
