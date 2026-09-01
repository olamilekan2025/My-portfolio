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
     * Prevent duplicate tracking for the same page
     * during the current browser session.
     */
    if (sessionStorage.getItem(storageKey)) {
      return;
    }

    const sendVisit = async () => {
      try {
        const response = await fetch(
          "/api/analytics/visit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            keepalive: true,
            body: JSON.stringify({
              path: pathname,
              pageTitle: document.title,
              referrer:
                document.referrer || undefined,
            }),
          }
        );

        /*
         * IMPORTANT:
         * Only mark the page as tracked after the
         * analytics request succeeds.
         *
         * This makes persistence more reliable.
         */
        if (response.ok) {
          sessionStorage.setItem(
            storageKey,
            "true"
          );
        }
      } catch {
        /*
         * Analytics must never affect
         * the portfolio experience.
         */
      }
    };

    void sendVisit();
  }, [pathname]);

  return null;
}