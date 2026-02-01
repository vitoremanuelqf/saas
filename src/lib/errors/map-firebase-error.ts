import { FirebaseError } from "firebase/app";
import { AppError } from "./app-error";
import { mapFirebaseAppError } from "./map-firebase-app-error";
import { mapFirebaseAuthError } from "./map-firebase-auth-error";

export function mapFirebaseError(error: FirebaseError): AppError {
  if (error.code.startsWith("auth/")) {
    return mapFirebaseAuthError(error);
  }
  return mapFirebaseAppError(error);
}
