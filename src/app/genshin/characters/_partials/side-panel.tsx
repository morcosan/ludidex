import { AppearanceSection } from '@app-shared/components'
import { type ViewOption } from '@app-shared/utils/use-view-options'
import { ViewListing } from '../../_shared/view-listing'
import { type CharacterViewType } from './config'

interface SideFiltersProps extends ReactProps {
  viewType: CharacterViewType
  viewOptions: readonly ViewOption<CharacterViewType>[]
  onChangeView: (viewType: CharacterViewType) => void
}

export const SidePanel = (props: SideFiltersProps) => {
  const { viewType, viewOptions, className, onChangeView } = props

  return (
    <div className={cx('px-xs-8 py-xs-4 gap-y-sm-5 flex flex-col', className)}>
      {/* VIEW TYPES */}
      <ViewListing viewType={viewType} viewOptions={viewOptions} onChangeView={onChangeView} />

      {/* APPEARANCE */}
      <AppearanceSection className="pb-sm-9" />
    </div>
  )
}
