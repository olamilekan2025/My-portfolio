"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function AvailabilityBadge() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        delay: 0.5,
      }}
      className="
        absolute
        -right-6
        bottom-8
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-border/50
        bg-background/90
        px-5
        py-4
        shadow-xl
        backdrop-blur-xl
      "
    >
      <CheckCircle2 className="h-5 w-5 text-green-500" />

      <div>
        <p className="font-semibold">
          Available
        </p>

        <p className="text-xs text-muted-foreground">
          Freelance & Full-Time
        </p>
      </div>
    </motion.div>
  );
}