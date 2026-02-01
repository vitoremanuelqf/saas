import { FirebaseError } from "firebase/app";
import { AppError } from "./app-error";
import { ERROR_CODES } from "./error-codes";

export function mapFirebaseAuthError(error: FirebaseError): AppError {
  switch (error.code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return new AppError(
        ERROR_CODES.INVALID_CREDENTIALS,
        "Email ou senha inválidos.",
        401,
      );

    case "auth/email-already-in-use":
      return new AppError(
        ERROR_CODES.EMAIL_ALREADY_IN_USE,
        "Esse email já está em uso.",
        409,
      );

    case "auth/weak-password":
      return new AppError(
        ERROR_CODES.WEAK_PASSWORD,
        "A senha é muito fraca.",
        400,
      );

    case "auth/too-many-requests":
      return new AppError(
        ERROR_CODES.RATE_LIMITED,
        "Muitas tentativas. Tente novamente mais tarde.",
        429,
      );

    case "auth/network-request-failed":
      return new AppError(
        ERROR_CODES.NETWORK_ERROR,
        "Falha de conexão. Verifique sua internet e tente novamente.",
        0,
      );

    case "auth/id-token-expired":
    case "auth/user-token-expired":
    case "auth/invalid-user-token":
    case "auth/user-disabled":
    case "auth/requires-recent-login":
      return new AppError(
        ERROR_CODES.UNAUTHENTICATED,
        "Sua sessão expirou. Faça login novamente.",
        401,
      );

    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return new AppError(ERROR_CODES.BAD_REQUEST, "Login cancelado.", 400);

    default:
      return new AppError(
        ERROR_CODES.INTERNAL_ERROR,
        "Erro ao autenticar.",
        500,
      );
  }
}
