import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Starfield } from "@/components/space/Starfield";
import "./globals.css";

// Fonts are self hosted, so the site never depends on an outside font server.
const instrument = localFont({
  variable: "--font-instrument",
  src: [
    { path: "../fonts/instrument-serif-latin-400-normal.woff2", style: "normal", weight: "400" },
    { path: "../fonts/instrument-serif-latin-400-italic.woff2", style: "italic", weight: "400" },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "SoughtOut Beyond",
    template: "%s · SoughtOut Beyond",
  },
  description:
    "Rediscovering the machines humanity left behind. Interactive stories of NASA hardware resting on the Moon and Mars.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col font-sans">
        <Starfield />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-signal focus:px-4 focus:py-2 focus:text-space-950"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="relative z-10 flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
