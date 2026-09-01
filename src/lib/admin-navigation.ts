import {
  BarChart3,
  FolderKanban,
  ImageIcon,
  LayoutDashboard,
  Mail,
  Settings,
} from "lucide-react";

import type { ElementType } from "react";

export interface AdminNavigationItem {
  title: string;
  href: string;
  icon: ElementType;
  badge?: number;
}

export const adminNavigation: AdminNavigationItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
  },
  {
    title: "Hero Manager",
    href: "/admin/hero",
    icon: ImageIcon,
  },
  {
    title: "Messages",
    href: "/admin/messages",
    icon: Mail,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];