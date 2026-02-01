import { handleAppError } from "./handle-app-error";

export const handleQueryError = async (error: unknown) => {
  await handleAppError(error);
};
