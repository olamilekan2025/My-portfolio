import {
  Briefcase,
  Calendar,
  Globe,
  MapPin,
  Rocket,
} from "lucide-react";

export const EXPERIENCE = 2;

export const ABOUT = {
  name: " Oladunjoye Abduljeleel Olamilekan ",

  location: "Lagos, Nigeria",

  profession: "Full Stack Web Developer",

  specialization: "Modern Web Applications",

  availability:
    "Available for Freelance & Full-Time Opportunities",
};

export const ABOUT_INFO = [
  {
    icon: MapPin,
    title: "Location",
    value: ABOUT.location,
  },
  {
    icon: Briefcase,
    title: "Profession",
    value: ABOUT.profession,
  },
  {
    icon: Calendar,
    title: "Experience",
    value: `${EXPERIENCE}+ Years`,
  },
  {
    icon: Rocket,
    title: "Specialization",
    value: ABOUT.specialization,
  },
  {
    icon: Globe,
    title: "Availability",
    value: ABOUT.availability,
  },
];

export const BIOGRAPHY = `
I'm a Full Stack Web Developer based in Lagos, Nigeria, passionate about creating modern, scalable, and high-performance web applications.

I enjoy transforming ideas into exceptional digital experiences through clean architecture, maintainable code, and intuitive user interfaces.

My focus is on building responsive applications that are visually appealing, fast, secure, and optimized for performance across all devices.

I enjoy solving real-world problems with technology while continuously learning new tools and industry best practices to improve my craft.

With ${EXPERIENCE}+ years of experience, I pride myself on professionalism, reliability, attention to detail, and delivering high-quality work on schedule.

Whether you're building a startup, business platform, or personal brand, I'm committed to delivering solutions that exceed expectations and create lasting value.
`;