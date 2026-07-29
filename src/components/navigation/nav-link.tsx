"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  label: string;
  active: boolean;
}

export function NavLink({
  href,
  label,
  active,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "relative px-2 py-1 text-sm font-medium transition-colors duration-300 ",
        active
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {label}

      <span
        className={cn(
          "absolute -bottom-1 left-0 h-[2px] rounded-full bg-primary transition-all duration-300",
          active ? "w-full" : "w-0"
        )}
      />
    </Link>
  );
}