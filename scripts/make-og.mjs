import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

/**
 * Generates public/og.png (1200 × 630) for Open Graph / Twitter cards.
 *
 * Kept as a static PNG because GitHub Pages serves extension-less routes as
 * application/octet-stream, which breaks link previews on LinkedIn and Slack.
 *
 * Usage: node scripts/make-og.mjs
 * Requires sharp (installed with Next.js).
 */

const W = 1200;
const H = 630;
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "og.png");

const chips = [
  "Open to opportunities",
  "Kubernetes · AWS · GCP",
  "Prometheus · Grafana",
  "AI-assisted debugging",
];

// Rough width estimate for the chip pills (18px sans).
const chipWidth = (s) => Math.round(s.length * 9.2 + 36);
let x = 80;
const chipRects = chips
  .map((label) => {
    const w = chipWidth(label);
    const rect = `<rect x="${x}" y="526" width="${w}" height="42" rx="21" fill="#0e1116" stroke="rgba(255,255,255,0.13)"/><text x="${x + 18}" y="553" fill="#98a1ae" font-size="18" font-family="Helvetica Neue, Helvetica, Arial, sans-serif">${label}</text>`;
    x += w + 14;
    return rect;
  })
  .join("\n");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="50%" cy="0%" r="70%">
      <stop offset="0%" stop-color="#4ade9b" stop-opacity="0.22"/>
      <stop offset="70%" stop-color="#08090b" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="mark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4ade9b"/>
      <stop offset="100%" stop-color="#8b7cf6"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="#08090b"/>
  <ellipse cx="600" cy="-60" rx="560" ry="330" fill="url(#glow)"/>

  <!-- Brand mark -->
  <rect x="80" y="72" width="54" height="54" rx="14" fill="#0e1116" stroke="rgba(255,255,255,0.14)"/>
  <g fill="none" stroke="url(#mark)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M100 108 112 96 100 84"/>
    <path d="M113 110h17"/>
  </g>

  <text x="152" y="99" fill="#e8ebef" font-size="26" font-weight="600" font-family="Helvetica Neue, Helvetica, Arial, sans-serif">Neha Sharma</text>
  <text x="152" y="124" fill="#98a1ae" font-size="19" font-family="Helvetica Neue, Helvetica, Arial, sans-serif">Gurugram, Haryana, India</text>

  <!-- Headline -->
  <text x="80" y="302" fill="#e8ebef" font-size="66" font-weight="700" letter-spacing="-2" font-family="Helvetica Neue, Helvetica, Arial, sans-serif">Fewer alerts.</text>
  <text x="80" y="374" fill="#4ade9b" font-size="66" font-weight="700" letter-spacing="-2" font-family="Helvetica Neue, Helvetica, Arial, sans-serif">Faster root causes.</text>
  <text x="80" y="424" fill="#98a1ae" font-size="25" font-family="Helvetica Neue, Helvetica, Arial, sans-serif">Site Reliability Engineer · DevOps Engineer II · Platform Engineering</text>

  <!-- Chips -->
  ${chipRects}

  <!-- Footer -->
  <text x="80" y="600" fill="#6b7480" font-size="16" font-family="Helvetica Neue, Helvetica, Arial, sans-serif">neha1301.github.io</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(OUT);
console.log(`wrote ${OUT}`);
