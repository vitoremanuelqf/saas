import { clearAppCache } from "@/lib/react-query";
import { useAppMutation } from "@/lib/react-query/mutation-factory";
import { signOut } from "@/services/auth/sign-out";

export const useSignOut = () => {
  return useAppMutation<void, void>({
    mutationFn: async () => {
      await signOut();
    },
    onSuccess: () => {
      clearAppCache();
      window.location.assign("/auth/sign-in");
    },
  });
};
