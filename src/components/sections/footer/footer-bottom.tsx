"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";

export function FooterBottom() {
  const [year, setYear] = useState(2026);
  
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: 0.4,
      }}
      className="flex flex-col gap-6 border-t border-border/50 pt-6 md:flex-row md:items-center md:justify-between"
    >
      {/* Copyright */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          © {year}{" "}
          <span className="font-medium text-foreground">
            Oladunjoye Abduljeleel
          </span>
          . All Rights Reserved.
        </p>

        <p className="text-xs text-muted-foreground/80">
          Designed & built with attention to detail, performance, and
          accessibility.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <span className="inline-flex items-center rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
          Built with
          <span className="mx-1 font-semibold text-foreground">
            Next.js
          </span>
          &
          <span className="ml-1 font-semibold text-foreground">
            TypeScript
          </span>
        </span>

        <Link
          href="#home"
          className="
            group
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-muted-foreground
            transition-all
            duration-300
            hover:text-foreground
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-primary
            focus-visible:ring-offset-2
            rounded-md
          "
        >
          Back to top

          <ArrowUpRight
            className="
              h-4
              w-4
              transition-transform
              duration-300
              group-hover:-translate-y-1
              group-hover:translate-x-1
            "
          />
        </Link>
      </div>
    </motion.div>
  );
}