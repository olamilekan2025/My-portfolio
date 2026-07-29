"use client";

import { ABOUT_INFO } from "../about/constants";
import { AboutInfoCard } from "./about-info-card";
import { AboutActions } from "./about-actions";

export function AboutInfoGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {ABOUT_INFO.map((item) => (
        <AboutInfoCard
          key={item.title}
          icon={item.icon}
          title={item.title}
          value={item.value}
        />
      ))}
       <AboutActions />
    </div>
  );
}