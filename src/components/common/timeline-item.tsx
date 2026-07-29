"use client";

import { motion } from "framer-motion";

interface Props {
  year: string;
  title: string;
  description: string;
}

export function TimelineItem({
  year,
  title,
  description,
}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -30,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{ once: true }}
      className="relative border-l border-border pl-8"
    >
      <span className="absolute -left-[9px] top-2 h-4 w-4 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400" />

      <p className="text-sm text-blue-500">
        {year}
      </p>

      <h4 className="mt-2 text-xl font-bold">
        {title}
      </h4>

      <p className="mt-2 text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
}