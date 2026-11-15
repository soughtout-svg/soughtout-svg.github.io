import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-space-950/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-silver-400 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          Created by <span className="text-silver-200">Soughtout C. Joseph</span> for the NASA Space Apps
          Challenge 2026.
        </p>
        <p className="font-mono text-xs">
          Facts and imagery from NASA, JPL and NSSDCA.{" "}
          <Link href="/about#sources" className="underline underline-offset-4 hover:text-silver-50">
            All sources
          </Link>
        </p>
      </div>
    </footer>
  );
}
