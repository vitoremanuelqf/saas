import { useAppMutation } from "@/lib/react-query/mutation-factory";
import { authKeys } from "@/queries/auth-keys";
import { signInWithGoogle } from "@/services/auth/sign-in-with-google";
import { useQueryClient } from "@tanstack/react-query";

export const useSignInWithGoogle = () => {
  const queryClient = useQueryClient();

  return useAppMutation<void, void>({
    mutationFn: signInWithGoogle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
};
