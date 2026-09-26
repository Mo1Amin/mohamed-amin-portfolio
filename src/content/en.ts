import type { Copy } from "./types";

export const en: Copy = {
  locale: "en",
  dir: "ltr",
  meta: {
    title: "Mohamed Amin, full-stack web developer",
    description:
      "Full-stack web developer building design-led products with Laravel, Vue, React and TypeScript. Founder and lead developer of Nuvink.",
  },
  ui: {
    skip: "Skip to content",
    languageNav: "Language",
    languages: { en: "English", ar: "العربية", sv: "Svenska" },
    themeToDark: "Switch to dark theme",
    themeToLight: "Switch to light theme",
    penOn: "Draw on the page",
    penOff: "Stop drawing",
    clearInk: "Clear ink",
    penHintPointer: "This is the ink engine I built for Nuvink. Draw anywhere up here.",
    penHintTouch: "This is the ink engine I built for Nuvink. Tap the pen and draw.",
    penActive: "Pen is on. Scrolling is paused until you put it down.",
    viewSource: "Source on GitHub",
  },
  hero: {
    name: "Mohamed Amin",
    role: "Full-stack web developer",
    ledeBefore:
      "I build design-led products with Laravel, Vue, React and TypeScript. Secure, fast and accessible, with ",
    ledeMark: "one interaction people remember",
    ledeAfter: ".",
    primary: "See the work",
    secondary: "Email me",
    status:
      "Based in Al-Sharqia, Egypt. Open to remote work, with full overlap with Central European working hours.",
  },
  work: {
    heading: "Selected work",
    intro: "One product in people's hands, one platform in progress, and the projects that led here.",
    flagship: {
      id: "nuvink",
      name: "Nuvink",
      role: "Founder and lead developer",
      period: "September 2026 to present",
      summary:
        "A note-taking and e-book app for Android and iOS. Students write by hand on their books, buy encrypted titles and keep everything in one library.",
      details: [
        "A handwriting engine with pressure, smoothing, shape recognition, an eraser, lasso, layers, PDF annotation and infinite pages.",
        "Encrypted PDF delivery with per-device keys, and an Android device-integrity bridge against piracy.",
        "Hardened Supabase row-level security and edge functions, self-service account deletion and Google Play compliance pages.",
        "A publisher and admin platform with a book store, manual-payment approval, sales analytics, account transfers and audit events.",
        "Led the rebrand, and coordinated several AI coding agents through task lanes, code review and quality gates.",
      ],
      stack: "React, TypeScript, Capacitor, Supabase, PostgreSQL, Android (Java)",
      metrics: [
        { value: "1,500+", label: "early users in the first month" },
        { value: "11 → 2.9 MB", label: "stored page images, after moving them out of the database" },
        { value: "WebView 70", label: "the low-end Android target it has to run smoothly on" },
      ],
      markAlt: "The Nuvink logo: a ribbon N finished with a pen nib",
    },
    others: [
      {
        id: "nordsur",
        name: "Nordsur",
        role: "Full-stack booking platform",
        period: "In progress",
        summary:
          "A booking platform for boat trips and tours in Malmö and Marbella, in Swedish, English and Arabic.",
        details: [
          "Seat holds that cannot overbook, proven by a concurrency test. Idempotent bookings, multi-tenant isolation, payments behind an interface, strict CSP, and GDPR export and delete.",
          "The Earth appears in space, flies to the city and becomes a live harbour map with each route drawn on the water. Reduced-motion and no-WebGL paths keep it usable for everyone.",
        ],
        stack: "Laravel 12, Vue 3, TypeScript, Inertia, MySQL, OpenAPI, WordPress plugin",
      },
      {
        id: "loty",
        name: "Loty",
        role: "Full-stack web app",
        period: "Personal project",
        summary: "A watch party that keeps everyone's video in sync, with live video chat between viewers.",
        details: [
          "Socket.IO keeps playback aligned, a WebRTC mesh carries the video chat, and the Three.js scene loads only when it is needed. CI runs on GitHub Actions.",
        ],
        stack: "React, TypeScript, Vite, Node.js, Socket.IO, WebRTC, Three.js",
        link: { href: "https://github.com/Mo1Amin/Loty", label: "Loty on GitHub" },
      },
      {
        id: "graduation",
        name: "Fitness and health app with machine learning",
        role: "Team leader and technical lead",
        period: "Graduation project, 2026",
        summary:
          "A Flutter mobile app backed by a machine-learning model for fitness and health. I led the team and the technical decisions, and the project was graded A+.",
        details: [],
        stack: "Flutter, machine learning",
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
        title: "Gates before done",
        body: "Type checks, tests and a real run on the device before anything is called finished. The same gates apply when I coordinate AI coding agents.",
      },
    ],
  },
  toolkit: {
    heading: "Toolkit",
    groups: [
      {
        name: "Web",
        items: "PHP, Laravel, WordPress, HTML, CSS, Sass, JavaScript, TypeScript, React, Vue, Inertia, Vite, REST APIs, OpenAPI",
      },
      {
        name: "Data and platform",
        items: "MySQL, PostgreSQL, Supabase, row-level security, edge functions, Linux",
      },
      {
        name: "Quality and delivery",
        items: "Git, GitHub, Jira, unit, manual and automated testing, Selenium, CI",
      },
      { name: "Also", items: "Java, Python, C++, Flutter" },
    ],
  },
  background: {
    heading: "Background",
    milestones: [
      { when: "2022", what: "Started a B.Sc. in Information Technology and Computer Science at Sinai University, Arish." },
      { when: "2024", what: "Certificates in Software Testing and Quality from ITI, and Front-End Development from Hasoub Academy." },
      { when: "2026", what: "Graduated, after leading the graduation project to an A+." },
      { when: "Sep 2026", what: "Founded Nuvink and shipped it to more than 1,500 early users in its first month." },
    ],
    leadershipHeading: "Leadership",
    leadership:
      "Founder of the SU ACM Student Chapter at Sinai University, responsible for its official website and web activities.",
    languagesHeading: "Languages",
    languages: ["Arabic, native", "English, professional working proficiency", "Swedish, learning"],
  },
  contact: {
    heading: "Get in touch",
    body: "I'm open to full-time remote roles and freelance projects. Email is the fastest way to reach me.",
    emailLabel: "mohmedamin1998@gmail.com",
    github: "GitHub",
  },
  footer: "The ink on this page uses the same smoothing as the Nuvink canvas.",
};
