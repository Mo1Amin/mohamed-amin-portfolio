import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { isLocale } from "@/content";
import { Document, metadataFor } from "../document";

type Params = Promise<{ locale: string }>;

export { viewport } from "../document";
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "sv" }];
}

export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params;
  return isLocale(locale) ? metadataFor(locale) : {};
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Document locale={locale}>{children}</Document>;
}
