"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer: any[];
  }
}

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];

    // Define gtag function
    window.gtag = function gtag(command: string, targetId: string, config?: Record<string, unknown>) {
      window.dataLayer.push([command, targetId, config]);
    };

    // Call gtag after script loads
    const handleLoad = () => {
      window.gtag("js", String(new Date()));
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: window.location.pathname,
      });
    };

    // If script is already loaded, call immediately
    if (document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) {
      handleLoad();
    }

    // Listen for script load
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, [GA_MEASUREMENT_ID]);

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      strategy="afterInteractive"
      onLoad={() => {
        window.gtag("js", String(new Date()));
        window.gtag("config", GA_MEASUREMENT_ID, {
          page_path: window.location.pathname,
        });
      }}
    />
  );
}