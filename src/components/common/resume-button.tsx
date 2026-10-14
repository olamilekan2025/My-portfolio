"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResumeButtonProps {
  url?: string;
}

export function ResumeButton({
  url = "/resumes.pdf",
}: ResumeButtonProps) {
  return (
    <a
      href={url}
      download
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 text-white shadow-lg hover:scale-105 transition-all inline-flex items-center justify-center px-4 py-2"
    >
      <Download className="mr-2 h-4 w-4" />
      Download CV
    </a>
  );
}