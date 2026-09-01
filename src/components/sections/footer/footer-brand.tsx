"use client";

import { motion } from "framer-motion";
import { Logo } from "../../navigation/logo";
import { GradientText } from "@/components/common/gradient-text";

export function FooterBrand() {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="max-w-md"
    >
      <div className="inline-flex">
        <Logo />
      </div>

      <div className="mt-5 space-y-3">
        <h3 className="text-xl font-bold tracking-tight text-foreground">
          <GradientText>Oladunjoye Abduljeleel</GradientText>
        </h3>

        <p className="max-w-sm text-sm leading-7 text-muted-foreground">
          Building modern, scalable, and user-focused web applications with
          clean architecture, exceptional performance, and delightful user
          experiences.
        </p>
      </div>
    </motion.div>
  );
}