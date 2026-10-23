import { Image } from '@design-system'
import { useImperativeHandle } from 'react'
import { type ImageSlideshowProps } from './_types'
import { useSlideshow } from './_use-slideshow'

export type { ImageSlideshowHandle, ImageSlideshowProps } from './_types'

export const ImageSlideshow = (props: ImageSlideshowProps) => {
  const { srcs, duration, className, ref } = props
  const { indexes, activeSlot, next } = useSlideshow(props)

  useImperativeHandle(ref, () => ({ next }), [next])

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
