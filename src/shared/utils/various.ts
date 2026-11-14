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

const roundValue = (value: number, direction: 'up' | 'down', step: number) => {
  const round = direction === 'up' ? Math.ceil : Math.floor
  return round(value / step) * step
}

const parseTags = (value: string) => {
  return value
    .split(/[,\n]/)
    .map((tag) => tag.trim())
    .filter(Boolean)
}

const formatTag = (value: string) => {
  return value
    .normalize('NFC')
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean)
    .map((word) => word.charAt(0).toLocaleUpperCase() + word.slice(1))
    .join('-')
}

const sortByName = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name)

const countFilters = (filters: Filters) => {
  return (
    (filters.elements?.length ?? 0) +
    (filters.statuses?.length ?? 0) +
    (filters.weapons?.length ?? 0) +
    (filters.nations?.length ?? 0)
  )
}

const toNumber = (value: string) => {
  if (!value.trim()) return undefined
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

const formatUserInput = (value: string) =>
  value
    .normalize('NFC')
    .replace(/[^\p{L}\p{M}\p{N}\p{Sc}\s\x21-\x7E]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()

export {
  countFilters,
  formatFileSize,
  formatInteger,
  formatPercent,
  formatTag,
  formatUserInput,
  getDataSize,
  getDateAsYYYYMMDD,
  getTimeAsHHMMSS,
  isPathUnderSegment,
  parseTags,
  roundValue,
  sortByName,
  toNumber,
  withAlpha,
}
