import { useAuth } from "@/contexts/auth-context";
import { createQuery } from "@/lib/react-query/query-factory";
import { userKeys } from "@/queries/user-keys";
import { getUser } from "@/services/user/get-user";

export const useGetUser = createQuery(() => {
  const { user, isLoading } = useAuth();

  return {
    queryKey: userKeys.me(),
    queryFn: () => getUser(user!.uid),
    enabled: !isLoading && !!user?.uid,
  };
});
