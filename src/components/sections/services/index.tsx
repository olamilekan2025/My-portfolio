import { Section } from "@/components/common/section";
import { SectionTitle } from "@/components/common/section-title";

export function ServicesSection() {
  return (
    <Section id="services">
      <SectionTitle
        badge="Services"
        title="What"
        highlight="I Offer"
        description="From full-stack development to API design and cloud deployment, I provide end-to-end solutions for modern web applications."
      />

      {/* Services Cards */}
    </Section>
  );
}