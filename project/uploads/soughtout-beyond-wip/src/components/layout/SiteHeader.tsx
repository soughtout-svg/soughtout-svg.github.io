"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/nav";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-space-950/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl leading-none">SoughtOut</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-moon-400 transition-colors group-hover:text-signal">
            Beyond
          </span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                      active ? "text-signal" : "text-silver-200 hover:text-silver-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          className="font-mono text-xs uppercase tracking-[0.18em] text-silver-200 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-white/5 md:hidden">
          <ul className="flex flex-col px-4 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-mono text-sm uppercase tracking-[0.18em] text-silver-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
