"use client";

import { usePathname } from "next/navigation";

import { Navbar } from "@/components/navigation/navbar";
import { ScrollProgress } from "@/components/common/scroll-progress";
import { ScrollToTop } from "@/components/common/scroll-to-top";

export function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && (
        <>
          <ScrollProgress />
          <Navbar />
        </>
      )}

      <main>{children}</main>

      {!isAdmin && <ScrollToTop />}
    </>
  );
}