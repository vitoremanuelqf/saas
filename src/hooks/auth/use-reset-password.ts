import { useAppMutation } from "@/lib/react-query/mutation-factory";
import { resetPassword } from "@/services/auth/reset-password";
import type { IResetPassword } from "@/types/auth";

export const useResetPassword = () => {
  return useAppMutation<void, IResetPassword>({
    mutationFn: resetPassword,
  });
};
