"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import {
ArrowUpRight,
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
{
id: null,
label: "All Skills",
icon: Sparkles,
},
{
id: "frontend",
label: "Frontend",
icon: Code2,
},
{
id: "backend",
label: "Backend",
icon: Server,
},
{
id: "tools",
label: "Tools",
icon: Wrench,
},
];

export function SkillsSections() {
const reduceMotion = useReducedMotion();
const [activeCategory, setActiveCategory] = useState<string | null>(null);

const filteredCards = activeCategory
? skillCards.filter((card) => card.id === activeCategory)
: skillCards;

return ( <Section
   id="skills"
   aria-labelledby="skills-heading"
   className="relative overflow-hidden py-24 sm:py-32 lg:py-10"
 >
{/* =========================================================
BACKGROUND
========================================================= */} <div
     aria-hidden="true"
     className="pointer-events-none absolute inset-0 -z-10"
   >
{/* Main ambient glow */} <div className="absolute left-[8%] top-[10%] h-[420px] w-[420px] rounded-full bg-blue-500/[0.055] blur-[130px]" />


    <div className="absolute bottom-[8%] right-[5%] h-[380px] w-[380px] rounded-full bg-violet-500/[0.045] blur-[130px]" />

    {/* Subtle grid */}
    <div
      className="
        absolute inset-0
        opacity-[0.025]
        [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
        [background-size:64px_64px]
        [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]
      "
    />
  </div>

  <Container>
    {/* =========================================================
        SECTION HEADER
    ========================================================= */}
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="max-w-4xl"
    >
      {/* Eyebrow */}
      <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-blue-500/15 bg-blue-500/[0.06] px-4 py-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500/40" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
        </span>

        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-500 sm:text-[11px]">
          Technical Expertise
        </span>
      </div>

      {/* Heading */}
      <h2
        id="skills-heading"
        className="
          text-4xl
          font-black
          tracking-[-0.045em]
          text-foreground
          sm:text-5xl
          lg:text-7xl
        "
      >
        Technologies I use
        <span className="block bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 bg-clip-text text-transparent">
          to build digital products.
        </span>
      </h2>

      {/* Description */}
      <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
        A carefully selected technology stack focused on building
        scalable applications, polished interfaces, and reliable
        digital experiences.
      </p>
    </motion.div>

    {/* =========================================================
        CATEGORY NAVIGATION
    ========================================================= */}
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: 0.15,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="mt-12 flex flex-wrap items-center gap-2"
      role="tablist"
      aria-label="Technology categories"
    >
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = activeCategory === category.id;

        return (
          <button
            key={category.id ?? "all"}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => setActiveCategory(category.id)}
            className={`
              group
              relative
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              px-4
              py-2.5
              text-sm
              font-medium
              transition-all
              duration-300
              ${
                isActive
                  ? "border-blue-500/30 bg-blue-500 text-white shadow-[0_8px_30px_rgba(59,130,246,0.18)]"
                  : "border-border/60 bg-background/60 text-muted-foreground hover:border-blue-500/20 hover:bg-blue-500/[0.05] hover:text-foreground"
              }
            `}
          >
            <Icon className="h-4 w-4" />
            {category.label}
          </button>
        );
      })}
    </motion.div>

    {/* =========================================================
        SKILLS HEADER / META
    ========================================================= */}
    <div className="mt-16 flex items-end justify-between border-b border-border/50 pb-5">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
          {activeCategory
            ? `${activeCategory} technologies`
            : "Core technology stack"}
        </p>

        <p className="mt-2 text-sm font-medium text-muted-foreground">
          {filteredCards.length}{" "}
          {filteredCards.length === 1 ? "technology" : "technologies"}
        </p>
      </div>

      <div className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50 sm:flex">
        <Layers3 className="h-3.5 w-3.5" />
        <span>01 — Stack</span>
      </div>
    </div>

    {/* =========================================================
        SKILLS GRID
    ========================================================= */}
    <motion.div
      layout
      className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <AnimatePresence mode="popLayout">
        {filteredCards.map((card, index) => (
          <motion.div
            key={card.id}
            layout
            initial={false}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={
              reduceMotion
                ? undefined
                : {
                    opacity: 0,
                    y: -15,
                    scale: 0.96,
                  }
            }
            transition={{
              duration: 0.5,
              delay: reduceMotion ? 0 : index * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group relative"
          >
            {/* Premium card glow */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -inset-px
                rounded-[1.4rem]
                bg-gradient-to-br
                from-blue-500/0
                via-violet-500/0
                to-cyan-400/0
                opacity-0
                blur-sm
                transition-all
                duration-500
                group-hover:from-blue-500/20
                group-hover:via-violet-500/10
                group-hover:to-cyan-400/20
                group-hover:opacity-100
              "
            />

            <motion.div
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -6,
                      transition: {
                        duration: 0.25,
                        ease: "easeOut",
                      },
                    }
              }
              className="
                relative
                h-full
                overflow-hidden
                rounded-[1.4rem]
                border
                border-border/60
                bg-background/70
                shadow-[0_10px_40px_rgba(0,0,0,0.04)]
                backdrop-blur-xl
                transition-all
                duration-500
                group-hover:border-blue-500/20
                group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                dark:bg-white/[0.025]
              "
            >
              {/* Top accent */}
              <div
                className="
                  absolute
                  left-0
                  right-0
                  top-0
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-blue-500/50
                  to-transparent
                  opacity-0
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                "
              />

              <SkillCard data={card} delay={0} />
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>

    {/* =========================================================
        BOTTOM CTA / STACK STATEMENT
    ========================================================= */}
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: 0.25,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        relative
        mt-12
        overflow-hidden
        rounded-2xl
        border
        border-border/60
        bg-gradient-to-br
        from-blue-500/[0.05]
        via-background
        to-violet-500/[0.05]
        p-6
        sm:p-8
      "
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/[0.08] blur-3xl"
      />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-500/15 bg-blue-500/[0.07]">
            <Rocket className="h-5 w-5 text-blue-500" />
          </div>

          <div>
            <p className="font-semibold text-foreground">
              Always learning. Always building.
            </p>

            <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
              I continuously explore new technologies and development
              practices to create faster, cleaner, and more meaningful
              products.
            </p>
          </div>
        </div>

        <motion.a
          href="#projects"
          whileHover={reduceMotion ? undefined : { x: 3 }}
          className="
            inline-flex
            shrink-0
            items-center
            gap-2
            text-sm
            font-semibold
            text-blue-500
            transition-colors
            hover:text-blue-400
          "
        >
          Explore my work
          <ArrowUpRight className="h-4 w-4" />
        </motion.a>
      </div>
    </motion.div>
  </Container>
</Section>

);
}
