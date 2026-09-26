import { notFound } from "next/navigation";
import { Portfolio } from "@/components/Portfolio";
import { isLocale } from "@/content";

export default async function LocalizedHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Portfolio locale={locale} />;
}
