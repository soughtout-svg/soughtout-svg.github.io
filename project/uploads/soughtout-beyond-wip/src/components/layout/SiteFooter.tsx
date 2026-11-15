export function SiteFooter() {
  return (
    <footer
      id="sources"
      className="flex flex-wrap justify-between gap-6 px-[clamp(20px,4vw,56px)] pt-7 pb-10 font-mono text-[13px] text-ink-2"
    >
      <span>Every fact comes from a NASA, JPL or NSSDCA page, listed at the end of each story.</span>
      <span className="text-muted">Images: NASA, public domain</span>
    </footer>
  );
}
