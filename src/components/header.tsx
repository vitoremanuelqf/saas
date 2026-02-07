"use client";

import { useSignOut } from "@/hooks/auth/use-sign-out";
import { useGetUser } from "@/hooks/user/use-get-user";
import { cn } from "@/lib/utils";
import { Loader2, LogOut } from "lucide-react";
import NextLink from "next/link";
import { HeaderAvatar } from "./header-avatar";
import { HeaderNavLink } from "./header-nav-link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export function Header() {
  const { data: user, isPending: userIsPending } = useGetUser();
  const { mutate: signOut, isPending: signOutIsPending } = useSignOut();

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
            <HeaderNavLink href="/">Dashboard</HeaderNavLink>

            <HeaderNavLink href="/transactions" exact={false}>
              Transações
            </HeaderNavLink>

            <HeaderNavLink href="/categories" exact={false}>
              Categorias
            </HeaderNavLink>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <HeaderAvatar user={user} isLoading={userIsPending} />

          <Separator orientation="vertical" className="min-h-6 " />

          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full"
            onClick={() => signOut()}
            disabled={signOutIsPending}
            aria-label="Sair"
          >
            <LogOut
              className={cn(
                "h-4 w-4 transition-all",
                signOutIsPending && "scale-0 rotate-90",
              )}
            />

            <Loader2
              className={cn(
                "absolute h-4 w-4 animate-spin transition-all",
                signOutIsPending ? "scale-100 rotate-0" : "scale-0 -rotate-90",
              )}
            />
          </Button>
        </div>
      </div>
    </header>
  );
}
