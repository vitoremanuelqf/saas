import { auth } from "@/firebase/client";
import { AppError } from "@/lib/errors/app-error";
import { ERROR_CODES } from "@/lib/errors/error-codes";
import { mapFirebaseAuthError } from "@/lib/errors/map-firebase-auth-error";
import { IConfirmNewPassword } from "@/types/auth";
import { FirebaseError } from "firebase/app";
import { confirmPasswordReset } from "firebase/auth";

export const confirmNewPassword = async ({
  oobCode,
  newPassword,
}: IConfirmNewPassword): Promise<void> => {
  try {
    await confirmPasswordReset(auth, oobCode, newPassword);
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    if (error instanceof FirebaseError) {
      throw mapFirebaseAuthError(error);
    }

    throw new AppError(
      ERROR_CODES.UNKNOWN_ERROR,
      "Erro inesperado ao redefinir a senha.",
      500,
    );
  }
};
