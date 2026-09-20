import type en from './en'

/**
 * Swedish interface dictionary (LTR).
 * docs/PROJECT_DATA.md lists a Swedish review by Mohamed as outstanding.
 */
const sv: typeof en = {
  meta: {
    title: 'Mohamed Amin — mjukvaruingenjör',
    description:
      'Portfolio för Mohamed Amin Abdel Wahed, en mjukvaruingenjör som bygger produkter för webb, mobil och AI.',
    homeTitle: 'Mohamed Amin — mjukvaruingenjör som bygger produkter för webb, mobil och AI',
  },

  a11y: {
    skipToContent: 'Hoppa till huvudinnehållet',
    mainNav: 'Huvudnavigering',
    utilityNav: 'Inställningar för webbplatsen',
    sectionProgress: 'Sidans avsnitt',
    languageSwitcher: 'Språk',
    themeToggle: 'Tema',
    modeToggle: 'Visuell riktning',
    openMenu: 'Öppna navigeringen',
    closeMenu: 'Stäng navigeringen',
    currentPage: 'Aktuell sida',
    currentSection: 'Aktuellt avsnitt',
    opensInNewTab: 'öppnas i en ny flik',
    decorative: 'Dekorativ grafik',
    readingProgress: 'Läsförlopp',
  },

  nav: {
    home: 'Start',
    about: 'Om',
    projects: 'Projekt',
    skills: 'Färdigheter',
    leadership: 'Ledarskap',
    contact: 'Kontakt',
  },

  actions: {
    exploreWork: 'Utforska arbetet',
    seeProof: 'Se beviset',
    viewCaseStudy: 'Öppna projektakten',
    viewAllProjects: 'Visa alla projekt',
    backToProjects: 'Tillbaka till projekten',
    backToTop: 'Till toppen',
    openGithub: 'Öppna GitHub-profilen',
    copy: 'Kopiera',
    copied: 'Kopierat',
    send: 'Skicka meddelande',
    readMore: 'Läs mer',
  },

  theme: {
    label: 'Tema',
    dark: 'Mörkt',
    light: 'Ljust',
    switchToDark: 'Byt till mörkt tema',
    switchToLight: 'Byt till ljust tema',
  },

  mode: {
    label: 'Visuell riktning',
    bold: 'Djärv',
    calm: 'Lugn',
    hint: 'Djärv är uttrycksfull och interaktiv. Lugn är tystare och snabbare att läsa.',
    switchToBold: 'Byt till den djärva riktningen',
    switchToCalm: 'Byt till den lugna riktningen',
  },

  hero: {
    channel: 'Kanal 01 — Profil',
    availabilityLabel: 'Status',
    scrollHint: 'Scrolla för att börja',
    signalLabel: 'Signalfält',
    signalHint: 'Rör pekaren över fältet, eller strunta i det — inget här krävs för att läsa sidan.',
    telemetryLabel: 'I korthet',
  },

  sections: {
    about: { index: '02', label: 'Om', title: 'Ingenjör, grundare, teamledare' },
    projects: { index: '03', label: 'Utvalt arbete', title: 'Projektakter' },
    skills: { index: '04', label: 'Förmågor', title: 'Förmågekarta' },
    leadership: { index: '05', label: 'Ledarskap', title: 'Ledarskap och gemenskap' },
    mobile: { index: '06', label: 'Mobil', title: 'Mobilutveckling' },
    ai: { index: '07', label: 'AI', title: 'AI och maskininlärning' },
    education: { index: '08', label: 'Utbildning', title: 'Utbildning och certifikat' },
    contact: { index: '09', label: 'Kontakt', title: 'Starta ett samtal' },
    hero: { index: '01', label: 'Profil', title: 'Profil' },
    journey: { index: '02', label: 'Tidslinje', title: 'Resan hittills' },
  },

  projects: {
    lede: 'Varje projekt är en akt. Bekräftade fakta visas som fakta, och det som saknas markeras som pågående i stället för att fyllas i.',
    filterLabel: 'Filtrera på kategori',
    filters: {
      all: 'Alla',
      web: 'Webb',
      mobile: 'Mobil',
      ai_ml: 'AI / ML',
      backend: 'Backend',
      product: 'Produkt',
      leadership: 'Ledarskap',
    },
    countOne: 'projekt',
    countMany: 'projekt',
    featured: 'Utvalt',
    empty: 'Inga projekt matchar filtret ännu.',
    roleLabel: 'Roll',
    stackLabel: 'Teknik',
    linksLabel: 'Länkar',
    noLinks: 'Inga publika länkar ännu.',
    pendingLabel: 'Uppgifter som saknas',
    pendingHint: 'Fälten lämnas medvetet tomma tills Mohamed bekräftar dem.',
    sourceLabel: 'Källa',
    source: {
      cv: 'Från CV',
      confirmed: 'Bekräftat',
      pending: 'Saknas',
    },
    status: {
      published: 'Publicerad',
      coming_soon: 'Kommer snart',
      in_development: 'Under utveckling',
      private: 'Privat',
      pending: 'Detaljer saknas',
    },
    statusHint: {
      published: 'Live och offentligt tillgänglig.',
      coming_soon: 'Byggd, publicering återstår.',
      in_development: 'Byggs just nu.',
      private: 'Källkoden är inte offentlig.',
      pending: 'Namngiven av Mohamed, detaljer saknas.',
    },
    caseStudy: {
      problem: 'Problem',
      solution: 'Lösning',
      responsibilities: 'Ansvar',
      challenges: 'Utmaningar',
      outcome: 'Resultat',
      technicalNotes: 'Tekniska noteringar',
      overview: 'Översikt',
      notFound: 'Den akten finns inte.',
    },
    links: {
      github: 'GitHub-repo',
      live: 'Live-sida',
      googlePlay: 'Google Play',
      testFlight: 'TestFlight',
    },
  },

  skills: {
    lede: 'En förmågekarta grupperad per disciplin. Markeringen är en fokusindikator, inte ett betyg — varje förmåga pekar på arbetet bakom den.',
    mapLabel: 'Förmågekarta',
    listLabel: 'Förmågelista',
    keyboardHint: 'Använd piltangenterna för att byta disciplin, eller Tab och Enter.',
    evidenceLabel: 'Bevis',
    noEvidence: 'Bevisprojekt saknas ännu.',
    focusLabel: 'Fokus',
    inCategory: 'i denna disciplin',
    selectDiscipline: 'Välj en disciplin',
  },

  leadership: {
    lede: 'Ansvar som tagits, i ordning.',
    current: 'Pågående',
    responsibilitiesLabel: 'Ansvar',
    timelineLabel: 'Tidslinje för ledarskap och utbildning',
  },

  education: {
    degreeLabel: 'Examen',
    certificationsLabel: 'Certifikat',
    issuerLabel: 'Utfärdare',
    yearLabel: 'År',
  },

  spotlight: {
    focusLabel: 'Fokusområden',
    pendingLabel: 'Inte bekräftat ännu',
    relatedLabel: 'Relaterat arbete',
    deviceCaption: 'Skärmar saknas',
    modelCaption: 'Modellstruktur — illustrativ, inte ett resultat',
  },

  contact: {
    lede: 'För frågor, samarbete eller projektarbete. Endast bekräftade kanaler publiceras här.',
    directLabel: 'Direktlänkar',
    pendingLabel: 'Kontaktuppgifter som saknas',
    pendingHint: 'Kanalerna publiceras när Mohamed har bekräftat dem.',
    form: {
      legend: 'Skicka ett meddelande',
      name: 'Namn',
      email: 'E-post',
      message: 'Meddelande',
      namePlaceholder: 'Ditt namn',
      emailPlaceholder: 'du@exempel.se',
      messagePlaceholder: 'Vad vill du bygga eller diskutera?',
      required: 'Obligatoriskt',
      errorName: 'Skriv ditt namn.',
      errorEmail: 'Ange en giltig e-postadress.',
      errorMessage: 'Skriv ett kort meddelande.',
      errorSummary: 'Formuläret innehåller fel. Se fälten nedan.',
      unavailableTitle: 'Meddelanden skickas inte ännu',
      unavailableBody:
        'Formuläret valideras men är inte kopplat till någon backend, eftersom mottagaradressen inte är bekräftad. Använd GitHub-profilen nedan under tiden.',
    },
  },

  footer: {
    builtWith: 'Byggd med Next.js, TypeScript, Tailwind CSS och Framer Motion.',
    directionNote: 'Djärv visuell riktning.',
    localeNote: 'Engelska, arabiska (RTL) och svenska.',
    rights: 'Alla rättigheter förbehållna.',
  },

  fallback: {
    badge: 'EN',
    note: 'Visas på engelska — översättning saknas.',
  },

  notFound: {
    title: 'Sidan hittades inte',
    body: 'Den sökvägen finns inte i portfolion.',
    action: 'Tillbaka till startsidan',
  },
}

export default sv
