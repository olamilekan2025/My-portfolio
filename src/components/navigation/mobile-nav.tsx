"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { NAV_ITEMS } from "@/lib/navigation";
import { ThemeToggle } from "./theme-toggle";
import { Logo } from "./logo";

interface MobileNavProps {
  activeSection: string;
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  show: {
    opacity: 1,
    x: 0,
  },
};

export function MobileNav({
  activeSection,
}: MobileNavProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            size="icon"
            variant="ghost"
            className="lg:hidden h-11 w-11 rounded-full border border-border/50 bg-background/50 backdrop-blur-xl hover:bg-blue-500/10 hover:border-blue-500/30"
          />
        }
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-full max-w-[320px] flex-col border-l border-border/30 bg-background/95 backdrop-blur-2xl px-6 py-8 sm:max-w-sm"
      >
        <SheetHeader className="mb-10 flex items-center justify-between">
          <SheetTitle className="sr-only">
            Navigation
          </SheetTitle>

          <Logo />

          <Button
            size="icon"
            variant="ghost"
            onClick={() => setOpen(false)}
            className="h-9 w-9 rounded-full hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
        </SheetHeader>

        <motion.nav
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-1 flex-col gap-2"
        >
          {NAV_ITEMS.map((itemLink) => (
            <motion.div
              key={itemLink.href}
              variants={item}
            >
              <Link
                href={itemLink.href}
                onClick={() => setOpen(false)}
                className={`
                  group relative flex items-center justify-between rounded-xl px-4 py-4 text-lg font-semibold transition-all duration-300
                  ${
                    activeSection === itemLink.href.replace("#", "")
                      ? "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground border border-transparent"
                  }
                `}
              >
                <span>{itemLink.label}</span>
                <ArrowRight className={`
                  h-4 w-4 transition-all duration-300
                  ${activeSection === itemLink.href.replace("#", "") ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}
                `} />
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        <div className="mt-8 space-y-5 border-t border-border/30 pt-8">
          <Button
            asChild
            className="w-full h-12 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 text-white font-semibold shadow-[0_10px_40px_rgba(59,130,246,0.3)] hover:shadow-[0_15px_50px_rgba(59,130,246,0.4)] transition-all duration-300"
          >
            <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Link>
          </Button>

          <div className="flex items-center justify-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}