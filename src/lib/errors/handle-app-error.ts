import { auth } from "@/firebase/client";
import { signOut } from "firebase/auth";
import { toast } from "sonner";

import { clearAppCache } from "../react-query";
import { AppError } from "./app-error";
import { ERROR_CODES } from "./error-codes";

let isLoggingOut = false;

type HandleAppErrorOptions = {
  silent?: boolean;
};

export async function handleAppError(
  error: unknown,
  opts?: HandleAppErrorOptions,
) {
  const appError = AppError.from(error);
  const silent = opts?.silent ?? false;

  const warn = (message: string) => {
    if (!silent) toast.warning(message, { duration: 4000 });
  };

  const err = (message: string) => {
    if (!silent) toast.error(message);
  };

  switch (appError.code) {
    case ERROR_CODES.UNAUTHENTICATED: {
      if (isLoggingOut) return;
      isLoggingOut = true;

      warn("Sua sessão expirou.");

      try {
        await signOut(auth);
      } finally {
        clearAppCache();
        isLoggingOut = false;
        window.location.assign("/auth/sign-in");
      }

      return;
    }

    case ERROR_CODES.PERMISSION_DENIED:
      err("Você não tem permissão para realizar essa ação.");
      return;

    case ERROR_CODES.INVALID_CREDENTIALS:
      err("Email ou senha inválidos.");
      return;

    case ERROR_CODES.EMAIL_ALREADY_IN_USE:
      err("Esse email já está em uso.");
      return;

    case ERROR_CODES.WEAK_PASSWORD:
      err("A senha é muito fraca.");
      return;

    case ERROR_CODES.SERVICE_UNAVAILABLE:
      err("Serviço temporariamente indisponível. Tente novamente.");
      return;

    case ERROR_CODES.TIMEOUT:
      err("A solicitação demorou mais que o esperado. Tente novamente.");
      return;

    case ERROR_CODES.RATE_LIMITED:
      err("Muitas tentativas. Aguarde um pouco e tente novamente.");
      return;

    case ERROR_CODES.NETWORK_ERROR:
      err("Falha de conexão. Verifique sua internet e tente novamente.");
      return;

    case ERROR_CODES.NOT_FOUND:
      err("Registro não encontrado.");
      return;

    case ERROR_CODES.ALREADY_EXISTS:
      err("Esse registro já existe.");
      return;

    case ERROR_CODES.INVALID_ARGUMENT:
      err("Dados inválidos. Verifique as informações e tente novamente.");
      return;

    default:
      err(appError.message || "Erro inesperado.");
  }
}
