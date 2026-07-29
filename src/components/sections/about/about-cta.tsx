"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/common/glass-card";

export function AboutCTA() {
  return (
    <GlassCard className="rounded-[32px] p-10 text-center">
      <h3 className="text-3xl font-bold">
        Let's Build Something Amazing
      </h3>

      <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
        I'm always excited to work on
        innovative products, scalable web
        applications, and creative digital
        experiences.
      </p>

      <Button
        // asChild
        size="lg"
        className="mt-8 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 px-10"
      >
        <Link href="#contact">
          Hire Me
        </Link>
      </Button>
    </GlassCard>
  );
}