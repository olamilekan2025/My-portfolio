"use client";

import { Menu, Bell, Search } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { ThemeToggle } from "@/components/navigation/theme-toggle";

export function AdminHeader() {
  const { data } = useSession();

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-border/60 bg-background/80 px-8 backdrop-blur-xl">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button className="rounded-xl p-2 transition hover:bg-muted lg:hidden">
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <h1 className="text-2xl font-bold">
            Dashboard
          </h1>

          <p className="text-sm text-muted-foreground">
            Welcome back,
            {" "}
            {data?.user?.name}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            placeholder="Search..."
            className="w-72 rounded-xl border bg-background py-2 pl-10 pr-4 outline-none transition focus:border-primary"
          />
        </div>

        {/* Theme */}
        <ThemeToggle />

        {/* Notifications */}
        <button className="relative rounded-xl border p-2 hover:bg-muted">
          <Bell className="h-5 w-5" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* User */}
        <div className="flex items-center gap-3 rounded-xl border px-3 py-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
            {data?.user?.name?.charAt(0)}
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-semibold">
              {data?.user?.name}
            </p>

            <p className="text-xs text-muted-foreground">
              Administrator
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
          className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
}