import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";

import { HeroContent } from "./hero-content";
import { HeroImage } from "./hero-image";
import { HeroActions } from "./hero-actions";
import { HeroScrollIndicator } from "./hero-scroll-indicator";

export function HeroSection() {
  return (
    <Section
      id="home"
      className="
        relative
        min-h-screen
        overflow-hidden
        pt-20
        pb-0
        sm:pt-24
        lg:pt-20
        
      "
    >
      <Container>
        <div
          className="
            relative
            grid
            min-h-[calc(100vh-5rem)]
            grid-cols-1
            items-center
            lg:grid-cols-[minmax(0,1fr)_minmax(520px,0.95fr)]
            lg:gap-0
           
          "
        >
          {/* =================================================
              LEFT — HERO CONTENT
          ================================================= */}

          <div
            className="
              relative
              z-30
              order-2
              flex
              min-w-0
              flex-col
              justify-center
              pb-12
              lg:order-1
              lg:min-h-[690px]
              lg:pb-0
            "
          >
            <div className="max-w-3xl px-2 sm:px-0">
              <HeroContent />

              <div className="mt-8">
                <HeroActions />
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT — PORTRAIT
          ================================================= */}

          <div
            className="
              relative
              z-10
              order-1
              flex
              h-[400px]
              sm:h-[560px]
              w-full
              items-end
              justify-center
              lg:order-2
              lg:h-[690px]
              lg:justify-end
            "
          >
            <div
              className="
                relative
                h-full
                w-full
                max-w-[620px]
                px-4 sm:px-0
              "
            >
              <HeroImage />
            </div>
          </div>
        </div>
      </Container>

      <HeroScrollIndicator />
    </Section>
  );
}