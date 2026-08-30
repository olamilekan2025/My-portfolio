"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroSocials } from "./hero-socials";
import { Button } from "@/components/ui/button";

export function HeroActions() {
  return (
    <div className="flex flex-wrap items-center gap-5">
   <Button
  asChild
  variant="default"
  size="lg"
  className="
    group
    relative
    isolate
    overflow-hidden
    rounded-full
    px-8
    py-6
    text-sm
    font-bold
    tracking-wide
    shadow-[0_12px_40px_rgba(59,130,246,0.25)]
  "
>
  <Link
    href="#contact"
    className="relative flex items-center"
  >
    <span
      className="
        absolute
        inset-0
        z-0
        origin-left
        scale-x-0
        bg-[linear-gradient(90deg,#3b82f6_0%,#8b5cf6_50%,#22d3ee_100%)]
        transition-transform
        duration-500
        ease-out
        group-hover:scale-x-100
      "
    />

    <span className="relative z-10 text-white">
      GET IN TOUCH
    </span>

    <ArrowRight
      className="
        relative
        z-10
        ml-4
        h-4
        w-4
        text-white
        transition-transform
        duration-300
        group-hover:translate-x-1
      "
    />
  </Link>
</Button>

      <HeroSocials />
    </div>
  );
}