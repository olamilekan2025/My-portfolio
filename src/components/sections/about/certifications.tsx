"use client";

import {
  Award,
  ShieldCheck,
  BadgeCheck,
  Star,
} from "lucide-react";

import { GlassCard } from "@/components/common/glass-card";

const certifications = [
  {
    title: "Google Professional",
    icon: Award,
  },
  {
    title: "AWS Cloud",
    icon: ShieldCheck,
  },
  {
    title: "MongoDB",
    icon: BadgeCheck,
  },
  {
    title: "Meta Frontend",
    icon: Star,
  },
];

export function Certifications() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {certifications.map((item) => {
        const Icon = item.icon;

        return (
          <GlassCard
            key={item.title}
            className="rounded-3xl p-6 transition-all hover:-translate-y-2"
          >
            <Icon className="mb-4 h-8 w-8 text-blue-500" />

            <h4 className="font-semibold">
              {item.title}
            </h4>
          </GlassCard>
        );
      })}
    </div>
  );
}