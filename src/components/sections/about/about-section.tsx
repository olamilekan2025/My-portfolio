"use client";

import { motion } from "framer-motion";

import { Section } from "@/components/common/section";


import { AboutImage } from "./about-image";
import { AboutContent } from "./about-content";

export function AboutSection() {
  return (
    <Section id="about">
      {/* About introduction */}
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.65, ease: "easeOut" }}
  className="relative mx-auto mb-20 max-w-5xl sm:mb-24 lg:mb-28"
>
  <AboutContent />
</motion.div>
    </Section>
  );
}