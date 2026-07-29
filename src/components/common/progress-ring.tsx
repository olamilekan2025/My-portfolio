"use client";

import { useRef, useId } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressRingProps {
  /** 0-100 */
  value: number;
  label: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  /** Delay in seconds, useful for staggering a grid of rings */
  delay?: number;
}

/**
 * Circular progress indicator that animates its stroke into view once
 * it enters the viewport. Percentage is announced to assistive tech via aria-valuenow.
 */
export function ProgressRing({
  value,
  label,
  size = 88,
  strokeWidth = 6,
  className,
  delay = 0,
}: ProgressRingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();
  const gradientId = useId();

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, value));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div
      ref={ref}
      className={cn("flex flex-col items-center gap-2", className)}
      role="img"
      aria-label={`${label} proficiency: ${clamped}%`}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--skills-grad-blue)" />
              <stop offset="50%" stopColor="var(--skills-grad-violet)" />
              <stop offset="100%" stopColor="var(--skills-grad-cyan)" />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            className="stroke-slate-200/70 dark:stroke-white/10"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{
              strokeDashoffset: inView ? offset : circumference,
            }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }
            }
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ delay: delay + 0.3, duration: 0.4 }}
            className="text-sm font-semibold text-slate-800 dark:text-slate-100"
          >
            {clamped}%
          </motion.span>
        </div>
      </div>
      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
        {label}
      </span>
    </div>
  );
}
