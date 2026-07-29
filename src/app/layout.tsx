import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { Toaster } from "sonner";
import Providers from "../components/providers/providers";
import GoogleAnalytics from "@/components/analytics/google-analytics";
import { VerificationProvider } from "@/components/admin";
import { LayoutContent } from "@/components/layout/layout-content";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://oladunjoye-abduljeleel-k1bj.vercel.app"), // Replace after deployment

  title: {
    default: "Olamilekan | Full Stack Developer",
    template: "%s | Olamilekan",
  },

  description:
    "Premium Full Stack Developer Portfolio built with Next.js, TypeScript, Tailwind CSS, MongoDB, and Framer Motion.",

  keywords: [
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "MongoDB",
    "Tailwind CSS",
    "Portfolio",
    "Web Developer",
  ],

  authors: [{ name: "Olamilekan" }],

  creator: "Olamilekan",

  openGraph: {
    title: "Olamilekan | Full Stack Developer",
    description:
      "Premium Full Stack Developer Portfolio built with Next.js.",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Olamilekan | Full Stack Developer",
    description:
      "Premium Full Stack Developer Portfolio built with Next.js.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
     <body>
  <Providers>
     <GoogleAnalytics />
    <VerificationProvider>
      <LayoutContent>
        {children}
      </LayoutContent>

      <Toaster
        richColors
        position="top-right"
      />
    </VerificationProvider>
  </Providers>
</body>
    </html>
  );
}