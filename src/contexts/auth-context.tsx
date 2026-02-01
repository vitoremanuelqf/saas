"use client";

import { auth } from "@/firebase/client";
import { handleAppError } from "@/lib/errors/handle-app-error";
import { deleteCookie, setCookie } from "cookies-next/client";
import { onIdTokenChanged } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect } from "react";

type AuthContextData = {};

type AuthProviderProps = { children: ReactNode };

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      try {
        if (!user) {
          deleteCookie("token", { path: "/" });
          return;
        }

        const token = await user.getIdToken();

        setCookie("token", token, {
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });
      } catch (error) {
        await handleAppError(error, { silent: true });
        deleteCookie("token", { path: "/" });
      }
    });

    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return ctx;
}
