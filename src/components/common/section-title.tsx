
"use client";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { GradientText } from "./gradient-text";

interface SectionTitleProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
}

export function SectionTitle({
  badge,
  title,
  highlight,
  description,
}: SectionTitleProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mx-auto mb-16 max-w-3xl text-center"
    >
      {badge && (
        <div className="mb-4">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            {badge}
          </span>
        </div>
      )}

      <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
        {title}{" "}
        {highlight && (
          <GradientText>{highlight}</GradientText>
        )}
      </h2>

      {description && (
        <p className="mt-6 text-lg text-muted-foreground">
          {description}
        </p>
      )}
    </motion.div>
  );
}