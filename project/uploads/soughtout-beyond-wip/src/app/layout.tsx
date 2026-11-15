import type { Metadata } from "next";
// Fonts are self hosted, so the site never depends on an outside font server.
import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-500.css";
import "@fontsource/ibm-plex-sans/latin-600.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-500.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AI_DISCLOSURE, SiteFooter } from "@/components/layout/SiteFooter";
import { ScrollProgress } from "@/components/fx/ScrollProgress";
import { ScoutGuide } from "@/components/fx/ScoutGuide";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SoughtOut Beyond",
    template: "%s · SoughtOut Beyond",
  },
  description:
    "Stories of the machines left on the Moon, Mars and in deep space, told in their own words for students and curious readers.",
  // AI-use disclosure in the page metadata, as the Space Apps rules require.
  other: { "ai-disclosure": AI_DISCLOSURE },
};

// Re-applies the saved reading settings before first paint, so larger text
// and high contrast don't flash off on reload.
const a11yScript = `try{var a=JSON.parse(localStorage.getItem("soughtout.a11y"))||{};var r=document.documentElement.style;if(a.big)r.zoom="1.2";if(a.hc)r.filter="contrast(1.4)"}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <script dangerouslySetInnerHTML={{ __html: a11yScript }} />
      </head>
      <body className="min-h-screen bg-paper text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <ScoutGuide />
      </body>
    </html>
  );
}
