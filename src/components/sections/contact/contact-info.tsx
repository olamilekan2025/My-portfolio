"use client";

import { motion } from "framer-motion";

import { CONTACT_CARDS } from "./constants";
import { ContactCard } from "./contact-card";
import { ContactHeader } from "./contact-header";
import { ContactSocials } from "./contact-socials";

export function ContactInfo() {
  return (
    <motion.div
      initial={false}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
      }}
      className="space-y-8"
    >
      <ContactHeader />

      {/* <div className="grid gap-5">
        {CONTACT_CARDS.map((item) => (
          <ContactCard
            key={item.title}
            item={item}
          />
        ))}
      </div> */}

      {/* <ContactSocials /> */}
    </motion.div>
  );
}