"use client";

import { useRouter } from "next/navigation";

import { clearAppCache } from "@/lib/react-query";
import { useAppMutation } from "@/lib/react-query/mutation-factory";
import { signOut } from "@/services/auth/sign-out";
import { deleteCookie } from "cookies-next/client";

export const useSignOut = () => {
  const router = useRouter();

  return useAppMutation<void, void>({
    mutationFn: signOut,
    onSuccess: () => {
      clearAppCache();
      deleteCookie("token", { path: "/" });

      router.replace("/auth/sign-in");
      router.refresh();
    },
  });
};
