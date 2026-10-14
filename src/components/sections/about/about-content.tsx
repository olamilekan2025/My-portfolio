"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Download,
  Mail,
  Sparkles,
} from "lucide-react";

import { GradientText } from "@/components/common/gradient-text";
import { ABOUT } from "../about/constants";

const highlights = [
  {
    value: "2+",
    label: "Years of web development",
  },
  {
    value: "3+",
    label: "Projects showcased",
  },
];

export function AboutContent() {
  return (
    <div className="relative space-y-7 sm:space-y-8">
      {/* Introduction */}
      <div className="space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3.5 py-2"
        >
          <Sparkles className="h-4 w-4 text-primary" />

          <span className="text-xs font-semibold text-primary sm:text-sm">
            About Me
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          Hi, I&apos;m{" "}
          <GradientText>{ABOUT.name}</GradientText>
          <span className="mt-3 block text-foreground">
            Frontend Developer
            <span className="text-muted-foreground"> &amp; </span>
            <GradientText>Full-Stack Learner.</GradientText>
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
        >
          I&apos;m a web developer based in {ABOUT.location}, passionate
          about building modern, responsive web applications that combine
          thoughtful design with practical functionality.
        </motion.p>
      </div>

      {/* Personal story */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8"
      >
        <p>
          I started my web development journey in 2024, focusing on
          frontend development and learning how to turn designs and ideas
          into engaging user experiences. Since then, I&apos;ve continued
          to strengthen my skills by building projects and exploring
          modern web technologies.
        </p>

        <p>
          I work with React, Next.js, TypeScript, and Tailwind CSS to
          create responsive interfaces. I&apos;m also developing my
          backend skills with Node.js, Express, REST APIs, and MongoDB,
          allowing me to build applications that go beyond the user
          interface.
        </p>

        <p>
          My projects include Alifat Connect, a digital utility platform,
          and the ITMT Management System, a school management application.
          These projects have given me practical experience connecting
          frontend interfaces with backend services, authentication,
          databases, and payment workflows.
        </p>
      </motion.div>

      {/* Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.15 }}
        className="grid max-w-2xl grid-cols-2 gap-3 sm:gap-4"
      >
        {highlights.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-border/60 bg-background/50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.04] sm:p-5"
          >
            <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              <GradientText>{item.value}</GradientText>
            </p>

            <p className="mt-2 text-xs leading-5 text-muted-foreground sm:text-sm">
              {item.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap"
      >
        <motion.a
          href="#contact"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-all duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <Mail className="h-4 w-4" />

          <span>Get In Touch</span>

          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </motion.a>

        <motion.a
          href="/resumes.pdf"
          download
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-background/70 px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/40 hover:bg-primary/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />

          <span>Download CV</span>
        </motion.a>
      </motion.div>
    </div>
  );
}