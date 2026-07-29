"use client";

import { motion } from "framer-motion";
import { SkillCard } from "@/components/skills/skill-card";
import { skillCards } from "@/lib/skills-data";

/**
 * Full "Skills" page section. Self-contained — drop <SkillsSection /> into
 * a page. Renders a centered header followed by a responsive 4-card grid
 * (Frontend, Backend & Database, Tools & Cloud, Professional Skills).
 */
export function SkillsSections() {
    
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative overflow-hidden bg-slate-50 py-5  sm:py-10 dark:bg-slate-950"
    >
      {/* soft ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute left-1/2 top-0 h-[26rem] w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-400/20 via-violet-400/20 to-cyan-400/20 blur-[110px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-0 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-14 max-w-xl text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            Technical Skills
          </span>
          <h2
            id="skills-heading"
            className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl"
          >
            My{" "}
            <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 bg-clip-text text-transparent">
              Technology Stack
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            I use modern technologies and industry best practices to design,
            build, and deploy scalable web applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {skillCards.map((card, i) => (
            <SkillCard key={card.id} data={card} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
