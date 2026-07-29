"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

import { AnimatedCounter } from "../common/animated-counter";
import { GlassCard } from "./glass-card";

interface StatCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
  suffix?: string;
}

export function StatCard({
  icon: Icon,
  value,
  label,
  suffix = "",
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <GlassCard className="relative overflow-hidden rounded-3xl p-6">
        {/* Gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-violet-500/5 to-cyan-500/5" />

        <div className="relative flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-500 text-white shadow-lg">
            <Icon className="h-7 w-7" />
          </div>

          <div>
            <h3 className="text-3xl font-black">
              <AnimatedCounter
                end={value}
                suffix={suffix}
              />
            </h3>

            <p className="text-sm text-muted-foreground">
              {label}
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}