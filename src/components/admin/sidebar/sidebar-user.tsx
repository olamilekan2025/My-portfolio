"use client";

import { useSession } from "next-auth/react";

export function SidebarUser() {
  const { data } = useSession();

  const initials =
    data?.user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "AD";

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/60 p-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 font-semibold text-white">
        {initials}
      </div>

      <div className="overflow-hidden">
        <p className="truncate font-medium">
          {data?.user?.name}
        </p>

        <p className="truncate text-xs text-muted-foreground">
          {data?.user?.email}
        </p>
      </div>
    </div>
  );
}