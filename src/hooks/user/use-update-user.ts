import { useAppMutation } from "@/lib/react-query/mutation-factory";
import { userKeys } from "@/queries/user-keys";
import { updateUser } from "@/services/user/update-user";
import { IUser } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import { serverTimestamp } from "firebase/firestore";

type UpdateUserVariables = {
  uid: string;
  data: Partial<Omit<IUser, "uid">>;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useAppMutation<void, UpdateUserVariables>({
    mutationFn: ({ uid, data }) => updateUser(uid, data),
    onSuccess: (_, { uid, data }) => {
      queryClient.setQueryData<IUser>(userKeys.detail(uid), (old) =>
        old
          ? {
              ...old,
              ...data,
              updatedAt: serverTimestamp(),
            }
          : old,
      );
    },
  });
};
