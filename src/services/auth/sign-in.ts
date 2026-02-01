import { auth } from "@/firebase/client";
import { AppError } from "@/lib/errors/app-error";
import { ERROR_CODES } from "@/lib/errors/error-codes";
import { mapFirebaseAuthError } from "@/lib/errors/map-firebase-auth-error";
import { IUserSignIn } from "@/types/auth";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";

export const signIn = async ({
  email,
  password,
}: IUserSignIn): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error instanceof AppError) throw error;

    if (error instanceof FirebaseError) {
      throw mapFirebaseAuthError(error);
    }

    throw new AppError(
      ERROR_CODES.UNKNOWN_ERROR,
      "Erro inesperado ao realizar login",
      500,
    );
  }
};
