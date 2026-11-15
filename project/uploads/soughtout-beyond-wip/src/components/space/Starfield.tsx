/**
 * Fixed, decorative star background rendered behind every page.
 * Pure CSS radial gradients, no canvas, so it costs nothing at runtime.
 * Stars come from a seeded function so the server and browser render the same sky.
 */
function seeded(n: number) {
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function layer(count: number, seed: number, size: number, alpha: number) {
  return Array.from({ length: count }, (_, i) => {
    const x = (seeded(seed + i * 2) * 100).toFixed(2);
    const y = (seeded(seed + i * 2 + 1) * 100).toFixed(2);
    return `radial-gradient(${size}px ${size}px at ${x}% ${y}%, rgba(244,246,251,${alpha}), transparent)`;
  }).join(",");
}

const FAR = layer(90, 1, 1, 0.55);
const NEAR = layer(30, 500, 1.6, 0.9);

export function Starfield() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0" style={{ backgroundImage: FAR }} />
      <div className="absolute inset-0" style={{ backgroundImage: NEAR }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,134,247,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(232,98,44,0.10),transparent_55%)]" />
    </div>
  );
}
