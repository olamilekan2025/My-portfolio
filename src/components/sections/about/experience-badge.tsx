"use client";

import { motion } from "framer-motion";

import { EXPERIENCE } from "../about/constants";

export function ExperienceBadge() {
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
        delay: 0.3,
      }}
      className="
        absolute
        -left-6
        top-8
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
      <p className="text-3xl font-bold text-primary">
        {EXPERIENCE}+
      </p>

      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Years Experience
      </p>
    </motion.div>
  );
}