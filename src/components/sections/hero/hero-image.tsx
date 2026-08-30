// "use client";

// import Image from "next/image";
// import {
//   motion,
//   useMotionValue,
//   useReducedMotion,
//   useSpring,
//   useTransform,
// } from "framer-motion";
// import { Heart, Plus } from "lucide-react";
// import { useEffect, useState } from "react";

// export function HeroImage() {
//   const reduceMotion = useReducedMotion();
//   const [liked, setLiked] = useState(false);

//   /*
//    * ---------------------------------------------------------
//    * POINTER PARALLAX
//    * ---------------------------------------------------------
//    */

//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);

//   const springX = useSpring(mouseX, {
//     stiffness: 70,
//     damping: 25,
//     mass: 0.5,
//   });

//   const springY = useSpring(mouseY, {
//     stiffness: 70,
//     damping: 25,
//     mass: 0.5,
//   });

//   const portraitX = useTransform(
//     springX,
//     [-1, 1],
//     reduceMotion ? [0, 0] : [-8, 8]
//   );

//   const portraitY = useTransform(
//     springY,
//     [-1, 1],
//     reduceMotion ? [0, 0] : [-5, 5]
//   );

//   const technicalX = useTransform(
//     springX,
//     [-1, 1],
//     reduceMotion ? [0, 0] : [-16, 16]
//   );

//   const technicalY = useTransform(
//     springY,
//     [-1, 1],
//     reduceMotion ? [0, 0] : [-8, 8]
//   );

//   useEffect(() => {
//     if (reduceMotion) return;

//     const handlePointerMove = (event: MouseEvent) => {
//       mouseX.set(
//         (event.clientX / window.innerWidth) * 2 - 1
//       );

//       mouseY.set(
//         (event.clientY / window.innerHeight) * 2 - 1
//       );
//     };

//     window.addEventListener(
//       "mousemove",
//       handlePointerMove
//     );

//     return () => {
//       window.removeEventListener(
//         "mousemove",
//         handlePointerMove
//       );
//     };
//   }, [mouseX, mouseY, reduceMotion]);

//   return (
//     <motion.div
//       initial={
//         reduceMotion
//           ? false
//           : {
//               opacity: 0,
//               x: 35,
//             }
//       }
//       animate={{
//         opacity: 1,
//         x: 0,
//       }}
//       transition={{
//         duration: 1,
//         ease: [0.16, 1, 0.3, 1],
//       }}
//       className="
//         relative
//         mx-auto
//         h-[560px]
//         w-full
//         max-w-[560px]
//         sm:h-[620px]
//         lg:h-[690px]
//         lg:max-w-[600px]
//       "
//     >
//       {/* =====================================================
//           AMBIENT TECH GLOW
//       ===================================================== */}

//       <motion.div
//         className="
//           pointer-events-none
//           absolute
//           right-[5%]
//           top-[15%]
//           h-[420px]
//           w-[420px]
//           rounded-full
//           bg-blue-500/[0.07]
//           blur-[120px]
//         "
//         animate={
//           reduceMotion
//             ? undefined
//             : {
//                 opacity: [0.45, 0.7, 0.45],
//                 scale: [0.96, 1.03, 0.96],
//               }
//         }
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />

//       {/* =====================================================
//           TECHNICAL GRID
//       ===================================================== */}

//       <motion.div
//         className="
//           pointer-events-none
//           absolute
//           right-[-4%]
//           top-[9%]
//           h-[500px]
//           w-[560px]
//           opacity-40
//         "
//         style={{
//           x: technicalX,
//           y: technicalY,
//         }}
//       >
//         <div
//           className="
//             h-full
//             w-full
//             bg-[linear-gradient(to_right,rgba(148,163,184,0.09)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.09)_1px,transparent_1px)]
//             bg-[size:32px_32px]
//             [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_72%)]
//           "
//         />
//       </motion.div>

//       {/* =====================================================
//           HORIZONTAL DATA LINES
//       ===================================================== */}

//       <motion.div
//         className="
//           pointer-events-none
//           absolute
//           right-[4%]
//           top-[20%]
//           z-0
//           w-[64%]
//         "
//         style={{
//           x: technicalX,
//         }}
//       >
//         {Array.from({ length: 10 }).map((_, index) => (
//           <motion.div
//             key={index}
//             className="
//               mb-[12px]
//               h-px
//               origin-right
//               bg-gradient-to-l
//               from-blue-400/35
//               via-blue-300/15
//               to-transparent
//             "
//             initial={{
//               scaleX: 0,
//               opacity: 0,
//             }}
//             animate={{
//               scaleX: 1,
//               opacity: 1,
//             }}
//             transition={{
//               delay: 0.4 + index * 0.05,
//               duration: 0.7,
//               ease: [0.16, 1, 0.3, 1],
//             }}
//             style={{
//               width: `${100 - index * 6}%`,
//             }}
//           />
//         ))}
//       </motion.div>

//       {/* =====================================================
//           SMALL TECH NODES
//       ===================================================== */}

//       <motion.div
//         className="
//           absolute
//           right-[15%]
//           top-[18%]
//           z-20
//           h-1.5
//           w-1.5
//           rounded-full
//           bg-blue-400
//           shadow-[0_0_15px_rgba(96,165,250,0.9)]
//         "
//         animate={
//           reduceMotion
//             ? undefined
//             : {
//                 opacity: [0.3, 1, 0.3],
//               }
//         }
//         transition={{
//           duration: 2.8,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />

//       <motion.div
//         className="
//           absolute
//           right-[8%]
//           top-[48%]
//           z-20
//           h-1
//           w-1
//           rounded-full
//           bg-cyan-400
//           shadow-[0_0_12px_rgba(34,211,238,0.8)]
//         "
//         animate={
//           reduceMotion
//             ? undefined
//             : {
//                 opacity: [0.2, 0.9, 0.2],
//               }
//         }
//         transition={{
//           duration: 3.5,
//           repeat: Infinity,
//           delay: 1,
//           ease: "easeInOut",
//         }}
//       />

//       {/* =====================================================
//           PORTRAIT
//       ===================================================== */}

//       <motion.div
//         className="
//           absolute
//           bottom-0
//           right-[1%]
//           z-10
//           h-[565px]
//           w-[430px]
//           sm:h-[620px]
//           sm:w-[490px]
//           lg:h-[690px]
//           lg:w-[550px]
//         "
//         style={{
//           x: portraitX,
//           y: portraitY,
//         }}
//         initial={
//           reduceMotion
//             ? false
//             : {
//                 opacity: 0,
//                 y: 30,
//                 scale: 0.97,
//               }
//         }
//         animate={{
//           opacity: 1,
//           y: 0,
//           scale: 1,
//         }}
//         transition={{
//           delay: 0.12,
//           duration: 1.1,
//           ease: [0.16, 1, 0.3, 1],
//         }}
//       >
//         {/* subtle portrait glow */}

//         <div
//           className="
//             pointer-events-none
//             absolute
//             bottom-[8%]
//             left-[20%]
//             h-[65%]
//             w-[60%]
//             rounded-full
//             bg-blue-500/[0.07]
//             blur-[90px]
//           "
//         />

//         <div className="relative h-full w-full">
//           <Image
//             src="/images/profiles.png"
//             alt="Oladunjoye Abduljeleel"
//             fill
//             priority
//             sizes="
//               (max-width: 640px) 90vw,
//               (max-width: 1024px) 500px,
//               550px
//             "
//             className="
//               object-contain
//               object-bottom
//             "
//           />

//           {/* bottom fade */}

//           <div
//             className="
//               pointer-events-none
//               absolute
//               inset-x-0
//               bottom-0
//               h-[18%]
//               bg-gradient-to-t
//               from-background
//               via-background/50
//               to-transparent
//             "
//           />
//         </div>
//       </motion.div>

//       {/* =====================================================
//           PROFILE STATUS
//       ===================================================== */}

//       <motion.div
//         initial={{
//           opacity: 0,
//           scale: 0.8,
//         }}
//         animate={{
//           opacity: 1,
//           scale: 1,
//         }}
//         transition={{
//           delay: 0.8,
//           duration: 0.6,
//           ease: [0.16, 1, 0.3, 1],
//         }}
//         className="
//           absolute
//           right-[1%]
//           top-[44%]
//           z-40
//         "
//       >
//         <div
//           className="
//             relative
//             h-[64px]
//             w-[64px]
//             overflow-hidden
//             rounded-full
//             border
//             border-white/20
//             bg-background/80
//             p-[2px]
//             shadow-[0_15px_45px_rgba(0,0,0,0.3)]
//             backdrop-blur-xl
//           "
//         >
//           <Image
//             src="/images/mini-avatar.png"
//             alt="Oladunjoye Abduljeleel"
//             fill
//             sizes="64px"
//             className="rounded-full object-cover"
//           />
//         </div>

//         <motion.span
//           className="
//             absolute
//             bottom-1
//             right-1
//             h-3
//             w-3
//             rounded-full
//             border-2
//             border-background
//             bg-green-500
//           "
//           animate={
//             reduceMotion
//               ? undefined
//               : {
//                   boxShadow: [
//                     "0 0 0 0 rgba(34,197,94,0)",
//                     "0 0 0 5px rgba(34,197,94,0.12)",
//                     "0 0 0 0 rgba(34,197,94,0)",
//                   ],
//                 }
//           }
//           transition={{
//             duration: 2.4,
//             repeat: Infinity,
//           }}
//         />
//       </motion.div>

//       {/* =====================================================
//           PLUS BUTTON
//       ===================================================== */}

//       <motion.button
//         type="button"
//         aria-label="View profile"
//         initial={{
//           opacity: 0,
//           scale: 0.7,
//         }}
//         animate={{
//           opacity: 1,
//           scale: 1,
//         }}
//         transition={{
//           delay: 1,
//           duration: 0.5,
//         }}
//         whileHover={{
//           scale: 1.1,
//         }}
//         whileTap={{
//           scale: 0.92,
//         }}
//         className="
//           absolute
//           right-[-1px]
//           top-[calc(44%+48px)]
//           z-50
//           flex
//           h-7
//           w-7
//           items-center
//           justify-center
//           rounded-full
//           bg-blue-500
//           text-white
//           shadow-[0_8px_30px_rgba(59,130,246,0.4)]
//         "
//       >
//         <Plus className="h-4 w-4" />
//       </motion.button>

//       {/* =====================================================
//           SOCIAL PROOF
//       ===================================================== */}

//       <motion.div
//         initial={{
//           opacity: 0,
//           y: 10,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//         transition={{
//           delay: 1.05,
//           duration: 0.5,
//         }}
//         className="
//           absolute
//           bottom-[7%]
//           right-[0]
//           z-40
//           flex
//           flex-col
//           items-center
//         "
//       >
//         <motion.button
//           type="button"
//           aria-label={
//             liked
//               ? "Unlike portfolio"
//               : "Like portfolio"
//           }
//           onClick={() =>
//             setLiked((value) => !value)
//           }
//           whileHover={{
//             scale: 1.08,
//           }}
//           whileTap={{
//             scale: 0.9,
//           }}
//           className="
//             flex
//             h-12
//             w-12
//             items-center
//             justify-center
//             rounded-full
//             border
//             border-white/10
//             bg-white/[0.05]
//             shadow-xl
//             backdrop-blur-xl
//           "
//         >
//           <Heart
//             className={`h-5 w-5 transition-all ${
//               liked
//                 ? "fill-red-500 text-red-500"
//                 : "text-white"
//             }`}
//             strokeWidth={1.5}
//           />
//         </motion.button>

//         <span className="mt-2 text-xs font-medium text-muted-foreground">
//           {liked ? "4,021" : "4,020"}
//         </span>
//       </motion.div>

//       {/* =====================================================
//           ENGINEERING LABEL
//       ===================================================== */}

//       <motion.div
//         initial={{
//           opacity: 0,
//           x: -15,
//         }}
//         animate={{
//           opacity: 1,
//           x: 0,
//         }}
//         transition={{
//           delay: 1.15,
//           duration: 0.6,
//           ease: [0.16, 1, 0.3, 1],
//         }}
//         className="
//           absolute
//           bottom-[19%]
//           left-[2%]
//           z-40
//           hidden
//           items-center
//           gap-2
//           rounded-md
//           border
//           border-white/10
//           bg-background/60
//           px-3
//           py-2
//           font-mono
//           text-[10px]
//           tracking-wide
//           text-muted-foreground
//           backdrop-blur-xl
//           sm:flex
//         "
//       >
//         <span className="text-blue-400">
//           //
//         </span>

//         <span>
//           FULL_STACK_DEVELOPER
//         </span>

//         <motion.span
//           animate={
//             reduceMotion
//               ? undefined
//               : {
//                   opacity: [1, 0, 1],
//                 }
//           }
//           transition={{
//             duration: 1,
//             repeat: Infinity,
//           }}
//         >
//           _
//         </motion.span>
//       </motion.div>

//       {/* =====================================================
//           INDEX
//       ===================================================== */}

//       <span
//         className="
//           absolute
//           right-[8%]
//           top-[11%]
//           z-30
//           font-mono
//           text-[9px]
//           tracking-[0.3em]
//           text-muted-foreground/40
//         "
//       >
//         01 / 01
//       </span>
//     </motion.div>
//   );
// }



"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Heart, Plus } from "lucide-react";
import { useEffect, useState } from "react";

const portraits = [
  {
    src: "/images/WhatsApp_Image_2026-07-16_at_9.47.56_PM__1_-removebg-preview.png",
    alt: "Oladunjoye Abduljeleel",
  },
  {
    src: "/images/alifat.png",
    alt: "Oladunjoye Abduljeleel",
  },
];

export function HeroImage() {
  const reduceMotion = useReducedMotion();

  const [liked, setLiked] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  /*
   * ---------------------------------------------------------
   * IMAGE ROTATION
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (reduceMotion) return;

    const interval = window.setInterval(() => {
      setActiveImage((current) =>
        current === portraits.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => {
      window.clearInterval(interval);
    };
  }, [reduceMotion]);

  /*
   * ---------------------------------------------------------
   * POINTER PARALLAX
   * ---------------------------------------------------------
   */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 70,
    damping: 25,
    mass: 0.5,
  });

  const springY = useSpring(mouseY, {
    stiffness: 70,
    damping: 25,
    mass: 0.5,
  });

  const portraitX = useTransform(
    springX,
    [-1, 1],
    reduceMotion ? [0, 0] : [-8, 8]
  );

  const portraitY = useTransform(
    springY,
    [-1, 1],
    reduceMotion ? [0, 0] : [-5, 5]
  );

  const technicalX = useTransform(
    springX,
    [-1, 1],
    reduceMotion ? [0, 0] : [-16, 16]
  );

  const technicalY = useTransform(
    springY,
    [-1, 1],
    reduceMotion ? [0, 0] : [-8, 8]
  );

  /*
   * ---------------------------------------------------------
   * MOUSE TRACKING
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (reduceMotion) return;

    const handlePointerMove = (event: MouseEvent) => {
      mouseX.set((event.clientX / window.innerWidth) * 2 - 1);

      mouseY.set((event.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", handlePointerMove);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
    };
  }, [mouseX, mouseY, reduceMotion]);

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              x: 35,
            }
      }
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        relative
        h-full
        w-full
      "
    >
      {/* =====================================================
          AMBIENT TECH GLOW
      ===================================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute
          right-[5%]
          top-[15%]
          h-[420px]
          w-[420px]
          rounded-full
          bg-blue-500/[0.07]
          blur-[120px]
        "
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [0.45, 0.7, 0.45],
                scale: [0.96, 1.03, 0.96],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          TECHNICAL GRID
      ===================================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute
          right-[-4%]
          top-[9%]
          h-[500px]
          w-[560px]
          opacity-40
        "
        style={{
          x: technicalX,
          y: technicalY,
        }}
      >
        <div
          className="
            h-full
            w-full
            bg-[linear-gradient(to_right,rgba(148,163,184,0.09)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.09)_1px,transparent_1px)]
            bg-[size:32px_32px]
            [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_72%)]
          "
        />
      </motion.div>

      {/* =====================================================
          HORIZONTAL DATA LINES
      ===================================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute
          right-[4%]
          top-[20%]
          z-0
          w-[64%]
        "
        style={{
          x: technicalX,
        }}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <motion.div
            key={index}
            className="
              mb-[12px]
              h-px
              origin-right
              bg-gradient-to-l
              from-blue-400/35
              via-blue-300/15
              to-transparent
            "
            initial={{
              scaleX: 0,
              opacity: 0,
            }}
            animate={{
              scaleX: 1,
              opacity: 1,
            }}
            transition={{
              delay: 0.4 + index * 0.05,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              width: `${100 - index * 6}%`,
            }}
          />
        ))}
      </motion.div>

      {/* =====================================================
          TECH NODE 01
      ===================================================== */}

      <motion.div
        className="
          absolute
          right-[15%]
          top-[18%]
          z-20
          h-1.5
          w-1.5
          rounded-full
          bg-blue-400
          shadow-[0_0_15px_rgba(96,165,250,0.9)]
        "
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [0.3, 1, 0.3],
              }
        }
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          TECH NODE 02
      ===================================================== */}

      <motion.div
        className="
          absolute
          right-[8%]
          top-[48%]
          z-20
          h-1
          w-1
          rounded-full
          bg-cyan-400
          shadow-[0_0_12px_rgba(34,211,238,0.8)]
        "
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [0.2, 0.9, 0.2],
              }
        }
        transition={{
          duration: 3.5,
          repeat: Infinity,
          delay: 1,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          PORTRAIT STAGE
      ===================================================== */}

      <motion.div
        className="
          absolute
          bottom-0
          right-0
          z-10
          h-[100%]
          w-[92%]
          sm:w-[88%]
          lg:w-[96%]
        "
        style={{
          x: portraitX,
          y: portraitY,
        }}
      >
        {/* ===================================================
            PORTRAIT GLOW
        =================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-[8%]
            left-[20%]
            h-[65%]
            w-[60%]
            rounded-full
            bg-blue-500/[0.07]
            blur-[90px]
          "
        />

        {/* ===================================================
            IMAGE CROSSFADE
        =================================================== */}

        <div className="relative h-full w-full overflow-visible">
          {portraits.map((portrait, index) => {
            const isActive = index === activeImage;

            return (
              <motion.div
                key={portrait.src}
                className="absolute inset-0"
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1 : 1.025,
                }}
                transition={{
                  opacity: {
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                  },
                  scale: {
                    duration: 5,
                    ease: "easeOut",
                  },
                }}
              >
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 500px, 550px"
                  className="object-contain object-bottom"
                />

                {/* subtle cinematic gradient */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    bottom-0
                    h-[18%]
                    bg-gradient-to-t
                    from-background
                    via-background/50
                    to-transparent
                  "
                />
              </motion.div>
            );
          })}

          {/* =================================================
              LIGHT SCAN
          ================================================= */}

          {!reduceMotion && (
            <motion.div
              className="
                pointer-events-none
                absolute
                inset-y-0
                left-[-30%]
                z-20
                w-[18%]
                skew-x-[-18deg]
                bg-gradient-to-r
                from-transparent
                via-white/[0.07]
                to-transparent
              "
              animate={{
                left: ["-30%", "125%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut",
              }}
            />
          )}
        </div>
      </motion.div>

      {/* =====================================================
          IMAGE INDICATOR
      ===================================================== */}

      <div
        className="
          absolute
          bottom-[15%]
          right-[8%]
          z-30
          flex
          items-center
          gap-2
        "
      >
        {portraits.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Show portrait ${index + 1}`}
            onClick={() => setActiveImage(index)}
            className="
              h-1
              overflow-hidden
              rounded-full
              bg-white/20
              transition-all
              duration-500
            "
          >
            <motion.span
              className="block h-full bg-blue-400"
              animate={{
                width: index === activeImage ? "28px" : "0px",
              }}
              transition={{
                duration: 0.5,
              }}
            />
          </button>
        ))}
      </div>

      {/* =====================================================
          PROFILE STATUS
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          delay: 0.8,
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          absolute
          right-[1%]
          top-[44%]
          z-40
        "
      >
        <div
          className="
            relative
            h-[64px]
            w-[64px]
            overflow-hidden
            rounded-full
            border
            border-white/20
            bg-background/80
            p-[2px]
            shadow-[0_15px_45px_rgba(0,0,0,0.3)]
            backdrop-blur-xl
          "
        >
          <Image
            src="/images/WhatsApp_Image_2026-07-16_at_9.47.56_PM__1_-removebg-preview.png"
            alt="Oladunjoye Abduljeleel"
            fill
            sizes="64px"
            className="rounded-full object-cover"
          />
        </div>

        <motion.span
          className="
            absolute
            bottom-1
            right-1
            h-3
            w-3
            rounded-full
            border-2
            border-background
            bg-green-500
          "
          animate={
            reduceMotion
              ? undefined
              : {
                  boxShadow: [
                    "0 0 0 0 rgba(34,197,94,0)",
                    "0 0 0 5px rgba(34,197,94,0.12)",
                    "0 0 0 0 rgba(34,197,94,0)",
                  ],
                }
          }
          transition={{
            duration: 2.4,
            repeat: Infinity,
          }}
        />
      </motion.div>

      {/* =====================================================
          PLUS BUTTON
      ===================================================== */}

      <motion.button
        type="button"
        aria-label="View profile"
        initial={{
          opacity: 0,
          scale: 0.7,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          delay: 1,
          duration: 0.5,
        }}
        whileHover={{
          scale: 1.1,
        }}
        whileTap={{
          scale: 0.92,
        }}
        className="
          absolute
          right-[-1px]
          top-[calc(44%+48px)]
          z-50
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-full
          bg-blue-500
          text-white
          shadow-[0_8px_30px_rgba(59,130,246,0.4)]
        "
      >
        <Plus className="h-4 w-4" />
      </motion.button>

      {/* =====================================================
          SOCIAL PROOF
      ===================================================== */}

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
          delay: 1.05,
          duration: 0.5,
        }}
        className="
          absolute
          bottom-[7%]
          right-0
          z-40
          flex
          flex-col
          items-center
        "
      >
        <motion.button
          type="button"
          aria-label={
            liked ? "Unlike portfolio" : "Like portfolio"
          }
          onClick={() => setLiked((value) => !value)}
          whileHover={{
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.9,
          }}
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-white/[0.05]
            shadow-xl
            backdrop-blur-xl
          "
        >
          <Heart
            className={`h-5 w-5 transition-all ${
              liked
                ? "fill-red-500 text-red-500"
                : "text-white"
            }`}
            strokeWidth={1.5}
          />
        </motion.button>

        <span className="mt-2 text-xs font-medium text-muted-foreground">
          {liked ? "4,021" : "4,020"}
        </span>
      </motion.div>

      {/* =====================================================
          ENGINEERING LABEL
      ===================================================== */}

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
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          absolute
          bottom-[19%]
          left-[2%]
          z-40
          hidden
          items-center
          gap-2
          rounded-md
          border
          border-white/10
          bg-background/60
          px-3
          py-2
          font-mono
          text-[10px]
          tracking-wide
          text-muted-foreground
          backdrop-blur-xl
          sm:flex
        "
      >
        <span className="text-blue-400">
          //
        </span>

        <span>FULL_STACK_DEVELOPER</span>

        <motion.span
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [1, 0, 1],
                }
          }
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        >
          _
        </motion.span>
      </motion.div>

      {/* =====================================================
          INDEX
      ===================================================== */}

      <span
        className="
          absolute
          right-[8%]
          top-[11%]
          z-30
          font-mono
          text-[9px]
          tracking-[0.3em]
          text-muted-foreground/40
        "
      >
        01 / 02
      </span>
    </motion.div>
  );
}