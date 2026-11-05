import { HeartIcon, StarIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { particleCss, particleIconCss, particlesCss } from './_styles'
import { createParticles, type ParticleConfig } from './_utils'

export type ParticleSize = 'xs' | 'sm' | 'md'
export type ParticleShape = 'circle' | 'square' | 'star' | 'heart'

export interface ParticlesProps extends ReactProps {
  color: string
  count?: number
  size?: ParticleSize
  shape?: ParticleShape
  className?: string
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
      setParticles((state) => {
        if (state.length === 0) return state
        const next = [...state]
        next[index % state.length] = createParticles({ ...config[size], count: 1 }, index)[0]
        index += 1
        return next
      })
    }, 500)
    return () => clearInterval(intervalId)
  }, [config, size])

  return (
    <span aria-hidden css={particlesCss}>
      {particles.map((style, i) => {
        const particleStyle = { ...style, '--rotation': rotation, color, backgroundColor }
        return shape === 'circle' || shape === 'square' ? (
          <i key={i} css={particleCss} className={className} style={{ ...particleStyle, borderRadius }} />
        ) : (
          <Icon key={i} aria-hidden css={particleIconCss} className={className} style={particleStyle} />
        )
      })}
    </span>
  )
}
