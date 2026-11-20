import { Card } from '@design-system'
import { useRef, type ReactNode } from 'react'
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form'
import { RATING_LABELS } from '../../data'
import { useUserDataStore } from '../../state/use-user-data'
import { useStickyOnTop } from '../../utils/use-sticky-on-top'
import { RatingField } from '../rating-field/rating-field'
import { StatusField } from '../status-field/status-field'

interface CardTemplateProps<T extends FieldValues> extends ReactProps {
  banner: ReactNode
  title: ReactNode | ((sticky: boolean) => ReactNode)
  control?: Control<T>
  editing?: boolean
  fieldNames?: (keyof T & ('rating' | 'status'))[]
  actions?: ReactNode
  className?: string
  classNames?: { content?: string }
}

export const CardTemplate = <T extends FieldValues>(props: CardTemplateProps<T>) => {
  const { actions, banner, children, className, classNames, control, editing, fieldNames = [], title } = props
  const userPrefs = useUserDataStore((state) => state.userData?.preferences)
  const ratingLabels = { ...RATING_LABELS, ...userPrefs?.ratingLabels }
  const scrollRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const isTitleSticky = useStickyOnTop({ scrollRef, stickyRef: titleRef })

  return (
    <Card className={cx('w-character-card', className)} classNames={{ surface: 'p-0!', content: 'flex flex-col' }}>
      <div ref={scrollRef} className="p-xs-0 pb-xs-2! flex h-full flex-col overflow-y-auto">
        <div className="relative">
          {banner}

          <div className="top-xs-0 left-xs-0 right-xs-0 gap-y-xs-0 absolute z-10 flex flex-col">
            {control &&
              fieldNames.map((fieldName) => (
                <div key={fieldName} className="px-xs-2 py-xs-0 bg-color-white max-w-fit rounded-md">
                  <Controller
                    control={control}
                    name={fieldName as FieldPath<T>}
                    render={({ field }) =>
                      fieldName === 'rating' ? (
                        <RatingField
                          value={field.value ?? undefined}
                          labels={ratingLabels}
                          readonly={!editing}
                          className={cx(editing ? 'w-md-7 my-xs-1' : 'mr-xs-0')}
                          onChange={(value) => field.onChange(value ?? null)}
                        />
                      ) : (
                        <StatusField
                          value={field.value ?? undefined}
                          readonly={!editing}
                          className={cx(editing ? 'w-md-7 my-xs-1' : 'mr-xs-0')}
                          onChange={(value) => field.onChange(value ?? null)}
                        />
                      )
                    }
                  />
                </div>
              ))}
          </div>
        </div>

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
    </Card>
  )
}
