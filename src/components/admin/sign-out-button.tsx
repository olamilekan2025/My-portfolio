"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  async function handleSignOut() {
    // Clear the PIN gate + any stray session cookies first
    await fetch("/api/admin/logout", { method: "POST" });

    // Then let NextAuth clear its own session cookie and redirect
    await signOut({ callbackUrl: "/" });
  }

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center gap-2 rounded-xl border border-border/60 bg-card px-4 py-2 text-sm font-medium transition hover:text-red-500"
    >
      <LogOut className="h-4 w-4" />
      Sign Out
    </button>
  );
}