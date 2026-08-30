"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, Building } from "lucide-react";

const experiences = [
  {
    role: "Full Stack Developer — Expanding into Backend",
    company: "Independent Developer",
    period: "2025 — Present",
    description:
      "Currently expanding my frontend expertise into backend development and full-stack engineering. I am actively building applications with server-side technologies, REST APIs, authentication, databases, and backend architecture while strengthening my understanding of how scalable web applications are designed and deployed.",
  },
  {
    role: "Frontend Developer",
    company: "Independent Developer",
    period: "2024 — Present",
    description:
      "Started my web development journey by focusing on frontend engineering and building modern, responsive web applications. Developed practical experience with HTML, CSS, JavaScript, React, Next.js, and TypeScript, with a strong focus on component architecture, responsive interfaces, performance, accessibility, and user experience.",
  },
];
export function AboutExperience() {
  return (
    <div className="mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-start px-2 md:px-0 mb-12 items-start"
      >
       <h3 className="mb-4 text-3xl md:text-5xl font-bold tracking-tight">
  <span className="text-foreground">My </span>
  <span
    className="
      bg-[linear-gradient(90deg,#3b82f6_0%,#8b5cf6_50%,#22d3ee_100%)]
      bg-clip-text
      text-transparent
    "
  >
    Development Journey
  </span>
</h3>
        <p className="text-muted-foreground max-w-6xl mx-auto">
          From frontend development to backend engineering, I continue to build,
          learn, and grow through hands-on projects and real-world problem solving.
        </p>
      </motion.div>

      <div className="relative px-2 sm:px-0 ">
        {/* Timeline line */}
       <div className="absolute top-0 bottom-0 w-px bg-white/70 hidden md:block" />

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.role}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="relative md:pl-20"
            >
              {/* Timeline dot */}
              <div className="absolute left-6 top-6 h-4 w-4 rounded-full bg-primary border-4 border-background hidden md:block" />

              <div className="rounded-2xl border border-border/50 bg-muted/30 p-4 sm:p-6 hover:border-primary/50 hover:bg-muted/50 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div>
                    <h4 className="text-xl font-semibold text-foreground mb-1">
                      {experience.role}
                    </h4>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building className="h-4 w-4" />
                      <span className="text-sm">{experience.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{experience.period}</span>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {experience.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
