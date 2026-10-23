export interface PageSectionProps extends ReactProps {
  title: string
}

export const PageSection = (props: PageSectionProps) => {
  const { title, className, children } = props

  return (
    <div className={cx('divide-color-border-on-glass flex flex-col divide-y', className)}>
      <div className="text-size-xs pb-xs-3 text-color-text-subtle tracking-wider uppercase">{title}</div>

      <div className="gap-xs-0 py-xs-3 flex flex-col">{children}</div>
    </div>
  )
}
