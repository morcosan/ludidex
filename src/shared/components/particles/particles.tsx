import { HeartIcon, StarIcon } from 'lucide-react'
import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { particleCss, particleIconCss, particlesCss } from './_styles'

export type ParticleSize = 'xs' | 'sm' | 'md'
export type ParticleShape = 'circle' | 'square' | 'star' | 'heart'

interface ParticleConfig {
  count: number
  size: number
  distance: number
}

export interface ParticlesProps extends ReactProps {
  color: string
  count?: number
  size?: ParticleSize
  shape?: ParticleShape
  className?: string
}

const createParticles = ({ count, size, distance }: ParticleConfig, startIndex = 0): CSSProperties[] => {
  return Array.from({ length: count }, (_, offset) => {
    const i = startIndex + offset
    const side = i % 4
    const along = 10 + Math.random() * 80
    const drift = (Math.random() - 0.5) * 16

    const origin = [
      { ox: `${along}%`, oy: '0%', x: drift, y: -distance },
      { ox: '100%', oy: `${along}%`, x: distance, y: drift },
      { ox: `${along}%`, oy: '100%', x: drift, y: distance },
      { ox: '0%', oy: `${along}%`, x: -distance, y: drift },
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

export const Particles = (props: ParticlesProps) => {
  const { color, count = 8, size = 'xs', shape = 'circle', className } = props
  const config = useMemo(
    (): Record<ParticleSize, ParticleConfig> => ({
      xs: { count, size: 5, distance: 25 },
      sm: { count, size: 9, distance: 45 },
      md: { count, size: 12, distance: 60 },
    }),
    [count],
  )
  const [particles, setParticles] = useState(() => createParticles(config[size]))
  const backgroundColor = shape === 'circle' || shape === 'square' ? color : 'transparent'
  const borderRadius = shape === 'circle' ? '50%' : 0
  const rotation = shape === 'square' ? '45deg' : '0deg'
  const Icon = shape === 'star' ? StarIcon : HeartIcon

  useEffect(() => {
    let index = 0
    setParticles(createParticles(config[size]))
    const intervalId = setInterval(() => {
      setParticles((current) => {
        if (current.length === 0) return current
        const next = [...current]
        next[index % current.length] = createParticles({ ...config[size], count: 1 }, index)[0]
        index += 1
        return next
      })
    }, 500)
    return () => clearInterval(intervalId)
  }, [config, size])

  return (
    <div aria-hidden css={particlesCss}>
      {particles.map((style, i) => {
        const particleStyle = { ...style, '--rotation': rotation, color, backgroundColor }
        return shape === 'circle' || shape === 'square' ? (
          <i key={i} css={particleCss} className={className} style={{ ...particleStyle, borderRadius }} />
        ) : (
          <Icon key={i} aria-hidden css={particleIconCss} className={className} style={particleStyle} />
        )
      })}
    </div>
  )
}
