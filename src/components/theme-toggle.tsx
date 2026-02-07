"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Check, Computer, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ThemeValue = "light" | "dark" | "system";

const LABEL: Record<ThemeValue, string> = {
  light: "Claro",
  dark: "Escuro",
  system: "Sistema",
};

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const current = (theme ?? "system") as ThemeValue;
  const effective = (resolvedTheme ?? "light") as "light" | "dark";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          data-mounted={mounted}
          className={cn(
            "relative rounded-full",
            "[&_*]:transition-none data-[mounted=true]:[&_*]:transition-all",
          )}
          aria-label="Trocar tema"
        >
          {!mounted ? (
            <Skeleton className="h-4 w-4 rounded-full" />
          ) : (
            <>
              <Sun
                className={cn(
                  "h-4 w-4",
                  effective === "dark" && "scale-0 -rotate-90",
                )}
              />

              <Moon
                className={cn(
                  "absolute h-4 w-4",
                  effective === "dark"
                    ? "scale-100 rotate-0"
                    : "scale-0 rotate-90",
                )}
              />
            </>
          )}

          <span className="sr-only">Alternar tema</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-44">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Tema: {LABEL[current]}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {(["light", "dark", "system"] as ThemeValue[]).map((value) => (
          <DropdownMenuItem
            key={value}
            onClick={() => setTheme(value)}
            className="flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              {value === "light" && <Sun className="h-4 w-4" />}
              {value === "dark" && <Moon className="h-4 w-4" />}
              {value === "system" && <Computer className="h-4 w-4" />}
              {LABEL[value]}
            </span>

            <Check
              className={cn(
                "h-4 w-4 transition-opacity",
                current === value ? "opacity-100" : "opacity-0",
              )}
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
