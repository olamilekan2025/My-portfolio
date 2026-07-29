"use client";

import { GraduationCap, Calendar } from "lucide-react";
import { motion } from "framer-motion";

import { GlassCard } from "@/components/common/glass-card";

export function EducationCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <GlassCard className="rounded-3xl p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-500 p-3 text-white">
            <GraduationCap className="h-7 w-7" />
          </div>

          <h3 className="text-2xl font-bold">
            Education
          </h3>
        </div>

        <h4 className="text-xl font-semibold">
          Bachelor of Computer Science
        </h4>

        <p className="mt-2 text-muted-foreground">
          University Name
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />

          2020 – 2024
        </div>
      </GlassCard>
    </motion.div>
  );
}