"use client";

import { Section } from "@/components/common/section";
import { Container } from "@/components/common/container";

import { ContactInfo } from "./contact-info";
import { ContactForm } from "./contact-form";

export function ContactSection() {
  return (
    <Section id="contact">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          <ContactInfo />

          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}