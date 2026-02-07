export const authKeys = {
  all: ["auth"] as const,
  session: () => [...authKeys.all, "session"] as const,
  token: () => [...authKeys.all, "token"] as const,
};
