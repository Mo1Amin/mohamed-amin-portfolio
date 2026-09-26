import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import type { ReactNode } from "react";
import { copyFor, locales, pathFor, type Locale } from "@/content";
import { themeScript } from "@/components/ThemeToggle";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "wdth"],
});

const text = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-text",
  display: "swap",
});

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const siteUrl = "https://mo1amin.github.io/mohamed-amin-portfolio";

export function metadataFor(locale: Locale): Metadata {
  const { meta } = copyFor(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${siteUrl}${pathFor(locale)}`,
      languages: Object.fromEntries(locales.map((code) => [code, `${siteUrl}${pathFor(code)}`])),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${siteUrl}${pathFor(locale)}`,
      type: "profile",
      locale,
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f4f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1424" },
  ],
};

export function Document({ locale, children }: { locale: Locale; children: ReactNode }) {
  const { dir } = copyFor(locale);
  return (
    <html
      lang={locale}
      dir={dir}
      className={`${display.variable} ${text.variable} ${arabic.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
