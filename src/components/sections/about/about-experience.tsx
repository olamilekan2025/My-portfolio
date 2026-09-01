"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  CalendarDays,
  Code2,
  MapPin,
} from "lucide-react";

const experiences = [
{
  role: "Frontend Developer",
  company: "Bite-House Restaurant Web App",
  period: "2025",
  location: "Personal Project",
  type: "Project",
  description:
    "Designed and developed a modern restaurant web application for Bite-House, focusing on an engaging dining experience, responsive layouts, intuitive navigation, and a polished user interface across desktop and mobile devices.",
  highlights: [
    "Built a responsive restaurant web application using React",
    "Implemented interactive UI functionality with JavaScript",
    "Created custom layouts and styling with CSS",
  ],
  technologies: ["React", "JavaScript", "CSS"],
  current: false,
},

{
  role: "Full Stack Developer",
  company: "Alifat Connect",
  period: "2026",
  location: "Personal Project",
  type: "Project",
  description:
    "Built a full-stack subscription-based web application that allows users to conveniently purchase data and airtime, pay bills, and access other digital utility services through a modern and responsive platform.",
  highlights: [
    "Built a full-stack platform for data, airtime, bill payments, and digital utility services",
    "Implemented subscription and payment workflows with Paystack",
    "Built a responsive user experience with secure data handling and cloud-based media management",
  ],
  technologies: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "MongoDB",
    "Paystack",
    "Cloudinary",
  ],
  current: false,
},

{
  role: "Full Stack Developer",
  company: "ITMT Management System",
  period: "2026",
  location: "Personal Project",
  type: "Project",
  description:
    "Designed and developed a comprehensive school management system for managing academic and administrative activities across an educational institution. The platform brings core school operations into a centralized, secure, and modern digital system.",
  highlights: [
    "Built a full-stack school management platform covering students, lecturers, courses, registrations, results, and academic administration",
    "Developed REST APIs and backend services with Node.js, Express, TypeScript, and MongoDB",
    "Implemented responsive interfaces, authentication workflows, and cloud-based media management with Next.js, Tailwind CSS, and Cloudinary",
  ],
  technologies: [
    "Next.js",
    "Node.js",
    "Express",
    "TypeScript",
    "Tailwind CSS",
    "MongoDB",
    "Cloudinary",
  ],
  current: true,
},

  // {
  //   role: "Full Stack Developer",
  //   company: "Plugify Music App",
  //   period: "2024",
  //   location: "Remote",
  //   type: "Project",
  //   description:
  //     "Developed a music-focused web application with search, playlists, backend data handling, and responsive interfaces designed to provide a smooth content discovery experience.",
  //   highlights: [
  //     "Implemented music search and playlist functionality",
  //     "Optimized backend queries for improved performance",
  //     "Created responsive interfaces focused on user engagement",
  //   ],
  //   technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
  //   current: false,
  // },

  // {
  //   role: "Full Stack Developer",
  //   company: "NitroFlix Streaming",
  //   period: "2025",
  //   location: "Remote",
  //   type: "Project",
  //   description:
  //     "Built a modern streaming platform with authentication, subscription management, payment processing, and responsive content delivery across desktop and mobile devices.",
  //   highlights: [
  //     "Built a streaming platform with authentication and subscriptions",
  //     "Integrated secure payment processing",
  //     "Optimized content delivery across multiple devices",
  //   ],
  //   technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Payments"],
  //   current: false,
  // },
];

export function AboutExperience() {
  return (
    <section className="mt-24 sm:mt-32">
      {/* SECTION HEADER */}
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14 max-w-4xl px-2 sm:px-0"
      >
        {/* EYEBROW */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/[0.06] px-4 py-2 backdrop-blur-sm">
          <Briefcase className="h-3.5 w-3.5 text-blue-500" />

          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-500">
            Experience
          </span>
        </div>

        {/* HEADING */}
        <h3 className="text-3xl font-black tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
          Professional{" "}
          <span className="bg-[linear-gradient(90deg,#3b82f6_0%,#8b5cf6_50%,#22d3ee_100%)] bg-clip-text text-transparent">
            journey
          </span>
        </h3>

        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          Building real-world digital products while evolving from frontend
          engineering into modern full-stack development.
        </p>
      </motion.div>

      {/* TIMELINE */}
      <div className="relative px-2 sm:px-0">
        {/* TIMELINE LINE */}
        <div className="absolute bottom-0 left-[22px] top-0 hidden w-px bg-gradient-to-b from-blue-500/60 via-border to-transparent md:block" />

        <div className="space-y-7">
          {experiences.map((experience, index) => (
            <motion.article
              key={`${experience.company}-${experience.role}`}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: index * 0.08,
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative md:pl-16"
            >
              {/* TIMELINE NODE */}
              <div className="absolute left-[15px] top-8 hidden md:flex h-4 w-4 items-center justify-center rounded-full border-2 border-background bg-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.12),0_0_25px_rgba(59,130,246,0.35)]">
                <div className="h-1.5 w-1.5 rounded-full bg-white" />
              </div>

              {/* EXPERIENCE CARD */}
              <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-background/70 p-5 shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:p-7">
                {/* HOVER GLOW */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-blue-500/[0.07] blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* TOP META */}
                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    {/* ROLE */}
                    <div className="flex items-center gap-2">
                      <Code2 className="hidden h-4 w-4 shrink-0 text-blue-500 sm:block" />

                      <h4 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                        {experience.role}
                      </h4>
                    </div>

                    {/* COMPANY */}
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Building2 className="h-4 w-4 text-blue-500" />
                        {experience.company}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        {experience.location}
                      </div>
                    </div>
                  </div>

                  {/* PERIOD */}
                  <div className="flex shrink-0 items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-blue-500" />

                    <span className="text-xs font-medium text-muted-foreground">
                      {experience.period}
                    </span>
                  </div>
                </div>

                {/* PROJECT / INTERNSHIP + CURRENT */}
                <div className="relative mt-5 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-blue-500">
                    {experience.type}
                  </span>

                  {experience.current && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-500">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                      Current
                    </span>
                  )}
                </div>

                {/* DESCRIPTION */}
                <p className="relative mt-5 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                  {experience.description}
                </p>

                {/* HIGHLIGHTS */}
                <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
                  {experience.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="rounded-xl border border-border/50 bg-muted/20 p-3.5 transition-colors duration-300 group-hover:bg-muted/30"
                    >
                      <div className="mb-2 h-1 w-6 rounded-full bg-blue-500/70" />

                      <p className="text-xs leading-5 text-muted-foreground">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>

                {/* TECHNOLOGIES */}
                <div className="relative mt-6 flex flex-wrap gap-2">
                  {experience.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-lg border border-border/50 bg-background/80 px-2.5 py-1.5 font-mono text-[10px] text-muted-foreground transition-colors duration-300 group-hover:border-blue-500/20 group-hover:text-foreground"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                {/* DECORATIVE ARROW */}
                <div className="absolute bottom-6 right-6 hidden h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-background/70 text-muted-foreground opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100 sm:flex">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* BOTTOM SUMMARY */}
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-10 rounded-2xl border border-border/50 bg-muted/20 p-6 sm:p-8"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-500">
              Current focus
            </p>

            <p className="mt-2 text-lg font-semibold text-foreground">
              Building scalable full-stack applications.
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Frontend engineering + Node.js backend development + modern
              application architecture.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

            <span className="text-xs font-semibold text-emerald-500">
              Growing & Building
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

