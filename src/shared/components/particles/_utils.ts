import type { CSSProperties } from 'react'

export interface ParticleConfig {
  count: number
  size: number
  distance: number
}

export const createParticles = ({ count, size, distance }: ParticleConfig, startIndex = 0): CSSProperties[] => {
  return Array.from({ length: count }, (_, offset) => {
    const i = startIndex + offset
    const side = i % 4
    const along = 10 + Math.random() * 80
    const drift = (Math.random() - 0.5) * 16

    const origin = [
      { ox: `${along}cqw`, oy: '0cqh', x: drift, y: -distance },
      { ox: '100cqw', oy: `${along}cqh`, x: distance, y: drift },
      { ox: `${along}cqw`, oy: '100cqh', x: drift, y: distance },
      { ox: '0cqw', oy: `${along}cqh`, x: -distance, y: drift },
    ][side]

    return {
      '--ox': origin.ox,
      '--oy': origin.oy,
      '--x': `${Math.round(origin.x)}px`,
      '--y': `${Math.round(origin.y)}px`,
      '--s': `${size}px`,
      '--t': `${(1.2 + Math.random() * 0.8).toFixed(2)}s`,
      '--d': `${(Math.random() * 1.6).toFixed(2)}s`,
    } as CSSProperties
  })
}
