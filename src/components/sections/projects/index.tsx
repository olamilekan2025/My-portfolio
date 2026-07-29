import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FolderOpen } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

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

const STATUS_DOT: Record<string, string> = {
  Live: "bg-emerald-400",
  "In Progress": "bg-amber-400",
  Completed: "bg-[var(--accent)]",
};

export async function ProjectsSection() {
  const projects = await getProjects();

  return (
    <section id="projects" className="relative py-28 ">
      {/* ambient background glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full overflow-hidden">
        <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute right-1/4 top-96 h-72 w-72 rounded-full bg-secondary/10 blur-[100px]" />
      </div>

      <div className="container mx-auto px-32">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span
            className="text-xs font-semibold uppercase tracking-[0.25em] bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--gradient-primary)" }}
          >
            Selected Work
          </span>

          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Projects
          </h2>

          <p className="mt-4 text-muted-foreground">
            A collection of products, tools, and experiments — built end to
            end.
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

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project._id}
              className="group relative rounded-3xl p-[1px] transition-all duration-500 hover:-translate-y-1"
              style={{
                backgroundImage: "var(--gradient-primary)",
              }}
            >
              <div
                className={`glass relative h-full overflow-hidden rounded-[calc(1.8rem-1px)] transition-shadow duration-500 ${
                  project.featured
                    ? "shadow-purple group-hover:shadow-glow"
                    : "shadow-sm group-hover:shadow-glow"
                }`}
              >
                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition duration-700 ease-out group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

                  {project.featured && (
                    <span
                      className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-glow"
                      style={{ backgroundImage: "var(--gradient-primary)" }}
                    >
                      Featured
                    </span>
                  )}

                  <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs font-medium text-white/90">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        STATUS_DOT[project.status] ?? "bg-white"
                      }`}
                    />
                    {project.status}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span
                      className="text-xs font-semibold uppercase tracking-[0.15em] bg-clip-text text-transparent"
                      style={{ backgroundImage: "var(--gradient-secondary)" }}
                    >
                      {project.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold tracking-tight">
                    {project.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {project.excerpt || "No description yet."}
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <Link
                      href={
                        project.caseStudyUrl || `/projects/${project.slug}`
                      }
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition group-hover:gap-1.5"
                    >
                      {project.caseStudyUrl ? "Case study" : "Details"}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>

                    <div className="ml-auto flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View source on GitHub"
                          className="glass flex h-8 w-8 items-center justify-center rounded-full text-foreground/80 transition hover:text-foreground"
                        >
                          <FaGithub className="h-3.5 w-3.5" />
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View live site"
                          className="glass flex h-8 w-8 items-center justify-center rounded-full text-foreground/80 transition hover:text-foreground"
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
