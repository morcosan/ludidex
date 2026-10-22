import { Image } from '@design-system'
import { useSlideshow } from './_use-slideshow'

export interface ImageSlideshowProps extends ReactProps {
  srcs: string[]
  interval: number
  duration: number
}

export const ImageSlideshow = (props: ImageSlideshowProps) => {
  const { srcs, duration, className } = props
  const { indexes, activeSlot } = useSlideshow(props)

  return (
    <div className={cx('relative', className)}>
      {indexes.map((index, slot) => (
        <Image
          key={slot}
          srcs={[srcs[index], ...srcs.filter((_, i) => i !== index)]}
          alt=""
          loading="eager"
          style={{ transitionDuration: `${duration}ms` }}
          className={cx(
            'absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out',
            slot === activeSlot ? 'opacity-100' : 'opacity-0',
          )}
        />
      ))}
    </div>
  )
}
