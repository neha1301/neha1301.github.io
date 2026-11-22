import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  /** Emit a fully static site for GitHub Pages. */
  output: "export",
  /** GitHub Pages serves /path/ as /path/index.html. */
  trailingSlash: true,
  /** Hide the Next.js dev badge in local preview. */
  devIndicators: false,
  turbopack: {
    // Pin the workspace root so a stray lockfile in a parent directory
    // (e.g. the home folder) is never picked up by the bundler.
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
