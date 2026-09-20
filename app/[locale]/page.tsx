import type { Metadata } from 'next'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { SectionRail } from '@/components/layout/section-rail'
import { Hero } from '@/components/sections/hero'
import { ProofStrip } from '@/components/sections/proof-strip'
import { AboutSection } from '@/components/sections/about'
import { FeaturedProjects } from '@/components/sections/featured-projects'
import { CapabilityMap } from '@/components/sections/capability-map'
import { LeadershipSection } from '@/components/sections/leadership'
import { SpotlightSection } from '@/components/sections/spotlight'
import { EducationSection } from '@/components/sections/education'
import { ContactSection } from '@/components/sections/contact'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = getDictionary(locale)
  return { title: { absolute: t.meta.homeTitle }, description: t.meta.description }
}

export default function HomePage() {
  return (
    <>
      <SectionRail />
      <Hero />
      <ProofStrip />
      <AboutSection />
      <FeaturedProjects />
      <CapabilityMap />
      <LeadershipSection />
      <SpotlightSection id="mobile" />
      <SpotlightSection id="ai" />
      <EducationSection />
      <ContactSection />
    </>
  )
}
