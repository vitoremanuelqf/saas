"use client";

import { handleAppError } from "@/lib/errors/handle-app-error";
import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    handleAppError(error);
  }, [error]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-xl font-semibold">Algo deu errado</h1>

        <p className="text-muted-foreground">Tente recarregar a página</p>

        <button
          onClick={reset}
          className="rounded bg-primary px-4 py-2 text-white"
        >
          Recarregar
        </button>
      </div>
    </div>
  );
}
