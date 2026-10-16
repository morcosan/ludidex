'use client'

import { type CSSObject } from '@emotion/react'
import { type ElementType, useEffect, useState } from 'react'
import { useI18nService } from '../../services/i18n-service'

export interface LoadingScreenProps extends ReactProps {
  logo: string | ElementType
  minTimeout?: number
  maxTimeout?: number
}

export const LoadingScreen = (props: LoadingScreenProps) => {
  const { children, minTimeout = 0, maxTimeout = 3000 } = props
  const { loading } = useI18nService()
  const [viewportWidth, setViewportWidth] = useState(0)
  const [hasMinTimeout, setHasMinTimeout] = useState(false)
  const [hasMaxTimeout, setHasMaxTimeout] = useState(false)
  const ariaLabel = 'Loading...' // I18n is not loaded yet, so no translation
  const isReady = hasMaxTimeout || (hasMinTimeout && !loading && viewportWidth > 0)

  const overlayCss: CSSObject = {
    animation: isReady ? 'fadeOut 1s forwards' : 'unset',
    pointerEvents: isReady ? 'none' : 'unset',
    '@keyframes fadeOut': {
      from: { opacity: 1 },
      to: { opacity: 0 },
    },
  }

  useEffect(() => {
    setViewportWidth(window.innerWidth)

    const minTimer = setTimeout(() => setHasMinTimeout(true), minTimeout)
    const maxTimer = setTimeout(() => setHasMaxTimeout(true), maxTimeout)

    return () => {
      clearTimeout(minTimer)
      clearTimeout(maxTimer)
    }
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* CONTENT */}
      <div className="h-full w-full" aria-busy={!isReady}>
        {children}
      </div>

      {/* OVERLAY */}
      <div
        className="fixed-overlay flex-center z-tooltip bg-color-bg-card"
        css={overlayCss}
        aria-hidden={isReady}
        data-testid="loading-screen"
      >
        {typeof props.logo === 'string' ? (
          props.logo
        ) : (
          <props.logo className="h-1/4 w-1/3 animate-pulse" aria-label={ariaLabel} />
        )}
      </div>
    </>
  )
}
