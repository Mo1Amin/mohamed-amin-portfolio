export type Locale = "en" | "ar" | "sv";

export const locales: Locale[] = ["en", "ar", "sv"];

export interface Metric {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  name: string;
  role: string;
  period: string;
  summary: string;
  details: string[];
  stack: string;
  link?: { href: string; label: string };
}

export interface Principle {
  title: string;
  body: string;
}

export interface Milestone {
  when: string;
  what: string;
}

export interface Copy {
  locale: Locale;
  dir: "ltr" | "rtl";
  meta: { title: string; description: string };
  ui: {
    skip: string;
    languageNav: string;
    languages: Record<Locale, string>;
    themeToDark: string;
    themeToLight: string;
    penOn: string;
    penOff: string;
    clearInk: string;
    penHintPointer: string;
    penHintTouch: string;
    penActive: string;
    viewSource: string;
  };
  hero: {
    name: string;
    role: string;
    ledeBefore: string;
    ledeMark: string;
    ledeAfter: string;
    primary: string;
    secondary: string;
    status: string;
  };
  work: {
    heading: string;
    intro: string;
    flagship: Project & { metrics: Metric[]; markAlt: string };
    others: Project[];
  };
  principles: { heading: string; items: Principle[] };
  toolkit: { heading: string; groups: { name: string; items: string }[] };
  background: {
    heading: string;
    milestones: Milestone[];
    leadershipHeading: string;
    leadership: string;
    languagesHeading: string;
    languages: string[];
  };
  contact: {
    heading: string;
    body: string;
    emailLabel: string;
    github: string;
  };
  footer: string;
}
