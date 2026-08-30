"use client";

import { motion } from "framer-motion";
import type { SkillItem } from "@/types/skill";

interface SkillProgressBarProps {
  skill: SkillItem;
  /** Stagger delay in seconds */
  delay?: number;
  isExpanded?: boolean;
}

/**
 * Enhanced skill row with crazy animations, glow effects, and interactive elements.
 * Features animated progress bar, pulsing icon, and hover effects.
 */
export function SkillProgressBar({ skill, delay = 0, isExpanded = true }: SkillProgressBarProps) {
  const Icon = skill.icon;
  const style = {
    "--skill-color": skill.color,
    "--skill-color-dark": skill.colorDark ?? skill.color,
  } as React.CSSProperties;

  return (
    <div style={style} className="group">
      <div className="mb-2 flex items-center gap-2.5">
        <motion.div
          whileHover={{ 
            scale: 1.2, 
            rotate: [0, -10, 10, -10, 0],
            transition: { duration: 0.5 }
          }}
          whileTap={{ scale: 0.9 }}
          className="relative"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0 0px rgba(var(--skill-color), 0.4)",
                "0 0 0 10px rgba(var(--skill-color), 0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="absolute inset-0 rounded-lg"
          />
          <motion.span
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--skill-color)]/10 text-[var(--skill-color)] dark:text-[var(--skill-color-dark)]"
            aria-hidden
          >
            <Icon className="h-4 w-4" />
          </motion.span>
        </motion.div>
        
        <span className="text-sm font-medium text-foreground">
          {skill.name}
        </span>
        
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2 }}
          className="ml-auto text-sm font-semibold tabular-nums text-muted-foreground"
        >
          {skill.level}%
        </motion.span>
      </div>

      <div
        className="relative h-2 w-full overflow-hidden rounded-full bg-muted/50"
        role="progressbar"
        aria-valuenow={skill.level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${skill.name} proficiency`}
      >
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[var(--skill-color)]/20 blur-sm"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Progress bar with crazy animation */}
        <motion.div
          className="relative h-full rounded-full bg-[var(--skill-color)] dark:bg-[var(--skill-color-dark)]"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ 
            duration: 1.5, 
            delay,
            ease: [0.22, 1, 0.36, 1] 
          }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay + 1,
            }}
          />
        </motion.div>
      </div>

      {/* Skill level indicator with particles */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.3 }}
          className="mt-1 flex gap-1"
        >
          {[...Array(Math.ceil(skill.level / 20))].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.4 + i * 0.05 }}
              className="h-1 w-1 rounded-full bg-[var(--skill-color)] dark:bg-[var(--skill-color-dark)]"
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
