"use client";

import { Section } from "@/components/common/section";
import { Container } from "@/components/common/container";
import { SectionTitle } from "@/components/common/section-title";

import { ContactInfo } from "./contact-info";
import { ContactForm } from "./contact-form";

export function ContactSection() {
  return (
    <Section id="contact">
      <Container>
        <SectionTitle
          badge="Contact"
          title="Let's"
          highlight="Connect"
          description="Have a project in mind, a freelance opportunity, or a full-time role? I'd love to hear from you. Send me a message and I'll get back to you within 24 hours."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-start ">
          <ContactInfo />

          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}