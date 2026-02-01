import { auth } from "@/firebase/client";
import { AppError } from "@/lib/errors/app-error";
import { ERROR_CODES } from "@/lib/errors/error-codes";
import { mapFirebaseAuthError } from "@/lib/errors/map-firebase-auth-error";
import { IUserSignUp } from "@/types/auth";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { createUser } from "../user/create-user";

export const signUp = async ({
  displayName,
  email,
  password,
}: IUserSignUp): Promise<void> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(res.user, { displayName });

    await createUser(res.user.uid, {
      displayName,
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
      "Erro inesperado ao criar a conta",
      500,
    );
  }
};
