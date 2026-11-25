import { useSearchParams } from 'react-router'
import { type Filters } from '../components'

type Params = URLSearchParams
type FilterKey = keyof Omit<Filters, 'search'>
type FiltersConfig = { [K in FilterKey]?: readonly NonNullable<Filters[K]>[number][] } & { search: string }

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
const parseParams = (params: Params, config: FiltersConfig): Filters => {
  const { search, ...filterConfig } = config
  const filters = Object.fromEntries(
    Object.entries(filterConfig).map(([key, allValues]) => [key, parseValues(params.get(key), allValues ?? [])]),
  ) as unknown as Filters
  filters.search = search !== undefined ? (params.get('search') ?? '') : ''
  return filters
}
const setParams = (params: Params, config: FiltersConfig, filters: Filters) => {
  const { search, ...filterConfig } = config
  Object.keys(filterConfig).forEach((key) => {
    const values = filters[key as FilterKey]
    if (values === undefined) return
    setValues(params, key, values)
  })
  if (search !== undefined && filters.search !== undefined) {
    setValue(params, 'search', filters.search)
  }
}

export const useUrlFilters = (config: FiltersConfig) => {
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
