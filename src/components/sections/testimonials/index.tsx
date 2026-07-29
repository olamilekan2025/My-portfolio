import { Section } from "@/components/common/section";
import { SectionTitle } from "@/components/common/section-title";

export function TestimonialsSection() {
  return (
    <Section id="testimonials">
      <SectionTitle
        badge="Testimonials"
        title="Client"
        highlight="Feedback"
        description="What clients and collaborators have to say about working with me."
      />

      {/* Testimonials Carousel */}
    </Section>
  );
}