"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface ProjectCardProps {
  project: {
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
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cardLink = project.caseStudyUrl || `/projects/${project.slug}`;

  return (
    <motion.div
      className="group relative h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <article className="relative h-full w-full overflow-hidden rounded-xl bg-card shadow-sm transition-all duration-300 hover:shadow-lg">
        {/* Image Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Link href={cardLink} className="block h-full w-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </Link>

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute left-3 top-3 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {project.category}
          </p>

          {/* Title */}
          <Link href={cardLink}>
            <h3 className="mb-2 text-base font-semibold tracking-tight text-foreground transition-colors hover:text-primary line-clamp-1">
              {project.title}
            </h3>
          </Link>

          {/* Excerpt */}
          <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {project.excerpt || "No description yet."}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View source on GitHub"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-primary hover:bg-primary/10"
              >
                <FaGithub className="h-3.5 w-3.5 text-foreground transition-colors hover:text-primary" />
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View live site"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-primary hover:bg-primary/10"
              >
                <ExternalLink className="h-3.5 w-3.5 text-foreground transition-colors hover:text-primary" />
              </a>
            )}

            <Link href={cardLink}>
              <motion.div
                className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background transition-colors group-hover:border-primary group-hover:bg-primary/10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowUpRight className="h-3.5 w-3.5 text-foreground transition-colors group-hover:text-primary" />
              </motion.div>
            </Link>
          </div>
        </div>
      </article>
    </motion.div>
  );
}
