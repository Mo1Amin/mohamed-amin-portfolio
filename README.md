# Mohamed Amin

Personal site of Mohamed Amin, full-stack web developer and founder of Nuvink.

**Live:** https://mo1amin.github.io/mohamed-amin-portfolio/

The page is set up like a notebook: a margin for notes, a ruled line, and ink.
The ink is a small port of the handwriting engine I built for Nuvink: pointer
input is stabilised, smoothed with Catmull-Rom splines and filled as a
variable-width outline, with pressure from a stylus or speed from a mouse.
Drag across the top of the page to write on it, or turn on the pen to write
anywhere.

- English, Arabic (right-to-left) and Swedish, each a static page
- Light and dark themes that follow the system until you choose
- Reduced-motion users get every mark already drawn, with no animation

## Stack

Next.js (App Router, static export), TypeScript, hand-written CSS. No UI
libraries; the only runtime dependencies are Next.js and React.

```
src/
  app/          routes and the HTML document per locale
  components/   the page, the ink layer and the pen controls
  content/      all copy, typed, one file per language
  lib/ink/      smoothing, outlines, hand-drawn marks and the signature
```

## Run it

```bash
npm install
npm run dev        # http://localhost:3300
npm run typecheck
npm run build      # static site in out/
```

Pushing to `main` builds and deploys to GitHub Pages.
