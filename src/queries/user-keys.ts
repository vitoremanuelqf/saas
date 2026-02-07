export const userKeys = {
  all: ["users"] as const,
  me: () => [...userKeys.all, "me"] as const,
  detail: (uid: string) => [...userKeys.details(), uid] as const,
  details: () => [...userKeys.all, "detail"] as const,
};
