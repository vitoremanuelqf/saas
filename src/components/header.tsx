"use client";

import { useSignOut } from "@/hooks/auth/use-sign-out";
import { useGetUser } from "@/hooks/user/use-get-user";
import { formatDisplayName } from "@/utils/formatters/names/format-display-name";
import { Loader2, LogOut } from "lucide-react";
import NextLink from "next/link";
import { NavLink } from "./nav-link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export function Header() {
  const { data: user, isLoading } = useGetUser();
  const { mutate: signOut, isPending } = useSignOut();

  const userName = user?.displayName
    ? formatDisplayName(user.displayName, { ignoreParticles: true })
    : null;
  const userEmail = user?.email ? user.email : null;

  if (isLoading) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  }

  return (
    <header className="w-full h-auto p-4 border border-transparent border-b-sidebar bg-sidebar">
      <div className="mx-auto w-full h-auto max-w-7xl flex items-center justify-between">
        <div className="flex items-center gap-8">
          <NextLink
            href="/"
            className="text-xl font-semibold tracking-tight hover:opacity-80 transition"
          >
            Domus
          </NextLink>

          <nav className="hidden md:flex items-center gap-4">
            <NavLink href="/">Dashboard</NavLink>

            <NavLink href="/transactions" segment="transactions">
              Transações
            </NavLink>

            <NavLink href="/categories" segment="categories">
              Categorias
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="hidden sm:flex flex-col">
              <span className="text-sm text-right">Olá, {userName}</span>

              <span className="text-xs text-muted-foreground text-right">
                {userEmail}
              </span>
            </div>

            <Avatar className="h-9 w-9 rounded">
              <AvatarImage src="" className="rounded" />
              <AvatarFallback className="rounded">VF</AvatarFallback>
            </Avatar>
          </div>

          <Separator orientation="vertical" className="min-h-6 " />

          <Button
            variant="ghost"
            className="rounded"
            onClick={() => signOut()}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <LogOut className="size-4" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
