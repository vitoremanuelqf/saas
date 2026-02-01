import { firestore } from "@/firebase/client";
import { AppError } from "@/lib/errors/app-error";
import { ERROR_CODES } from "@/lib/errors/error-codes";
import { mapFirebaseAppError } from "@/lib/errors/map-firebase-app-error";
import { IUser } from "@/types/user";
import { FirebaseError } from "firebase/app";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

const USERS_COLLECTION = "users";

type UpdateUserInput = Partial<Omit<IUser, "uid">>;

export const updateUser = async (
  uid: string,
  data: UpdateUserInput,
): Promise<void> => {
  try {
    const userRef = doc(firestore, USERS_COLLECTION, uid);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      throw new AppError(ERROR_CODES.NOT_FOUND, "Usuário não encontrado", 404);
    }

    await setDoc(
      userRef,
      {
        ...data,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
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
