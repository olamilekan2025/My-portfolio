import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

export type CategoryId =
  | "frontend"
  | "backend"
  | "database"
  | "devops"
  | "cloud"
  | "tools"
  | "ui-ux"
  | "testing";

export interface Technology {
  /** Unique slug, e.g. "react" */
  id: string;
  /** Display name, e.g. "React" */
  name: string;
  /** Proficiency 0-100, drives the progress ring */
  level: number;
  /** Optional short descriptor shown on hover / in tooltips */
  note?: string;
}

export interface SkillCategory {
  id: CategoryId;
  label: string;
  icon: LucideIcon;
  /** One line describing what this category covers */
  description: string;
  technologies: Technology[];
}

export interface SummaryStat {
  id: string;
  label: string;
  value: number;
  icon: LucideIcon;
}

export interface RoadmapItem {
  id: string;
  name: string;
  status: "learning" | "planned" | "exploring";
  progress: number;
}

export interface FavoriteTech {
  id: string;
  name: string;
  reason: string;
}




export interface SkillItem {
  /** Technology or skill name, e.g. "React" */
  name: string;
  /** Proficiency 0-100, drives the progress bar */
  level: number;
  /** Official brand icon (react-icons/si, /fa) or a conceptual icon (lucide-react) */
  icon: IconType;
  /** Brand color for the icon + progress bar accent, e.g. "#61DAFB" */
  color: string;
  /** Override color used in dark mode — needed for brand marks that are pure black (Next.js, Vercel, shadcn/ui) so they stay visible on dark surfaces */
  colorDark?: string;
}

export interface SkillCardData {
  id: string;
  title: string;
  skills: SkillItem[];
}
