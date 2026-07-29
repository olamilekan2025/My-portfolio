"use client";

import {
  Trophy,
  Rocket,
  Briefcase,
  Star,
} from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "40+ Projects Built",
  },
  {
    icon: Rocket,
    title: "Modern SaaS Applications",
  },
  {
    icon: Briefcase,
    title: "Freelance Experience",
  },
  {
    icon: Star,
    title: "100% Client Satisfaction",
  },
];

export function Achievements() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {achievements.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="flex items-center gap-4 rounded-3xl border border-border bg-card p-6"
          >
            <div className="rounded-2xl bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-500 p-3 text-white">
              <Icon className="h-6 w-6" />
            </div>

            <span className="font-medium">
              {item.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}