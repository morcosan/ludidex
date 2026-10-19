export interface TagProps extends ReactProps {}

export const Tag = ({ children, className }: TagProps) => (
  <span
    className={cx('px-xs-2 py-px', 'bg-color-grey-3 border-color-grey-6 rounded-sm border', 'text-size-xs', className)}
  >
    {children}
  </span>
)
