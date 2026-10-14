// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";
// import {
//   Mail,
//   ArrowUpRight,
// } from "lucide-react";
// import { FaGithub } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
// import { FiLinkedin } from "react-icons/fi";

// const socials = [
//   {
//     name: "GitHub",
//     href: "https://github.com/yourusername",
//     icon: FaGithub,
//   },
//   {
//     name: "LinkedIn",
//     href: "https://linkedin.com/in/yourusername",
//     icon: FiLinkedin,
//   },
//   {
//     name: "X",
//     href: "https://x.com/yourusername",
//     icon: FaXTwitter ,
//   },
//   {
//     name: "Email",
//     href: "mailto:your@email.com",
//     icon: Mail,
//   },
// ];

// export function FooterSocials() {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 16 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{
//         duration: 0.5,
//         delay: 0.3,
//         ease: [0.22, 1, 0.36, 1],
//       }}
//       className="lg:justify-self-end"
//     >
//       <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
//         Connect
//       </h3>

//       <div className="flex items-center gap-3">
//         {socials.map(({ name, href, icon: Icon }) => (
//           <Link
//             key={name}
//             href={href}
//             target={href.startsWith("http") ? "_blank" : undefined}
//             rel={
//               href.startsWith("http")
//                 ? "noopener noreferrer"
//                 : undefined
//             }
//             aria-label={name}
//             className="group"
//           >
//             <motion.div
//               whileHover={{
//                 y: -4,
//                 scale: 1.05,
//               }}
//               whileTap={{
//                 scale: 0.96,
//               }}
//               transition={{
//                 duration: 0.2,
//               }}
//               className="
//                 flex
//                 h-11
//                 w-11
//                 items-center
//                 justify-center
//                 rounded-full
//                 border
//                 border-border/60
//                 bg-background/60
//                 backdrop-blur-md
//                 transition-all
//                 duration-300
//                 hover:border-primary/40
//                 hover:bg-primary/5
//                 focus-visible:ring-2
//                 focus-visible:ring-primary
//                 focus-visible:ring-offset-2
//               "
//             >
//               <Icon
//                 className="
//                   h-5
//                   w-5
//                   text-muted-foreground
//                   transition-all
//                   duration-300
//                   group-hover:text-primary
//                 "
//               />

//               <ArrowUpRight
//                 className="
//                   absolute
//                   right-2
//                   top-2
//                   h-3
//                   w-3
//                   opacity-0
//                   transition-all
//                   duration-300
//                   group-hover:opacity-100
//                   group-hover:translate-x-0.5
//                   group-hover:-translate-y-0.5
//                 "
//               />
//             </motion.div>
//           </Link>
//         ))}
//       </div>
//     </motion.div>
//   );
// }


"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiLinkedin } from "react-icons/fi";

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/olamilekan2025",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/abduljelil-oladunjoye-olamilekan-1199a0438",
    icon: FiLinkedin,
  },
  {
    name: "X",
    href: "https://x.com/Olafrofh",
    icon: FaXTwitter,
  },
];

const contacts = [
  {
    label: "Email",
    value: "abduljeliloladunjoye0@gmail.com",
    href: "abduljeliloladunjoye0@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "+234 7074 052 461",
    href: "tel:+2347074052461",
    icon: Phone,
  },
];

export function FooterSocials() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="lg:justify-self-end"
    >
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Connect
      </h3>

      {/* Contact Information */}
      <div className="mb-6 space-y-3">
        {contacts.map(({ label, value, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <Icon className="h-4 w-4" />
            <span>{value}</span>
          </Link>
        ))}
      </div>

      {/* Social Icons */}
      <div className="flex items-center gap-3">
        {socials.map(({ name, href, icon: Icon }) => (
          <Link
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="group"
          >
            <motion.div
              whileHover={{
                y: -4,
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.96,
              }}
              transition={{
                duration: 0.2,
              }}
              className="
                relative
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-border/60
                bg-background/60
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-primary/40
                hover:bg-primary/5
              "
            >
              <Icon
                className="
                  h-5
                  w-5
                  text-muted-foreground
                  transition-colors
                  duration-300
                  group-hover:text-primary
                "
              />

              <ArrowUpRight
                className="
                  absolute
                  right-2
                  top-2
                  h-3
                  w-3
                  opacity-0
                  transition-all
                  duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                  group-hover:opacity-100
                "
              />
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}