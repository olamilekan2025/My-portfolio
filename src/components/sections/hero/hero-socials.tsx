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
    href: "https://github.com/yourusername",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    href: "https://linkedin.com/in/yourusername",
  },
  {
    name: "X",
    icon: FaXTwitter,
    href: "https://x.com/yourusername",
  },
  {
    name: "Email",
    icon: IoMailOpenOutline,
    href: "mailto:you@example.com",
  },
];

export function HeroSocials() {
  return (
    <div className="flex items-center  justify-center items-center gap-3">
      {socials.map((social) => {
        const Icon = social.icon;

        return (
         <Link
  key={social.name}
  href={social.href}
  aria-label={social.name}
  target={social.href.startsWith("http") ? "_blank" : undefined}
  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
  className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:text-blue-500"
>
  <Icon className="h-5 w-5" />
</Link>
        );
      })}
    </div>
  );
}