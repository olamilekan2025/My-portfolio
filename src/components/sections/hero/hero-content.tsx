"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { TypingText } from "./typing-text";

export function HeroContent() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="space-y-7"
    >
      {/* NAME LABEL */}

      <div
        className="
          inline-flex
          items-center
          border
          border-blue-500/20
          bg-blue-500/[0.07]
          px-4
          py-2
          font-mono
          text-[11px]
          font-medium
          tracking-[0.2em]
         
        "
      >
        OLADUNJOYE ABDULJELEEL
      </div>

      {/* MAIN HEADING */}

      <h1
        className="
          max-w-[850px]
          font-black
          uppercase
          tracking-[-0.055em]
          text-black
          dark:text-white
        "
      >
        <span
          className="
            block
            text-[54px]
            leading-[0.9]
            sm:text-[68px]
            lg:text-[78px]
            xl:text-[88px]
          "
        >
          HEY! I'M
        </span>

        <span
          className="
            block
            text-[54px]
            leading-[0.9]
            sm:text-[68px]
            lg:text-[78px]
            xl:text-[88px]
          "
        >
          ABDULJELEEL
        </span>

        <span
          className="
            mt-4
            flex
            flex-wrap
            items-baseline
            gap-x-3
            text-[54px]
            leading-[0.9]
            text-blue-500
            sm:text-[68px]
            lg:text-[78px]
            xl:text-[88px]
          "
        >
          I'M A

          <span className="text-[28px] sm:text-[34px] lg:text-[40px]">
            <TypingText />
          </span>
        </span>
      </h1>

      {/* DESCRIPTION */}

      <p
        className="
          max-w-[680px]
          text-base
          leading-8
          text-slate-400
          sm:text-lg
        "
      >
        I design and build high-performance digital
        products, scalable web applications and modern
        software experiences using Next.js, TypeScript,
        React and modern cloud technologies.
      </p>
    </motion.div>
  );
}