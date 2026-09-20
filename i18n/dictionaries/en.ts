/**
 * English interface dictionary. English is the default locale and the fallback
 * for every other locale, so this file must stay complete.
 *
 * Portfolio facts (projects, skills, leadership, education) live in `content/`,
 * not here. This file only holds interface labels.
 */
const en = {
  meta: {
    title: 'Mohamed Amin — Software Engineer',
    description:
      'Portfolio of Mohamed Amin Abdel Wahed, a Software Engineer building web, mobile, and AI products.',
    homeTitle: 'Mohamed Amin — Software Engineer building web, mobile, and AI products',
  },

  a11y: {
    skipToContent: 'Skip to main content',
    mainNav: 'Main navigation',
    utilityNav: 'Site preferences',
    sectionProgress: 'Page sections',
    languageSwitcher: 'Language',
    themeToggle: 'Theme',
    modeToggle: 'Visual direction',
    openMenu: 'Open navigation',
    closeMenu: 'Close navigation',
    currentPage: 'Current page',
    currentSection: 'Current section',
    opensInNewTab: 'opens in a new tab',
    decorative: 'Decorative visual',
    readingProgress: 'Reading progress',
  },

  nav: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    skills: 'Skills',
    leadership: 'Leadership',
    contact: 'Contact',
  },

  actions: {
    exploreWork: 'Explore the work',
    seeProof: 'See the proof',
    viewCaseStudy: 'Open case file',
    viewAllProjects: 'View all projects',
    backToProjects: 'Back to projects',
    backToTop: 'Back to top',
    openGithub: 'Open GitHub profile',
    copy: 'Copy',
    copied: 'Copied',
    send: 'Send message',
    readMore: 'Read more',
  },

  theme: {
    label: 'Theme',
    dark: 'Dark',
    light: 'Light',
    switchToDark: 'Switch to dark theme',
    switchToLight: 'Switch to light theme',
  },

  mode: {
    label: 'Visual direction',
    bold: 'Bold',
    calm: 'Calm',
    hint: 'Bold is expressive and interactive. Calm is quieter and faster to read.',
    switchToBold: 'Switch to the Bold visual direction',
    switchToCalm: 'Switch to the Calm visual direction',
  },

  hero: {
    channel: 'Channel 01 — Profile',
    availabilityLabel: 'Status',
    scrollHint: 'Scroll to begin',
    signalLabel: 'Signal field',
    signalHint: 'Move the pointer across the field, or ignore it — nothing here is required to read the page.',
    telemetryLabel: 'At a glance',
  },

  sections: {
    about: { index: '02', label: 'About', title: 'Engineer, founder, team lead' },
    projects: { index: '03', label: 'Selected work', title: 'Case files' },
    skills: { index: '04', label: 'Capabilities', title: 'Capability map' },
    leadership: { index: '05', label: 'Leadership', title: 'Leadership and community' },
    mobile: { index: '06', label: 'Mobile', title: 'Mobile development' },
    ai: { index: '07', label: 'AI', title: 'AI and machine learning' },
    education: { index: '08', label: 'Education', title: 'Education and certifications' },
    contact: { index: '09', label: 'Contact', title: 'Start a conversation' },
    hero: { index: '01', label: 'Profile', title: 'Profile' },
    journey: { index: '02', label: 'Timeline', title: 'The journey so far' },
  },

  projects: {
    lede: 'Each project is a case file. Confirmed facts are shown as facts, and anything still missing is marked as pending instead of being filled in.',
    filterLabel: 'Filter by category',
    filters: {
      all: 'All',
      web: 'Web',
      mobile: 'Mobile',
      ai_ml: 'AI / ML',
      backend: 'Backend',
      product: 'Product',
      leadership: 'Leadership',
    },
    countOne: 'project',
    countMany: 'projects',
    featured: 'Featured',
    empty: 'No projects match this filter yet.',
    roleLabel: 'Role',
    stackLabel: 'Stack',
    linksLabel: 'Links',
    noLinks: 'No public links yet.',
    pendingLabel: 'Pending information',
    pendingHint: 'These fields are intentionally empty until Mohamed confirms them.',
    sourceLabel: 'Source',
    source: {
      cv: 'From CV',
      confirmed: 'Confirmed',
      pending: 'Pending',
    },
    status: {
      published: 'Published',
      coming_soon: 'Coming soon',
      in_development: 'In development',
      private: 'Private',
      pending: 'Details pending',
    },
    statusHint: {
      published: 'Live and publicly available.',
      coming_soon: 'Built, publication pending.',
      in_development: 'Actively being built.',
      private: 'Source not public.',
      pending: 'Named by Mohamed, details not supplied yet.',
    },
    caseStudy: {
      problem: 'Problem',
      solution: 'Solution',
      responsibilities: 'Responsibilities',
      challenges: 'Challenges',
      outcome: 'Outcome',
      technicalNotes: 'Technical notes',
      overview: 'Overview',
      notFound: 'That case file does not exist.',
    },
    links: {
      github: 'GitHub repository',
      live: 'Live site',
      googlePlay: 'Google Play',
      testFlight: 'TestFlight',
    },
  },

  skills: {
    lede: 'A capability map grouped by discipline. Selection is a focus indicator, not a score — each capability points at the work that backs it.',
    mapLabel: 'Capability map',
    listLabel: 'Capability list',
    keyboardHint: 'Use the arrow keys to move between disciplines, or Tab and Enter.',
    evidenceLabel: 'Evidence',
    noEvidence: 'Evidence project pending.',
    focusLabel: 'Focus',
    inCategory: 'in this discipline',
    selectDiscipline: 'Select a discipline',
  },

  leadership: {
    lede: 'Responsibility taken, in order.',
    current: 'Ongoing',
    responsibilitiesLabel: 'Responsibilities',
    timelineLabel: 'Leadership and education timeline',
  },

  education: {
    degreeLabel: 'Degree',
    certificationsLabel: 'Certifications',
    issuerLabel: 'Issuer',
    yearLabel: 'Year',
  },

  spotlight: {
    focusLabel: 'Focus areas',
    pendingLabel: 'Not confirmed yet',
    relatedLabel: 'Related work',
    deviceCaption: 'Screens pending',
    modelCaption: 'Model structure — illustrative, not a result',
  },

  contact: {
    lede: 'For questions, collaboration, or project work. Only confirmed channels are published here.',
    directLabel: 'Direct links',
    pendingLabel: 'Pending contact details',
    pendingHint: 'These channels are published once Mohamed confirms them.',
    form: {
      legend: 'Send a message',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'you@example.com',
      messagePlaceholder: 'What would you like to build or discuss?',
      required: 'Required',
      errorName: 'Please enter your name.',
      errorEmail: 'Please enter a valid email address.',
      errorMessage: 'Please write a short message.',
      errorSummary: 'The form has errors. Please review the fields below.',
      unavailableTitle: 'Message delivery is not connected yet',
      unavailableBody:
        'This form is validated but not wired to a backend, because the destination address has not been confirmed. Use the GitHub profile below in the meantime.',
    },
  },

  footer: {
    builtWith: 'Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.',
    directionNote: 'Bold visual direction.',
    localeNote: 'English, Arabic (RTL), and Swedish.',
    rights: 'All rights reserved.',
  },

  fallback: {
    badge: 'EN',
    note: 'Shown in English — translation pending.',
  },

  notFound: {
    title: 'Page not found',
    body: 'That route does not exist in this portfolio.',
    action: 'Back to the home page',
  },
}

export default en
