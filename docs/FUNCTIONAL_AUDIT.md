# Functional Audit — `claude/functional-base`

This branch continues the Codex Bold direction as an engineering task. The
visual language in `docs/DESIGN_SYSTEM.md` is the baseline and was preserved:
no section, interaction or visual token was replaced.

Baseline before the work: `npm run typecheck` and `npm run build` both passed,
and no lint setup existed. The problems below were behavioural, not visual.

## Findings and fixes

### Preferences only existed on the landing page

Language, theme and visual mode were React state inside `app/page.tsx` and were
applied to `<html>` after hydration. Consequences: every route except `/` was
English, left-to-right and dark regardless of the stored choice, and the landing
page itself flashed the wrong language and theme on first paint.

Fixed with a shared client provider (`app/preferences.tsx`) mounted in the root
layout, plus an inline script (`app/preference-script.tsx`) that applies the
stored values before anything paints. `lang`, `dir`, `data-theme` and
`data-mode` are deliberately not rendered by React, so hydration cannot reset
them; the storage keys live in `app/settings.ts`, which has no `'use client'`
directive, because a client module's exports become stubs inside a server
generated script.

### The routes outside the landing page were English only

`/projects`, `/projects/[slug]`, the loading screen and the 404 screen carried
hardcoded English. Their copy now lives in `app/route-copy.ts` with Arabic and
Swedish alongside English, and each route renders through a small client view
that reads the active locale.

### A missing project answered 200 OK

`/projects/[slug]` used `generateStaticParams` with the default
`dynamicParams`, so an unknown slug was rendered on demand and cached: the
not-found screen was served with a 200 status. `dynamicParams` is now `false`
and unknown slugs return a real 404.

### Project data lived in three places

The landing page, the projects index and the case-study route each kept their
own list, and they had drifted (different titles for the same project).
Structure now lives once in `app/projects-data.ts`; localized text stays in
`app/copy.ts` and `app/route-copy.ts`, indexed in the same order.

### The work filters hid two projects

`Web` and `Mobile + AI` each matched exactly one hardcoded index, so Med Notes
and MyQat disappeared under both filters. Each project now carries its category
from `docs/PROJECT_DATA.md`: `Web` shows MyQat and SU ACM, `Mobile + AI` shows
Med Notes and the graduation project.

### The capability tabs were not keyboard operable

The tablist had no arrow-key handling and every tab was in the tab order. It
now follows the ARIA pattern: arrow keys (mirrored in right-to-left), Home and
End move the selection, only the selected tab is tabbable, and the panel is
focusable. The landing-page case study now moves focus to its heading when it
opens and returns focus to the control that opened it when it closes.

### The case study had no route to the case study

Opening a project on the landing page only revealed an in-page panel; the
dedicated routes were unreachable from there. The panel now links to
`/projects/[slug]`, keeping both interactions.

### No error boundary

A thrown render error replaced the whole document with the framework default.
`app/error.tsx` keeps the portfolio's own screen and language and offers a
retry; `app/global-error.tsx` covers the root layout itself.

### Right-to-left used physical offsets

`.skip`, the brand arrow and the four absolutely positioned pieces of the
project artwork used `left`/`right`, so they stayed on the Latin side in Arabic.
They now use logical properties, which leaves the left-to-right rendering
unchanged.

### The visual-mode switch vanished on tablets

`.controls .mode` was hidden between 651px and 950px, so Bold/Calm could not be
reached at that width. The hide rule is gone; the header has room for it.

### Tooling

ESLint was added (`next/core-web-vitals`, `next/typescript`) with an `npm run
lint` script, and Next was moved to a patched 15.5 release.

## Verified

`npm run typecheck`, `npm run lint` and `npm run build` pass. In the browser:
language, theme and mode survive a full page load and a route change; Arabic
renders right-to-left on every route; Swedish diacritics render; the filters
return the right projects; the capability tabs respond to arrow keys; the case
study manages focus; `/projects/does-not-exist` returns 404; the 404 screen is
localized and themed; and the console is free of React warnings.

## Not done here

- The admin dashboard and the AI assistant, which are out of scope for this
  branch.
- Locale-prefixed URLs. Language is a stored preference, so the server always
  renders the default locale first and the inline script corrects it before
  paint. Real `/[locale]` routes would be needed for per-language URLs,
  translated metadata and indexing, and that is a routing change worth agreeing
  on first.
- Project links, screenshots, stacks and roles, which stay pending until
  Mohamed confirms them, per `docs/PROJECT_DATA.md`.
