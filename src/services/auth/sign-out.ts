import { auth } from "@/firebase/client";
import { AppError } from "@/lib/errors/app-error";
import { ERROR_CODES } from "@/lib/errors/error-codes";
import { mapFirebaseAuthError } from "@/lib/errors/map-firebase-auth-error";
import { deleteCookie } from "cookies-next/client";
import { FirebaseError } from "firebase/app";
import { signOut as firebaseSignOut } from "firebase/auth";

export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
    deleteCookie("token");
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    if (error instanceof FirebaseError) {
      throw mapFirebaseAuthError(error);
    }

    throw new AppError(
      ERROR_CODES.UNKNOWN_ERROR,
      "Erro inesperado ao encerrar a sessão",
      500,
    );
  }
};
