"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import {
  LogOut,
  Menu,
  Rocket,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import { adminNavigation } from "@/lib/admin-navigation";
import { SidebarLogo } from "./sidebar-logo";
import { SidebarUser } from "./sidebar-user";
import { SidebarItem } from "./sidebar-item";

export function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleSignOut() {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Failed to clear admin gate:", error);
    } finally {
      await signOut({
        callbackUrl: "/",
      });
    }
  }

  function closeMobileSidebar() {
    setMobileOpen(false);
  }

  return (
    <>
      {/* =====================================================
          MOBILE MENU BUTTON
      ====================================================== */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open admin navigation"
        className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-background/90 text-foreground shadow-lg backdrop-blur-xl lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.button
            type="button"
            aria-label="Close admin navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileSidebar}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* =====================================================
          MOBILE SIDEBAR
      ====================================================== */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              duration: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed inset-y-0 left-0 z-50 flex w-[290px] flex-col border-r border-border/60 bg-background shadow-2xl lg:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/60 p-5">
              <SidebarLogo />

              <button
                type="button"
                onClick={closeMobileSidebar}
                aria-label="Close admin navigation"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* User */}
            <div className="p-5 pb-2">
              <SidebarUser />
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-4">
              {adminNavigation.map((item) => (
                <div
                  key={item.href}
                  onClick={closeMobileSidebar}
                >
                  <SidebarItem
                    title={item.title}
                    href={item.href}
                    icon={item.icon}
                    badge={item.badge}
                  />
                </div>
              ))}
            </nav>

            {/* Live site */}
            <div className="px-4 pb-4">
              <LiveSiteCard />
            </div>

            {/* Logout */}
            <SidebarLogout
              onLogout={handleSignOut}
              loading={loggingOut}
            />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* =====================================================
          DESKTOP SIDEBAR
      ====================================================== */}
      <aside className="sticky top-0 hidden h-screen w-[280px] shrink-0 flex-col border-r border-border/60 bg-background/80 backdrop-blur-xl lg:flex">
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
              badge={item.badge}
            />
          ))}
        </nav>

        {/* Live site */}
        <div className="px-4 pb-4">
          <LiveSiteCard />
        </div>

        {/* Logout */}
        <SidebarLogout
          onLogout={handleSignOut}
          loading={loggingOut}
        />
      </aside>
    </>
  );
}

/* =========================================================
   LIVE SITE CARD
========================================================= */

function LiveSiteCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-primary to-cyan-500 p-5 text-white shadow-lg">
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />

      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
        <Rocket className="h-5 w-5" />
      </div>

      <p className="relative mt-3 text-sm font-semibold">
        View your live site
      </p>

      <p className="relative mt-1 text-xs leading-5 text-white/80">
        See how your portfolio looks to visitors.
      </p>

      <Link
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="relative mt-3 inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium transition hover:bg-white/25"
      >
        Open Site
      </Link>
    </div>
  );
}

/* =========================================================
   LOGOUT
========================================================= */

function SidebarLogout({
  onLogout,
  loading,
}: {
  onLogout: () => void;
  loading: boolean;
}) {
  return (
    <div className="border-t border-border/60 p-4">
      <motion.button
        type="button"
        whileHover={
          !loading ? { scale: 1.02 } : undefined
        }
        whileTap={
          !loading ? { scale: 0.98 } : undefined
        }
        onClick={onLogout}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 font-medium text-destructive transition hover:bg-destructive hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        <LogOut className="h-5 w-5" />

        {loading ? "Logging out..." : "Logout"}
      </motion.button>
    </div>
  );
}

export default AdminSidebar;