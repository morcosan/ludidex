export interface SlotCornerProps {
  digit: string
  variant?: 'slot' | 'item'
}

export const SlotCorner = (props: SlotCornerProps) => {
  const { digit, variant = 'slot' } = props

  return (
    <span
      aria-hidden
      className={cx(
        'pointer-events-none absolute top-0 right-0 z-10',
        'size-sm-3 flex justify-end overflow-hidden rounded-tr-sm px-[5px] py-[4px]',
        'text-size-xs font-weight-lg font-family-mono leading-1',
        variant === 'slot' ? 'text-color-text-default' : 'text-color-text-selection',
      )}
    >
      <span
        className={cx(
          'absolute top-[-82%] right-[-82%] -z-10 size-[150%] rotate-45 border',
          variant === 'slot'
            ? 'border-color-grey-7 bg-color-white'
            : 'border-color-border-selection bg-color-bg-selection',
        )}
      />
      {digit}
    </span>
  )
}
