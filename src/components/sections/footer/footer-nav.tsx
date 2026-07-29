"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const links = [
  {
    label: "Home",
    href: "#home",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Skills",
    href: "#skills",
  },
  {
    label: "Projects",
    href: "#projects",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

export function FooterNav() {
  return (
    <motion.nav
      aria-label="Footer Navigation"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col items-start lg:justify-self-center"
    >
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Navigation
      </h3>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group inline-flex items-center text-sm font-medium text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
            >
              <span className="relative">
                {link.label}

                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}