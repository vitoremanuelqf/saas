"use client";

import { cn } from "@/lib/utils";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  children: React.ReactNode;
  exact?: boolean; // opcional
};

export function HeaderNavLink({ href, exact = true, children }: Props) {
  const pathname = usePathname();

  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <NextLink
      href={href}
      className={cn(
        "w-auto h-auto py-0.5 flex items-center border-2 border-transparent font-medium text-sm text-muted-foreground transition",
        isActive
          ? "border-b-primary text-foreground"
          : "hover:text-foreground hover:border-b-foreground",
      )}
    >
      {children}
    </NextLink>
  );
}
