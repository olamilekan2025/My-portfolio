"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import type { ElementType } from "react";

import { cn } from "@/lib/utils";

interface SidebarItemProps {
  title: string;
  href: string;
  icon: ElementType;
  badge?: number;
}

export function SidebarItem({
  title,
  href,
  icon: Icon,
  badge,
}: SidebarItemProps) {
  const pathname = usePathname();

  const active =
    pathname === href ||
    (href !== "/admin/dashboard" &&
      pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <motion.div
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
          active
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
            active
              ? "bg-white/15"
              : "bg-transparent"
          )}
        >
          <Icon
            aria-hidden="true"
            className="h-[18px] w-[18px]"
          />
        </span>

        <span className="min-w-0 flex-1 truncate font-medium">
          {title}
        </span>

        {typeof badge === "number" &&
          badge > 0 && (
            <span
              className={cn(
                "ml-auto flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1.5 text-xs font-semibold",
                active
                  ? "bg-white/20 text-white"
                  : "bg-primary text-primary-foreground"
              )}
            >
              {badge}
            </span>
          )}
      </motion.div>
    </Link>
  );
}

export default SidebarItem;