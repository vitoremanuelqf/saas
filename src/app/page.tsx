"use client";

import { useSignOut } from "@/hooks/auth/use-sign-out";

export default function Dashboard() {
  const { mutate: signOut, isPending } = useSignOut();

  return (
    <div>
      <h1>Dashboard:</h1>
      <button onClick={signOut}>Sair</button>
    </div>
  );
}
