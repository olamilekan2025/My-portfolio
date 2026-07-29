"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { ExperienceBadge } from "./experience-badge";
import { AvailabilityBadge } from "../about/availability-badge";

export function AboutImage() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -50,
      }}
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
      className="relative mx-auto w-full max-w-xl "
    >
      {/* Background Glow */}
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/20 via-violet-500/10 to-cyan-500/20 blur-3xl" />

      {/* Image Card */}
      <motion.div
        whileHover={{
          y: -8,
          scale: 1.02,
        }}
        transition={{
          duration: 0.35,
        }}
        className="
          relative
          overflow-hidden
          rounded-[2rem]
          border
          border-border/50
          bg-background/70
          p-3
          shadow-2xl
          backdrop-blur-xl
        "
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
          <Image
            src="/images/profile.png"
            alt="Olamilekan Abduljeleel"
            fill
            priority
            className="object-cover transition duration-700 group-hover:scale-105"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        </div>
      </motion.div>

      {/* Floating Badges */}
      <ExperienceBadge />

      <AvailabilityBadge />
    </motion.div>
  );
}