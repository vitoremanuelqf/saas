import { useAppMutation } from "@/lib/react-query/mutation-factory";
import { userKeys } from "@/queries/user-keys";
import { createUser } from "@/services/user/create-user";
import { useQueryClient } from "@tanstack/react-query";

type CreateUserVariables = {
  uid: string;
  data: Parameters<typeof createUser>[1];
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useAppMutation<void, CreateUserVariables>({
    mutationFn: ({ uid, data }) => createUser(uid, data),
    onSuccess: (_, { uid }) => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(uid) });
    },
  });
};
