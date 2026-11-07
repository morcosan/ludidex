import { type CSSObject, keyframes } from '@emotion/react'
import { CSS_KEY__REDUCED_MOTION } from '../../../design-system/utilities/css-utils'

const COLOR_RAY_PRIMARY = 'rgba(255,255,220,.85)'
const COLOR_RAY_SECONDARY = 'rgba(255,255,255,.8)'
const COLOR_THIN_RAY = 'rgba(255,255,255,.75)'
const COLOR_CORE_INNER = 'rgba(255,252,225,.9)'
const COLOR_CORE_OUTER = 'rgba(255,226,120,.4)'

export interface AvatarAuraProps extends ReactProps {
  scale?: number
  className?: string
}

export const AvatarAura = (props: AvatarAuraProps) => {
  const { scale = 1, className } = props

  const spin = keyframes({ to: { transform: 'rotate(360deg)' } })
  const pulse = keyframes({ from: { scale: 0.85 }, to: { scale: 1.2 } })
  const flicker = keyframes({ '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.55 } })
  const breathe = keyframes({ '50%': { transform: 'scale(1.8)', opacity: 0.6 } })

  const auraCss: CSSObject = {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    '& > *': { position: 'absolute' },
  }

  const raysCss: CSSObject = {
    inset: '-50%',
    background: [
      `repeating-conic-gradient(${COLOR_RAY_PRIMARY} 0 5deg`,
      'transparent 5deg 15deg',
      `${COLOR_RAY_SECONDARY} 15deg 17deg`,
      'transparent 17deg 30deg)',
    ].join(','),
    WebkitMask: 'radial-gradient(circle closest-side, #000 6%, transparent 40%)',
    mask: 'radial-gradient(circle closest-side, #000 6%, transparent 40%)',
    animation: [
      `${spin} 26s linear infinite`,
      `${flicker} 2.4s ease-in-out infinite`,
      `${pulse} 3.2s ease-in-out infinite alternate`,
    ].join(','),
    [CSS_KEY__REDUCED_MOTION]: { animation: `${spin} 60s linear infinite` },
  }

  const thinCss: CSSObject = {
    inset: '-50%',
    background: `repeating-conic-gradient(from 9deg, ${COLOR_THIN_RAY} 0 2deg, transparent 2deg 20deg)`,
    WebkitMask: 'radial-gradient(circle closest-side, #000 4%, transparent 32%)',
    mask: 'radial-gradient(circle closest-side, #000 4%, transparent 32%)',
    animation: [
      `${spin} 42s linear infinite reverse`,
      `${flicker} 3.1s ease-in-out infinite -1s`,
      `${pulse} 3.2s ease-in-out infinite alternate`,
    ].join(','),
    [CSS_KEY__REDUCED_MOTION]: { animation: `${spin} 90s linear infinite reverse` },
  }

  const coreCss: CSSObject = {
    inset: '25%',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${COLOR_CORE_INNER}, ${COLOR_CORE_OUTER} 55%, transparent 70%)`,
    animation: `${breathe} 4.2s ease-in-out infinite`,
    [CSS_KEY__REDUCED_MOTION]: { animation: 'none' },
  }

  return (
    <span aria-hidden className={cx('relative flex aspect-square overflow-hidden', className)}>
      <span css={auraCss} style={{ scale }}>
        <span css={raysCss} />
        <span css={thinCss} />
        <span css={coreCss} />
      </span>
    </span>
  )
}
