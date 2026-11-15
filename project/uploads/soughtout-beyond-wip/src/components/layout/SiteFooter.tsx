export const AI_DISCLOSURE =
  "Background pictures and Scout were made with Higgsfield, an AI image generator, and are marked as AI on the page. The site’s code was written with help from Claude, an AI assistant, and the story text was drafted with AI help, then checked against NASA, JPL and NSSDCA pages.";

export function SiteFooter() {
  return (
    <footer
      id="sources"
      className="flex flex-col gap-4 px-[clamp(20px,4vw,56px)] pt-7 pb-10 font-mono text-[13px] text-ink-2"
    >
      <div className="flex flex-wrap justify-between gap-6">
        <span>Every fact comes from a NASA, JPL or NSSDCA page, listed at the end of each story.</span>
        <span className="text-muted">Photos: NASA, public domain</span>
      </div>
      <p id="ai-use" className="m-0 max-w-[900px] border-t border-ink/20 pt-4 text-xs leading-relaxed text-muted">
        <span className="text-ink">How we used AI:</span> {AI_DISCLOSURE}
      </p>
    </footer>
  );
}
