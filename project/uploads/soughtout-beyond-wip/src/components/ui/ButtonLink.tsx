import Link from "next/link";
import type { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
}

export function ButtonLink({ href, children, variant = "primary" }: Props) {
  const base =
    "inline-flex items-center gap-3 rounded-full px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-all";
  const styles =
    variant === "primary"
      ? "bg-signal text-space-950 hover:shadow-[0_0_30px_rgba(230,255,74,0.35)]"
      : "border border-white/15 text-silver-50 hover:border-white/40 hover:bg-white/5";
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}
