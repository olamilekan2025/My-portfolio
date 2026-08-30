"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SkillProgressBar } from "../../components/skills/skill-progress-bar";
import type { SkillCardData } from "@/types/skill";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SkillCardProps {
  data: SkillCardData;
  /** Stagger delay in seconds for the card's own entrance animation */
  delay?: number;
  className?: string;
}

/**
 * Premium interactive skill card with expand/collapse functionality,
 * 3D hover effects, and enhanced animations.
 */
export function SkillCard({ data, delay = 0, className }: SkillCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ 
        y: -12,
        scale: 1.02,
        rotateX: 5,
        rotateY: 5,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
    >
      <Card
        className={cn(
          "h-full border-border/50 bg-gradient-to-br from-background via-background to-muted/30 backdrop-blur-xl",
          "transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30",
          "relative overflow-hidden",
          className
        )}
      >
        {/* Animated gradient border effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 via-violet-500/20 to-cyan-500/20 opacity-0"
          animate={{
            opacity: isHovered ? 0.1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold">
              {data.title}
            </CardTitle>
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="rounded-full p-1 hover:bg-muted/50 transition-colors"
            >
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </motion.button>
          </div>
        </CardHeader>

        <CardContent className="relative z-10">
          <motion.div
            initial={false}
            animate={{
              height: isExpanded ? "auto" : "200px",
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-4 pb-2">
              {data.skills.map((skill, i) => (
                <SkillProgressBar 
                  key={skill.name} 
                  skill={skill} 
                  delay={delay + i * 0.08} 
                  isExpanded={isExpanded}
                />
              ))}
            </div>
          </motion.div>

          {/* Expand hint */}
          {!isExpanded && data.skills.length > 3 && (
            <motion.div
              className="mt-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-xs text-muted-foreground">
                Click to see all {data.skills.length} skills
              </p>
            </motion.div>
          )}
        </CardContent>

        {/* Glow effect on hover */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-violet-500/20 to-cyan-500/20 blur-xl opacity-0"
          animate={{
            opacity: isHovered ? 0.3 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  );
}
