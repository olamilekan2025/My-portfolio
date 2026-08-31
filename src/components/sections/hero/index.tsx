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
ArrowDown,
ArrowRight,
ArrowUpRight,
Heart,
Plus,
} from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { IoMailOpenOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

const PORTRAITS = [
{
src: "/images/jeliliPicture.png",
alt: "Oladunjoye Abduljeleel — portrait one",
},
{
src: "/images/alifat.png",
alt: "Oladunjoye Abduljeleel — portrait two",
},
];

const ROTATION_INTERVAL_MS = 6000;

const SOCIALS = [
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

export function HeroSection() {
const reduceMotion = useReducedMotion();

const [activeImage, setActiveImage] = useState(0);
const [liked, setLiked] = useState(false);
const [scrollVisible, setScrollVisible] = useState(true);

/*

* ---
* PORTRAIT ROTATION
* ---

*/

useEffect(() => {
if (reduceMotion || PORTRAITS.length < 2) return;

let interval: number | undefined;

const startRotation = () => {
  interval = window.setInterval(() => {
    setActiveImage((current) => (current + 1) % PORTRAITS.length);
  }, ROTATION_INTERVAL_MS);
};

const stopRotation = () => {
  if (interval !== undefined) {
    window.clearInterval(interval);
    interval = undefined;
  }
};

const handleVisibility = () => {
  if (document.hidden) {
    stopRotation();
  } else {
    startRotation();
  }
};

if (!document.hidden) {
  startRotation();
}

document.addEventListener("visibilitychange", handleVisibility);

return () => {
  stopRotation();
  document.removeEventListener("visibilitychange", handleVisibility);
};

}, [reduceMotion]);

/*

* ---
* SCROLL INDICATOR
* ---

*/

useEffect(() => {
const handleScroll = () => {
setScrollVisible(window.scrollY < 100);
};

window.addEventListener("scroll", handleScroll, {
  passive: true,
});

return () => {
  window.removeEventListener("scroll", handleScroll);
};

}, []);

/*

* ---
* POINTER PARALLAX
* ---

*/

const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);

const springX = useSpring(mouseX, {
stiffness: 60,
damping: 25,
mass: 0.6,
});

const springY = useSpring(mouseY, {
stiffness: 60,
damping: 25,
mass: 0.6,
});

const portraitX = useTransform(
springX,
[-1, 1],
reduceMotion ? [0, 0] : [-8, 8]
);

const portraitY = useTransform(
springY,
[-1, 1],
reduceMotion ? [0, 0] : [-6, 6]
);

const backgroundX = useTransform(
springX,
[-1, 1],
reduceMotion ? [0, 0] : [-15, 15]
);

const backgroundY = useTransform(
springY,
[-1, 1],
reduceMotion ? [0, 0] : [-10, 10]
);

useEffect(() => {
if (reduceMotion) return;


const handlePointerMove = (event: MouseEvent) => {
  mouseX.set((event.clientX / window.innerWidth) * 2 - 1);
  mouseY.set((event.clientY / window.innerHeight) * 2 - 1);
};

window.addEventListener("mousemove", handlePointerMove, {
  passive: true,
});

return () => {
  window.removeEventListener("mousemove", handlePointerMove);
};


}, [mouseX, mouseY, reduceMotion]);

const activePortrait = PORTRAITS[activeImage];

return ( <Section
   id="home"
   className="relative min-h-screen overflow-hidden pt-24 pb-0 sm:pt-28 lg:pt-30"
 >
{/* =====================================================
GLOBAL HERO ATMOSPHERE
===================================================== */}

  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {/* Main blue glow */}
    <motion.div
      style={{
        x: backgroundX,
        y: backgroundY,
      }}
      className="absolute -right-[10%] top-[5%] h-[600px] w-[600px] rounded-full bg-blue-500/[0.055] blur-[140px]"
    />

    {/* Secondary glow */}
    <div className="absolute left-[-15%] top-[35%] h-[400px] w-[400px] rounded-full bg-cyan-500/[0.025] blur-[130px]" />

    {/* Very subtle grid */}
    <motion.div
      style={{
        x: backgroundX,
        y: backgroundY,
      }}
      className="absolute right-0 top-0 h-full w-[55%] opacity-[0.16]"
    >
      <div className="h-full w-full bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_5%,transparent_70%)]" />
    </motion.div>
  </div>

  <Container>
    <div className="relative grid min-h-[calc(100vh-6rem)] grid-cols-1 items-start lg:grid-cols-[1.02fr_0.98fr]">
      {/* =================================================
          LEFT CONTENT
          ================================================= */}

      <div className="relative z-30 order-2 flex flex-col justify-center pb-20 pt-8 lg:order-1 lg:min-h-[700px] lg:pb-0 lg:pt-0">
        <div className="max-w-3xl">
          {/* Small introduction */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 15,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
            className="mb-7 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-blue-500" />

            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
              Full Stack Developer
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 30,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-black uppercase tracking-[-0.065em] text-foreground"
          >
            <span className="block text-[clamp(3.3rem,5vw,6.2rem)] leading-[0.82]">
              Hey, I'm
            </span>

            <span className="mt-2 block text-[clamp(3.3rem,5vw,6.2rem)] leading-[0.82]">
              Abduljeleel
            </span>

            <span className="mt-5 flex min-h-[1.1em] flex-wrap items-baseline gap-x-3 text-[clamp(2rem,4vw,5.4rem)] leading-[0.9] text-blue-500">
              <span>I'm a</span>

              <span className="text-[clamp(1.25rem,2.5vw,2rem)] font-semibold tracking-[-0.025em] text-blue-500">
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
                  repeat={Infinity}
                  cursor
                />
              </span>
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 20,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.45,
            }}
            className="mt-8 max-w-[650px] text-base leading-8 text-muted-foreground sm:text-lg"
          >
            I design and build high-performance digital products,
            scalable web applications, and modern software experiences
            using Next.js, TypeScript, React, and modern cloud
            technologies.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 20,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.6,
            }}
            className="mt-9 flex flex-wrap items-center gap-5"
          >
            <Button
              asChild
              size="lg"
              className="group h-14 rounded-full px-8 text-sm font-bold shadow-[0_15px_50px_rgba(59,130,246,0.2)]"
            >
              <Link href="#contact">
                <span>Let's Work Together</span>

                <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>

            <Link
              href="#projects"
              className="group inline-flex h-14 items-center rounded-full border border-border/80 bg-background/60 px-7 text-sm font-semibold backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/[0.04]"
            >
              View My Work

              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                  }
            }
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.8,
            }}
            className="mt-10 flex items-center gap-3"
          >
            <span className="mr-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50">
              Connect
            </span>

            {SOCIALS.map((social) => {
              const Icon = social.icon;

              return (
                <Link
                  key={social.name}
                  href={social.href}
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
                  aria-label={social.name}
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/50 text-muted-foreground backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-500"
                >
                  <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                </Link>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* =================================================
          RIGHT PORTRAIT
          ================================================= */}

      <div className="relative z-20 order-1 flex h-[500px] items-start justify-center sm:h-[620px] lg:order-2 lg:h-[760px] lg:justify-end">
        <div className="relative h-150 w-full max-w-[680px] justify-center rounded-sm ring ring-blue-500/20 ">
          {/* Background architectural circle */}
          <motion.div
            style={{
              x: backgroundX,
              y: backgroundY,
            }}
            className="absolute right-[3%] top-[9%] h-[470px] w-[470px] sm:h-[560px] sm:w-[560px]"
          >
            <div className="absolute inset-0 rounded-full border border-blue-500/[0.09]" />

            <div className="absolute inset-[12%] rounded-full border border-border/30" />

            <div className="absolute inset-[25%] rounded-full border border-blue-400/[0.06]" />

            <motion.div
              className="absolute inset-[4%] rounded-full border border-transparent border-t-blue-400/20"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      rotate: 360,
                    }
              }
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>

          {/* Ambient portrait glow */}
          <motion.div
            className="absolute bottom-[8%] right-[15%] h-[65%] w-[65%] rounded-full bg-blue-500/[0.09] blur-[110px]"
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: [0.45, 0.75, 0.45],
                    scale: [0.97, 1.03, 0.97],
                  }
            }
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Small technical marks */}
          <div className="absolute right-[8%] top-[13%] hidden font-mono text-[9px] tracking-[0.3em] text-muted-foreground/40 sm:block">
            01 / 02
          </div>

          <div className="absolute left-[8%] top-[23%] hidden h-px w-16 bg-gradient-to-r from-blue-500/60 to-transparent sm:block" />

          <div className="absolute left-[8%] top-[22.5%] hidden h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.8)] sm:block" />

          {/* Portrait */}
          <motion.div
            style={{
              x: portraitX,
              y: portraitY,
            }}
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 40,
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1.2,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute bottom-0 right-0 h-[94%] w-[100%] sm:w-[88%] lg:w-[100%]"
          >
            <div className="relative h-130 w-full rounded-sm ">
              {/* Ground shadow */}
              <div className="absolute bottom-[1%] left-[15%] h-[12%] w-[70%] rounded-full bg-black/30 blur-[55px]" />

              {PORTRAITS.map((portrait, index) => {
                const isActive = index === activeImage;

                return (
                  <motion.div
                    key={portrait.src}
                    className="absolute inset-0"
                    aria-hidden={!isActive}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 1.02,
                    }}
                    transition={{
                      opacity: {
                        duration: 1.2,
                        ease: [0.16, 1, 0.3, 1],
                      },
                      scale: {
                        duration: 6,
                        ease: "easeOut",
                      },
                    }}
                  >
                    <Image
                      src={portrait.src}
                      alt={portrait.alt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 640px) 95vw, (max-width: 1024px) 560px, 680px"
                      className="object-contain object-bottom"
                    />

                    {/* Bottom cinematic fade */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-background via-background/40 to-transparent" />

                    {/* Side integration */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-[12%] bg-gradient-to-r from-background/20 to-transparent" />
                  </motion.div>
                );
              })}

              {/* Light sweep */}
              {!reduceMotion && (
                <motion.div
                  className="pointer-events-none absolute inset-y-0 left-[-35%] z-30 w-[18%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
                  animate={{
                    left: ["-35%", "125%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatDelay: 7,
                    ease: "easeInOut",
                  }}
                />
              )}
            </div>
          </motion.div>

          {/* =================================================
              FLOATING PROFILE CARD
              ================================================= */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 20,
                    y: 10,
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
            }}
            transition={{
              delay: 1,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute right-0 top-[5%] z-40"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-background/70 p-2 pr-4 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
              <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-white/10">
                <Image
                  src="/images/WhatsApp_Image_2026-07-16_at_9.47.56_PM__1_-removebg-preview.png"
                  alt="Oladunjoye Abduljeleel"
                  fill
                  sizes="48px"
                  className="object-cover"
                />

                <span className="absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full border-2 border-background bg-green-500" />
              </div>

              <div>
                <p className="text-[11px] font-semibold">
                  Abduljeleel
                </p>

                <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.15em] text-muted-foreground">
                  Available for projects
                </p>
              </div>
            </div>

            {/* Plus */}
            <motion.button
              type="button"
              aria-label="View profile"
              whileHover={{
                scale: 1.1,
                rotate: 5,
              }}
              whileTap={{
                scale: 0.9,
              }}
              className="absolute -right-2 -bottom-3 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-blue-500 text-white shadow-[0_8px_25px_rgba(59,130,246,0.4)]"
            >
              <Plus className="h-3.5 w-3.5" />
            </motion.button>
          </motion.div>

          {/* =================================================
              PORTRAIT NAVIGATION
              ================================================= */}

          {PORTRAITS.length > 1 && (
            <div
              className="absolute bottom-[13%] right-[7%] z-40 flex items-center gap-2"
              role="tablist"
              aria-label="Portrait selection"
            >
              {PORTRAITS.map((portrait, index) => (
                <button
                  key={portrait.src}
                  type="button"
                  role="tab"
                  aria-selected={index === activeImage}
                  aria-label={`Show ${portrait.alt}`}
                  onClick={() => setActiveImage(index)}
                  className="h-1.5 overflow-hidden rounded-full bg-white/20 transition-all duration-300"
                >
                  <motion.span
                    className="block h-full rounded-full bg-blue-400"
                    animate={{
                      width:
                        index === activeImage ? "28px" : "0px",
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                  />
                </button>
              ))}
            </div>
          )}

          {/* =================================================
              LIKE BUTTON
              ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1.2,
              duration: 0.6,
            }}
            className="absolute bottom-[7%] right-0 z-40"
          >
            <motion.button
              type="button"
              aria-label={
                liked ? "Unlike portfolio" : "Like portfolio"
              }
              aria-pressed={liked}
              onClick={() => setLiked((value) => !value)}
              whileHover={{
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.9,
              }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-background/60 text-muted-foreground shadow-[0_15px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-colors hover:text-red-500"
            >
              <Heart
                className={`h-5 w-5 transition-all ${
                  liked
                    ? "fill-red-500 text-red-500"
                    : ""
                }`}
                strokeWidth={1.5}
              />
            </motion.button>
          </motion.div>

          {/* Engineering label */}
          <motion.div
            initial={{
              opacity: 0,
              x: -15,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 1.15,
              duration: 0.6,
            }}
            className="absolute bottom-[19%] left-[5%] z-40 hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground/50 sm:flex"
          >
            <span className="text-blue-400">+</span>
            <span>Building digital products</span>
          </motion.div>
        </div>
      </div>
    </div>
  </Container>

  {/* {/* =====================================================
      SCROLL INDICATOR
      ===================================================== */}

  {/* <motion.div
    initial={{
      opacity: 0,
    }}
    animate={{
      opacity: scrollVisible ? 1 : 0,
    }}
    transition={{
      duration: 0.4,
    }}
    className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
    aria-hidden="true"
  >
    <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground/50">
      Scroll
    </span>

    <motion.div
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, 5, 0],
            }
      }
      transition={{
        duration: 1.7,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <ArrowDown className="h-4 w-4 text-muted-foreground/60" />
    </motion.div>
  </motion.div>  */}

  {/* Screen reader status */}
  <div
    className="sr-only"
    role="status"
    aria-live="polite"
  >
    {activePortrait.alt}
  </div>
</Section>


);
}
