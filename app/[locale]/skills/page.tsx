import type { Metadata } from 'next'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { CapabilityMap } from '@/components/sections/capability-map'
import { SpotlightSection } from '@/components/sections/spotlight'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = getDictionary(locale)
  return { title: t.nav.skills, description: t.skills.lede }
}

export default function SkillsPage() {
  return (
    <>
      <CapabilityMap level={1} />
      <SpotlightSection id="mobile" />
      <SpotlightSection id="ai" />
    </>
  )
}
