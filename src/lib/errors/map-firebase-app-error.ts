import { FirebaseError } from "firebase/app";
import { AppError } from "./app-error";
import { ERROR_CODES } from "./error-codes";

export function mapFirebaseAppError(error: FirebaseError): AppError {
  switch (error.code) {
    case "permission-denied":
      return new AppError(
        ERROR_CODES.PERMISSION_DENIED,
        "Você não tem permissão para realizar essa ação.",
        403,
      );

    case "unauthenticated":
      return new AppError(
        ERROR_CODES.UNAUTHENTICATED,
        "Sua sessão expirou.",
        401,
      );

    case "unavailable":
      return new AppError(
        ERROR_CODES.SERVICE_UNAVAILABLE,
        "Serviço temporariamente indisponível.",
        503,
      );

    case "deadline-exceeded":
      return new AppError(
        ERROR_CODES.TIMEOUT,
        "A solicitação demorou mais que o esperado. Tente novamente.",
        504,
      );

    case "resource-exhausted":
      return new AppError(
        ERROR_CODES.RATE_LIMITED,
        "Muitas solicitações em pouco tempo. Tente novamente em instantes.",
        429,
      );

    case "not-found":
      return new AppError(
        ERROR_CODES.NOT_FOUND,
        "Registro não encontrado.",
        404,
      );

    case "already-exists":
      return new AppError(
        ERROR_CODES.ALREADY_EXISTS,
        "Esse registro já existe.",
        409,
      );

    case "invalid-argument":
      return new AppError(
        ERROR_CODES.INVALID_ARGUMENT,
        "Dados inválidos. Verifique e tente novamente.",
        400,
      );

    default:
      return new AppError(
        ERROR_CODES.INTERNAL_ERROR,
        "Erro inesperado ao comunicar com o servidor.",
        500,
      );
  }
}
