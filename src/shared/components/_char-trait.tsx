export interface CharTraitProps {
  label: string
  icon?: string
  iconClass?: string
}

export const CharTrait = ({ label, icon, iconClass }: CharTraitProps) => {
  return (
    <span className="gap-xs-1 flex items-center">
      {icon && <img src={icon} alt="" className={cx('h-xs-9 w-xs-9', iconClass)} />}
      <span className="text-size-sm">{label}</span>
    </span>
  )
}
