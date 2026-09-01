"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Star } from "lucide-react";
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
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <article className="relative h-full w-full overflow-hidden rounded-2xl border border-border/60 bg-background/70 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 hover:border-blue-500/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
        {/* Image Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/30">
          <Link href={cardLink} className="block h-full w-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </Link>

          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-blue-500 px-3 py-1.5 text-[10px] font-semibold text-white shadow-[0_4px_20px_rgba(59,130,246,0.3)]">
              <Star className="h-3 w-3 fill-white" />
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          {/* Category */}
          <div className="mb-2 flex items-center gap-2">
            <span className="h-px w-6 bg-blue-500/50" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500">
              {project.category}
            </p>
          </div>

          {/* Title */}
          <Link href={cardLink}>
            <h3 className="mb-2.5 text-lg font-bold tracking-tight text-foreground transition-colors hover:text-blue-500 line-clamp-1 sm:text-xl">
              {project.title}
            </h3>
          </Link>

          {/* Excerpt */}
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
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
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/50 transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-500"
              >
                <FaGithub className="h-4 w-4" />
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View live site"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/50 transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-500"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}

            <Link href={cardLink}>
              <motion.div
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/50 transition-all duration-300 group-hover:border-blue-500/40 group-hover:bg-blue-500/10 group-hover:text-blue-500"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowUpRight className="h-4 w-4" />
              </motion.div>
            </Link>
          </div>
        </div>
      </article>
    </motion.div>
  );
}
