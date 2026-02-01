import { auth } from "@/firebase/client";
import { AppError } from "@/lib/errors/app-error";
import { ERROR_CODES } from "@/lib/errors/error-codes";
import { mapFirebaseAuthError } from "@/lib/errors/map-firebase-auth-error";
import { IResetPassword } from "@/types/auth";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";

export const resetPassword = async ({
  email,
}: IResetPassword): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    if (error instanceof FirebaseError) {
      throw mapFirebaseAuthError(error);
    }

    throw new AppError(
      ERROR_CODES.UNKNOWN_ERROR,
      "Erro inesperado ao solicitar redefinição de senha.",
      500,
    );
  }
};
