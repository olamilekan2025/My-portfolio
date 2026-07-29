"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/motion";
import { Container } from "./container";

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export function Section({
  id,
  children,
  className,
  containerClassName,
}: SectionProps) {
  return (
    <motion.section
      id={id}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      className={cn(
        "relative scroll-mt-24 py-24 md:py-20",
        className
      )}
    >
      <Container className={containerClassName}>
        {children}
      </Container>
    </motion.section>
  );
}