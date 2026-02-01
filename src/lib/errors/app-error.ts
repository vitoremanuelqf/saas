import { AxiosError } from "axios";
import { FirebaseError } from "firebase/app";
import { ERROR_CODES, type ErrorCode } from "./error-codes";
import { mapFirebaseAppError } from "./map-firebase-app-error";
import { mapFirebaseAuthError } from "./map-firebase-auth-error";

export class AppError extends Error {
  public code: ErrorCode;
  public status?: number;

  constructor(code: ErrorCode, message: string, status?: number) {
    super(message);
    this.code = code;
    this.status = status;
  }

  static from(error: unknown): AppError {
    if (error instanceof AppError) return error;

    if (error instanceof FirebaseError) {
      if (error.code.startsWith("auth/")) {
        return mapFirebaseAuthError(error);
      }

      return mapFirebaseAppError(error);
    }

    if (error instanceof AxiosError) {
      if (!error.response) {
        return new AppError(
          ERROR_CODES.NETWORK_ERROR,
          "Falha de conexão. Verifique sua internet e tente novamente.",
          0,
        );
      }

      const status = error.response.status;

      return new AppError(
        ERROR_CODES.HTTP_ERROR,
        error.response.data?.message || error.message,
        status,
      );
    }

    if (error instanceof Error) {
      return new AppError(ERROR_CODES.INTERNAL_ERROR, error.message, 500);
    }

    return new AppError(ERROR_CODES.UNKNOWN_ERROR, "Erro inesperado.", 500);
  }
}
