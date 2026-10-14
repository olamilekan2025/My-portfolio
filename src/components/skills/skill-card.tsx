
"use client";

import { useState } from "react";
import {
  ChevronDown,
  Layers3,
  Sparkles,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { SkillProgressBar } from "@/components/skills/skill-progress-bar";
import type { SkillCardData } from "@/types/skill";
import { cn } from "@/lib/utils";

interface SkillCardProps {
  data: SkillCardData;
  delay?: number;
  className?: string;
}

export function SkillCard({
  data,
  className,
}: SkillCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleSkills = isExpanded
    ? data.skills
    : data.skills.slice(0, 3);

  const remainingSkills = Math.max(data.skills.length - 3, 0);
  const contentId = `skills-${data.id}`;

  return (
    <Card
      className={cn(
        "group relative flex h-full min-w-0 flex-col overflow-hidden",
        "rounded-2xl border border-border/80 bg-card shadow-sm",
        "hover:border-blue-500/30",
        className,
      )}
    >
      {/* Brand accent */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400"
      />

      <CardHeader className="px-4 pb-4 pt-5 sm:px-5 sm:pt-6">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/[0.12] to-violet-500/[0.07] text-blue-600 dark:text-blue-400">
            <Layers3 className="h-[19px] w-[19px]" />
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <CardTitle className="break-words text-base font-semibold leading-6 tracking-tight text-foreground sm:text-lg">
              {data.title}
            </CardTitle>

            <p className="mt-1.5 text-xs text-muted-foreground">
              {String(data.skills.length).padStart(2, "0")}{" "}
              {data.skills.length === 1
                ? "technology"
                : "technologies"}
            </p>
          </div>

          <div
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-violet-500/15 bg-violet-500/[0.05] text-violet-500"
          >
            <Sparkles className="h-4 w-4" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col px-4 pb-4 pt-0 sm:px-5 sm:pb-5">
        <div className="mb-5 h-px bg-border/70" />

        <div
          id={contentId}
          className="flex flex-1 flex-col gap-5"
        >
          {visibleSkills.map((skill) => (
            <div key={skill.name} className="min-w-0">
              <SkillProgressBar
                skill={skill}
                delay={0}
                isExpanded={isExpanded}
              />
            </div>
          ))}
        </div>

        {remainingSkills > 0 && (
          <button
            type="button"
            aria-expanded={isExpanded}
            aria-controls={contentId}
            onClick={() => setIsExpanded((previous) => !previous)}
            className={cn(
              "mt-6 flex min-h-11 w-full items-center justify-between gap-3",
              "rounded-xl border border-border/80 bg-background/40 px-3.5 py-3",
              "text-left text-xs font-semibold text-muted-foreground",
              "hover:border-blue-500/30 hover:bg-blue-500/[0.04] hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-blue-500 focus-visible:ring-offset-2",
              "focus-visible:ring-offset-background",
            )}
          >
            <span>
              {isExpanded
                ? "Show fewer skills"
                : `Explore ${remainingSkills} more ${
                    remainingSkills === 1 ? "skill" : "skills"
                  }`}
            </span>

            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0",
                isExpanded && "rotate-180",
              )}
            />
          </button>
        )}
      </CardContent>
    </Card>
  );
}
