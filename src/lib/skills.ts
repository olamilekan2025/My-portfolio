import {
  Code2,
  Server,
  Database,
  Container,
  Cloud,
  Wrench,
  Palette,
  FlaskConical,
} from "lucide-react";
import type {
  SkillCategory,
  SummaryStat,
  RoadmapItem,
  FavoriteTech,
} from "@/types/skill";

export const summaryStats: SummaryStat[] = [
  { id: "frontend", label: "Frontend", value: 95, icon: Code2 },
  { id: "backend", label: "Backend", value: 92, icon: Server },
  { id: "database", label: "Database", value: 90, icon: Database },
  { id: "ui-ux", label: "UI/UX", value: 88, icon: Palette },
];

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    icon: Code2,
    description: "Interfaces that feel instant and look intentional.",
    technologies: [
      { id: "html5", name: "HTML5", level: 100 },
      { id: "css3", name: "CSS3", level: 98 },
      { id: "javascript", name: "JavaScript", level: 96 },
      { id: "typescript", name: "TypeScript", level: 93 },
      { id: "react", name: "React", level: 95 },
      { id: "nextjs", name: "Next.js", level: 95 },
      { id: "tailwind", name: "Tailwind CSS", level: 97 },
      { id: "redux", name: "Redux", level: 85 },
      { id: "framer-motion", name: "Framer Motion", level: 90 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    description: "APIs and services built to scale quietly.",
    technologies: [
      { id: "nodejs", name: "Node.js", level: 92 },
      { id: "express", name: "Express.js", level: 90 },
      { id: "nestjs", name: "NestJS", level: 84 },
      { id: "rest-api", name: "REST API", level: 94 },
      { id: "graphql", name: "GraphQL", level: 82 },
    ],
  },
  {
    id: "database",
    label: "Database",
    icon: Database,
    description: "Schemas and queries designed for the long run.",
    technologies: [
      { id: "mongodb", name: "MongoDB", level: 90 },
      { id: "postgresql", name: "PostgreSQL", level: 88 },
      { id: "mysql", name: "MySQL", level: 85 },
      { id: "prisma", name: "Prisma", level: 89 },
      { id: "redis", name: "Redis", level: 80 },
      { id: "firebase", name: "Firebase", level: 86 },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    icon: Container,
    description: "Shipping pipelines that don't wake anyone up at 2am.",
    technologies: [
      { id: "git", name: "Git", level: 95 },
      { id: "github", name: "GitHub", level: 95 },
      { id: "docker", name: "Docker", level: 83 },
      { id: "linux", name: "Linux", level: 82 },
      { id: "nginx", name: "Nginx", level: 75 },
    ],
  },
  {
    id: "cloud",
    label: "Cloud",
    icon: Cloud,
    description: "Deploying and scaling across managed platforms.",
    technologies: [
      { id: "vercel", name: "Vercel", level: 94 },
      { id: "netlify", name: "Netlify", level: 88 },
      { id: "aws", name: "AWS", level: 78 },
      { id: "cloudinary", name: "Cloudinary", level: 84 },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: Wrench,
    description: "The daily-driver toolkit behind every build.",
    technologies: [
      { id: "vscode", name: "VS Code", level: 98 },
      { id: "postman", name: "Postman", level: 92 },
      { id: "figma", name: "Figma", level: 86 },
      { id: "notion", name: "Notion", level: 90 },
    ],
  },
  {
    id: "ui-ux",
    label: "UI/UX",
    icon: Palette,
    description: "Design systems that stay consistent at scale.",
    technologies: [
      { id: "design-systems", name: "Design Systems", level: 90 },
      { id: "figma-uiux", name: "Figma", level: 86 },
      { id: "accessibility", name: "Accessibility", level: 87 },
      { id: "motion-design", name: "Motion Design", level: 84 },
    ],
  },
  {
    id: "testing",
    label: "Testing",
    icon: FlaskConical,
    description: "Confidence in every deploy, backed by coverage.",
    technologies: [
      { id: "jest", name: "Jest", level: 88 },
      { id: "cypress", name: "Cypress", level: 82 },
      { id: "playwright", name: "Playwright", level: 85 },
    ],
  },
];

export const favoriteTechnologies: FavoriteTech[] = [
  { id: "nextjs", name: "Next.js", reason: "App Router + Server Components fit how I like to build" },
  { id: "typescript", name: "TypeScript", reason: "Confidence to refactor without fear" },
  { id: "tailwind", name: "Tailwind CSS", reason: "Design tokens without leaving the markup" },
];

export const recentlyLearned: string[] = ["NestJS", "Playwright", "Prisma"];

export const learningRoadmap: RoadmapItem[] = [
  { id: "rust", name: "Rust", status: "learning", progress: 35 },
  { id: "go", name: "Go", status: "exploring", progress: 15 },
  { id: "kubernetes", name: "Kubernetes", status: "planned", progress: 5 },
];

export const proficiencyLegend = [
  { label: "Expert", range: "90-100%", colorVar: "var(--skills-legend-expert)" },
  { label: "Advanced", range: "80-89%", colorVar: "var(--skills-legend-advanced)" },
  { label: "Proficient", range: "70-79%", colorVar: "var(--skills-legend-proficient)" },
];
