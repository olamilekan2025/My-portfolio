"use client";

import { CheckCircle2 } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

export function InfoItem({
  children,
}: Props) {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle2 className="h-5 w-5 text-blue-500" />

      <span>{children}</span>
    </div>
  );
}