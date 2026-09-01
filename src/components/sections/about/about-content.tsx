"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";

import { GradientText } from "@/components/common/gradient-text";

import {
  ABOUT,
  BIOGRAPHY,
} from "../about/constants";

export function AboutContent() {
  return (
    <motion.div
      initial={false}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.8,
      }}
      className="space-y-8 px-2 md:px-0"
    >
      {/* Badge */}
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-2"
      >
        <span className="text-sm font-medium text-primary">
          About Me
        </span>
      </motion.div>

      {/* Heading */}
      <div className="space-y-4">
        <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
          Hi, I'm{" "}
          <GradientText>
            {ABOUT.name}
          </GradientText>
        </h2>
        <p className="text-xl text-muted-foreground">
          Full Stack Developer & Digital Experience Creator
        </p>
      </div>

      {/* Bio */}
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          I'm a passionate full-stack developer based in {ABOUT.location} with a deep love for crafting exceptional digital experiences. With expertise spanning modern web technologies, I transform complex ideas into elegant, scalable solutions.
        </p>
        <p>
          My journey in tech has been driven by curiosity and a commitment to continuous learning. I specialize in building performant applications using Next.js, React, TypeScript, and Node.js, with a keen eye for user experience and clean architecture.
        </p>
      </div>

      {/* Key Highlights */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border/50 bg-muted/30 p-4">
          <div className="text-2xl font-bold text-foreground">3+</div>
          <div className="text-sm text-muted-foreground">Years of Experience</div>
        </div>
        <div className="rounded-xl border border-border/50 bg-muted/30 p-4">
          <div className="text-2xl font-bold text-foreground">40+</div>
          <div className="text-sm text-muted-foreground">Projects Delivered</div>
        </div>
        <div className="rounded-xl border border-border/50 bg-muted/30 p-4">
          <div className="text-2xl font-bold text-foreground">25+</div>
          <div className="text-sm text-muted-foreground">Happy Clients</div>
        </div>
        <div className="rounded-xl border border-border/50 bg-muted/30 p-4">
          <div className="text-2xl font-bold text-foreground">15+</div>
          <div className="text-sm text-muted-foreground">Technologies</div>
        </div>
      </div>

{/* CTA Buttons */}
<div className="flex flex-wrap gap-4 pt-4">
  {/* Get In Touch */}
  <motion.a
    href="#contact"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="
      group
      relative
      isolate
      inline-flex
      items-center
      gap-2
      overflow-hidden
      rounded-lg
      bg-primary
      px-6
      py-3
      font-semibold
      text-primary-foreground
      shadow-lg
      transition-shadow
      duration-300
      hover:shadow-xl
    "
  >
    {/* Animated gradient background */}
    <span
      className="
        absolute
        inset-0
        z-0
        origin-left
        scale-x-0
        bg-[linear-gradient(90deg,#3b82f6_0%,#8b5cf6_50%,#22d3ee_100%)]
        transition-transform
        duration-500
        ease-out
        group-hover:scale-x-100
      "
    />

    {/* Button content */}
    <Mail className="relative z-10 h-4 w-4" />

    <span className="relative z-10">
      Get In Touch
    </span>
  </motion.a>

  {/* Download CV */}
  <motion.a
    href="/resume.pdf"
  download
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
    className="
      group
      relative
      isolate
      inline-flex
      items-center
      gap-2
      overflow-hidden
      rounded-lg
      border
      border-border/50
      bg-background
      px-6
      py-3
      font-semibold
      text-foreground
      transition-all
      duration-300
    "
  >
    {/* Animated gradient background */}
    <span
      className="
        absolute
        inset-0
        z-0
        origin-left
        scale-x-0
        bg-[linear-gradient(90deg,#3b82f6_0%,#8b5cf6_50%,#22d3ee_100%)]
        transition-transform
        duration-500
        ease-out
        group-hover:scale-x-100
      "
    />

    {/* Button content */}
    <Download className="relative z-10 h-4 w-4 transition-colors duration-300 group-hover:text-white" />

    <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
      Download CV
    </span>
  </motion.a>
</div>
    </motion.div>
  );
}