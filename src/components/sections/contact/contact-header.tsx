"use client";

import { motion } from "framer-motion";

export function ContactHeader() {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .6 }}
      className="space-y-5"
    >
      

      <h2 className="text-5xl font-bold tracking-tight">
        Let's Build Something Amazing Together.
      </h2>

      <p className="max-w-xl text-muted-foreground leading-8">
        Whether you have a project idea, freelance opportunity,
        collaboration, or full-time role, I'd love to hear from you.
        I'm always open to discussing innovative ideas and building
        exceptional digital experiences.
      </p>
    </motion.div>
  );
}