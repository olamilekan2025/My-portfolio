"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Code2,
  Layers3,
  MapPin,
} from "lucide-react";

const experiences = [
  {
    role: "Frontend Developer",
    company: "Bite-House Restaurant Web App",
    period: "2025",
    location: "Personal Project",
    type: "Frontend",
    description:
      "Designed and developed a responsive restaurant web experience focused on presenting dining information through an engaging interface, intuitive navigation, and layouts tailored to desktop and mobile devices.",
    highlights: [
      "Developed responsive restaurant pages and layouts.",
      "Added interactive interface elements using JavaScript.",
      "Created a consistent visual experience with custom CSS.",
    ],
    technologies: ["React", "JavaScript", "CSS"],
  },
  {
    role: "Full-Stack Development",
    company: "Alifat Connect",
    period: "2026",
    location: "Personal Project",
    type: "Web Application",
    description:
      "Built a digital utility platform designed to help users access services such as airtime, data subscriptions, and bill payments through a modern, responsive application.",
    highlights: [
      "Developed interfaces for digital utility services.",
      "Integrated payment workflows with Paystack.",
      "Worked with cloud media management and backend data handling.",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "Paystack",
      "Cloudinary",
    ],
  },
  {
    role: "Full-Stack Development",
    company: "ITMT Management System",
    period: "2026",
    location: "Personal Project",
    type: "Management Platform",
    description:
      "Designed and developed a school management platform that brings academic and administrative workflows together, helping organize student records, lecturer activities, course registrations, payments, and results.",
    highlights: [
      "Built modules for students, lecturers, courses, and academic administration.",
      "Developed REST APIs using Node.js, Express, TypeScript, and MongoDB.",
      "Implemented authentication, responsive dashboards, and cloud-based media management.",
    ],
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "Tailwind CSS",
      "Cloudinary",
    ],
  },
];

export function AboutExperience() {
  return (
    <section
      aria-labelledby="experience-heading"
      className="relative mt-24 sm:mt-28 lg:mt-36"
    >
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-10 max-w-3xl sm:mb-14"
      >
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-3.5 py-2">
          <BriefcaseBusiness className="h-4 w-4 text-primary" />

          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Selected Work
          </span>
        </div>

        <h3
          id="experience-heading"
          className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
        >
          Projects that bring{" "}
          <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 bg-clip-text text-transparent">
            ideas to life.
          </span>
        </h3>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
          A selection of personal projects where I&apos;ve applied my skills,
          explored new technologies, and worked on practical problems through
          software development.
        </p>
      </motion.div>

      {/* Project timeline */}
      <div className="relative">
        {/* Timeline rail */}
        <div
          aria-hidden="true"
          className="absolute bottom-8 left-[19px] top-8 hidden w-px bg-gradient-to-b from-primary/50 via-border to-transparent sm:block"
        />

        <div className="space-y-5 sm:space-y-7">
          {experiences.map((experience, index) => (
            <motion.article
              key={experience.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              className="group relative sm:pl-12"
            >
              {/* Timeline marker */}
              <div
                aria-hidden="true"
                className="absolute left-[12px] top-8 z-10 hidden h-4 w-4 items-center justify-center rounded-full border-2 border-background bg-primary shadow-[0_0_0_4px_rgba(59,130,246,0.10)] sm:flex"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </div>

              {/* Project card */}
              <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-background/70 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/[0.04] sm:rounded-3xl sm:p-7 lg:p-8">
                {/* Decorative glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/[0.07] blur-3xl transition-opacity duration-300 group-hover:bg-primary/[0.12]"
                />

                <div className="relative">
                  {/* Project header */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
                          <Layers3 className="h-3 w-3" />
                          {experience.type}
                        </span>

                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/30 px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                          <Code2 className="h-3 w-3" />
                          Personal project
                        </span>
                      </div>

                      <h4 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                        {experience.company}
                      </h4>

                      <p className="mt-1.5 text-sm font-medium text-muted-foreground">
                        {experience.role}
                      </p>
                    </div>

                    <div className="flex w-fit shrink-0 items-center gap-2 rounded-xl border border-border/60 bg-muted/30 px-3 py-2">
                      <CalendarDays className="h-4 w-4 text-primary" />

                      <span className="text-xs font-semibold text-foreground">
                        {experience.period}
                      </span>
                    </div>
                  </div>

                  {/* Project description */}
                  <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground sm:mt-6 sm:text-[15px] sm:leading-8">
                    {experience.description}
                  </p>

                  {/* Project details */}
                  <div className="mt-6">
                    <h5 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-foreground/80">
                      Key contributions
                    </h5>

                    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {experience.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-2.5 rounded-xl border border-border/50 bg-muted/20 p-3.5 text-xs leading-6 text-muted-foreground transition-colors duration-300 group-hover:bg-muted/30 sm:text-sm"
                        >
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />

                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technology stack */}
                  <div className="mt-6 border-t border-border/60 pt-5">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                      Built with
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-lg border border-border/60 bg-background px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:border-primary/30 hover:text-foreground"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project context */}
                  <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />

                    <span>{experience.location}</span>

                    <ArrowUpRight className="ml-auto h-4 w-4 opacity-40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Closing statement */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mt-8 rounded-2xl border border-border/60 bg-muted/20 p-5 sm:mt-10 sm:rounded-3xl sm:p-8"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              What&apos;s next
            </p>

            <p className="mt-2 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              Learning, building, and getting better with every project.
            </p>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Exploring modern frontend engineering, backend development, and
              the architecture behind reliable web applications.
            </p>
          </div>

          <div className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] px-3.5 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              Open to opportunities
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}