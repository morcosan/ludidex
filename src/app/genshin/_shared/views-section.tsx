import { PageSection, SearchField } from '@app-shared/components'
import { type ViewOption, type ViewType } from '@app-shared/utils/use-view-options'
import { Button, TextHighlight } from '@design-system'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ViewsSectionProps<T extends ViewType> extends ReactProps {
  viewType: T
  viewOptions: readonly ViewOption<T>[]
  onChangeView?: (viewType: T) => void
}

export const ViewsSection = <T extends ViewType>(props: ViewsSectionProps<T>) => {
  const { viewType, viewOptions, className, onChangeView } = props
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const searchTerm = search.toLocaleLowerCase()
  const currOptions = viewOptions.filter((option) => {
    return (
      option.label.toLocaleLowerCase().includes(searchTerm) ||
      option.labels?.some((label) => label.toLocaleLowerCase().includes(searchTerm))
    )
  })

  return (
    <PageSection
      title={t('general.label.views')}
      actions={
        <SearchField
          id="views-search"
          value={search}
          label={t('general.action.searchViews')}
          size="xs"
          className="w-lg-0"
          onChange={setSearch}
        />
      }
      className={className}
      classNames={{ body: 'gap-xs-0' }}
    >
      {currOptions.length > 0 ? (
        currOptions.map((option) => (
          <Button
            key={option.value}
            variant="menu-default"
            size="lg"
            state={viewType === option.value ? 'selected' : 'active'}
            className="w-full"
            onClick={() => onChangeView?.(option.value)}
          >
            <span className="mr-xs-2 w-sm-0 flex-center flex">{option.icon}</span>
            <TextHighlight text={option.label} keyword={search} className="truncate" />
          </Button>
        ))
      ) : (
        <p className="py-xs-2 text-size-sm text-color-text-subtle">{t('general.notice.noViews')}</p>
      )}
    </PageSection>
  )
}
