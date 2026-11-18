import { Card, Image } from '@design-system'
import { SwordsIcon } from 'lucide-react'
import { type GenshinDomain } from '../../data'
import { useUserAssetsStore } from '../../state/use-user-assets'

export interface DomainItemProps extends ReactProps {
  domain: GenshinDomain
  selected?: boolean
  className?: string
  onClick?: (domain: GenshinDomain) => void
}

export const DomainItem = (props: DomainItemProps) => {
  const { domain, selected, className, onClick } = props
  const { getDomainImages } = useUserAssetsStore()

  const sizeClass = cx('w-lg-2')

  return (
    <Card
      state={selected ? 'selected' : 'active'}
      className={className}
      classNames={{
        surface: 'p-xs-0!',
        content: 'relative flex w-full flex-col',
      }}
      data-domain-item
      onClick={() => onClick?.(domain)}
    >
      <span className={cx(sizeClass, 'bg-color-grey-3 relative aspect-2/1 overflow-hidden rounded-md')}>
        <Image srcs={getDomainImages(domain.id)} className="size-full object-cover" />

        <span className="right-xs-1 absolute bottom-px left-px z-10 flex">
          <span
            className={cx(
              'px-xs-2 py-xs-0 flex items-center rounded-xs rounded-bl-sm!',
              'text-size-xs font-weight-md bg-color-white-alpha-14 leading-1',
            )}
          >
            {domain.trials.length}
            <SwordsIcon aria-hidden className="size-xs-6 ml-xs-1" />
          </span>
        </span>
      </span>

      <span
        className={cx(
          'translate-y-xs-0 py-xs-1 min-h-lh rounded-b-md',
          'text-size-xs truncate text-center leading-1',
          sizeClass,
        )}
      >
        {domain.name}
      </span>
    </Card>
  )
}
