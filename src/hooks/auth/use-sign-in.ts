import { useQueryClient } from "@tanstack/react-query";

import { useAppMutation } from "@/lib/react-query/mutation-factory";
import { authKeys } from "@/queries/auth-keys";
import { signIn } from "@/services/auth/sign-in";
import { IUserSignIn } from "@/types/auth";

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useAppMutation<void, IUserSignIn>({
    mutationFn: signIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
};
