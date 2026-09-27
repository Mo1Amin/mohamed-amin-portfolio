export type Locale = "en" | "ar" | "sv";

export const locales: Locale[] = ["en", "ar", "sv"];

export interface Metric {
  value: string;
  label: string;
}

export interface Link {
  href: string;
  label: string;
}

export interface Project {
  name: string;
  role: string;
  period: string;
  summary: string;
  points: string[];
  stack: string;
  links?: Link[];
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
    projectIndex: string;
    builtWith: string;
    source: string;
  };
  hero: {
    name: string;
    role: string;
    lede: string;
    primary: string;
    secondary: string;
    status: string;
    photoAlt: string;
  };
  work: {
    heading: string;
    intro: string;
  };
  nuvink: Project & {
    metrics: Metric[];
    markAlt: string;
    markPhrase: string;
    pen: {
      on: string;
      off: string;
      clear: string;
      hintPointer: string;
      hintTouch: string;
      active: string;
    };
  };
  nordsur: Project & { visualAlt: string };
  loty: Project & { drift: Metric; visualAlt: string };
  masar: Project & { meaning: string };
  acm: Project & { visualAlt: string };
  more: { heading: string; items: { name: string; summary: string; href: string }[] };
  principles: { heading: string; items: Principle[] };
  toolkit: { heading: string; groups: { name: string; items: string }[] };
  background: {
    heading: string;
    milestones: Milestone[];
    languagesHeading: string;
    languages: string[];
  };
  contact: {
    heading: string;
    body: string;
    whatsapp: string;
    instagram: string;
    github: string;
  };
  footer: string;
}
