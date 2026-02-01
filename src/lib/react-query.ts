import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

import { AppError } from "@/lib/errors/app-error";
import { handleQueryError } from "./errors/handle-query-error";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.log("🚀 ~ error:", error);
      handleQueryError(error);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      console.log("🚀 ~ error:", error);
      handleQueryError(error);
    },
  }),
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 5, // 5 minutos
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 30, // 30 segundos
    },
    mutations: {
      retry: false,
    },
  },
});

export function clearAppCache() {
  queryClient.clear();
}

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AppError;
  }
}
