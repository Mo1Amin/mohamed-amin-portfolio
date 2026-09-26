import type { Copy } from "./types";

export const sv: Copy = {
  locale: "sv",
  dir: "ltr",
  meta: {
    title: "Mohamed Amin, fullstackutvecklare för webben",
    description:
      "Fullstackutvecklare som bygger designdrivna produkter med Laravel, Vue, React och TypeScript. Grundare och huvudutvecklare av Nuvink.",
  },
  ui: {
    skip: "Hoppa till innehållet",
    languageNav: "Språk",
    languages: { en: "English", ar: "العربية", sv: "Svenska" },
    themeToDark: "Byt till mörkt tema",
    themeToLight: "Byt till ljust tema",
    penOn: "Rita på sidan",
    penOff: "Sluta rita",
    clearInk: "Sudda bläcket",
    penHintPointer: "Det här är bläckmotorn jag byggde för Nuvink. Rita var som helst här uppe.",
    penHintTouch: "Det här är bläckmotorn jag byggde för Nuvink. Tryck på pennan och rita.",
    penActive: "Pennan är på. Scrollning är pausad tills du lägger ner den.",
    viewSource: "Källkod på GitHub",
  },
  hero: {
    name: "Mohamed Amin",
    role: "Fullstackutvecklare för webben",
    ledeBefore:
      "Jag bygger designdrivna produkter med Laravel, Vue, React och TypeScript. Säkra, snabba och tillgängliga, med ",
    ledeMark: "en interaktion som man minns",
    ledeAfter: ".",
    primary: "Se arbetet",
    secondary: "Mejla mig",
    status: "Bor i al-Sharqia, Egypten. Öppen för distansarbete, med full överlappning med centraleuropeisk arbetstid.",
  },
  work: {
    heading: "Utvalda arbeten",
    intro: "En produkt i användarnas händer, en plattform under arbete och projekten som ledde hit.",
    flagship: {
      id: "nuvink",
      name: "Nuvink",
      role: "Grundare och huvudutvecklare",
      period: "September 2026 till nu",
      summary:
        "En app för anteckningar och e-böcker på Android och iOS. Studenter skriver för hand i sina böcker, köper krypterade titlar och samlar allt i ett bibliotek.",
      details: [
        "En handskriftsmotor med tryckkänslighet, utjämning, formigenkänning, suddgummi, lasso, lager, PDF-anteckningar och oändliga sidor.",
        "Krypterad PDF-leverans med nycklar per enhet och en brygga för integritetskontroll av Android-enheter mot piratkopiering.",
        "Förstärkt radnivåsäkerhet och edge functions i Supabase, självbetjänad kontoradering och sidor för Google Plays krav.",
        "En plattform för förlag och administratörer med bokhandel, godkännande av manuella betalningar, försäljningsanalys, kontoflyttar och granskningslogg.",
        "Ledde varumärkesbytet och samordnade flera AI-kodagenter genom uppgiftsfiler, kodgranskning och kvalitetsgrindar.",
      ],
      stack: "React, TypeScript, Capacitor, Supabase, PostgreSQL, Android (Java)",
      metrics: [
        { value: "1 500+", label: "tidiga användare under första månaden" },
        { value: "11 → 2,9 MB", label: "lagrade sidbilder, efter att de flyttats ut ur databasen" },
        { value: "WebView 70", label: "det svaga Android-målet som appen måste flyta på" },
      ],
      markAlt: "Nuvinks logotyp: ett N av ett band som slutar i en pennspets",
    },
    others: [
      {
        id: "nordsur",
        name: "Nordsur",
        role: "Bokningsplattform, fullstack",
        period: "Pågående",
        summary: "En bokningsplattform för båtturer och guidade turer i Malmö och Marbella, på svenska, engelska och arabiska.",
        details: [
          "Platsreservationer som inte kan överbokas, bevisat med ett samtidighetstest. Idempotenta bokningar, isolering mellan kunder, betalningar bakom ett gränssnitt, strikt CSP samt GDPR-export och radering.",
          "Jorden visas i rymden, kameran flyger till staden och jordklotet blir en levande hamnkarta där varje rutt ritas på vattnet. Vägar för reducerad rörelse och utan WebGL gör den användbar för alla.",
        ],
        stack: "Laravel 12, Vue 3, TypeScript, Inertia, MySQL, OpenAPI, WordPress-plugin",
      },
      {
        id: "loty",
        name: "Loty",
        role: "Fullstack-webbapp",
        period: "Eget projekt",
        summary: "En tittarfest som håller allas video i synk, med livevideochatt mellan tittarna.",
        details: [
          "Socket.IO håller uppspelningen i takt, ett WebRTC-nät bär videochatten och Three.js-scenen laddas bara när den behövs. CI körs i GitHub Actions.",
        ],
        stack: "React, TypeScript, Vite, Node.js, Socket.IO, WebRTC, Three.js",
        link: { href: "https://github.com/Mo1Amin/Loty", label: "Loty på GitHub" },
      },
      {
        id: "graduation",
        name: "Träning- och hälsoapp med maskininlärning",
        role: "Teamledare och teknisk ansvarig",
        period: "Examensprojekt, 2026",
        summary:
          "En mobilapp i Flutter med en maskininlärningsmodell för träning och hälsa. Jag ledde teamet och de tekniska besluten, och projektet fick betyget A+.",
        details: [],
        stack: "Flutter, maskininlärning",
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
        title: "Grindar före klart",
        body: "Typkontroll, tester och en riktig körning på enheten innan något kallas klart. Samma grindar gäller när jag samordnar AI-kodagenter.",
      },
    ],
  },
  toolkit: {
    heading: "Verktyg",
    groups: [
      {
        name: "Webb",
        items: "PHP, Laravel, WordPress, HTML, CSS, Sass, JavaScript, TypeScript, React, Vue, Inertia, Vite, REST API:er, OpenAPI",
      },
      { name: "Data och plattform", items: "MySQL, PostgreSQL, Supabase, radnivåsäkerhet, edge functions, Linux" },
      { name: "Kvalitet och leverans", items: "Git, GitHub, Jira, enhetstester, manuella och automatiserade tester, Selenium, CI" },
      { name: "Även", items: "Java, Python, C++, Flutter" },
    ],
  },
  background: {
    heading: "Bakgrund",
    milestones: [
      { when: "2022", what: "Började en kandidatexamen i informationsteknik och datavetenskap vid Sinai University i Arish." },
      { when: "2024", what: "Certifikat i mjukvarutestning och kvalitet från ITI och i frontendutveckling från Hasoub Academy." },
      { when: "2026", what: "Tog examen efter att ha lett examensprojektet till ett A+." },
      { when: "Sep 2026", what: "Grundade Nuvink och nådde över 1 500 tidiga användare den första månaden." },
    ],
    leadershipHeading: "Ledarskap",
    leadership:
      "Grundare av studentavdelningen SU ACM vid Sinai University, ansvarig för dess officiella webbplats och webbaktiviteter.",
    languagesHeading: "Språk",
    languages: ["Arabiska, modersmål", "Engelska, professionell arbetsnivå", "Svenska, lär mig just nu"],
  },
  contact: {
    heading: "Hör av dig",
    body: "Jag är öppen för heltidsroller på distans och frilansprojekt. Mejl är det snabbaste sättet att nå mig.",
    emailLabel: "mohmedamin1998@gmail.com",
    github: "GitHub",
  },
  footer: "Bläcket på den här sidan använder samma utjämning som Nuvinks rityta.",
};
