"use client";

import Link from "next/link";

import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { IoMailOpenOutline } from "react-icons/io5";

const socials = [
  {
    name: "GitHub",
    icon: FaGithub,
    href: "https://github.com/olamilekan2025",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    href: "https://linkedin.com",
  },
  {
    name: "X",
    icon: FaXTwitter,
    href: "https://x.com",
  },
  {
    name: "Email",
    icon: IoMailOpenOutline,
    href: "mailto:abduljeleeloladunjoye@gmail.com",
  },
];

export function HeroSocials() {
  return (
    <div className="flex items-center gap-2.5">
      {socials.map((social) => {
        const Icon = social.icon;

        return (
          <Link
            key={social.name}
            href={social.href}
            aria-label={social.name}
            target={
              social.href.startsWith("http")
                ? "_blank"
                : undefined
            }
            rel={
              social.href.startsWith("http")
                ? "noopener noreferrer"
                : undefined
            }
            className="
              group
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-border/70
              bg-background/60
              text-muted-foreground
              backdrop-blur-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-blue-500/50
              hover:bg-blue-500/10
              hover:text-blue-400
            "
          >
            <Icon
              className="
                h-[17px]
                w-[17px]
                transition-transform
                duration-300
                group-hover:scale-110
              "
            />
          </Link>
        );
      })}
    </div>
  );
}