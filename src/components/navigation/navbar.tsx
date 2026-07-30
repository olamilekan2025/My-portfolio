"use client";

import * as React from "react";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

import { Container } from "@/components/common/container";

import { NAV_ITEMS } from "@/lib/navigation";

import { useActiveSection } from "../../../hooks/use-active-section";
import { ResumeButton } from "@/components/common/resume-button";

import { Logo } from "./logo";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Navbar() {
  const active = useActiveSection([
    "home",
    "about",
    "skills",
    "experience",
    "services",
    "projects",
    "testimonials",
    "contact",
  ]);

  const { data: session } = useSession();
  const router = useRouter();

  const [scrolled, setScrolled] =
    React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    onScroll();

    window.addEventListener(
      "scroll",
      onScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        onScroll
      );
  }, []);

  return (
    <motion.header 
      initial={{
        y: -80,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300  ${
        scrolled
          ? "border-b border-white/10 bg-background/70 backdrop-blur-2xl shadow-xl"
          : "bg-transparent"
      }`}
    >
      <Container>
     <div
  className={`flex items-center justify-between px-5 md:px-0 ${
    scrolled ? "h-16" : "h-20"
  }`}
>
  {/* Left */}
  <Logo />

  {/* Center */}
  <nav className="hidden lg:flex items-center gap-8">
     {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                active={
                  active ===
                  item.href.replace("#", "")
                }
              />
            ))}
  </nav>
  <ThemeToggle />

  {/* Right */}
  <div className="flex items-end justify-end gap-4">
    {session?.user?.role === "admin" && (
      <button
        onClick={() => router.push("/admin/dashboard")}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 transition"
        title="Go to Dashboard"
      >
        {session?.user?.name?.charAt(0)}
      </button>
    )}

    <div className="hidden lg:block">
      <ResumeButton />
    </div>

    <MobileNav activeSection={active} />
  </div>
</div>
      </Container>
    </motion.header>
  );
}