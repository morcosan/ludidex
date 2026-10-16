'use client'

import { Query, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: import.meta.env.DEV ? 0 : 3,
    },
  },
  queryCache: new QueryCache({
    onError: (error: unknown, query: Query<unknown, unknown, unknown>) => {
      console.error(`Query Error ${JSON.stringify(query.queryKey)}\n`, error)
    },
  }),
})

const QueryProvider = ({ children }: ReactProps) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export { QueryProvider }
