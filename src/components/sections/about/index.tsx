"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { SectionTitle } from "@/components/common/section-title";
import { AboutInfoGrid } from "./about-info-grid";

import { AboutImage } from "./about-image";
import { AboutContent } from "./about-content";

export function AboutSection() {
  return (
    <Section id="about">
      <Container>
        {/* <SectionTitle
          badge="About Me"
          title="Passionate About"
          highlight="Building Modern Web Experiences"
          description="Learn more about my journey, experience, and passion for creating modern, scalable, and high-performance web applications."
        /> */}

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
          className=" grid items-start  gap-16 lg:grid-cols-2 "
        >
          <AboutImage />

          <AboutContent />
        </motion.div>
         <AboutInfoGrid />
      </Container>
    </Section>
  );
}