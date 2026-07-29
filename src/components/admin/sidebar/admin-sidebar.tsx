"use client";

import { signOut } from "next-auth/react";
import { LogOut, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

import { adminNavigation } from "@/lib/admin-navigation";
import { SidebarLogo } from "./sidebar-logo";
import { SidebarUser } from "./sidebar-user";
import { SidebarItem } from "./sidebar-item";

export function AdminSidebar() {
  async function handleSignOut() {
    // Clear the PIN gate cookie first, then end the NextAuth session.
    await fetch("/api/admin/logout", { method: "POST" });
    await signOut({ callbackUrl: "/" });
  }

  return (
    <aside className="sticky top-0 flex h-screen w-[280px] shrink-0 flex-col border-r border-border/60 bg-background/80 backdrop-blur-xl">
      {/* Logo */}
      <div className="border-b border-border/60 p-6">
        <SidebarLogo />
      </div>

      {/* User */}
      <div className="p-6 pb-2">
        <SidebarUser />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-4">
        {adminNavigation.map((item) => (
          <SidebarItem
            key={item.href}
            title={item.title}
            href={item.href}
            icon={item.icon}
          />
        ))}
      </nav>

      {/* Promo card */}
      <div className="px-4 pb-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-primary to-cyan-500 p-5 text-white shadow-lg">
          <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />

          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
            <Rocket className="h-5 w-5" />
          </div>

          <p className="relative mt-3 text-sm font-semibold">
            View your live site
          </p>

          <p className="relative mt-1 text-xs text-white/80">
            See how your portfolio looks to visitors.
          </p>

          <Link
            href="/"
            target="_blank"
            className="relative mt-3 inline-flex rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium transition hover:bg-white/25"
          >
            Open Site
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border/60 p-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSignOut}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 font-medium text-destructive transition hover:bg-destructive hover:text-white"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </motion.button>
      </div>
    </aside>
  );
}
