"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

export function SidebarItem({
  title,
  href,
  icon: Icon,
  badge,
}: Props) {
  const pathname = usePathname();

  const active = pathname === href;

  return (
    <Link href={href}>
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
            "flex h-8 w-8 items-center justify-center rounded-lg",
            active ? "bg-white/15" : "bg-transparent"
          )}
        >
          <Icon className="h-[18px] w-[18px]" />
        </span>

        <span className="font-medium">{title}</span>

        {typeof badge === "number" && badge > 0 && (
          <span
            className={cn(
              "ml-auto flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold",
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
