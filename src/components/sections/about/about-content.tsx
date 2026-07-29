"use client";

import { motion } from "framer-motion";

import { GradientText } from "@/components/common/gradient-text";

import {
  ABOUT,
  BIOGRAPHY,
} from "../about/constants";

import { AboutInfoGrid } from "../about/about-info-grid";
import { AboutActions } from "../about/about-actions";

export function AboutContent() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 50,
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
      className="space-y-10"
    >
      {/* Badge */}
      <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
        <span className="text-sm font-medium text-primary">
          About Me
        </span>
      </div>

      {/* Heading */}
      <div className="space-y-4">
        <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
          Building Digital
          <br />

          <GradientText>
            Experiences That Matter
          </GradientText>
        </h2>

        <p className="max-w-2xl text-lg text-muted-foreground">
          Hi, I'm{" "}
          <span className="font-semibold text-foreground">
            {ABOUT.name}
          </span>
          , a passionate Full Stack Web Developer based in{" "}
          <span className="font-semibold text-primary">
            {ABOUT.location}
          </span>
          .
        </p>
      </div>

      {/* Biography */}
      <div className="space-y-6">
        {BIOGRAPHY.split("\n\n").map((paragraph) => (
          <p
            key={paragraph}
            className="leading-8 text-muted-foreground"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* Information Grid */}
     

      {/* Buttons */}
     
    </motion.div>
  );
}