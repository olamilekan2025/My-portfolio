"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { TypingText } from "./typing-text";


import { GradientText } from "@/components/common/gradient-text";

export function HeroContent() {
  return (
  <>
    
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
     

      <div className=" flex space-y-5  justify-center items-center flex-col  ">
        <h1 className="text-5xl font-black leading-tight lg:text-7xl flex flex-col items-center text-center">
  <span>Hi, I'm</span>
  <span>
    <GradientText>Oladunjoye</GradientText> Abduljeleel
  </span>
</h1>

        <h2 className="text-2xl text-muted-foreground lg:text-3xl">
          <TypingText />
        </h2>

        <p className="max-w-xl text-lg leading-8 text-center text-muted-foreground px-3">
          I build premium web applications using
          Next.js, TypeScript, MongoDB and modern
          cloud technologies.
        </p>
      </div>
    </motion.div>
  </>
  );
}