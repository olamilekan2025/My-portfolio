"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectCard } from "./project-card";

interface ProjectCardProps {
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

interface ProjectsCarouselProps {
  projects: ProjectCardProps[];
}

const AUTO_PLAY_INTERVAL = 4000;

export function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 768) {
          setItemsPerView(1);
        } else if (window.innerWidth < 1024) {
          setItemsPerView(2);
        } else {
          setItemsPerView(3);
        }
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const totalSlides = Math.max(1, Math.ceil(projects.length / itemsPerView));

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  useEffect(() => {
    if (projects.length <= itemsPerView) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      if (!isPaused && !isHovered && document.visibilityState === 'visible') {
        nextSlide();
      }
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [nextSlide, projects.length, itemsPerView, isPaused, isHovered]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPaused(document.visibilityState !== 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setIsPaused(true);
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
      setTimeout(() => setIsPaused(false), AUTO_PLAY_INTERVAL);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  if (projects.length === 0) {
    return null;
  }

  const showControls = projects.length > itemsPerView;

  const getVisibleProjects = () => {
    const start = currentIndex * itemsPerView;
    const end = start + itemsPerView;
    return projects.slice(start, end);
  };

  return (
    <div className="relative">
      <div 
        className="overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${itemsPerView}, 1fr)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={currentIndex}
        >
          {getVisibleProjects().map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </motion.div>
      </div>

      {showControls && (
        <>
          <button
            onClick={() => {
              prevSlide();
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), AUTO_PLAY_INTERVAL);
            }}
            aria-label="Previous projects"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background shadow-md transition-all hover:scale-110 hover:border-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            onClick={() => {
              nextSlide();
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), AUTO_PLAY_INTERVAL);
            }}
            aria-label="Next projects"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background shadow-md transition-all hover:scale-110 hover:border-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}

      {showControls && totalSlides > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                goToSlide(index);
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), AUTO_PLAY_INTERVAL);
              }}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
