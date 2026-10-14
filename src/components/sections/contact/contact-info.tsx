// "use client";

// import { motion } from "framer-motion";

// import { CONTACT_CARDS } from "./constants";
// import { ContactCard } from "./contact-card";
// import { ContactHeader } from "./contact-header";
// import { ContactSocials } from "./contact-socials";

// export function ContactInfo() {
//   return (
//     <motion.div
//       initial={false}
//       whileInView={{
//         opacity: 1,
//         x: 0,
//       }}
//       viewport={{ once: true }}
//       transition={{
//         duration: 0.6,
//       }}
//       className="space-y-8"
//     >
//       <ContactHeader />

//       {/* <div className="grid gap-5">
//         {CONTACT_CARDS.map((item) => (
//           <ContactCard
//             key={item.title}
//             item={item}
//           />
//         ))}
//       </div> */}

//       {/* <ContactSocials /> */}
//     </motion.div>
//   );
// }


"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, ScanLine } from "lucide-react";

import { ContactHeader } from "./contact-header";

export function ContactInfo() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -20,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.6,
      }}
      className="space-y-8"
    >
      <ContactHeader />

      {/* WhatsApp QR Code */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.6,
          delay: 0.15,
        }}
        className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur-xl"
      >
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-green-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center justify-center">
          {/* QR Code */}
          <div className="shrink-0">
            <div className="relative overflow-hidden rounded-2xl border border-border p-3 shadow-lg">
              <Image
                src="/qr.png"
                alt="Scan QR code to contact me on WhatsApp"
                width={180}
                height={180}
                className="h-40 w-40 object-contain sm:h-44 sm:w-54"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-600 dark:text-green-400">
              <MessageCircle className="h-5 w-5" />
            </div>

            <div>
              <h3 className="text-xl font-semibold tracking-tight">
                Let's talk on WhatsApp
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                Scan the QR code with your phone to start a conversation with
                me directly on WhatsApp.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <ScanLine className="h-4 w-4" />
              <span>Scan to connect</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

