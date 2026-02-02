import { useAppMutation } from "@/lib/react-query/mutation-factory";
import { confirmNewPassword } from "@/services/auth/confirm-new-password";
import type { IConfirmNewPassword } from "@/types/auth";

export const useConfirmNewPassword = () => {
  return useAppMutation<void, IConfirmNewPassword>({
    mutationFn: confirmNewPassword,
  });
};
