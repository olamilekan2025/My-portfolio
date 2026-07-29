"use client";

import { motion } from "framer-motion";

const stats = [
  {
    value: "10+",
    label: "Projects",
  },
  {
    value: "2+",
    label: "Years",
  },
  {
    value: "100%",
    label: "Client Satisfaction",
  },
];

export function HeroStats() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          whileHover={{ y: -5 }}
          className="rounded-2xl border bg-card/70 p-5 backdrop-blur-xl"
        >
          <h3 className="text-2xl font-bold">
            {stat.value}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}