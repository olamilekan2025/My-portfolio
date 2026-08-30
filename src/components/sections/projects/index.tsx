import Link from "next/link";
import { FolderOpen } from "lucide-react";

import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { ProjectsCarousel } from "./projects-carousel";
import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { Sparkles } from "lucide-react";
interface ProjectCard {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  status: string;
  year: number;
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
}

async function getProjects(): Promise<ProjectCard[]> {
  await connectDB();

  const projects = await Project.find()
    .sort({ featured: -1, createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(projects));
}

export async function ProjectsSection() {
  const projects = await getProjects();

  return (
    <Section id="projects" className="relative py-20">
      {/* ambient background glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full overflow-hidden">
        <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute right-1/4 top-96 h-72 w-72 rounded-full bg-secondary/10 blur-[100px]" />
      </div>

      <Container>
        {/* Header */}
        <div className="mb-8 md:mb-10">
         <div
  className="
    group
    inline-flex
    items-center
    gap-2
    rounded-full
    border
    border-primary/20
    bg-primary/5
    px-4
    py-2
    shadow-sm
    backdrop-blur-sm
    transition-all
    duration-300
    hover:border-primary/30
    hover:bg-primary/5
  "
>
  <Sparkles
    className="
      h-4
      w-4
      text-[#8b5cf6]
      transition-transform
      duration-300
      group-hover:rotate-12
    "
  />

  <span
    className="
      bg-[linear-gradient(90deg,#3b82f6_0%,#8b5cf6_50%,#22d3ee_100%)]
      bg-clip-text
      text-xs
      font-semibold
      uppercase
      tracking-[0.3em]
      text-transparent
    "
  >
    My Work
  </span>
</div>

        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
  <span className="text-slate-900 dark:text-white">Recent </span>
  <span
    className="
      bg-[linear-gradient(90deg,#3b82f6_0%,#8b5cf6_50%,#22d3ee_100%)]
      bg-clip-text
      text-transparent
    "
  >
    Projects
  </span>
</h2>

          <p className="mt-4 max-w-2xl text-muted-foreground">
            A selection of recent projects and case studies showcasing my work
            in web development and design.
          </p>
        </div>

        {/* Empty state */}
        {projects.length === 0 && (
          <div className="glass mx-auto flex max-w-md flex-col items-center gap-3 rounded-3xl p-12 text-center shadow-md">
            <FolderOpen className="h-8 w-8 text-muted-foreground" />
            <p className="font-medium">Nothing published yet</p>
            <p className="text-sm text-muted-foreground">
              Projects added from the dashboard will appear here.
            </p>
          </div>
        )}

        {/* Carousel */}
        {projects.length > 0 && (
          <>
            <ProjectsCarousel projects={projects} />

            {/* View All Projects Button */}
            {/* <div className="mt-8 text-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
              >
                View All Projects
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div> */}
          </>
        )}
      </Container>
    </Section>
  );
}
