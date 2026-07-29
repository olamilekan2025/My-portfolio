"use client";

import { motion } from "framer-motion";
import type { ContactCard as ContactCardType } from "./types";

interface ContactCardProps {
  item: ContactCardType;
}

export function ContactCard({
  item,
}: ContactCardProps) {
  const Icon = item.icon;

  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        flex
        items-start
        gap-4
        rounded-3xl
        border
        border-border/60
        bg-background/70
        p-6
        shadow-sm
        backdrop-blur-xl
        transition-all
        hover:border-primary/40
        hover:shadow-xl
      "
    >
      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-primary/10
          text-primary
        "
      >
        <Icon className="h-6 w-6" />
      </div>

      <div>
        <p className="text-sm text-muted-foreground">
          {item.title}
        </p>

        <h4 className="mt-1 font-semibold">
          {item.value}
        </h4>
      </div>
    </motion.div>
  );
}