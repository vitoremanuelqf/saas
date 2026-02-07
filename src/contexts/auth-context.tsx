"use client";

import { auth } from "@/firebase/client";
import { handleAppError } from "@/lib/errors/handle-app-error";
import { clearAppCache } from "@/lib/react-query";
import { deleteCookie, setCookie } from "cookies-next/client";
import { onIdTokenChanged, User } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AuthContextData = {
  user: User | null;
  isLoading: boolean;
};

type AuthProviderProps = { children: ReactNode };

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      try {
        setIsLoading(false);

        if (!user) {
          clearAppCache();
          deleteCookie("token", { path: "/" });
          setUser(null);

          return;
        }

        const token = await user.getIdToken();

        setUser(user);
        setCookie("token", token, {
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });
      } catch (error) {
        await handleAppError(error, { silent: true });

        clearAppCache();
        deleteCookie("token", { path: "/" });
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo<AuthContextData>(
    () => ({ user, isLoading }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error("useAuth deve ser usado dentro de um AuthProvider");

  return ctx;
}
