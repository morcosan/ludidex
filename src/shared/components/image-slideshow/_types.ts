import { type Ref } from 'react'

export interface ImageSlideshowHandle {
  next: () => void
}

export interface ImageSlideshowProps extends ReactProps {
  /**
   * Props
   */
  srcs: string[]
  interval: number
  duration: number

  /**
   * Events
   */
  /** Event emitted when the image is changing */
  onLoading?: (loading: boolean) => void

  /**
   * Methods
   */
  /**
   * Reference object with imperative methods
   * @param next():void - Triggers the next image swap
   */
  ref?: Ref<ImageSlideshowHandle>
}
