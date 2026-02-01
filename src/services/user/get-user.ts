import { firestore } from "@/firebase/client";
import { AppError } from "@/lib/errors/app-error";
import { ERROR_CODES } from "@/lib/errors/error-codes";
import { mapFirebaseAppError } from "@/lib/errors/map-firebase-app-error";
import { IUser } from "@/types/user";
import { FirebaseError } from "firebase/app";
import { doc, getDoc } from "firebase/firestore";

const USERS_COLLECTION = "users";

export const getUser = async (uid: string): Promise<IUser> => {
  try {
    const userRef = doc(firestore, USERS_COLLECTION, uid);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      throw new AppError(ERROR_CODES.NOT_FOUND, "Usuário não encontrado", 404);
    }

    return {
      uid: userSnapshot.id,
      ...(userSnapshot.data() as Omit<IUser, "uid">),
    };
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
