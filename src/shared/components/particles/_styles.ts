import { keyframes, type CSSObject } from '@emotion/react'

export const particlesCss: CSSObject = {
  position: 'absolute',
  inset: 0,
  zIndex: 999999,
  pointerEvents: 'none',
}

const particleAnimation = keyframes({
  '0%': {
    transform: 'translate(-50%, -50%) translate(0, 0) scale(1) rotate(var(--rotation))',
    opacity: 0.9,
  },
  '100%': {
    transform: 'translate(-50%, -50%) translate(var(--x), var(--y)) scale(0) rotate(var(--rotation))',
    opacity: 0,
  },
})

export const particleCss: CSSObject = {
  position: 'absolute',
  top: 'var(--oy)',
  left: 'var(--ox)',
  opacity: 0,
  filter: 'saturate(1.5)',
  animation: `${particleAnimation} var(--t) ease-out var(--d) infinite`,
  borderRadius: '9999px',
  width: 'var(--s)',
  height: 'var(--s)',
  pointerEvents: 'none',
  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none',
  },
}

export const particleIconCss: CSSObject = {
  ...particleCss,
  width: 'calc(var(--s) * 1.5)',
  height: 'calc(var(--s) * 1.5)',
  fill: 'currentColor',
}
