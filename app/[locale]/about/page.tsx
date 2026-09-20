import type { Metadata } from 'next'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { AboutSection } from '@/components/sections/about'
import { JourneySection } from '@/components/sections/journey'
import { EducationSection } from '@/components/sections/education'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = getDictionary(locale)
  return { title: t.nav.about, description: t.meta.description }
}

export default function AboutPage() {
  return (
    <>
      <AboutSection level={1} showAction={false} />
      <JourneySection />
      <EducationSection />
    </>
  )
}
