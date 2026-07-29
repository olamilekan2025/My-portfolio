"use client";

import Link from "next/link";
import { Download, Briefcase, Mail } from "lucide-react";
import { ResumeButton } from "@/components/common/resume-button";

<ResumeButton />

import { Button } from "@/components/ui/button";

export function HeroActions() {
  return (
    <div className="flex flex-wrap gap-10 justify-center items-center">
     <ResumeButton />

      <Button
        // asChild
        variant="outline"
        size="lg"
        className="rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 px-8 text-white shadow-xl hover:scale-105 transition-transform"
      >
        <Link href="#projects">
          {/* <Briefcase className="mr-2 h-4 w-4" /> */}
          View Projects
        </Link>
      </Button>

      <Button
        // asChild
        variant="ghost"
        size="lg"
        className="rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 px-8 text-white shadow-xl hover:scale-105 transition-transform"
      >
        <Link href="#contact">
          {/* <Mail className="mr-2 h-4 w-4" /> */}
          Contact
        </Link>
      </Button>
    </div>
);
}