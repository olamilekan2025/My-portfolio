"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { SectionTitle } from "@/components/common/section-title";
import { AboutInfoGrid } from "./about-info-grid";

import { AboutImage } from "./about-image";
import { AboutContent } from "./about-content";
// import { AboutSkills } from "./about-skills";
import { AboutExperience } from "./about-experience";

export function AboutSection() {
  return (
    <Section id="about" className="relative overflow-hidden py-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      <Container>
        {/* Main About Section */}
        <motion.div
          initial={false}
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
          className="relative grid items-start gap-16 lg:grid-cols-2 mb-20"
        >
          <AboutImage />

          <AboutContent />
        </motion.div>

        {/* Skills Section */}
        {/* <AboutSkills /> */}

        {/* Experience Section */}
        <AboutExperience />
      </Container>
    </Section>
  );
}