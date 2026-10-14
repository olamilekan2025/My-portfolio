// "use client";

// import { Container } from "@/components/common/container";
// import { Section } from "@/components/common/section";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   motion,
//   useMotionValue,
//   useReducedMotion,
//   useSpring,
//   useTransform,
// } from "framer-motion";
// import { ArrowRight, ArrowUpRight } from "lucide-react";
// import { TypeAnimation } from "react-type-animation";
// import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
// import { IoMailOpenOutline } from "react-icons/io5";
// import { useEffect, useState } from "react";

// const PORTRAITS = [
//   {
//     src: "/images/jeliliPicture.png",
//     alt: "Oladunjoye Abduljeleel — portrait one",
//   },
//   {
//     src: "/images/alifat.png",
//     alt: "Oladunjoye Abduljeleel — portrait two",
//   },
// ];

// const ROTATION_INTERVAL_MS = 6000;

// const SOCIALS = [
//   {
//     name: "GitHub",
//     icon: FaGithub,
//     href: "https://github.com/olamilekan2025",
//   },
//   {
//     name: "LinkedIn",
//     icon: FaLinkedinIn,
//     href: "https://linkedin.com",
//   },
//   {
//     name: "X",
//     icon: FaXTwitter,
//     href: "https://x.com",
//   },
//   {
//     name: "Email",
//     icon: IoMailOpenOutline,
//     href: "mailto:abduljeleeloladunjoye@gmail.com",
//   },
// ];

// export function HeroSection() {
//   const reduceMotion = useReducedMotion();

//   const [activeImage, setActiveImage] = useState(0);

//   /*
//    * -------------------------------------------------------
//    * PORTRAIT ROTATION
//    * -------------------------------------------------------
//    */

//   useEffect(() => {
//     if (reduceMotion || PORTRAITS.length < 2) return;

//     let interval: number | undefined;

//     const startRotation = () => {
//       interval = window.setInterval(() => {
//         setActiveImage((current) => (current + 1) % PORTRAITS.length);
//       }, ROTATION_INTERVAL_MS);
//     };

//     const stopRotation = () => {
//       if (interval !== undefined) {
//         window.clearInterval(interval);
//         interval = undefined;
//       }
//     };

//     const handleVisibility = () => {
//       if (document.hidden) {
//         stopRotation();
//       } else {
//         startRotation();
//       }
//     };

//     if (!document.hidden) {
//       startRotation();
//     }

//     document.addEventListener("visibilitychange", handleVisibility);

//     return () => {
//       stopRotation();
//       document.removeEventListener("visibilitychange", handleVisibility);
//     };
//   }, [reduceMotion]);

//   /*
//    * -------------------------------------------------------
//    * POINTER PARALLAX
//    * -------------------------------------------------------
//    */

//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);

//   const springX = useSpring(mouseX, {
//     stiffness: 60,
//     damping: 25,
//     mass: 0.6,
//   });

//   const springY = useSpring(mouseY, {
//     stiffness: 60,
//     damping: 25,
//     mass: 0.6,
//   });

//   const portraitX = useTransform(
//     springX,
//     [-1, 1],
//     reduceMotion ? [0, 0] : [-8, 8]
//   );

//   const portraitY = useTransform(
//     springY,
//     [-1, 1],
//     reduceMotion ? [0, 0] : [-6, 6]
//   );

//   const backgroundX = useTransform(
//     springX,
//     [-1, 1],
//     reduceMotion ? [0, 0] : [-15, 15]
//   );

//   const backgroundY = useTransform(
//     springY,
//     [-1, 1],
//     reduceMotion ? [0, 0] : [-10, 10]
//   );

//   useEffect(() => {
//     if (reduceMotion) return;

//     const handlePointerMove = (event: MouseEvent) => {
//       mouseX.set((event.clientX / window.innerWidth) * 2 - 1);
//       mouseY.set((event.clientY / window.innerHeight) * 2 - 1);
//     };

//     window.addEventListener("mousemove", handlePointerMove, {
//       passive: true,
//     });

//     return () => {
//       window.removeEventListener("mousemove", handlePointerMove);
//     };
//   }, [mouseX, mouseY, reduceMotion]);

//   const activePortrait = PORTRAITS[activeImage];

//   return (
//     <Section
//       id="home"
//       className="relative min-h-screen overflow-hidden pt-24 pb-0 sm:pt-28 lg:pt-24"
//     >
//       {/* =====================================================
//           GLOBAL ATMOSPHERE
//           ===================================================== */}

//       <div className="pointer-events-none absolute inset-0 overflow-hidden">
//         <motion.div
//           style={{
//             x: backgroundX,
//             y: backgroundY,
//           }}
//           className="absolute -right-[12%] top-[4%] h-[650px] w-[650px] rounded-full bg-blue-500/[0.055] blur-[150px]"
//         />

//         <div className="absolute -left-[15%] top-[40%] h-[400px] w-[400px] rounded-full bg-cyan-500/[0.025] blur-[130px]" />

//         <motion.div
//           style={{
//             x: backgroundX,
//             y: backgroundY,
//           }}
//           className="absolute right-0 top-0 h-full w-[55%] opacity-[0.12]"
//         >
//           <div className="h-full w-full bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_5%,transparent_70%)]" />
//         </motion.div>
//       </div>

//       <Container>
//         <div className="relative grid min-h-[calc(100vh-6rem)] grid-cols-1 items-center lg:grid-cols-[1fr_1fr] lg:gap-0">

//           {/* =================================================
//               LEFT CONTENT
//               ================================================= */}

//           <div className="relative z-30 order-2 flex flex-col justify-center px-2 pb-16 pt-8 sm:px-0 lg:order-1 lg:min-h-[700px] lg:pb-0 lg:pt-0">
//             <div className="max-w-3xl items-center">

//               {/* INTRO LABEL */}

//               <motion.div
//                 initial={false}
//                 animate={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//                 transition={{
//                   duration: 0.7,
//                   delay: 0.1,
//                 }}
//                 className="mb-7 flex items-center gap-3"
//               >
//                 <span className="h-px w-10 bg-blue-500" />

//                 <span className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
//                   Full Stack Developer
//                 </span>
//               </motion.div>

//               {/* MAIN HEADING */}

//               <motion.h1
//                 initial={false}
//                 animate={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//                 transition={{
//                   duration: 0.9,
//                   delay: 0.2,
//                   ease: [0.16, 1, 0.3, 1],
//                 }}
//                className="text-center font-black uppercase tracking-[-0.065em] text-foreground sm:text-left"
//               >
//                 <span className="block text-[clamp(2.2rem,5vw,5.2rem)] leading-[0.82]">
//                   Hey, I'm
//                 </span>

//                 <span className="mt-2 block text-[clamp(2.2rem,5vw,5.2rem)] leading-[0.82]">
//                   Abduljeleel
//                 </span>

//                 <span className="mt-5 flex min-h-[1.1em] flex-wrap items-center gap-x-3 text-[clamp(1.5rem,5vw,5.4rem)] leading-[0.9] text-blue-500">
//                   <span>I'm a</span>

//                   <span className="text-[clamp(1rem,3vw,2rem)] font-semibold tracking-[-0.025em] text-blue-500">
//                     <TypeAnimation
//                       sequence={[
//                         "Full Stack Developer",
//                         2200,
//                         "Next.js Expert",
//                         2200,
//                         "TypeScript Expert",
//                         2200,
//                         "UI Engineer",
//                         2200,
//                         "Backend Developer",
//                         2200,
//                       ]}
//                       wrapper="span"
//                       repeat={Infinity}
//                       cursor
//                     />
//                   </span>
//                 </span>
//               </motion.h1>

//               {/* DESCRIPTION */}

//               <motion.p
//                 initial={false}
//                 animate={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//                 transition={{
//                   duration: 0.8,
//                   delay: 0.45,
//                 }}
// className="mx-auto mt-6 max-w-[650px] text-center text-sm leading-7 text-muted-foreground sm:text-left sm:text-base sm:leading-8"
//               >
//                 I design and build high-performance digital products,
//                 scalable web applications, and modern software experiences
//                 using Next.js, TypeScript, React, and modern cloud
//                 technologies.
//               </motion.p>

//               {/* ACTIONS */}

//               <motion.div
//   initial={false}
//   animate={{
//     opacity: 1,
//     y: 0,
//   }}
//   transition={{
//     duration: 0.8,
//     delay: 0.6,
//   }}
//   className="mt-7 flex w-full items-center justify-center gap-2 sm:justify-start sm:gap-5"
// >
//   <Button
//     asChild
//     size="lg"
//     className="group h-11 shrink-0 rounded-full px-4 text-[11px] font-bold shadow-[0_15px_50px_rgba(59,130,246,0.2)] sm:h-14 sm:px-8 sm:text-sm"
//   >
//     <Link
//       href="#contact"
//       className="flex items-center whitespace-nowrap"
//     >
//       <span>Let's Work Together</span>

//       <ArrowRight className="ml-1.5 h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 sm:ml-3 sm:h-4 sm:w-4" />
//     </Link>
//   </Button>

//   <Link
//     href="#projects"
//     className="group inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full border border-border/80 bg-background/60 px-4 text-[11px] font-semibold backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/[0.04] sm:h-14 sm:px-7 sm:text-sm"
//   >
//     View My Work

//     <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:ml-2 sm:h-4 sm:w-4" />
//   </Link>
// </motion.div>

//               {/* SOCIALS */}

//              <motion.div
//   initial={false}
//   animate={{
//     opacity: 1,
//   }}
//   transition={{
//     duration: 0.8,
//     delay: 0.8,
//   }}
//   className="mt-8 flex items-center justify-center gap-2 sm:justify-start sm:gap-3"
// >
//   <span className="mr-2 font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground/50 sm:text-[9px]">
//     Connect
//   </span>

//   {SOCIALS.map((social) => {
//     const Icon = social.icon;

//     return (
//       <Link
//         key={social.name}
//         href={social.href}
//         target={
//           social.href.startsWith("http")
//             ? "_blank"
//             : undefined
//         }
//         rel={
//           social.href.startsWith("http")
//             ? "noopener noreferrer"
//             : undefined
//         }
//         aria-label={social.name}
//         className="group flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/50 text-muted-foreground backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-500 sm:h-10 sm:w-10"
//       >
//         <Icon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110 sm:h-4 sm:w-4" />
//       </Link>
//     );
//   })}
// </motion.div>
//             </div>
//           </div>

//           {/* =================================================
//               RIGHT — PREMIUM CIRCULAR PORTRAIT
//               ================================================= */}

//           <div className="relative z-20 order-1 flex h-[440px] items-center justify-center sm:h-[570px] lg:order-2 lg:h-[720px]">

//             {/* LARGE AMBIENT GLOW */}

//             <motion.div
//               style={{
//                 x: backgroundX,
//                 y: backgroundY,
//               }}
//               className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.07] blur-[100px] sm:h-[520px] sm:w-[520px] lg:h-[620px] lg:w-[620px]"
//             />

//             {/* =================================================
//                 CIRCULAR SYSTEM
//                 ================================================= */}

//             <motion.div
//               style={{
//                 x: portraitX,
//                 y: portraitY,
//               }}
//               className="relative flex aspect-square w-[330px] items-center justify-center sm:w-[440px] lg:w-[560px]"
//             >

//               {/* OUTER ROTATING RING */}

//               <motion.div
//                 className="absolute inset-[-10%] rounded-full border border-blue-500/[0.12]"
//                 animate={
//                   reduceMotion
//                     ? undefined
//                     : {
//                         rotate: 360,
//                       }
//                 }
//                 transition={{
//                   duration: 35,
//                   repeat: Infinity,
//                   ease: "linear",
//                 }}
//               />

//               {/* SECOND ROTATING RING */}

//               <motion.div
//                 className="absolute inset-[-4%] rounded-full border border-border/30"
//                 animate={
//                   reduceMotion
//                     ? undefined
//                     : {
//                         rotate: -360,
//                       }
//                 }
//                 transition={{
//                   duration: 24,
//                   repeat: Infinity,
//                   ease: "linear",
//                 }}
//               />

//               {/* BLUE ACCENT RING */}

//               <motion.div
//                 className="absolute inset-[-1%] rounded-full border border-transparent border-t-blue-500/60 border-r-blue-400/20"
//                 animate={
//                   reduceMotion
//                     ? undefined
//                     : {
//                         rotate: 360,
//                       }
//                 }
//                 transition={{
//                   duration: 12,
//                   repeat: Infinity,
//                   ease: "linear",
//                 }}
//               />

//               {/* ORBIT DOT */}

//               <motion.span
//                 className="absolute left-1/2 top-[-10%] z-30 h-2 w-2 -translate-x-1/2 rounded-full bg-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.9)]"
//                 animate={
//                   reduceMotion
//                     ? undefined
//                     : {
//                         rotate: 360,
//                       }
//                 }
//                 style={{
//                   transformOrigin: "50% calc(50% + 280px)",
//                 }}
//                 transition={{
//                   duration: 12,
//                   repeat: Infinity,
//                   ease: "linear",
//                 }}
//               />

//               {/* INNER CIRCLE */}

//               <div className="absolute inset-[7%] overflow-hidden rounded-full border border-white/[0.08] bg-gradient-to-br from-blue-500/[0.05] via-background to-blue-500/[0.02] shadow-[0_40px_120px_rgba(0,0,0,0.28)]">

//                 {/* INNER LIGHT */}

//                 <motion.div
//                   className="pointer-events-none absolute inset-0 rounded-full bg-blue-500/[0.04]"
//                   animate={
//                     reduceMotion
//                       ? undefined
//                       : {
//                           opacity: [0.3, 0.7, 0.3],
//                         }
//                   }
//                   transition={{
//                     duration: 6,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                   }}
//                 />

//                 {/* PORTRAITS */}

//                 {PORTRAITS.map((portrait, index) => {
//                   const isActive = index === activeImage;

//                   return (
//                     <motion.div
//                       key={portrait.src}
//                       className="absolute inset-0"
//                       aria-hidden={!isActive}
//                       initial={false}
//                       animate={{
//                         opacity: isActive ? 1 : 0,
//                         scale: isActive ? 1 : 1.035,
//                       }}
//                       transition={{
//                         opacity: {
//                           duration: 1.2,
//                           ease: [0.16, 1, 0.3, 1],
//                         },
//                         scale: {
//                           duration: 6,
//                           ease: "easeOut",
//                         },
//                       }}
//                     >
//                       <Image
//                         src={portrait.src}
//                         alt={portrait.alt}
//                         fill
//                         priority={index === 0}
//                         sizes="(max-width: 640px) 310px, (max-width: 1024px) 420px, 520px"
//                         className="object-contain object-bottom"
//                       />

//                       {/* VERY SUBTLE BOTTOM BLEND */}

//                       <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-background/80 to-transparent" />
//                     </motion.div>
//                   );
//                 })}
//               </div>

//               {/* SMALL ORBITING ACCENT */}

//               <motion.div
//                 className="absolute bottom-[7%] right-[4%] h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.8)]"
//                 animate={
//                   reduceMotion
//                     ? undefined
//                     : {
//                         scale: [1, 1.4, 1],
//                         opacity: [0.6, 1, 0.6],
//                       }
//                 }
//                 transition={{
//                   duration: 2.5,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                 }}
//               />
//             </motion.div>
//           </div>
//         </div>
//       </Container>

//       {/* SCREEN READER STATUS */}

//       <div
//         className="sr-only"
//         role="status"
//         aria-live="polite"
//       >
//         {activePortrait.alt}
//       </div>
//     </Section>
//   );
// }




"use client";

import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

import { TypeAnimation } from "react-type-animation";

import {
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

import { IoMailOpenOutline } from "react-icons/io5";

import {
  useEffect,
  useState,
} from "react";

/* =========================================================
   HERO TYPE
========================================================= */

interface HeroImage {
  id: string;
  title: string;
  alt: string;
  imageUrl: string;
  publicId: string;
}

/* =========================================================
   SOCIALS
========================================================= */

const SOCIALS = [
  {
    name: "GitHub",
    icon: FaGithub,
    href: "https://github.com/olamilekan2025",
  },

  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/abduljelil-oladunjoye-olamilekan-1199a0438",
  },

  {
    name: "X",
    icon: FaXTwitter,
    href: "https://x.com/Olafrofh",
  },

  {
    name: "Email",
    icon: IoMailOpenOutline,
    href: "mailto:abduljeliloladunjoye0@gmail.com",
  },
];

/* =========================================================
   FALLBACK
========================================================= */

const FALLBACK_HERO = {
  imageUrl:
    "/images/jeliliPicture.png",

  alt:
    "Oladunjoye Abduljeleel — Full Stack Developer",
};

/* =========================================================
   COMPONENT
========================================================= */

export function HeroSection() {
  const reduceMotion =
    useReducedMotion();

  const [hero, setHero] =
    useState<HeroImage | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  /* =======================================================
     FETCH HERO
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    async function loadHero() {
      try {
        const response =
          await fetch("/api/hero", {
            cache: "no-store",
          });

        if (!response.ok) {
          throw new Error(
            "Failed to load hero."
          );
        }

        const data =
          await response.json();

        if (!cancelled) {
          setHero(
            data.hero ?? null
          );
        }
      } catch (error) {
        console.error(
          "Hero loading error:",
          error
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadHero();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =======================================================
     POINTER PARALLAX
  ======================================================= */

  const mouseX =
    useMotionValue(0);

  const mouseY =
    useMotionValue(0);

  const springX =
    useSpring(mouseX, {
      stiffness: 60,
      damping: 25,
      mass: 0.6,
    });

  const springY =
    useSpring(mouseY, {
      stiffness: 60,
      damping: 25,
      mass: 0.6,
    });

  const portraitX =
    useTransform(
      springX,
      [-1, 1],
      reduceMotion
        ? [0, 0]
        : [-8, 8]
    );

  const portraitY =
    useTransform(
      springY,
      [-1, 1],
      reduceMotion
        ? [0, 0]
        : [-6, 6]
    );

  const backgroundX =
    useTransform(
      springX,
      [-1, 1],
      reduceMotion
        ? [0, 0]
        : [-15, 15]
    );

  const backgroundY =
    useTransform(
      springY,
      [-1, 1],
      reduceMotion
        ? [0, 0]
        : [-10, 10]
    );

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const handlePointerMove =
      (event: MouseEvent) => {
        mouseX.set(
          (event.clientX /
            window.innerWidth) *
            2 -
            1
        );

        mouseY.set(
          (event.clientY /
            window.innerHeight) *
            2 -
            1
        );
      };

    window.addEventListener(
      "mousemove",
      handlePointerMove,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handlePointerMove
      );
    };
  }, [
    mouseX,
    mouseY,
    reduceMotion,
  ]);

  /* =======================================================
     HERO IMAGE
  ======================================================= */

  const heroImage =
    hero?.imageUrl ||
    FALLBACK_HERO.imageUrl;

  const heroAlt =
    hero?.alt ||
    FALLBACK_HERO.alt;

  return (
    <Section
      id="home"
      className="relative min-h-screen overflow-hidden pt-24 pb-0 sm:pt-28 lg:pt-24"
    >
      {/* =====================================================
          GLOBAL ATMOSPHERE
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          style={{
            x: backgroundX,
            y: backgroundY,
          }}
          className="absolute -right-[12%] top-[4%] h-[650px] w-[650px] rounded-full bg-blue-500/[0.055] blur-[150px]"
        />

        <div className="absolute -left-[15%] top-[40%] h-[400px] w-[400px] rounded-full bg-cyan-500/[0.025] blur-[130px]" />

        <motion.div
          style={{
            x: backgroundX,
            y: backgroundY,
          }}
          className="absolute right-0 top-0 h-full w-[55%] opacity-[0.12]"
        >
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_5%,transparent_70%)]" />
        </motion.div>
      </div>

      <Container>
        <div className="relative grid min-h-[calc(100vh-6rem)] grid-cols-1 items-center lg:grid-cols-[1fr_1fr] lg:gap-0">
          {/* =================================================
              LEFT
          ================================================= */}

          <div className="relative z-30 order-2 flex flex-col justify-center px-2 pb-16 pt-8 sm:px-0 lg:order-1 lg:min-h-[700px] lg:pb-0 lg:pt-0">
            <div className="max-w-3xl">
              {/* LABEL */}

              <motion.div
                initial={false}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                }}
                className="mb-7 flex items-center justify-center gap-3 sm:justify-start"
              >
                <span className="h-px w-10 bg-blue-500" />

                <span className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                  Full Stack Developer
                </span>
              </motion.div>

              {/* HEADING */}

              <motion.h1
                initial={false}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.2,
                  ease: [
                    0.16,
                    1,
                    0.3,
                    1,
                  ],
                }}
                className="text-center font-black uppercase tracking-[-0.065em] text-foreground sm:text-left"
              >
                <span className="block text-[clamp(2.2rem,5vw,5.2rem)] leading-[0.82]">
                  Hey, I&apos;m
                </span>

                <span className="mt-2 block text-[clamp(2.2rem,5vw,5.2rem)] leading-[0.82]">
                  Abduljeleel
                </span>

                <span className="mt-5 flex min-h-[1.1em] flex-wrap items-center justify-center gap-x-3 text-[clamp(1.5rem,5vw,5.4rem)] leading-[0.9] text-blue-500 sm:justify-start">
                  <span>
                    I&apos;m a
                  </span>

                  <span className="text-[clamp(1rem,3vw,2rem)] font-semibold tracking-[-0.025em] text-blue-500">
                    <TypeAnimation
                      sequence={[
                        "Full Stack Developer",
                        2200,

                        "Next.js Expert",
                        2200,

                        "TypeScript Expert",
                        2200,

                        "UI Engineer",
                        2200,

                        "Backend Developer",
                        2200,
                      ]}
                      wrapper="span"
                      repeat={
                        Infinity
                      }
                      cursor
                    />
                  </span>
                </span>
              </motion.h1>

              {/* DESCRIPTION */}

              <motion.p
                initial={false}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.45,
                }}
                className="mx-auto mt-6 max-w-[650px] text-center text-sm leading-7 text-muted-foreground sm:text-left sm:text-base sm:leading-8"
              >
                I design and build
                high-performance
                digital products,
                scalable web
                applications, and
                modern software
                experiences using
                Next.js,
                TypeScript, React,
                and modern cloud
                technologies.
              </motion.p>

              {/* ACTIONS */}

              <motion.div
                initial={false}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.6,
                }}
                className="mt-7 flex w-full items-center justify-center gap-2 sm:justify-start sm:gap-5"
              >
                <Button
                  asChild
                  size="lg"
                  className="group h-11 shrink-0 rounded-full px-4 text-[11px] font-bold shadow-[0_15px_50px_rgba(59,130,246,0.2)] sm:h-14 sm:px-8 sm:text-sm"
                >
                  <Link
                    href="#contact"
                    className="flex items-center whitespace-nowrap"
                  >
                    <span>
                      Let&apos;s Work
                      Together
                    </span>

                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 sm:ml-3 sm:h-4 sm:w-4" />
                  </Link>
                </Button>

                <Link
                  href="#projects"
                  className="group inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full border border-border/80 bg-background/60 px-4 text-[11px] font-semibold backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/[0.04] sm:h-14 sm:px-7 sm:text-sm"
                >
                  View My Work

                  <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:ml-2 sm:h-4 sm:w-4" />
                </Link>
              </motion.div>

              {/* SOCIALS */}

              <motion.div
                initial={false}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.8,
                }}
                className="mt-8 flex items-center justify-center gap-2 sm:justify-start sm:gap-3"
              >
                <span className="mr-2 font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground/50 sm:text-[9px]">
                  Connect
                </span>

                {SOCIALS.map(
                  (social) => {
                    const Icon =
                      social.icon;

                    const external =
                      social.href.startsWith(
                        "http"
                      );

                    return (
                      <Link
                        key={
                          social.name
                        }
                        href={
                          social.href
                        }
                        target={
                          external
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          external
                            ? "noopener noreferrer"
                            : undefined
                        }
                        aria-label={
                          social.name
                        }
                        className="group flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/50 text-muted-foreground backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-500 sm:h-10 sm:w-10"
                      >
                        <Icon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110 sm:h-4 sm:w-4" />
                      </Link>
                    );
                  }
                )}
              </motion.div>
            </div>
          </div>

          {/* =================================================
              RIGHT
          ================================================= */}

          <div className="relative z-20 order-1 flex h-[440px] items-center justify-center sm:h-[570px] lg:order-2 lg:h-[720px]">
            {/* GLOW */}

            <motion.div
              style={{
                x: backgroundX,
                y: backgroundY,
              }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.07] blur-[100px] sm:h-[520px] sm:w-[520px] lg:h-[620px] lg:w-[620px]"
            />

            {/* CIRCLE */}

            <motion.div
              style={{
                x: portraitX,
                y: portraitY,
              }}
              className="relative flex aspect-square w-[330px] items-center justify-center sm:w-[440px] lg:w-[560px]"
            >
              {/* OUTER RING */}

              <motion.div
                className="absolute inset-[-10%] rounded-full border border-blue-500/[0.12]"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        rotate: 360,
                      }
                }
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* SECOND RING */}

              <motion.div
                className="absolute inset-[-4%] rounded-full border border-border/30"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        rotate: -360,
                      }
                }
                transition={{
                  duration: 24,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* BLUE RING */}

              <motion.div
                className="absolute inset-[-1%] rounded-full border border-transparent border-r-blue-400/20 border-t-blue-500/60"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        rotate: 360,
                      }
                }
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* ORBIT DOT */}

              <motion.span
                className="absolute left-1/2 top-[-10%] z-30 h-2 w-2 -translate-x-1/2 rounded-full bg-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.9)]"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        rotate: 360,
                      }
                }
                style={{
                  transformOrigin:
                    "50% calc(50% + 280px)",
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* INNER CIRCLE */}

              <div className="absolute inset-[7%] overflow-hidden rounded-full border border-white/[0.08] bg-gradient-to-br from-blue-500/[0.05] via-background to-blue-500/[0.02] shadow-[0_40px_120px_rgba(0,0,0,0.28)]">
                {/* LIGHT */}

                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-full bg-blue-500/[0.04]"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: [
                            0.3,
                            0.7,
                            0.3,
                          ],
                        }
                  }
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* DYNAMIC HERO IMAGE */}

                {!loading && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 1.04,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      duration: 1,
                      ease: [
                        0.16,
                        1,
                        0.3,
                        1,
                      ],
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={heroImage}
                      alt={heroAlt}
                      fill
                      priority
                      sizes="(max-width: 640px) 310px, (max-width: 1024px) 420px, 520px"
                      className="object-contain object-bottom"
                    />

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-background/80 to-transparent" />
                  </motion.div>
                )}
              </div>

              {/* CYAN ACCENT */}

              <motion.div
                className="absolute bottom-[7%] right-[4%] h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.8)]"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        scale: [
                          1,
                          1.4,
                          1,
                        ],
                        opacity: [
                          0.6,
                          1,
                          0.6,
                        ],
                      }
                }
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </div>
      </Container>

      {/* SCREEN READER */}

      <div
        className="sr-only"
        role="status"
        aria-live="polite"
      >
        {heroAlt}
      </div>
    </Section>
  );
}