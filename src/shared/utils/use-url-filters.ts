import { type Filters } from '@app-shared/components'
import { useSearchParams } from 'react-router'

type Params = URLSearchParams
type FilterKey = keyof Omit<Filters, 'search'>
type FilterConfig = { [K in FilterKey]?: readonly NonNullable<Filters[K]>[number][] }
type FilterParams = Filters & { search: string }

const setValue = (params: Params, key: string, value: string) => (value ? params.set(key, value) : params.delete(key))
const setValues = (params: Params, key: string, values: string[]) => setValue(params, key, values.join(','))
const parseValues = <T extends string>(value: string | null, allValues: readonly T[]): T[] => {
  const allowed = allValues as readonly string[]
  const values = (value ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
  return [...new Set(values)].filter((item): item is T => allowed.includes(item))
}
const parseParams = (params: Params, config: FilterConfig): FilterParams => {
  const filters = Object.fromEntries(
    Object.entries(config).map(([key, allValues]) => [key, parseValues(params.get(key), allValues ?? [])]),
  ) as unknown as FilterParams
  filters.search = params.get('search') ?? ''
  return filters
}
const setParams = (params: Params, config: FilterConfig, filters: Filters) => {
  Object.keys(config).forEach((key) => {
    const values = filters[key as FilterKey]
    if (values === undefined) return
    setValues(params, key, values)
  })
  if (filters.search !== undefined) {
    setValue(params, 'search', filters.search)
  }
}

export const useUrlFilters = (config: FilterConfig) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = parseParams(searchParams, config)

  const setFilters = (newFilters: Filters) => {
    setSearchParams((params) => {
      setParams(params, config, newFilters)
      return params
    })
  }

  return [filters, setFilters] as const
}
