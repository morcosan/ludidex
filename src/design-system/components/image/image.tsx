import { type Ref, useState } from 'react'

export interface ImageProps extends ReactProps {
  /**
   * Props
   */
  srcs: string[]
  alt?: string
  loading?: 'lazy' | 'eager'

  /**
   * Reference
   */
  ref?: Ref<HTMLImageElement>
}

export const Image = (props: ImageProps) => {
  const { srcs, alt = '', loading, ...rest } = props
  const [failedSrcs, setFailedSrcs] = useState<string[]>([])
  const currentSrc = srcs.find((url) => !failedSrcs.includes(url))

  if (!currentSrc) return null

  return (
    <img
      {...rest}
      src={currentSrc}
      alt={alt}
      loading={loading || 'lazy'}
      onError={() => setFailedSrcs((urls) => [...urls, currentSrc])}
    />
  )
}
