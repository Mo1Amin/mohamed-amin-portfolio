# Codex Bold Design System

This is the visual implementation contract for the Codex portfolio direction. It complements `docs/DESIGN_BRIEF.md` and should be preserved when engineering work is added.

## Visual idea

The site presents Mohamed as a builder who connects three disciplines: web, mobile, and AI. The visual language uses a dark technical canvas, one bright accent, confident typography, and a small amount of engineered geometry. Interactions reveal structure and evidence rather than decorate empty space.

## Tokens

Dark theme uses a near-black navy canvas, lifted navy surfaces, warm white primary text, cool muted secondary text, lime green actions, indigo system geometry, and quiet gray borders.

Light theme uses a warm off-white canvas, pale neutral surfaces, deep green-black primary text, slate secondary text, dark green actions, and cool gray borders.

Use semantic CSS variables. A component must not hardcode a color that belongs to the theme system.

## Type scale

- Display: short, confident, and allowed to wrap.
- Section heading: large enough to establish a new chapter.
- Card heading: compact and scannable.
- Eyebrow: tracked only for Latin text.
- Body: comfortable line height and no fixed height.

Arabic removes Latin letter spacing and uses a fallback with complete Arabic glyph coverage. Swedish preserves diacritics without clipping.

## Component rules

- One dominant action per visible section.
- Use medium-radius surfaces; avoid a page made entirely of pills.
- Keep borders quiet and use spacing to establish hierarchy.
- Every interactive visual has a text alternative or accessible name.
- Status is communicated by text and shape as well as color.
- Case-study pages are calm reading surfaces even when the landing page is expressive.

## Motion rules

- Hero geometry may rotate slowly when motion is allowed.
- Scroll reveals move a short distance and settle quickly.
- Hover states lift or highlight a surface without hiding information.
- Route transitions never delay content.
- `prefers-reduced-motion: reduce` disables decorative motion and smooth scrolling.

## Responsive behavior

- Desktop: split hero with copy and system geometry.
- Tablet: preserve hierarchy while reducing art scale and grid density.
- Mobile: copy first, art second, navigation wraps, projects become one column.
- No fixed-height text containers.
- Touch targets remain comfortably tappable.

## Content hierarchy

The page order is evidence-led: positioning and next action, selected work, capability evidence, leadership and community, education and certifications, then contact. The visual system stays subordinate to project evidence and never implies unsupported experience.

