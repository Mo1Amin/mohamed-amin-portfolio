# Mohamed Amin Portfolio Design Brief

## Product goal

Build a memorable portfolio that demonstrates Mohamed Amin's ability to design and build real digital products across web, mobile, and AI. The portfolio itself is a flagship project: it must communicate engineering judgment, product thinking, leadership, and attention to interaction quality.

The site is for a fresh Software Engineering graduate, so it should emphasize practical proof, project depth, leadership, and learning velocity instead of implying years of industry experience.

## Positioning

Primary title:

> Software Engineer building web, mobile, and AI products.

Supporting statement:

> Fresh Software Engineering graduate, founder, team leader, and builder of practical digital products.

Key proof points:

- Founder of the SU ACM Student Chapter.
- Responsible for the chapter's official website and web activities.
- Team leader for an A+ graduation project.
- Graduation project: Flutter mobile application with a complete machine learning model for fitness and health.
- Experience and project work across frontend, backend, testing, mobile, AI/ML, and web operations.
- Ongoing personal interest in Cybersecurity.

## Audience

The primary audience is a recruiter, hiring manager, technical lead, collaborator, or client who needs to understand Mohamed's capabilities quickly and then inspect evidence in depth.

The first screen should answer three questions:

1. Who is Mohamed?
2. What can he build?
3. Where can I see proof?

## Experience model

The portfolio has two visual directions using the same information architecture and content:

- **Bold:** the default launch direction. Futuristic, expressive, interactive, and visually memorable.
- **Calm:** a quieter editorial direction for fast reading and professional review.

Users can switch between directions without losing their current page or language. The implementation may use a `data-visual-mode` attribute and shared design tokens instead of duplicating page logic.

The site is dark by default with a light theme toggle. Theme and visual mode preferences persist locally.

## Information architecture

### Public routes

- `/` — Hero, selected proof, and clear next actions.
- `/about` — Profile, leadership, education, and working approach.
- `/projects` — Filterable project index.
- `/projects/[slug]` — Full project case study.
- `/skills` — Capability map grouped by discipline.
- `/leadership` — SU ACM and team leadership evidence.
- `/contact` — Contact form and social links.

An all-in-one landing page may expose these sections as anchors, but each important project must have a deep-linkable route.

### Section order for the home page

1. Hero with one primary action and one proof action.
2. Short credibility strip: Founder, Team Leader, A+ project, Web/Mobile/AI.
3. Featured project case studies.
4. Capability map.
5. Leadership and community.
6. Mobile and AI spotlight.
7. Education and certifications.
8. Contact CTA.

## Visual system

### Color direction

Use semantic tokens so themes and modes can change without rewriting components.

Dark theme baseline:

- `canvas`: near-black navy, not pure black.
- `surface`: slightly lifted navy panels.
- `text-primary`: warm white.
- `text-secondary`: cool muted gray.
- `accent`: electric blue as the default brand accent.
- `accent-strong`: optional neon lime used sparingly for status or emphasis.
- `border`: low-contrast translucent light.

Light theme baseline:

- `canvas`: warm near-white.
- `surface`: white.
- `text-primary`: deep navy.
- `text-secondary`: slate gray.
- `accent`: deep electric blue with sufficient contrast.
- `border`: cool light gray.

Do not use more than one dominant accent in a single component. Do not rely on color alone to communicate status.

### Typography

Use a modern sans-serif with strong Latin and Arabic coverage. Verify Arabic glyph quality and Swedish diacritics before finalizing the font. Headings should feel confident and compact; body copy should remain comfortable at mobile widths.

Typography must support long translated strings without fixed-height clipping.

### Shape and layout

- Generous whitespace and clear content rhythm.
- Medium-radius cards; avoid excessive rounded containers.
- Use a constrained reading width for case-study prose.
- Use full-bleed visual moments only for hero, project media, or intentional transitions.
- Do not turn every section into a card grid.

## Interaction direction

Bold mode should make the portfolio feel alive through:

- Pointer-aware but subtle hero response.
- Scroll-reveal for sections and project evidence.
- Project cards that transition into case studies.
- An interactive capability map that remains usable with keyboard and touch.
- A timeline that reveals leadership and education milestones.
- Theme and visual-mode transitions that respect reduced-motion preferences.

Motion rules:

- Motion communicates hierarchy or state.
- Avoid continuous animation behind readable content.
- Keep the first contentful view fast.
- Provide `prefers-reduced-motion` behavior.
- Never make navigation or form completion depend on animation.

## Localization

Supported locales:

- English (`en`) — default.
- Arabic (`ar`) — RTL.
- Swedish (`sv`) — LTR.

Requirements:

- Static UI translations live in structured locale files.
- Project content supports all three locales through the content model.
- Arabic changes direction at the layout level, not by manually mirroring individual components.
- Dates, labels, metadata, and accessibility text are localized.
- Language switching preserves the current route where a translation exists.
- Missing translations must have a clear fallback policy and must never render an empty block.

## Accessibility and performance

- Semantic landmarks and heading hierarchy.
- Visible keyboard focus.
- Accessible names for icon-only controls.
- Contrast compliant in both themes.
- Keyboard and touch support for all interactive visuals.
- Reduced-motion support.
- Optimized images with meaningful alt text.
- No layout shift caused by late-loading fonts or media where practical.
- Target a strong Lighthouse score without sacrificing the primary visual idea.

## Content rules

- Use evidence from real projects and responsibilities.
- Keep the fresh-graduate positioning accurate.
- Do not invent clients, revenue, user counts, years of experience, or production claims.
- Projects not yet published to GitHub may use `Coming Soon` or `Private` status.
- Explain the problem, role, decisions, technologies, challenges, and outcome for each featured project.
- Keep the writing direct and specific.

## Technical direction

- Next.js with TypeScript and App Router.
- Tailwind CSS with semantic CSS variables.
- Framer Motion for transitions where appropriate.
- Supabase/PostgreSQL for the content system and admin dashboard.
- Vercel-ready deployment.
- Provider abstraction for any AI assistant.

## Definition of a successful first design

- A recruiter understands the profile within ten seconds.
- The first three projects are easy to find and inspect.
- The design demonstrates frontend skill without obscuring the content.
- Arabic and Swedish do not feel like afterthoughts.
- The page remains useful with animation disabled.
- The portfolio itself feels like a product Mohamed could confidently discuss in an interview.

