import { cn } from "@/lib/utils";

interface BadgePillProps {
  children: React.ReactNode;
  className?: string;
}

export function BadgePill({
  children,
  className,
}: BadgePillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1 text-sm font-medium text-blue-500 backdrop-blur-xl",
        className
      )}
    >
      {children}
    </span>
  );
}