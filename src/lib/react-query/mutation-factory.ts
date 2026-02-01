import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

export function useAppMutation<TData, TVariables, TError = unknown>(
  options: UseMutationOptions<TData, TError, TVariables>,
) {
  return useMutation<TData, TError, TVariables>(options);
}
