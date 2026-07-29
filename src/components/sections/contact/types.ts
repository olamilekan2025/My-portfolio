import type { LucideIcon } from "lucide-react";

export interface ContactCard {
  title: string;
  value: string;
  icon: LucideIcon;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: LucideIcon;
}