# Immersive mode — task plan

Branch: `claude/immersive-mode` (worktree `ORT/.worktrees/immersive`).
Rule: **no merge** with `claude/supabase-production` or `codex/supabase-auth` until every task in this file is done.

Bold stays the official, professional mode and is not touched by any task here.
The second mode (stored as `mode=calm`, labelled Immersive) is where the
"crazy, heavy, interactive" experience lives.

## What Mohamed asked for, and where it stands

Collected from the Codex and Claude sessions of 2026-09-20/21.

| Request | Status after `705f1f9` |
|---|---|
| "Interactive to the max" — the site itself proves web / AI / mobile skill | Missing. Nothing reacts to the pointer, touch or clicks beyond hovers. |
| "Crazy, heavy animation" on desktop and phone | Partial. Scroll-linked 2D layers only; reads as light. |
| A dragon that wraps the whole screen | Missing. |
| Falling rocks, volcanoes, "every scroll something crazy happens" | Partial. Ridge + eruption + shards exist, but flat and small. |
| Camera movement | Missing. There is no 3D space, so there is no camera. |
| Things appearing on screen | Missing. No overlays, reveals, HUD or reactive text. |
| Interactive skill visualisation (original brief) | Missing. Capabilities is still a tab list. |
| Animated leadership / education timeline (original brief) | Missing. |
| Lighter phone version, reduced-motion fallback | Done for the current 2D layer; must be redone for 3D. |

## Technical direction

The current layer is DOM + SVG driven by `framer-motion`. It cannot deliver a camera,
a dragon or real depth. The plan moves the stage to WebGL and keeps DOM for content.

| Concern | Choice | Why |
|---|---|---|
| 3D world, camera, dragon, particles | `three` + `@react-three/fiber` (v9, React 19) | Declarative scene inside the existing React tree; lazy-loaded only in Immersive. |
| Scroll choreography (pinned scenes, scrub) | `gsap` + `ScrollTrigger` | One master timeline, one playhead; see `.claude/skills/gsap-web`. |
| Smooth scroll | `lenis` | Needed so scrubbed camera moves do not stutter; disabled under reduced motion. |
| UI micro-interactions | `framer-motion` (already installed) | Keep for buttons, cards, panels. |
| Fallback | current CSS/SVG stage (`ImmersiveStage`) | Used when WebGL is unavailable or the device tier is "low". |

Budget: Bold must not download any of the new libraries. The Immersive chunk
target is ≤ 250 KB gzipped, loaded with `next/dynamic({ ssr: false })` after first paint.

Skills to apply on every task: `frontend-design`, `avoid-ai-design`, `gsap-web`,
`60fps-animation`, `accessible-animation`, `micro-interaction`, `svg-animation`.

## Decision needed first (Mohamed)

**D1 — Immersive art direction.** The `frontend-design` skill lists "near-black
background with a single acid-green accent", monospace data labels, ALL-CAPS
eyebrows and `01 / 02` numbering as the most common AI-generated look. That is the
current Bold palette. Bold stays as chosen. For Immersive, pick one:
- (a) keep the Bold palette so the two modes feel like one brand;
- (b) give Immersive its own world palette (e.g. basalt, magma orange, jade dragon, ash white) so it reads as a different, hand-made piece.

Recommendation: (b). Tasks below assume (b); only T0.3 changes if (a) is chosen.

---

## Phase 0 — Foundation

**T0.1 Dependencies and lazy boundary** · S
- Add `three`, `@react-three/fiber`, `gsap`, `lenis`.
- Create `app/immersive/` with `ImmersiveRoot` loaded via `next/dynamic({ ssr: false })` only when `mode === 'calm'`.
- Accept: `next build` output shows Bold's first-load JS unchanged (±2 KB); Immersive chunk ≤ 250 KB gz.

**T0.2 Device tiers** · S
- `useQualityTier()` → `high | mid | low | still`: `still` for reduced motion, `low` for no WebGL / `deviceMemory ≤ 2` / measured FPS < 40 over 2 s, `mid` for touch devices, else `high`.
- Tier drives DPR cap (2 / 1.5 / 1), particle counts, post-processing on/off.
- Accept: forcing each tier via `?tier=` (dev only) renders the matching variant.

**T0.3 World tokens** · S
- Define the Immersive palette, fog colours per scene, and one display typeface for Immersive only.
- Accept: tokens live in one file; no hex values inside scene components.

**T0.4 Master scroll timeline** · M
- Lenis + ScrollTrigger wired to the page; one GSAP timeline with labels `orbit`, `ridge`, `eruption`, `strata`, `embers`, `signal`.
- Export a shared `progress` (0–1) and `scene` store the 3D scene reads each frame (no React re-render per frame).
- Accept: scrubbing back and forth is frame-exact; `scene` matches the section in view in EN/AR/SV and RTL.

**T0.5 Canvas shell** · S
- Full-viewport fixed `<Canvas>` behind content, `pointer-events` only on interactive meshes, pauses when tab hidden or mode switched.
- Accept: CPU idle when tab hidden; switching Bold ↔ Immersive mounts/unmounts cleanly with no console errors.

## Phase 1 — Camera

**T1.1 Camera rail** · M
- A CatmullRom path through the world with one keyframe per scene: fly through the orbit rings → descend over the ridge → dive into the crack → rise through embers → pull back to a single point.
- Camera position and look-at are driven by `progress`; FOV widens during fast travel.
- Accept: every section's text stays readable (scene composition leaves the content column clear) at 1440, 1024, 768, 390 widths.

**T1.2 Pointer parallax on camera** · S
- Camera offsets ±3° with the pointer (desktop) or device tilt with permission (phone, opt-in button).
- Accept: no drift when pointer leaves the window; off under `still`.

**T1.3 Scene cuts** · S
- Between scenes: a 250 ms "shutter" (bloom spike + slight camera shake) timed on the GSAP labels.
- Accept: one cut per scene boundary, never on small scroll jitter.

## Phase 2 — Dragon

**T2.1 Procedural dragon body** · L
- Spine of 60 segments (28 on `mid`) following a moving curve; instanced scale geometry, head mesh, whisker lines. No external model files.
- Accept: 60 fps on `high` on a mid laptop GPU; ≤ 1 draw call for the body.

**T2.2 Intro wrap** · M
- On first entering Immersive, the dragon coils around the viewport edges once (≈ 2.5 s), then settles behind the hero. Skippable by scroll or key press; plays once per session.
- Accept: hero text is interactive during the intro; skip works with keyboard.

**T2.3 Dragon follows the story** · M
- Its path is keyed to the master timeline: circles the orbit, dives into the volcano at the graduation project, surfaces from the crack under Capabilities, curls around the contact point.
- Accept: at every section the dragon is visible but never covers text.

**T2.4 Dragon reacts** · M
- Head tracks the pointer (desktop) / last touch (phone); clicking the head triggers a fire breath burst; `Esc` or reduced motion calms it.
- Accept: interaction reachable by keyboard via a visible "Wake the dragon" toggle (accessible name in 3 locales).

## Phase 3 — Scenes

**T3.1 Orbit (hero)** · M
- 3D rings with the three nodes WEB / AI-ML / MOBILE as objects; drag to spin the system with inertia; clicking a node scrolls to its related projects.
- Accept: drag works with mouse and touch; nodes are also real links in the DOM for keyboard users.

**T3.2 Ridge + eruption (work)** · L
- Low-poly terrain rises under the project grid; when the graduation project enters, the volcano erupts: GPU particles (lava + ash), light flash, camera shake, rocks thrown past the camera.
- Accept: eruption runs once per pass and on click of the project card; ≤ 3 000 particles on `high`, ≤ 800 on `mid`.

**T3.3 Falling rocks** · M
- Physics-lite rocks (simple gravity + bounce on terrain, no physics engine) spawn on scroll velocity; faster scroll → more rocks.
- Accept: object pool, no allocation per frame; zero rocks on `still`.

**T3.4 Strata + skill constellation (capabilities)** · L
- The ground splits along the camera path; inside the crack, a constellation of the four capability areas with their real technologies (from `copy.ts`) as nodes and links.
- Hover/tap a node → camera eases to it, panel shows the existing skill text. Replaces the flat tab list visually; the ARIA tablist stays in the DOM and drives the same state.
- Accept: keyboard arrows move between nodes and the camera follows; screen reader output unchanged from today.

**T3.5 Embers + timeline (about)** · M
- Animated timeline of leadership and education milestones (SU ACM, A+ graduation, Sinai University, Hasoub, ITI) drawn as a path of embers; each milestone ignites as it crosses the viewport centre.
- Accept: dates and text come from existing content only; nothing invented.

**T3.6 Signal (contact)** · S
- Everything collapses into one point of light that follows the pointer; the GitHub button becomes the light source.
- Accept: the CTA remains the most prominent element.

## Phase 4 — Things that appear on screen (DOM layer)

**T4.1 Headline break / rebuild** · M
- Replace the current line shift with GSAP SplitText on **words** (never letters, to keep Arabic shaping) that shatter along the camera direction and rebuild on scroll back.
- Accept: identical behaviour in EN/AR/SV; no layout shift (CLS 0).

**T4.2 Project cards** · M
- Pointer-follow 3D tilt with specular glare; cover emerges from smoke/light shader on reveal; on open, the card Flip-animates into the case-study panel.
- Accept: tilt off on touch; Flip respects reduced motion.

**T4.3 Scene HUD** · S
- Replace the side meter with a small scene caption that types in on each scene change, plus scroll velocity feeding the energy value.
- Accept: HUD is `aria-hidden`; one caption per scene change.

**T4.4 Custom cursor + magnetic controls** · S
- Desktop-only cursor that morphs over links/cards; primary buttons pull toward the pointer.
- Accept: disabled on touch and `still`; native cursor never hidden on inputs.

**T4.5 Mode switch transition** · S
- Switching Bold → Immersive plays a 600 ms portal wipe from the button; Immersive → Bold is an instant cut.
- Accept: focus stays on the switch button.

## Phase 5 — Phone and accessibility

**T5.1 Phone variant** · M
- `mid` tier: shorter dragon, no rocks physics, eruption as a short burst, camera rail with smaller moves, touch drag on orbit and constellation.
- Accept: 50+ fps on a mid Android device profile (Chrome DevTools 4× CPU throttle); no horizontal scroll at 360 px.

**T5.2 Reduced motion (`still`)** · S
- Render one composed still frame per scene (no camera travel, no particles), cross-fade between them.
- Accept: `prefers-reduced-motion: reduce` produces zero continuous animation.

**T5.3 No-WebGL fallback** · S
- `low` tier renders the existing CSS/SVG `ImmersiveStage`.
- Accept: disabling WebGL in Chrome still gives a working Immersive page.

## Phase 6 — QA and hand-off

**T6.1 Visual regression script** · S — commit the headless-Chrome capture script (desktop/phone × EN/AR × dark/light × motion/reduced) under `scripts/`.

**T6.2 Performance pass** · M — `60fps-animation` checklist; a trace per scene with no long tasks > 50 ms on `high`.

**T6.3 Accessibility pass** · S — `accessibility-review` + keyboard walk-through of every interactive visual.

**T6.4 AI-tell audit** · S — run `avoid-ai-design` on the Immersive page and fix every P0/P1.

**T6.5 Merge prep** · M — only after T6.1–T6.4: rebase onto the reconciled Supabase branch, re-run `verify:supabase`, build, and the capture script.

## Suggested order

1. D1 decision
2. Phase 0 (T0.1–T0.5)
3. T1.1 camera rail + T3.1 orbit (first visible result)
4. Phase 2 dragon
5. T3.2 → T3.6 scenes
6. Phase 4 DOM layer
7. Phase 5, then Phase 6
