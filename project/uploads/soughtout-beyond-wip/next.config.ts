import type { NextConfig } from "next";

// `npm run build:pages` makes a static copy for GitHub Pages, served from
// soughtout-svg.github.io/beyond/. Normal builds are unaffected.
const pages = process.env.PAGES_BASE_PATH;

const nextConfig: NextConfig = {
  // Static export can't use partial prerendering, so those flags are server-only.
  ...(pages
    ? { output: "export", basePath: pages, trailingSlash: true }
    : { cacheComponents: true, partialPrefetching: true }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
