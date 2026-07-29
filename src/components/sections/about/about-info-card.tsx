"use client";

import type { LucideIcon } from "lucide-react";

interface AboutInfoCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
}

export function AboutInfoCard({
  icon: Icon,
  title,
  value,
}: AboutInfoCardProps) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-border/60
        bg-background/60
        p-5
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-primary/30
        hover:shadow-lg
      "
    >
      <Icon className="mb-4 h-6 w-6 text-primary" />

      <p className="text-xs uppercase tracking-wider text-muted-foreground">
        {title}
      </p>

      <h3 className="mt-2 font-semibold">
        {value}
      </h3>
    </div>
  );
}