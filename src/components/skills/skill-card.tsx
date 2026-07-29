"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SkillProgressBar } from "../../components/skills/skill-progress-bar";
import type { SkillCardData } from "@/types/skill";
import { cn } from "@/lib/utils";

interface SkillCardProps {
  data: SkillCardData;
  /** Stagger delay in seconds for the card's own entrance animation */
  delay?: number;
  className?: string;
}

/**
 * One premium glass card for a skill category (Frontend, Backend, Tools,
 * Professional Skills, ...). Fades/slides up on scroll, lifts on hover.
 */
export function SkillCard({ data, delay = 0, className }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Card
        className={cn(
          "h-full border-slate-200/70 bg-white/70 shadow-sm backdrop-blur-xl",
          "transition-shadow duration-300 hover:shadow-xl hover:shadow-violet-500/10",
          "dark:border-white/10 dark:bg-white/[0.04]",
          className
        )}
      >
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">
            {data.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {data.skills.map((skill, i) => (
            <SkillProgressBar key={skill.name} skill={skill} delay={delay + i * 0.08} />
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
