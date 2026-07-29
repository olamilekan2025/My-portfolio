"use client";

import { motion } from "framer-motion";

import { Section } from "@/components/common/section";


import { AboutImage } from "./about-image";
import { AboutContent } from "./about-content";

export function AboutSection() {
  return (
    <Section id="about">
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.8,
        }}
        className="
          grid
          items-center
          gap-16
          lg:grid-cols-2
        "
      >
        <AboutImage />

        <AboutContent />
      </motion.div>
    </Section>
  );
}