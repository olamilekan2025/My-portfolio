
"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Braces,
  Code2,
  Layers3,
  Rocket,
  Server,
  Sparkles,
  Wrench,
} from "lucide-react";

import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { SkillCard } from "@/components/skills/skill-card";
import { skillCards } from "@/lib/skills-data";

const categories = [
  { id: null, label: "All technologies", number: "01", icon: Layers3 },
  { id: "frontend", label: "Frontend", number: "02", icon: Code2 },
  { id: "backend", label: "Backend", number: "03", icon: Server },
  { id: "tools", label: "Tools & workflow", number: "04", icon: Wrench },
] as const;

export function SkillsSections() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCards = useMemo(
    () =>
      activeCategory
        ? skillCards.filter((card) => card.id === activeCategory)
        : skillCards,
    [activeCategory],
  );

  const activeCategoryData = categories.find(
    (category) => category.id === activeCategory,
  );

  const activeLabel =
    activeCategoryData?.label ?? "My complete toolkit";

  const activeTabId = activeCategoryData
    ? `skill-tab-${activeCategoryData.number}`
    : "skill-tab-01";

  const totalTechnologies = skillCards.reduce(
    (total, card) => total + card.skills.length,
    0,
  );

  return (
    <Section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative isolate overflow-hidden py-20 sm:py-24 lg:py-32"
    >
      {/* Atmospheric background — static, with the original palette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -right-44 -top-36 h-[30rem] w-[30rem] rounded-full bg-violet-500/[0.09] blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-blue-500/[0.075] blur-[120px]" />
        <div className="absolute left-[44%] top-[38%] h-72 w-72 rounded-full bg-cyan-400/[0.045] blur-[110px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "linear-gradient(to bottom, transparent, black 12%, black 82%, transparent)",
          }}
        />
      </div>

      <Container>
        {/* Intro */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.48fr)] lg:items-end lg:gap-16">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-blue-500" />

              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400 sm:text-[11px]">
                Skills & technologies
              </span>
            </div>

            <h2
              id="skills-heading"
              className="text-[2.8rem] font-semibold leading-[1.04] tracking-[-0.065em] text-foreground sm:text-6xl lg:text-[5rem]"
            >
              Built on skills.
              <br />

              <span className="text-muted-foreground/60">
                Driven by
              </span>{" "}

              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-violet-400 dark:to-cyan-300">
                  curiosity.
                </span>
              </span>
            </h2>
          </div>

          <div className="max-w-md lg:justify-self-end">
            <p className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
              The technologies, tools, and fundamentals I use to
              transform ideas into polished, functional digital
              experiences.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/[0.07]">
                <Braces className="h-[18px] w-[18px] text-blue-600 dark:text-blue-400" />
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground">
                  Learn. Build. Improve.
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Practical skills through real projects
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Overview strip */}
        <div className="mt-10 grid grid-cols-2 overflow-hidden rounded-2xl border border-border/80 bg-card/60 sm:mt-14 sm:grid-cols-3">
          <div className="border-r border-border/80 p-4 sm:px-6 sm:py-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Technology groups
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {String(skillCards.length).padStart(2, "0")}
            </p>
          </div>

          <div className="p-4 sm:border-r sm:border-border/80 sm:px-6 sm:py-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Technologies
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {String(totalTechnologies).padStart(2, "0")}
            </p>
          </div>

          <div className="col-span-2 flex items-center gap-3 border-t border-border/80 bg-gradient-to-r from-blue-500/[0.045] via-violet-500/[0.035] to-cyan-400/[0.045] p-4 sm:col-span-1 sm:border-t-0 sm:p-5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/[0.07]">
              <Sparkles className="h-4 w-4 text-violet-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Always evolving
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Growing with every project
              </p>
            </div>
          </div>
        </div>

        {/* Main skills explorer */}
        <div className="mt-16 sm:mt-20">
          <div className="mb-7 flex flex-col gap-3 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                The toolkit
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                What I work with
              </h3>
              <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
                Explore the tools behind my development workflow.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3.5 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-30" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                {totalTechnologies} technologies listed
              </span>
            </div>
          </div>

          <div className="grid gap-7 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-9">
            {/* Category navigation */}
            <aside className="h-fit rounded-2xl border border-border/80 bg-card/60 p-3 sm:p-4 lg:sticky lg:top-24">
              <div className="px-2 pb-3 pt-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/70">
                  Browse by category
                </p>
              </div>

              <div
                role="tablist"
                aria-label="Filter technology categories"
                className="flex flex-wrap gap-2 lg:flex-col"
              >
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isActive = activeCategory === category.id;

                  const count =
                    category.id === null
                      ? skillCards.length
                      : skillCards.filter(
                          (card) => card.id === category.id,
                        ).length;

                  return (
                    <button
                      key={category.number}
                      id={`skill-tab-${category.number}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="skill-panel"
                      onClick={() => setActiveCategory(category.id)}
                      className={[
                        "group flex min-h-11 items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        "lg:w-full",
                        isActive
                          ? "border-blue-500/25 bg-blue-500/[0.08] text-foreground"
                          : "border-transparent text-muted-foreground hover:border-border hover:bg-muted/50 hover:text-foreground",
                      ].join(" ")}
                    >
                      <Icon
                        className={[
                          "h-4 w-4 shrink-0",
                          isActive
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-muted-foreground/70",
                        ].join(" ")}
                      />

                      <span className="text-xs font-semibold sm:text-sm">
                        {category.label}
                      </span>

                      <span
                        className={[
                          "ml-auto rounded-md px-1.5 py-0.5 font-mono text-[10px]",
                          isActive
                            ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                            : "text-muted-foreground/60",
                        ].join(" ")}
                      >
                        {String(count).padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 hidden rounded-xl border border-border/70 bg-background/50 p-3 lg:block">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/[0.08]">
                    <Sparkles className="h-3.5 w-3.5 text-violet-500" />
                  </div>
                  <span className="text-xs font-semibold text-foreground">
                    Built through practice
                  </span>
                </div>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  Every technology represents another step in my
                  development journey.
                </p>
              </div>
            </aside>

            {/* Results */}
            <div className="min-w-0">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4
                    className="text-base font-semibold text-foreground sm:text-lg"
                    aria-live="polite"
                  >
                    {activeLabel}
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {filteredCards.length}{" "}
                    {filteredCards.length === 1
                      ? "skill group"
                      : "skill groups"}
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-5 rounded-full bg-blue-500" />
                  <span className="h-1.5 w-3 rounded-full bg-violet-500" />
                  <span className="h-1.5 w-2 rounded-full bg-cyan-400" />
                </div>
              </div>

              <div
                id="skill-panel"
                role="tabpanel"
                aria-labelledby={activeTabId}
                className="grid min-w-0 grid-cols-1 items-stretch gap-4 sm:grid-cols-2 xl:gap-5"
              >
                {filteredCards.map((card) => (
                  <SkillCard key={card.id} data={card} />
                ))}
              </div>

              {filteredCards.length === 0 && (
                <div className="rounded-2xl border border-dashed border-border bg-card/40 px-6 py-14 text-center">
                  <Layers3 className="mx-auto h-8 w-8 text-muted-foreground/50" />
                  <p className="mt-4 text-sm font-semibold text-foreground">
                    More technologies coming soon
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    I am continually expanding my toolkit.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="relative mt-16 overflow-hidden rounded-2xl border border-border/80 bg-card/70 sm:mt-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-violet-500/[0.07] via-blue-500/[0.035] to-transparent"
          />

          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

          <div className="relative grid gap-6 p-5 sm:p-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:p-10">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/[0.12] to-violet-500/[0.08]">
                <Rocket className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
                  The journey continues
                </p>

                <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  Turning knowledge into real products.
                </h3>

                <p className="mt-2 max-w-xl text-sm leading-7 text-muted-foreground">
                  I believe the best way to grow is to keep building,
                  solving real problems, and creating experiences that
                  make a difference.
                </p>
              </div>
            </div>

            <a
              href="#projects"
              className="group inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              Explore my projects
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-7 flex items-center justify-between gap-4">
          <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/55">
            Designed with intention. Built with code.
          </p>

          <a
            href="#projects"
            aria-label="Continue to projects"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <ArrowDownRight className="h-4 w-4" />
          </a>
        </div>
      </Container>
    </Section>
  );
}
