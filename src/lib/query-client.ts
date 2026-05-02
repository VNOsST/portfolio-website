import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 3, // 3 minutes
      refetchInterval: 1000 * 60 * 3, // refetch every 3 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
})
