import { DomainItem } from '@app-shared/components'
import { type GenshinDomain } from '@app-shared/data'
import { ScrollArea } from '@design-system'
import { useTranslation } from 'react-i18next'

interface DomainListingProps extends ReactProps {
  domains: GenshinDomain[]
  selectedItemId?: string
  search?: string
  onClickItem: (domain: GenshinDomain) => void
}

export const DomainListing = (props: DomainListingProps) => {
  const { domains, selectedItemId, search, className, onClickItem } = props
  const { t } = useTranslation()
  const contentClass = cx('py-xs-0 gap-xs-4 m-xs-4 flex h-fit flex-1 flex-wrap')

  return (
    <ScrollArea className={cx('flex flex-1', className)}>
      {domains.length === 0 ? (
        <p className="text-size-sm text-color-text-subtle">{t('general.notice.noDomains')}</p>
      ) : (
        <ul className={cx('m-0!', contentClass)}>
          {domains.map((domain) => (
            <li key={domain.id}>
              <DomainItem
                domain={domain}
                search={search}
                selected={selectedItemId === domain.id}
                onClick={onClickItem}
              />
            </li>
          ))}
        </ul>
      )}
    </ScrollArea>
  )
}
