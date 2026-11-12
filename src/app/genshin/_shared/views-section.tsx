import { PageSection } from '@app-shared/components'
import { type ViewOption, type ViewType } from '@app-shared/utils/use-view-options'
import { Button } from '@design-system'
import { useTranslation } from 'react-i18next'

interface ViewsSectionProps<T extends ViewType> extends ReactProps {
  viewType: T
  viewOptions: readonly ViewOption<T>[]
  onChangeView: (viewType: T) => void
}

export const ViewsSection = <T extends ViewType>(props: ViewsSectionProps<T>) => {
  const { viewType, viewOptions, className, onChangeView } = props
  const { t } = useTranslation()

  return (
    <PageSection title={t('general.label.views')} className={className} classNames={{ body: 'gap-xs-0' }}>
      {viewOptions.map((option) => (
        <Button
          key={option.value}
          variant="menu-default"
          size="md"
          state={viewType === option.value ? 'selected' : 'active'}
          className="w-full"
          onClick={() => onChangeView(option.value)}
        >
          <span className="mr-xs-2 w-sm-0 flex-center flex">{option.icon}</span>
          {option.label}
        </Button>
      ))}
    </PageSection>
  )
}
