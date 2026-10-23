const TIP_CLIP =
  '[clip-path:polygon(0_0,69.7%_34.8%,75%_38.1%,79%_41.8%,81.4%_45.8%,82.2%_50%,81.4%_54.2%,79%_58.2%,75%_61.9%,69.7%_65.2%,0_100%)]'
const NOTCH_CLIP =
  '[clip-path:polygon(0_0,100%_0,100%_100%,0_100%,69.7%_65.2%,75%_61.9%,79%_58.2%,81.4%_54.2%,82.2%_50%,81.4%_45.8%,79%_41.8%,75%_38.1%,69.7%_34.8%)]'

export const Arrow = ({ notch }: { notch?: boolean }) => (
  <div aria-hidden className={cx('bg-color-bg-region w-[16px]', notch ? NOTCH_CLIP : TIP_CLIP)} />
)
