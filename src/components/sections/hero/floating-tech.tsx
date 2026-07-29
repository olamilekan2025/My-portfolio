"use client";

import { motion } from "framer-motion";
import {
  Database,
  Globe,
  Server,
  Code2,
} from "lucide-react";

const items = [
  { Icon: Code2, top: "25%", left: "40%" },
  { Icon: Globe, top: "23%", right: "42%" },
  { Icon: Server, bottom: "5%", left: "39%" },
  { Icon: Database, bottom: "8%", right: "38%" },
];

export function FloatingTech() {
  return (
    <>
      {items.map(({ Icon, ...style }, index) => (
        <motion.div
          key={index}
          animate={{ y: [0, - 12, 0] }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
          }}
          className="absolute rounded-2xl border bg-background/70 p-3 shadow-lg backdrop-blur-xl"
          style={style}
        >
          <Icon className="h-5 w-5 text-blue-500" />
        </motion.div>
      ))}
    </>
  );
}