"use client";

import { motion } from "framer-motion";
import type { SkillItem } from "@/types/skill";

interface SkillProgressBarProps {
  skill: SkillItem;
  /** Stagger delay in seconds */
  delay?: number;
}

/**
 * One skill row: brand icon, name, percentage, and a bar that animates
 * from 0 to `skill.level` the first time it scrolls into view.
 */
export function SkillProgressBar({ skill, delay = 0 }: SkillProgressBarProps) {
  const Icon = skill.icon;
  const style = {
    "--skill-color": skill.color,
    "--skill-color-dark": skill.colorDark ?? skill.color,
  } as React.CSSProperties;

  return (
    <div style={style}>
      <div className="mb-2 flex items-center gap-2.5">
        <motion.span
          whileHover={{ scale: 1.15, rotate: 6 }}
          transition={{ type: "spring", stiffness: 300, damping: 12 }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--skill-color)]/10 text-[var(--skill-color)] dark:text-[var(--skill-color-dark)]"
          aria-hidden
        >
          <Icon className="h-4 w-4" />
        </motion.span>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {skill.name}
        </span>
        <span className="ml-auto text-sm font-semibold tabular-nums text-slate-500 dark:text-slate-400">
          {skill.level}%
        </span>
      </div>

      <div
        className="h-2 w-full overflow-hidden rounded-full bg-slate-200/70 dark:bg-white/10"
        role="progressbar"
        aria-valuenow={skill.level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${skill.name} proficiency`}
      >
        <motion.div
          className="h-full rounded-full bg-[var(--skill-color)] dark:bg-[var(--skill-color-dark)]"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
