import { firestore } from "@/firebase/client";
import { AppError } from "@/lib/errors/app-error";
import { ERROR_CODES } from "@/lib/errors/error-codes";
import { mapFirebaseAppError } from "@/lib/errors/map-firebase-app-error";
import { IUser } from "@/types/user";
import { FirebaseError } from "firebase/app";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

const USERS_COLLECTION = "users";

type CreateUserInput = Omit<IUser, "uid">;

export const createUser = async (
  uid: string,
  data: CreateUserInput,
): Promise<void> => {
  try {
    const userRef = doc(firestore, USERS_COLLECTION, uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) return;

    await setDoc(userRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    if (error instanceof FirebaseError) {
      throw mapFirebaseAppError(error);
    }

    throw new AppError(ERROR_CODES.UNKNOWN_ERROR, "Erro inesperado", 500);
  }
};
