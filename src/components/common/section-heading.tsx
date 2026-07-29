import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({
  children,
  className,
}: SectionHeadingProps) {
  return (
    <h3
      className={cn(
        "text-2xl font-bold tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
}