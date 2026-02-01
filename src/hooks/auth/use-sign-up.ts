import { useQueryClient } from "@tanstack/react-query";

import { useAppMutation } from "@/lib/react-query/mutation-factory";
import { authKeys } from "@/queries/auth-keys";
import { signUp } from "@/services/auth/sign-up";
import { IUserSignUp } from "@/types/auth";

export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useAppMutation<void, IUserSignUp>({
    mutationFn: signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
};
