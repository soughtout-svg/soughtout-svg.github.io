"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Hides the site header, footer and guide on the full-screen slide deck. */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/deck")) return null;
  return <>{children}</>;
}
