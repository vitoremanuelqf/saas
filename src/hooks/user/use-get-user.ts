import { createQuery } from "@/lib/react-query/query-factory";
import { userKeys } from "@/queries/user-keys";
import { getUser } from "@/services/user/get-user";

export const useGetUser = createQuery((uid?: string) => ({
  queryKey: uid ? userKeys.detail(uid) : [],
  queryFn: () => getUser(uid as string),
  enabled: !!uid,
}));
