"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle colour theme"
      title="Toggle colour theme"
      className={cn(
        "group relative grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface text-fg-muted transition-all duration-200",
        "hover:border-border-strong hover:text-fg active:scale-95",
        className,
      )}
    >
      {/* Visibility is driven by CSS so the icon never flashes on hydration. */}
      <Sun
        className="absolute h-4 w-4 transition-opacity duration-300 hidden dark:block"
        aria-hidden="true"
      />
      <Moon
        className="absolute h-4 w-4 transition-opacity duration-300 block dark:hidden"
        aria-hidden="true"
      />
    </button>
  );
}
