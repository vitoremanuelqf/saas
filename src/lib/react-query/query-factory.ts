import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export function createQuery<TData, TParams extends unknown[], TError = unknown>(
  getOptions: (...params: TParams) => UseQueryOptions<TData, TError, TData>,
) {
  return (...params: TParams) => useQuery(getOptions(...params));
}
