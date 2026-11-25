# Neha Sharma — Engineering Portfolio

A production-ready personal engineering portfolio for **Neha Sharma**, Site Reliability Engineer & DevOps Engineer.

Dark-first, terminal-inspired, fully responsive, statically rendered, and driven by a single configuration layer so content updates never require touching a component.

---

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, static export) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (`@theme` tokens, CSS custom properties) |
| Animation | Framer Motion (scroll reveals, layout transitions) |
| Icons | Lucide (UI) + Simple Icons via `react-icons` (brand marks) |
| Fonts | `next/font` — Inter + JetBrains Mono |
| Deployment | GitHub Pages via GitHub Actions |

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # static export -> ./out
npx serve out    # preview the exported site locally
npm run lint     # eslint
```

---

## Updating content — everything lives in `src/config/`

| File | Contents |
| --- | --- |
| `src/config/site.ts` | Name, role, tagline, location, email, social links (GitHub, LinkedIn, LeetCode), resume path, nav links |
| `src/config/experience.ts` | Roles, periods, ownership summaries, highlights, stack chips |
| `src/config/skills.ts` | Skill groups (daily / working / familiar) and their icons |
| `src/config/projects.ts` | Case studies: problem, solution, architecture, capabilities, design trade-offs, impact, repository |
| `src/config/articles.ts` | Article showcase entries (see below) |
| `src/config/certifications.ts` | Certifications (Credly verification links) and achievements |
| `src/config/education.ts` | Degree, field, institution, period |

### Adding an article

Append an entry to the `articles` array in `src/config/articles.ts`:

```ts
{
  id: "unique-slug",
  title: "Article title",
  description: "One or two sentences summarising the post.",
  category: "Kubernetes",
  publishedAt: "2026-02-14",   // ISO date
  url: "https://www.linkedin.com/posts/neha1301_<slug>",
  readTime: "6 min read",        // optional
}
```

The showcase renders automatically. While the list is empty, the section shows the
**“Explore My Technical Posts”** button linking to the LinkedIn profile — no
placeholder article titles are ever displayed.

### Swapping the resume

Replace `public/Neha-Sharma-Resume.pdf` (or point `site.resume.path` in
`src/config/site.ts` at a new file). Every download button reads that single value.

### Social preview image

The Open Graph / Twitter card is a static file at `public/og.png` (1200 × 630).
It is committed rather than generated at request time because GitHub Pages serves
extension-less routes as `application/octet-stream`, which breaks link previews on
LinkedIn and Slack.

If you change the hero headline, edit `scripts/make-og.mjs` and regenerate:

```bash
node scripts/make-og.mjs
```

The metadata in `src/app/layout.tsx` points at `/og.png` explicitly, so the file
always keeps a `.png` extension and the correct content type.

### Changing the accent colour

Edit the `--accent` / `--accent-2` custom properties in `src/app/globals.css`.
Both themes are defined there; the dark theme is the default and the light theme
is applied by the `.light` class on `<html>`.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # fonts, metadata, JSON-LD, theme bootstrap
│   ├── page.tsx            # composes the sections in order
│   ├── globals.css         # design system: tokens, base styles, utilities
│   ├── icon.svg            # favicon
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── layout/             # Navbar, Footer, ThemeProvider, ThemeToggle
│   ├── sections/           # one component per page section
│   └── ui/                 # Button, Reveal, Terminal, TechIcon, AnimatedCounter, …
├── config/                 # ← all editable content
└── lib/                    # helpers (cn, formatDate, cached year)

public/
├── Neha-Sharma-Resume.pdf  # downloadable resume
└── og.png                  # static social preview (1200 × 630)

scripts/
└── make-og.mjs             # regenerates public/og.png
```

### Theme handling

`ThemeProvider` uses `useSyncExternalStore` against the `<html>` element, which is
the single source of truth. A blocking inline script in `<head>` applies the
stored preference before first paint, so there is no flash of the wrong theme and
no hydration mismatch. The theme toggle icon is driven purely by CSS.

### Accessibility & performance

- Lighthouse: **100 / 100 / 100** (accessibility / best practices / SEO) in both themes.
- Every animation respects `prefers-reduced-motion`.
- All routes are prerendered as static content.
- Keyboard focus is always visible; there is a skip-to-content link.
- Colour tokens are contrast-checked in both themes (WCAG AA).

---

## Deployment

Live at **https://neha1301.github.io**.

The site is a fully static export (`output: "export"` in `next.config.ts`), so
there is no server to run. Pushing to `main` triggers
`.github/workflows/deploy.yml`, which runs `npm ci` and `npm run build`, then
publishes the `out/` directory with `actions/deploy-pages`.

`public/.nojekyll` is included so GitHub Pages does not strip underscore-prefixed
Next.js assets. The canonical origin lives in `src/config/site.ts` (`site.url`)
and feeds metadata, Open Graph tags, `robots.txt`, and `sitemap.xml`.

To deploy to a project site instead of a user site (for example
`https://neha1301.github.io/portfolio/`), set `basePath` in `next.config.ts`,
add `images: { unoptimized: true }`, and update `site.url` to include the path.
