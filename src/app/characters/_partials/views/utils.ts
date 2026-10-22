const formatNumber = (value: number) => String(Math.round(value))
const formatPercent = (value: number) => `${Math.round(value)}%`

const roundValue = (value: number, direction: 'up' | 'down', step: number) => {
  const round = direction === 'up' ? Math.ceil : Math.floor
  return round(value / step) * step
}

export { formatNumber, formatPercent, roundValue }
