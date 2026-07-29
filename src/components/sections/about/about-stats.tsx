"use client";

import {
  FolderKanban,
  Users,
  Award,
  Cpu,
} from "lucide-react";

import { StatCard } from "@/components/common/stat-card";

const stats = [
  {
    icon: Award,
    value: 3,
    suffix: "+",
    label: "Years Experience",
  },
  {
    icon: FolderKanban,
    value: 40,
    suffix: "+",
    label: "Projects",
  },
  {
    icon: Users,
    value: 25,
    suffix: "+",
    label: "Clients",
  },
  {
    icon: Cpu,
    value: 15,
    suffix: "+",
    label: "Technologies",
  },
];

export function AboutStats() {
  return (
    <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <StatCard
          key={item.label}
          {...item}
        />
      ))}
    </div>
  );
}