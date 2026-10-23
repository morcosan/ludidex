import { type Ref } from 'react'

export interface ImageSlideshowHandle {
  next: () => void
}

export interface ImageSlideshowProps extends ReactProps {
  srcs: string[]
  interval: number
  duration: number
  ref?: Ref<ImageSlideshowHandle>
}
