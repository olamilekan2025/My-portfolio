"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SkillCard } from "@/components/skills/skill-card";
import { skillCards } from "@/lib/skills-data";
import { Sparkles, Zap, Target, Rocket } from "lucide-react";
import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";

/**
 * Full "Skills" page section with premium UI and crazy animations.
 * Features interactive filtering, 3D hover effects, particle-like animations.
 */
export function SkillsSections() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const filteredCards = activeCategory 
    ? skillCards.filter(card => card.id === activeCategory)
    : skillCards;

  const categories = [
    { id: null, label: "All", icon: Sparkles },
    { id: "frontend", label: "Frontend", icon: Zap },
    { id: "backend", label: "Backend", icon: Target },
    { id: "tools", label: "Tools", icon: Rocket },
  ];

  return (
    <Section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/30 px-2 md:px-0 py-20 sm:py-32"
    >
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Animated background elements */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/4 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-cyan-500/20 blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-blue-500/15 blur-[100px]"
          />
        </div>

        <Container>
        {/* Header with crazy animation */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ 
            duration: 0.8, 
            ease: [0.22, 1, 0.36, 1],
            type: "spring",
            stiffness: 100
          }}
          className="mx-auto mb-16 max-w-6xl text-start"
        >
         <motion.div
  initial={{ opacity: 0, y: -20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.2 }}
  className="
    mb-6
    inline-flex
    items-center
    gap-2
    rounded-full
    border
    border-primary/20
    bg-primary/5
    px-6
    py-2.5
    backdrop-blur-sm
  "
>
  <motion.span
    animate={{ rotate: [0, 360] }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "linear",
    }}
    className="
      inline-flex
      items-center
      justify-center
      bg-[linear-gradient(90deg,#3b82f6_0%,#8b5cf6_50%,#22d3ee_100%)]
      bg-clip-text
      text-transparent
    "
  >
    <Sparkles className="h-4 w-4 text-[#8b5cf6]" />
  </motion.span>

  <span
    className="
      bg-[linear-gradient(90deg,#3b82f6_0%,#8b5cf6_50%,#22d3ee_100%)]
      bg-clip-text
      text-sm
      font-semibold
      text-transparent
    "
  >
    Technical Expertise
  </span>
</motion.div>

          <motion.h2
            id="skills-heading"
            className="text-4xl w-full font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            My{" "}
            <motion.span
              className="bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                backgroundSize: "200% auto",
              }}
            >
              Technology Stack
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-lg leading-relaxed text-muted-foreground"
          >
            Mastering modern technologies to build exceptional digital experiences 
            that push the boundaries of what's possible on the web.
          </motion.p>
        </motion.div>

        {/* Interactive Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mb-12 flex flex-wrap justify-start gap-3"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <motion.button
                key={category.id || "all"}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-4 w-4" />
                {category.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills Grid with 3D effects */}
        <motion.div 
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredCards.map((card, i) => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, y: 30, rotateX: -10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0,
                }}
                exit={{ 
                  opacity: 0, 
                  y: -30, 
                  scale: 0.8,
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                whileHover={{
                  y: -10,
                  rotateX: 5,
                  rotateY: 5,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                style={{
                  perspective: 1000,
                }}
              >
                <SkillCard data={card} delay={i * 0.05} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Floating particles */}
        {isHovering && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-2 w-2 rounded-full bg-primary/30"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * 400 + 200,
                  opacity: 0,
                }}
                animate={{
                  y: [0, -100, -200],
                  opacity: [0, 1, 0],
                  scale: [1, 0, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </>
        )}
        </Container>
      </div>
    </Section>
  );
}
