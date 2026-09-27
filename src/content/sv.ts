import type { Copy } from "./types";

export const sv: Copy = {
  locale: "sv",
  dir: "ltr",
  meta: {
    title: "Mohamed Amin, fullstackutvecklare",
    description:
      "Fullstackutvecklare som bygger produkter från början till slut, från Laravel och React på webben till native Swift och Kotlin i mobilen. Grundare av Nuvink.",
  },
  ui: {
    skip: "Hoppa till innehållet",
    languageNav: "Språk",
    languages: { en: "English", ar: "العربية", sv: "Svenska" },
    themeToDark: "Byt till mörkt tema",
    themeToLight: "Byt till ljust tema",
    projectIndex: "Projekt",
    builtWith: "Byggt med",
    source: "Källkod",
  },
  hero: {
    name: "Mohamed Amin",
    role: "Fullstackutvecklare",
    lede: "Jag bygger produkter från början till slut, från Laravel och React på webben till native Swift och Kotlin i mobilen. Säkra, snabba och tillgängliga, med en interaktion som man minns.",
    primary: "Se arbetet",
    secondary: "Hör av dig",
    status: "Bor i al-Sharqia, Egypten. Öppen för distansarbete, med full överlappning med centraleuropeisk arbetstid.",
    photoAlt: "Porträtt av Mohamed Amin",
  },
  work: {
    heading: "Utvalda arbeten",
    intro: "Varje projekt visas i sina egna färger och typsnitt, så som det ser ut för dem som använder det.",
  },
  nuvink: {
    name: "Nuvink",
    role: "Grundare och huvudutvecklare",
    period: "September 2026 till nu",
    summary:
      "En app för anteckningar och e-böcker på Android och iOS. Studenter skriver för hand i sina böcker, köper krypterade titlar och samlar allt i ett bibliotek.",
    markPhrase: "skriver för hand i sina böcker",
    points: [
      "En handskriftsmotor med tryckkänslighet, utjämning, formigenkänning, suddgummi, lasso, lager, PDF-anteckningar och oändliga sidor.",
      "En app i React och TypeScript med native Swift på iOS och native Kotlin på Android, bland annat en native bokläsare med egen rityta.",
      "Krypterad PDF-leverans med nycklar per enhet och en brygga för integritetskontroll av enheten mot piratkopiering.",
      "Förstärkt radnivåsäkerhet och edge functions i Supabase, självbetjänad kontoradering och sidor för Google Plays krav.",
      "En plattform för förlag och administratörer med bokhandel, godkännande av manuella betalningar, försäljningsanalys, kontoflyttar och granskningslogg.",
    ],
    stack: "React, TypeScript, Swift, Kotlin, Capacitor, Supabase, PostgreSQL",
    metrics: [
      { value: "1 500+", label: "tidiga användare under första månaden" },
      { value: "11 → 2,9 MB", label: "lagrade sidbilder, efter att de flyttats ut ur databasen" },
      { value: "WebView 70", label: "det svaga Android-målet som appen måste flyta på" },
    ],
    markAlt: "Nuvinks logotyp: ett N av ett band som slutar i en pennspets",
    pen: {
      on: "Skriv på sidan",
      off: "Lägg ner pennan",
      clear: "Sudda bläcket",
      hintPointer: "Den här delen körs på bläckmotorn jag byggde för Nuvink. Rita var som helst på den.",
      hintTouch: "Den här delen körs på bläckmotorn jag byggde för Nuvink. Tryck på pennan och rita.",
      active: "Pennan är på. Scrollning är pausad tills du lägger ner den.",
    },
  },
  nordsur: {
    name: "Nordsur",
    role: "Bokningsplattform, fullstack",
    period: "Pågående",
    summary: "Boka båtturer och guidade turer i Malmö och Marbella, på svenska, engelska och arabiska.",
    points: [
      "Jorden visas i rymden, kameran flyger till staden och jordklotet blir en levande hamnkarta där varje rutt ritas på vattnet.",
      "Platsreservationer som inte kan överbokas, bevisat med ett samtidighetstest, med idempotenta bokningar, isolering mellan operatörer och betalningar bakom ett gränssnitt.",
      "Strikt CSP, GDPR-export och radering, ett publikt REST-API beskrivet med OpenAPI och ett WordPress-plugin med kortkod och Gutenberg-block.",
    ],
    stack: "Laravel 12, Vue 3, TypeScript, Inertia, SCSS, MySQL, MapLibre GL",
    visualAlt: "Nordsurs karta som flyger mellan Malmö och Marbella och visar varje stads båtturer",
  },
  masar: {
    name: "Masar",
    role: "Teamledare och teknisk ansvarig",
    period: "Examensprojekt, 2026",
    summary: "En träning- och hälsoapp för Android och iOS, byggd i Flutter kring en maskininlärningsmodell.",
    meaning: "Masar betyder väg på arabiska.",
    points: [
      "Jag ledde teamet och fattade de tekniska besluten, från hur appen är uppbyggd till hur modellen passar in.",
      "Projektet fick betyget A+.",
    ],
    stack: "Flutter, Dart, maskininlärning",
  },
  loty: {
    name: "Loty",
    role: "Fullstack-webbapp",
    period: "Eget projekt",
    summary:
      "Titta på vad som helst tillsammans, på samma sekund: YouTube, Vimeo, direktlänkar, lokala filer eller en direktsändning av valfri flik.",
    points: [
      "Uppspelningen följer serverns klocka, som NTP gör. Liten avvikelse stängs genom att försiktigt snabba upp eller sakta ner, aldrig genom hopp.",
      "Röstchatt som sänker videon när någon pratar, Three.js-reaktioner som landar på allas skärmar samtidigt och omgivningsljus hämtat från videons kanter.",
      "Rum för upp till 12 personer, värdkontroller, återanslutning utan att tappa platsen, QR-inbjudningar och en installerbar app.",
    ],
    stack: "React, TypeScript, Vite, Node.js, Socket.IO, WebRTC, Three.js",
    links: [{ href: "https://github.com/Mo1Amin/Loty", label: "Loty på GitHub" }],
    drift: { value: "0,01–0,03 s", label: "mellan tittarna, uppmätt i två webbläsare" },
    visualAlt: "En Loty-spelare med omgivningsljus och tre tittares uppspelningsmarkörer nästan ovanpå varandra",
  },
  acm: {
    name: "SU ACM Student Chapter",
    role: "Grundare",
    period: "Sinai University",
    summary: "Jag grundade ACM:s studentavdelning vid Sinai University och byggde dess webbplats och adminpanel.",
    points: [
      "En startsida med en interaktiv partikelsfär i three.js, ljust och mörkt tema och en layout som utgår från mobilen.",
      "En adminpanel för spår, evenemang, fotoalbum, teamet och en vinnartavla för tävlingar, med kakfri statistik och en värmekarta över de mest besökta timmarna.",
      "Lösenord med Argon2id, obligatorisk tvåstegsinloggning för administratörer, CSRF-skydd, strikt CSP, roller och en fullständig granskningslogg, kontrollerat av 39 Playwright-tester.",
    ],
    stack: "Node.js, Express, MariaDB, EJS, Tailwind CSS, three.js",
    links: [
      { href: "https://su.acm.org", label: "Besök su.acm.org" },
      { href: "https://github.com/Mo1Amin/acm-sinai-website", label: "Källkod på GitHub" },
    ],
    visualAlt: "ACM Sinais webbplats på en dator i mörkt läge och på en mobil i ljust läge",
  },
  more: {
    heading: "Mer på GitHub",
    items: [
      {
        name: "Meqat",
        summary: "En bönetidswidget för Windows: fungerar offline, med azan och en ikon i systemfältet. Tauri (Rust) och React.",
        href: "https://github.com/Mo1Amin/Meqat-Widget",
      },
      {
        name: "Munazzami",
        summary: "En arabisk studieplanerare med kalender, prioriterade uppgifter och diagram över framstegen.",
        href: "https://mo1amin.github.io/study-planner/",
      },
      {
        name: "Shifa Hospital",
        summary: "En sjukhuswebbplats från höger till vänster med ljust och mörkt tema.",
        href: "https://mo1amin.github.io/shifa-hospital-website/",
      },
      {
        name: "Emoji Breakout",
        summary: "Ett arkadspel på canvas med nivåer, ljud och pekkontroller.",
        href: "https://mo1amin.github.io/emoji-breakout/",
      },
    ],
  },
  principles: {
    heading: "Så arbetar jag",
    items: [
      {
        title: "Ett minnesvärt ögonblick, sedan ur vägen",
        body: "Varje produkt får en enda signaturinteraktion som hör ihop med vad den gör. Allt runt omkring är lugnt, snabbt och tillgängligt, med ett alternativ för reducerad rörelse och svaga enheter.",
      },
      {
        title: "Säkerhet är en del av bygget",
        body: "Radnivåsäkerhet, krypterad leverans, strikt CSP och granskningsloggar kommer med i första migreringen, inte efter lanseringen.",
      },
      {
        title: "Mät på den sämsta enheten",
        body: "Nuvink körs i en Android WebView från 2018. Flyter det där, flyter det överallt.",
      },
      {
        title: "AI som ett team, med en ledare",
        body: "Jag arbetar med AI-kodagenter som en ledare arbetar med ett team: varje agent får en skriven uppgift, ett eget spår och en granskning. Typkontroll, tester och en riktig körning på enheten kommer innan något kallas klart.",
      },
    ],
  },
  toolkit: {
    heading: "Verktyg",
    groups: [
      {
        name: "Webb",
        items: "PHP, Laravel, WordPress, HTML, CSS, Sass, JavaScript, TypeScript, React, Vue, Inertia, Next.js, Vite, REST API:er, OpenAPI",
      },
      { name: "Mobil", items: "Swift, Kotlin, Flutter, Capacitor" },
      { name: "Data och plattform", items: "MySQL, MariaDB, PostgreSQL, Supabase, radnivåsäkerhet, edge functions, Node.js, Linux" },
      {
        name: "AI",
        items: "Claude Code, Codex, arbete med flera agenter, prompt- och kontextdesign, vibe coding, integration av maskininlärningsmodeller",
      },
      { name: "Kvalitet och leverans", items: "Git, GitHub Actions, Jira, enhets-, helhets- och manuella tester, Playwright, Selenium" },
      { name: "Även", items: "Java, Python, C++, Rust med Tauri" },
    ],
  },
  background: {
    heading: "Bakgrund",
    milestones: [
      { when: "2022", what: "Började en kandidatexamen i informationsteknik och datavetenskap vid Sinai University i Arish." },
      { when: "2024", what: "Certifikat i mjukvarutestning och kvalitet från ITI och i frontendutveckling från Hasoub Academy." },
      { when: "2026", what: "Tog examen efter att ha lett examensprojektet Masar till ett A+." },
      { when: "Sep 2026", what: "Grundade Nuvink och nådde över 1 500 tidiga användare den första månaden." },
    ],
    languagesHeading: "Språk",
    languages: ["Arabiska, modersmål", "Engelska, professionell arbetsnivå", "Svenska, lär mig just nu"],
  },
  contact: {
    heading: "Hör av dig",
    body: "Jag är öppen för heltidsroller på distans och frilansprojekt. Mejl eller WhatsApp är snabbast.",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    github: "GitHub",
  },
  footer: "Designad och byggd av Mohamed Amin.",
};
