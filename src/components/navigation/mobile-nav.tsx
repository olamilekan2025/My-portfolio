"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
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
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    x: -20,
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
      className="lg:hidden"
    />
  }
>
  <Menu className="h-5 w-5" />
</SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-full max-w-sm flex-col border-l bg-background/95 backdrop-blur-2xl "
      >
        <SheetHeader className="mb-8">
          <SheetTitle className="sr-only">
            Navigation
          </SheetTitle>

          <Logo />
        </SheetHeader>

        <motion.nav
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-1 flex-col gap-5 pl-5"
        >
          {NAV_ITEMS.map((itemLink) => (
            <motion.div
              key={itemLink.href}
              variants={item}
            >
              <Link
                href={itemLink.href}
                onClick={() => setOpen(false)}
                className={`text-xl font-semibold transition-colors ${
                  activeSection ===
                  itemLink.href.replace("#", "")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {itemLink.label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        <div className="space-y-4 border-t pt-6">
          <Button
            className="w-full rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 text-white"
          >
            Download Resume
          </Button>

          <div className="flex justify-between">
            {/* <ThemeToggle /> */}

            <div className="flex gap-2">
              {/* Social icons later */}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}