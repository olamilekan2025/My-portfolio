import { HeroSection } from "../components/sections/hero";
import { AboutSection } from "../components/sections/about";
import { SkillsSection } from "../components/sections/skills";
import { ExperienceSection } from "../components/sections/experience";
import { ServicesSection } from "../components/sections/services";
import { ProjectsSection } from "../components/sections/projects";
import { TestimonialsSection } from "../components/sections/testimonials";
import { ContactSection } from "../components/sections/contact";

import { Footer } from "@/components/sections/footer";

export default function HomePage() {
  return (
    <main className=" ">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      {/* <ExperienceSection /> */}
      {/* <ServicesSection /> */}
      <ProjectsSection />
      {/* <TestimonialsSection /> */}
      <ContactSection />
      <Footer/>
    </main>
  );
}