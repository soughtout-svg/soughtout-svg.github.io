/** CSS rendered planet spheres. No images, so they always load instantly. */
const FILLS = {
  earth: "radial-gradient(circle at 32% 30%, #b9d6ff 0%, #4f86f7 32%, #1b3a7a 62%, #070b1c 100%)",
  moon: "radial-gradient(circle at 32% 30%, #f4f6fb 0%, #b4bacb 30%, #5d6478 62%, #12152a 100%)",
  mars: "radial-gradient(circle at 32% 30%, #ffd0b0 0%, #ff8a52 28%, #b8431a 58%, #2a0c04 100%)",
};

export function Planet({
  kind,
  size,
  className = "",
}: {
  kind: keyof typeof FILLS;
  size: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: FILLS[kind],
        boxShadow:
          kind === "mars"
            ? "0 0 60px rgba(232,98,44,0.25), inset -8px -8px 30px rgba(0,0,0,0.5)"
            : kind === "earth"
              ? "0 0 60px rgba(79,134,247,0.3), inset -8px -8px 30px rgba(0,0,0,0.5)"
              : "0 0 50px rgba(201,207,221,0.18), inset -8px -8px 30px rgba(0,0,0,0.5)",
      }}
    />
  );
}
