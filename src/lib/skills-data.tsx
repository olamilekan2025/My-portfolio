import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaJs,
  FaGitAlt,

} from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import {
  SiTypescript,
  SiShadcnui,
  SiNextdotjs,
  SiMongodb,
  SiVercel,
  SiCloudinary,
  SiPostman,
  

} from "react-icons/si";
import { VscVscodeInsiders } from "react-icons/vsc";
import { SiDavinciresolve } from "react-icons/si";

import {
  Lightbulb,
  Smartphone,
  Palette,
  Plug,
  Gauge,
  FileCode2,
} from "lucide-react";
import type { SkillCardData } from "@/types/skill";

export const skillCards: SkillCardData[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    skills: [
      { name: "HTML", level: 100, icon: FaHtml5, color: "#E34F26" },
      { name: "CSS", level: 97, icon: FaCss3Alt, color: "#1572B6" },
      { name: "React", level: 95, icon: FaReact, color: "#61DAFB" },
      { name: "Next.js", level: 98, icon: SiNextdotjs, color: "#000000", colorDark: "#FAFAFA" },
      { name: "JavaScript", level: 90, icon: FaJs, color: "#F7DF1E" },
      { name: "TypeScript", level: 90, icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind css", level: 90, icon: RiTailwindCssFill, color: "#3178C6" },
      { name: "shadcn/ui", level: 99, icon: SiShadcnui, color: "#000000", colorDark: "#FAFAFA" },
    ],
  },
  {
    id: "backend",
    title: "Backend & Database",
    skills: [
      { name: "Node.js", level: 75, icon: SiNextdotjs, color: "#000000", colorDark: "#FAFAFA" },
      { name: "MongoDB", level: 80, icon: SiMongodb, color: "#47A248" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Cloud",
    skills: [
      { name: "Git", level: 99, icon: FaGitAlt, color: "#F05032" },
      { name: "Vercel", level: 90, icon: SiVercel, color: "#000000", colorDark: "#FAFAFA" },
      { name: "Cloudinary", level: 70, icon: SiCloudinary, color: "#3448C5" },
      { name: "Vscode", level: 80, icon:VscVscodeInsiders, color: "rgb(12, 150, 210)" },
      { name: "postman", level: 80, icon: SiPostman, color: "rgb(210, 81, 12)" },
      { name: "Windsoft", level: 80, icon: SiDavinciresolve, color: "rgb(225, 220, 218)" },
   
    ],
  },
  {
    id: "professional",
    title: "Professional Skills",
    skills: [
      { name: "Problem Solving", level: 98, icon: Lightbulb, color: "#8B5CF6" },
      { name: "Responsive Design", level: 99, icon: Smartphone, color: "#3B82F6" },
      { name: "UI/UX Implementation", level: 95, icon: Palette, color: "#EC4899" },
      { name: "API Integration", level: 94, icon: Plug, color: "#06B6D4" },
      { name: "Performance Optimization", level: 92, icon: Gauge, color: "#F59E0B" },
      { name: "Clean Code", level: 97, icon: FileCode2, color: "#10B981" },
    ],
  },
];
