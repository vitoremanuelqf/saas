"use client";

import { cn } from "@/lib/utils";
import NextLink from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

type Props = {
  href: string;
  segment?: string | null;
  children: React.ReactNode;
};

export function NavLink({ href, segment = null, children }: Props) {
  const activeSegment = useSelectedLayoutSegment();

  const isActive = activeSegment === segment;

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

// border-b-2 border-transparent pb-1 text-sm font-medium text-muted-foreground transition hover:text-foreground
//  <NextLink href="/" className="hover:text-foreground transition">
//         </NextLink>
