"use client";

interface CategoryPillProps {
  active: boolean;
  label: string;
  onClick: () => void;
}

export function CategoryPill({
  active,
  label,
  onClick,
}: CategoryPillProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-5 py-2 transition-all ${
        active
          ? "bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 text-white"
          : "border border-border bg-card hover:border-blue-500"
      }`}
    >
      {label}
    </button>
  );
}