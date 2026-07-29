"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";

import { GlassCard } from "@/components/common/glass-card";

export function ProfileCard() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 6,
        repeat: Infinity,
      }}
    >
      <GlassCard className="relative overflow-hidden rounded-[36px] p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-cyan-400/10" />

        <div className="relative flex flex-col items-center">
          <div className="relative h-80 w-72 bg-red-400 overflow-hidden rounded-3xl">
            <Image
              src="/images/profile.png"
              alt="Olamilekan"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="mt-6 flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-2 text-sm text-emerald-500">
            <BadgeCheck className="h-4 w-4" />
            Available for Work
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}