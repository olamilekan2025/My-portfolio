import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";

import { AnimatedBackground } from "./animated-background";
import { HeroContent } from "./hero-content";
// import { HeroImage } from "./hero-image";
import { HeroActions } from "./hero-actions";
import { HeroSocials } from "./hero-socials";
import { HeroStats } from "./hero-stats";
import { FloatingTech } from "./floating-tech";
import { HeroScrollIndicator } from "./hero-scroll-indicator";

export function HeroSection() {
  return (
    <Section
      id="home"
      className="relative overflow-hidden pt-20 h-screen    "
    >
      <AnimatedBackground />

      <Container>
        <div className="  gap-26 grid-cols-2">
          <div className="relative">
            {/* <FloatingTech /> */}
            {/* <HeroImage /> */}
          </div>
          <div className="space-y-10">
            <HeroContent />
            <HeroActions />
            <HeroSocials />
            {/* <HeroStats /> */}
          </div>

          
        </div>
      </Container>

      <HeroScrollIndicator />
    </Section>
  );
}