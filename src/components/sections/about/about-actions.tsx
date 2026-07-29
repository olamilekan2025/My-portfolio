"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export function AboutActions() {
  return (
    <div className="flex flex-wrap gap-4 pt-4">
      <motion.div
        whileHover={{
          y: -2,
        }}
        whileTap={{
          scale: 0.98,
        }}
      >
        <a href="/cv.pdf" download className="inline-block">
          <Button
            size="lg"
            className="rounded-xl"
          >
            <Download className="mr-2 h-4 w-4" />
            Download CV
          </Button>
        </a>
      </motion.div>

      <motion.div
        whileHover={{
          y: -2,
        }}
        whileTap={{
          scale: 0.98,
        }}
      >
        <a href="#contact" className="inline-block">
          <Button
            size="lg"
            variant="outline"
            className="rounded-xl"
          >
            Let's Work Together

            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </a>
      </motion.div>
    </div>
  );
}