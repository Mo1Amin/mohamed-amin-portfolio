import type { Metadata } from 'next'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { ContactSection } from '@/components/sections/contact'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = getDictionary(locale)
  return { title: t.nav.contact, description: t.contact.lede }
}

export default function ContactPage() {
  return <ContactSection level={1} />
}
