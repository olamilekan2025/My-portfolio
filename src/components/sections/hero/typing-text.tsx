"use client";

import { TypeAnimation } from "react-type-animation";

export function TypingText() {
  return (
    <TypeAnimation
      sequence={[
        "Full Stack Developer",
        2000,
        "Next.js Expert",
        2000,
        "Tailwind Expert",
        2000,
        "TypeScript Expert",
        2000,
        "JaverScript Expert",
        2000,
        "UI Engineer",
        2000,
        "Backend Developer",
        2000,
      ]}
      wrapper="span"
      repeat={Infinity}
      className="text-xl font-semibold text-blue-500 lg:text-2xl"
    />
  );
}