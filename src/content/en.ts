import type { Copy } from "./types";

export const en: Copy = {
  locale: "en",
  dir: "ltr",
  meta: {
    title: "Mohamed Amin, full-stack developer",
    description:
      "Full-stack developer building products end to end, from Laravel and React on the web to native Swift and Kotlin on the phone. Founder of Nuvink.",
  },
  ui: {
    skip: "Skip to content",
    languageNav: "Language",
    languages: { en: "English", ar: "العربية", sv: "Svenska" },
    themeToDark: "Switch to dark theme",
    themeToLight: "Switch to light theme",
    projectIndex: "Projects",
    builtWith: "Built with",
  },
  hero: {
    name: "Mohamed Amin",
    role: "Full-stack developer",
    lede: "I build products end to end, from Laravel and React on the web to native Swift and Kotlin on the phone. Secure, fast and accessible, with one interaction people remember.",
    primary: "See the work",
    secondary: "Get in touch",
    status: "Based in Al-Sharqia, Egypt. Open to remote work, with full overlap with Central European working hours.",
  },
  work: {
    heading: "Selected work",
    intro: "Each project is shown in its own colours and type, the way it looks to the people who use it.",
  },
  nuvink: {
    name: "Nuvink",
    role: "Founder and lead developer",
    period: "September 2026 to present",
    summary:
      "A note-taking and e-book app for Android and iOS. Students write by hand on their books, buy encrypted titles and keep everything in one library.",
    markPhrase: "write by hand on their books",
    points: [
      "A handwriting engine with pressure, smoothing, shape recognition, an eraser, lasso, layers, PDF annotation and infinite pages.",
      "A React and TypeScript app with native Swift on iOS and native Kotlin on Android, including a native book reader with its own ink canvas.",
      "Encrypted PDF delivery with per-device keys, and a device-integrity bridge against piracy.",
      "Hardened Supabase row-level security and edge functions, self-service account deletion and Google Play compliance pages.",
      "A publisher and admin platform with a book store, manual-payment approval, sales analytics, account transfers and audit events.",
    ],
    stack: "React, TypeScript, Swift, Kotlin, Capacitor, Supabase, PostgreSQL",
    metrics: [
      { value: "1,500+", label: "early users in the first month" },
      { value: "11 → 2.9 MB", label: "stored page images, after moving them out of the database" },
      { value: "WebView 70", label: "the low-end Android target it has to run smoothly on" },
    ],
    markAlt: "The Nuvink logo: a ribbon N finished with a pen nib",
    pen: {
      on: "Write on this page",
      off: "Put the pen down",
      clear: "Clear ink",
      hintPointer: "This section runs the ink engine I built for Nuvink. Draw anywhere on it.",
      hintTouch: "This section runs the ink engine I built for Nuvink. Tap the pen and draw.",
      active: "Pen is on. Scrolling is paused until you put it down.",
    },
  },
  nordsur: {
    name: "Nordsur",
    role: "Full-stack booking platform",
    period: "In progress",
    summary: "Book boat trips and guided tours in Malmö and Marbella, in Swedish, English and Arabic.",
    points: [
      "The Earth appears in space, the camera flies to the city and the globe becomes a live harbour map, with each route drawn on the water.",
      "Seat holds that cannot overbook, proven by a concurrency test, with idempotent bookings, multi-tenant isolation and payments behind an interface.",
      "A strict CSP, GDPR export and delete, a public REST API described with OpenAPI, and a WordPress plugin with a shortcode and a Gutenberg block.",
    ],
    stack: "Laravel 12, Vue 3, TypeScript, Inertia, SCSS, MySQL, MapLibre GL",
    visualAlt: "Nordsur's map flying between Malmö and Marbella, listing each city's boat trips",
  },
  masar: {
    name: "Masar",
    role: "Team leader and technical lead",
    period: "Graduation project, 2026",
    summary: "A fitness and health app for Android and iOS, built with Flutter around a machine-learning model.",
    meaning: "Masar means path in Arabic.",
    points: [
      "I led the team and made the technical decisions, from how the app is structured to how the model fits into it.",
      "The project was graded A+.",
    ],
    stack: "Flutter, Dart, machine learning",
  },
  loty: {
    name: "Loty",
    role: "Full-stack web app",
    period: "Personal project",
    summary:
      "Watch anything together, on the same second: YouTube, Vimeo, direct links, local files, or a live broadcast of any tab.",
    points: [
      "Playback follows the server's clock, the way NTP does. Small drift is closed by gently speeding up or slowing down, never by jumping.",
      "Voice chat that lowers the video while someone speaks, Three.js reactions that land on every screen at once, and ambient light drawn from the edges of the video.",
      "Rooms for up to 12 people, host controls, reconnecting without losing your place, QR invites, and an installable app.",
    ],
    stack: "React, TypeScript, Vite, Node.js, Socket.IO, WebRTC, Three.js",
    links: [{ href: "https://github.com/Mo1Amin/Loty", label: "Loty on GitHub" }],
    drift: { value: "0.01–0.03 s", label: "between viewers, measured across two browsers" },
    visualAlt: "A Loty player with its ambient light and three viewers' playheads almost on top of each other",
  },
  acm: {
    name: "SU ACM Student Chapter",
    role: "Founder",
    period: "Sinai University",
    summary: "I founded the ACM student chapter at Sinai University, and built its website and admin dashboard.",
    points: [
      "A home page with an interactive three.js particle sphere, light and dark themes, and a layout designed for phones first.",
      "A dashboard for tracks, events, gallery albums, the team and a competition winners board, with cookieless analytics and a busiest-hour heatmap.",
      "Argon2id passwords, two-step sign-in required for admins, CSRF protection, a strict CSP, roles and a full audit log, checked by 39 Playwright end-to-end tests.",
    ],
    stack: "Node.js, Express, MariaDB, EJS, Tailwind CSS, three.js",
    links: [
      { href: "https://su.acm.org", label: "Visit su.acm.org" },
      { href: "https://github.com/Mo1Amin/acm-sinai-website", label: "Source on GitHub" },
    ],
    visualAlt: "The ACM Sinai website on a desktop in dark mode and on a phone in light mode",
  },
  more: {
    heading: "More on GitHub",
    items: [
      {
        name: "Meqat",
        summary: "A prayer-times widget for Windows: offline first, with the Azan and a tray icon. Tauri (Rust) and React.",
        href: "https://github.com/Mo1Amin/Meqat-Widget",
      },
      {
        name: "Munazzami",
        summary: "An Arabic study planner with a calendar, prioritised tasks and progress charts.",
        href: "https://mo1amin.github.io/study-planner/",
      },
      {
        name: "Shifa Hospital",
        summary: "A right-to-left hospital website with light and dark themes.",
        href: "https://mo1amin.github.io/shifa-hospital-website/",
      },
      {
        name: "Emoji Breakout",
        summary: "A canvas arcade game with levels, sound and touch controls.",
        href: "https://mo1amin.github.io/emoji-breakout/",
      },
    ],
  },
  principles: {
    heading: "How I work",
    items: [
      {
        title: "One memorable moment, then get out of the way",
        body: "Each product gets a single signature interaction tied to what it does. Everything around it stays quiet, fast and accessible, with a fallback for reduced motion and weak devices.",
      },
      {
        title: "Security is part of the build",
        body: "Row-level security, encrypted delivery, strict CSP and audit trails go in with the first migration, not after launch.",
      },
      {
        title: "Measure on the worst device",
        body: "Nuvink runs on an Android WebView from 2018. If it is smooth there, it is smooth everywhere.",
      },
      {
        title: "AI as a team, with a lead",
        body: "I work with AI coding agents the way a lead works with a team: each gets a written task, its own lane and a review. Type checks, tests and a real run on the device come before anything is called done.",
      },
    ],
  },
  toolkit: {
    heading: "Toolkit",
    groups: [
      {
        name: "Web",
        items: "PHP, Laravel, WordPress, HTML, CSS, Sass, JavaScript, TypeScript, React, Vue, Inertia, Next.js, Vite, REST APIs, OpenAPI",
      },
      { name: "Mobile", items: "Swift, Kotlin, Flutter, Capacitor" },
      { name: "Data and platform", items: "MySQL, MariaDB, PostgreSQL, Supabase, row-level security, edge functions, Node.js, Linux" },
      {
        name: "AI",
        items: "Claude Code, Codex, multi-agent workflows, prompt and context engineering, vibe coding, integrating machine-learning models",
      },
      { name: "Quality and delivery", items: "Git, GitHub Actions, Jira, unit, end-to-end and manual testing, Playwright, Selenium" },
      { name: "Also", items: "Java, Python, C++, Rust with Tauri" },
    ],
  },
  background: {
    heading: "Background",
    milestones: [
      { when: "2022", what: "Started a B.Sc. in Information Technology and Computer Science at Sinai University, Arish." },
      { when: "2024", what: "Certificates in Software Testing and Quality from ITI, and Front-End Development from Hasoub Academy." },
      { when: "2026", what: "Graduated, after leading Masar, the graduation project, to an A+." },
      { when: "Sep 2026", what: "Founded Nuvink and shipped it to more than 1,500 early users in its first month." },
    ],
    languagesHeading: "Languages",
    languages: ["Arabic, native", "English, professional working proficiency", "Swedish, learning"],
  },
  contact: {
    heading: "Get in touch",
    body: "I'm open to full-time remote roles and freelance projects. Email or WhatsApp is the fastest way to reach me.",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    github: "GitHub",
  },
  footer: "Designed and built by Mohamed Amin.",
};
