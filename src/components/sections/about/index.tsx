"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  Code2,
  Layers3,
  Sparkles,
} from "lucide-react";

import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { AboutContent } from "./about-content";
import { AboutExperience } from "./about-experience";

const capabilities = [
  "React & Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js & Express",
  "REST APIs",
  "MongoDB",
];

export function AboutSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section
      id="about"
      className="relative isolate overflow-hidden py-20 sm:py-24 lg:py-32"
    >
      {/* Restrained background treatment */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-48 top-24 h-[30rem] w-[30rem] rounded-full bg-blue-500/[0.06] blur-[120px]" />

        <div className="absolute -right-48 top-[35%] h-[32rem] w-[32rem] rounded-full bg-violet-500/[0.055] blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <Container>
        <div className="mx-auto max-w-6xl">
          {/* About introduction */}
          <motion.div
            initial={
              shouldReduceMotion ? false : { opacity: 0, y: 20 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            {/* Section label */}
            <div className="mb-10 flex items-center gap-3 sm:mb-14">
              <span className="h-px w-8 bg-primary sm:w-12" />

              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                The person behind the code
              </span>
            </div>

            {/* Editorial introduction */}
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] lg:gap-16 xl:gap-24">
              {/* Main biography */}
              <div className="min-w-0">
                <AboutContent />
              </div>

              {/* Supporting information */}
              <motion.aside
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, y: 16 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.6,
                  delay: shouldReduceMotion ? 0 : 0.12,
                }}
                className="relative"
              >
                <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-background/60 p-5 backdrop-blur-xl sm:p-7">
                  {/* Top accent */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-blue-500/70 via-violet-500/60 to-cyan-400/70"
                  />

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.07] text-primary">
                      <Code2 className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        My technical toolkit
                      </h3>

                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Technologies I work with
                      </p>
                    </div>
                  </div>

                  <div className="my-6 h-px bg-border/70" />

                  <div className="flex flex-wrap gap-2">
                    {capabilities.map((capability) => (
                      <span
                        key={capability}
                        className="rounded-lg border border-border/70 bg-muted/30 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:border-primary/30 hover:text-foreground"
                      >
                        {capability}
                      </span>
                    ))}
                  </div>

                  <div className="my-6 h-px bg-border/70" />

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Layers3 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Product-minded development
                        </p>

                        <p className="mt-1 text-xs leading-6 text-muted-foreground">
                          Building useful applications with attention to
                          usability, responsiveness, and maintainable code.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Always improving
                        </p>

                        <p className="mt-1 text-xs leading-6 text-muted-foreground">
                          Exploring backend engineering and better ways to
                          structure reliable web applications.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Supporting note */}
                <p className="mt-4 px-1 text-xs leading-6 text-muted-foreground">
                  Every project is an opportunity to learn something new and
                  build something better.
                </p>
              </motion.aside>
            </div>
          </motion.div>

          {/* Clear transition into project work */}
          <motion.div
            initial={
              shouldReduceMotion ? false : { opacity: 0, y: 12 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.5,
            }}
            className="my-20 border-t border-border/70 pt-8 sm:my-24 sm:pt-10 lg:my-28"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  From ideas to implementation
                </p>

                <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                  A closer look at my work.
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                  Personal projects where I apply my skills, explore new
                  technologies, and solve practical problems through code.
                </p>
              </div>

              <a
                href="#projects"
                className="group inline-flex w-fit items-center gap-2 pb-1 text-sm font-semibold text-foreground transition-colors hover:text-primary"
              >
                Explore projects

                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
              </a>
            </div>
          </motion.div>

          {/* Project showcase */}
          <div className="relative">
            <AboutExperience />
          </div>
        </div>
      </Container>
    </Section>
  );
}