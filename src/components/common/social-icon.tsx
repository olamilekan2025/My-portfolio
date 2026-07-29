import Link from "next/link";
import { cn } from "@/lib/utils";

interface SocialIconProps {
  href: string;
  icon: React.ReactNode;
  className?: string;
}

export function SocialIcon({
  href,
  icon,
  className,
}: SocialIconProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card transition-all duration-300 hover:scale-110 hover:border-primary hover:text-primary",
        className
      )}
      aria-label="Social link"
    >
      {icon}
    </Link>
  );
}