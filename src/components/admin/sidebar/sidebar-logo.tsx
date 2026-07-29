import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function SidebarLogo() {
  return (
    <Link
      href="/admin/dashboard"
      className="flex items-center gap-3"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-violet-600 to-cyan-500 text-white shadow-lg">
        <ShieldCheck className="h-6 w-6" />
      </div>

      <div>
        <h2 className="font-bold tracking-tight">
          Portfolio CMS
        </h2>

        <p className="text-xs text-muted-foreground">
          Administration
        </p>
      </div>
    </Link>
  );
}