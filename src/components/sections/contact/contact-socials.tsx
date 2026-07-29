"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { SOCIAL_LINKS } from "./constants";

export function ContactSocials() {
  return (
    <div className="flex flex-wrap gap-4 pt-2">
      {SOCIAL_LINKS.map((social) => {
        const Icon = social.icon;

        return (
          <motion.div
            key={social.name}
            whileHover={{
              y: -5,
            }}
          >
            <Link
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                border
                bg-background/70
                backdrop-blur
                transition-all
                hover:border-primary
                hover:text-primary
              "
            >
              <Icon className="h-5 w-5" />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}