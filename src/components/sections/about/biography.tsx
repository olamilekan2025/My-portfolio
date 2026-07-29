"use client";

import { motion } from "framer-motion";

import { fadeUp } from "@/lib/motion";
import { InfoItem } from "@/components/common/info-item";

export function Biography() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-8"
    >
      <div className="space-y-5">
        <h3 className="text-4xl font-bold">
          Passionate about building
          modern digital products.
        </h3>

        <p className="leading-8 text-muted-foreground">
          I specialize in developing
          scalable web applications using
          modern technologies such as
          Next.js, TypeScript, MongoDB,
          Node.js and cloud services.
        </p>

        <p className="leading-8 text-muted-foreground">
          My goal is to create beautiful,
          fast and user-friendly software
          that solves real-world problems.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <InfoItem>Full Stack Development</InfoItem>

        <InfoItem>REST APIs</InfoItem>

        <InfoItem>MongoDB Design</InfoItem>

        <InfoItem>UI Implementation</InfoItem>

        <InfoItem>Cloud Deployment</InfoItem>

        <InfoItem>Performance Optimization</InfoItem>
      </div>
    </motion.div>
  );
}