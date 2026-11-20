import { type Filters } from '../components/_shared/use-filters'

const getDateAsYYYYMMDD = (date: Date): string => {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-')
}

const getTimeAsHHMMSS = (date: Date): string => {
  return [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map((value) => String(value).padStart(2, '0'))
    .join('-')
}

const getDataSize = (data: object): number => {
  return new TextEncoder().encode(JSON.stringify(data)).byteLength
}

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`
  return `${(bytes / 1024).toFixed(1)} KB`
}

const isPathUnderSegment = (pathname: string, segment: string): boolean => {
  return pathname === `/${segment}` || pathname.startsWith(`/${segment}/`)
}

const withAlpha = (color: string, opacity: number) => `color-mix(in srgb, ${color} ${opacity * 100}%, transparent)`

const formatInteger = (value: number, compact = false) => {
  const formatFn = compact ? new Intl.NumberFormat('en-US', { notation: 'compact' }) : new Intl.NumberFormat('en-US')
  return formatFn.format(Math.floor(value))
}

const formatPercent = (value: number, compact = false) => `${formatInteger(value, compact)}%`

const formatTime = (value?: number) => {
  if (value === undefined) return undefined
  if (!Number.isFinite(value) || value < 0) return String(value)

  const hours = Math.floor(value / 3600)
  const minutes = Math.floor((value % 3600) / 60)
  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, '0')

  if (hours > 0) return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds}`
  return `${minutes.toString().padStart(2, '0')}:${seconds}`
}

const parseTime = (value: string) => {
  const intRegex = /^\d+$/
  const floatRegex = /^\d+(?:\.\d+)?$/
  const trimmed = value.trim()
  if (!trimmed) return undefined

  if (!trimmed.includes(':')) {
    const parsed = Number(trimmed)
    return Number.isFinite(parsed) ? parsed : undefined
  }

  const parts = (trimmed.startsWith(':') ? `0${trimmed}` : trimmed).split(':')
  if (parts.length !== 2 && parts.length !== 3) return undefined
  if (parts.some((part, index) => (index === parts.length - 1 ? !floatRegex.test(part) : !intRegex.test(part)))) {
    return undefined
  }

  const values = parts.map(Number)
  const [hours, minutes, seconds] = values.length === 2 ? [0, values[0], values[1]] : [values[0], values[1], values[2]]

  return hours * 3600 + minutes * 60 + seconds
}

const isFailedTrial = (time?: number) => time !== undefined && time < 1 // 1 sec

const roundValue = (value: number, direction: 'up' | 'down', step: number) => {
  const round = direction === 'up' ? Math.ceil : Math.floor
  return round(value / step) * step
}

const sortByName = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name)

const countFilters = (filters: Filters) => {
  return (
    (filters.elements?.length ?? 0) +
    (filters.statuses?.length ?? 0) +
    (filters.weapons?.length ?? 0) +
    (filters.nations?.length ?? 0) +
    (filters.tags?.length ?? 0)
  )
}

const toNumber = (value: string) => {
  if (!value.trim()) return undefined
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

const parseUserInput = (value: string) => {
  return value
    .normalize('NFC')
    .replace(/[\p{Cf}\p{Cc}]/gu, (c) => (/\s/.test(c) ? ' ' : ''))
    .replace(/\s+/g, ' ')
    .trim()
}

export {
  countFilters,
  formatFileSize,
  formatInteger,
  formatPercent,
  formatTime,
  getDataSize,
  getDateAsYYYYMMDD,
  getTimeAsHHMMSS,
  isFailedTrial,
  isPathUnderSegment,
  parseTime,
  parseUserInput,
  roundValue,
  sortByName,
  toNumber,
  withAlpha,
}
