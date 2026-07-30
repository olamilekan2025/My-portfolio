import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  Code2,
  Mail,
  Users,
  BarChart3,
  Settings,
  Bell,
} from "lucide-react";

export const adminNavigation = [
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
    title: "Experience",
    href: "/admin/experience",
    icon: Briefcase,
  },
  {
    title: "Skills",
    href: "/admin/skills",
    icon: Code2,
  },
  {
    title: "Messages",
    href: "/admin/messages",
    icon: Mail,
  },
  {
    title: "Notifications",
    href: "/admin/notifications",
    icon: Bell,
  },
  {
    title: "Newsletter",
    href: "/admin/newsletter",
    icon: Users,
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