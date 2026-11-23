import { DomainItem } from '@app-shared/components'
import { type GenshinDomain } from '@app-shared/data'
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
  const contentClass = 'py-xs-0 gap-xs-4 m-xs-4 flex h-fit flex-1 flex-wrap'

  return (
    <div className={cx('pr-xs-3 pb-xs-5 flex min-h-0 flex-1 overflow-y-auto', className)}>
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
    </div>
  )
}
