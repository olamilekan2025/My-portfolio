"use client";

import type { ReactNode } from "react";

interface SectionTitleProps {
  badge?: string;
  badgeIcon?: ReactNode;
  title: string;
  highlight?: string;
  description?: string;
}

export function SectionTitle({
  badge,
  badgeIcon,
  title,
  highlight,
  description,
}: SectionTitleProps) {
  return (
    <div className="mx-auto max-w-6xl text-start px-5 md:px-0">
      {/* Badge */}
      {badge && (
  <div
    className="
      inline-flex
      items-center
      gap-2
      rounded-full
      border
      border-primary/20
      bg-primary/5
      px-4
      py-2
      shadow-sm
      backdrop-blur-sm
    "
  >
    {badgeIcon && (
      <span
        className="
          inline-flex
          items-center
          justify-center
          bg-[linear-gradient(90deg,#3b82f6_0%,#8b5cf6_50%,#22d3ee_100%)]
          bg-clip-text
          text-transparent
        "
      >
        {badgeIcon}
      </span>
    )}

    <span
      className="
        bg-[linear-gradient(90deg,#3b82f6_0%,#8b5cf6_50%,#22d3ee_100%)]
        bg-clip-text
        text-xs
        font-semibold
        uppercase
        tracking-[0.3em]
        text-transparent
      "
    >
      {badge}
    </span>
  </div>
)}      {/* Title */}
      <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        <span className="text-slate-900 dark:text-white">
          {title}{" "}
        </span>

        {highlight && (
          <span
            className="
              bg-[linear-gradient(90deg,#3b82f6_0%,#8b5cf6_50%,#22d3ee_100%)]
              bg-clip-text
              text-transparent
            "
          >
            {highlight}
          </span>
        )}
      </h2>

      {/* Description */}
      {description && (
        <p className="mx-auto mt-4 max-w-6xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}