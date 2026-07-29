import {
  Mail,
  MapPin,
  Briefcase,
  Clock3,
  Globe,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FiLinkedin } from "react-icons/fi";
import { FiFacebook } from "react-icons/fi";
import { RiInstagramLine } from "react-icons/ri";

import type {
  ContactCard,
  SocialLink,
} from "./types";

export const CONTACT_CARDS: ContactCard[] = [
  {
    title: "Email",
    value: "youremail@gmail.com",
    icon: Mail,
  },
  {
    title: "Location",
    value: "Lagos, Nigeria",
    icon: MapPin,
  },
  {
    title: "Profession",
    value: "Full Stack Web Developer",
    icon: Briefcase,
  },
  {
    title: "Availability",
    value: "Freelance • Contract • Full-Time",
    icon: Globe,
  },
  {
    title: "Response Time",
    value: "Within 24 Hours",
    icon: Clock3,
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/yourusername",
    icon: FaGithub as any,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
    icon: FiLinkedin as any,
  },
  {
    name: "Facebook",
    href: "https://facebook.com/yourusername",
    icon: FiFacebook as any,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/yourusername",
    icon: RiInstagramLine as any,
  },
];