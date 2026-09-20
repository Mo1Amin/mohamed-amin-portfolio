# Mohamed Amin Portfolio

Portfolio website for Mohamed Amin, a fresh Software Engineer focused on web, mobile, AI, and practical product development.

## Working agreement

- `main` is the shared stable branch.
- Feature work should use a separate branch and be merged after review.
- English is the default locale; Arabic and Swedish are supported.
- The portfolio supports dark and light themes, with Bold and Calm visual modes planned.

## Planned stack

- Next.js and TypeScript
- Tailwind CSS
- Framer Motion
- Supabase and PostgreSQL
- Vercel deployment

## Bold direction on `claude/bold-direction`

This branch holds one complete take on the Bold direction, built to be compared
against the other direction branches. It is a working Next.js application, not a
mockup.

### Running it

```bash
npm install
npm run dev        # http://localhost:3200
npm run lint
npm run typecheck
npm run build
```

### The visual idea

A dark instrument panel: a blueprint grid, engineering-drawing corner ticks, one
numbered channel per section, a pointer-aware signal field behind the hero, and
a scroll rail that names the section currently in view. Projects are presented
as **case files** rather than cards in a grid, and capabilities as a radial
**capability map** driven by a real tablist.

### What is implemented

- Routes: `/[locale]`, `/about`, `/projects`, `/projects/[slug]`, `/skills`,
  `/leadership`, `/contact`, all locale prefixed and statically generated.
- Locales: English (default), Arabic (RTL), Swedish (LTR). Direction is set at
  the layout level; switching language keeps the current route.
- Two independent axes on `<html>`: `data-theme` (dark/light) and `data-mode`
  (Bold/Calm), both persisted locally and applied before first paint.
- Motion: scroll reveals, a hero type reveal, an animated timeline rail, and a
  canvas signal field — all disabled or reduced under `prefers-reduced-motion`.
- Accessibility: landmarks and heading order, visible focus, a skip link,
  keyboard-driven capability map, icon-only controls with names, and status
  communicated with an icon and a label rather than colour alone.

### Content and honesty rules

All copy comes from `content/` (portfolio facts) and `i18n/dictionaries/`
(interface labels); no component holds copy of its own. Where
`docs/PROJECT_DATA.md` marks something as pending, the interface says so
explicitly instead of inventing a description, a metric, or a link. The contact
form validates but is not wired to a backend, because the destination address is
not confirmed yet.

Still outstanding, as the project documents require: project descriptions,
stacks, roles, screenshots and links; the contact email and social links; and a
review of the Swedish translations.

### Not built here

The admin dashboard and the AI assistant are deliberately out of scope on this
branch.

