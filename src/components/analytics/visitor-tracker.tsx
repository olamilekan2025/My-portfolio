"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SESSION_PAGE_KEY = "portfolio_analytics_tracked";

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    const storageKey = `${SESSION_PAGE_KEY}:${pathname}`;

    /*
     * Prevent duplicate tracking caused by:
     * - React development Strict Mode
     * - component remounts
     * - accidental duplicate effects
     */
    if (sessionStorage.getItem(storageKey)) {
      return;
    }

    sessionStorage.setItem(storageKey, "true");

    const sendVisit = async () => {
      try {
        await fetch("/api/analytics/visit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          keepalive: true,
          body: JSON.stringify({
            path: pathname,
            pageTitle: document.title,
            referrer: document.referrer || undefined,
          }),
        });
      } catch {
        // Analytics must never affect the visitor experience.
      }
    };

    void sendVisit();
  }, [pathname]);

  return null;
}