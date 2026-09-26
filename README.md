# Mohamed Amin

Personal site of Mohamed Amin, full-stack web developer and founder of Nuvink.

**Live:** https://mo1amin.github.io/mohamed-amin-portfolio/

Each project is shown in its own identity: Nuvink on a sheet of paper you can
write on, Nordsur in space with its buoy-orange accent, Masar in its own green,
Loty in Apple-style black and blue, and the SU ACM chapter in its blue.

The ink in the Nuvink section is a small port of the handwriting engine I built
for Nuvink: pointer input is stabilised, smoothed with Catmull-Rom splines and
filled as a variable-width outline, with pressure from a stylus or speed from a
mouse. It stays inside that section, so the rest of the page reads normally.

- English, Arabic (right-to-left) and Swedish, each a static page
- Light and dark themes that follow the system until you choose
- Reduced-motion users get every mark already drawn and a still image of the
  Nordsur flight

## Stack

Next.js (App Router, static export), TypeScript, hand-written CSS and
[Motion](https://motion.dev) for the icon and logo animations. The animated
icons follow the patterns of [itshover](https://github.com/itshover/itshover)
(Apache-2.0): each icon owns its start and stop animation, and the button that
holds it plays them, so hovering anywhere on a link moves its icon. Logos
squash and stretch on hover, and the email plane flies off when clicked.

```
src/
  app/          routes and the HTML document per locale
  components/   the page, one chapter per project, brand marks, animated icons
                and the ink layer
  content/      all copy, typed, one file per language
  lib/ink/      smoothing, outlines and hand-drawn marks
```

## Run it

```bash
npm install
npm run dev        # http://localhost:3300
npm run typecheck
npm run build      # static site in out/
```

Pushing to `main` builds and deploys to GitHub Pages.
