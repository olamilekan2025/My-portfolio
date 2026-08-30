"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Code2, Zap } from "lucide-react";

export function AboutImage() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -50,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.8,
      }}
      className="relative mx-auto w-full max-w-lg px-5 sm:px-0"
    >
      {/* Decorative background elements */}
      <div className="absolute -top-8 -left-8 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-violet-500/20 blur-3xl" />

      {/* Main image container */}
      <motion.div
        whileHover={{
          y: -4,
        }}
        transition={{
          duration: 0.3,
        }}
        className="relative"
      >
        {/* Image frame with gradient border */}
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-background via-background to-muted/50 shadow-2xl">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="/images/WhatsApp_Image_2026-07-16_at_9.47.56_PM__1_-removebg-preview.png"
              alt="Olamilekan Abduljeleel"
              fill
              priority
              className="object-cover"
            />
            
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>

        {/* Floating info cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="absolute -bottom-6 -right-6 rounded-2xl border border-border/50 bg-background/90 backdrop-blur-xl p-4 shadow-xl"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Based in</p>
              <p className="text-sm font-semibold">Nigeria</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="absolute -top-4 -left-4 rounded-2xl border border-border/50 bg-background/90 backdrop-blur-xl p-4 shadow-xl"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
              <Zap className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="text-sm font-semibold text-emerald-500">Available</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}