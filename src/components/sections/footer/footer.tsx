"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/common/container";
import {
  FooterBrand,
  FooterNav,
  FooterSocials,
  FooterBottom,
} from ".";

export function Footer() {
  return (
    <footer
      className="relative border-t border-border/50 bg-background"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="py-12"
        >
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_auto] lg:items-start px-5 md:px-7">
            <FooterBrand />

            <FooterNav />

            <FooterSocials />
          </div>

          <div className="mt-10 px-5 md:px-7">
            <FooterBottom />
          </div>
        </motion.div>
      </Container>
    </footer>
  );
}