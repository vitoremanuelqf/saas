import { auth } from "@/firebase/client";
import { AppError } from "@/lib/errors/app-error";
import { ERROR_CODES } from "@/lib/errors/error-codes";
import { mapFirebaseAuthError } from "@/lib/errors/map-firebase-auth-error";
import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createUser } from "../user/create-user";

export const signInWithGoogle = async (): Promise<void> => {
  try {
    const provider = new GoogleAuthProvider();

    const res = await signInWithPopup(auth, provider);

    await createUser(res.user.uid, {
      displayName: res.user.displayName,
      email: res.user.email!,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    if (error instanceof FirebaseError) {
      throw mapFirebaseAuthError(error);
    }

    throw new AppError(
      ERROR_CODES.UNKNOWN_ERROR,
      "Erro inesperado ao autenticar com o Google",
      500,
    );
  }
};
