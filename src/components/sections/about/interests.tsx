"use client";

const interests = [
  "Open Source",
  "Artificial Intelligence",
  "UI Design",
  "Cloud Computing",
  "Reading",
  "Travel",
  "Photography",
  "Gaming",
];

export function Interests() {
  return (
    <div className="flex flex-wrap gap-3">
      {interests.map((interest) => (
        <span
          key={interest}
          className="rounded-full border border-border bg-card px-5 py-2 text-sm transition-all hover:border-blue-500 hover:text-blue-500"
        >
          {interest}
        </span>
      ))}
    </div>
  );
}