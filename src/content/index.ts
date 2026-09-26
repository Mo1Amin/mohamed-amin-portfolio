import { ar } from "./ar";
import { en } from "./en";
import { sv } from "./sv";
import { locales, type Copy, type Locale } from "./types";

const copies: Record<Locale, Copy> = { en, ar, sv };

export function copyFor(locale: Locale): Copy {
  return copies[locale];
}

export function pathFor(locale: Locale): string {
  return locale === "en" ? "/" : `/${locale}/`;
}

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}

export { locales };
export type { Copy, Locale };
