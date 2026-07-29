"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function HeroScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
      animate={{ y: [0, 10, 0] }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
      }}
    >
      <ChevronDown className="h-8 w-8 text-muted-foreground" />
    </motion.div>
  );
}