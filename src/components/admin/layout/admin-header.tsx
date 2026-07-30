"use client";

import { Menu, Bell, Search, Home, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function AdminHeader() {
  const { data } = useSession();
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      const response = await fetch("/api/admin/notifications");
      const data = await response.json();
      setUnreadCount(data.unreadCount || 0);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  }

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
        <button 
          onClick={() => router.push("/admin/notifications")}
          className="relative rounded-xl border p-2 hover:bg-muted"
        >
          <Bell className="h-5 w-5" />

          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {/* User */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 rounded-xl border px-3 py-2 cursor-pointer hover:bg-muted transition">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
              {data?.user?.name?.charAt(0)}
            </div>

            <div className="hidden md:block">
              <p className="text-sm font-semibold">{data?.user?.name}</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push("/")} className="cursor-pointer">
              <Home className="mr-2 h-4 w-4" />
              Home
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                signOut({
                  callbackUrl: "/",
                })
              }
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}