import type { Metadata } from 'next'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { LeadershipSection } from '@/components/sections/leadership'
import { JourneySection } from '@/components/sections/journey'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = getDictionary(locale)
  return { title: t.nav.leadership, description: t.leadership.lede }
}

export default function LeadershipPage() {
  return (
    <>
      <LeadershipSection level={1} showAction={false} />
      <JourneySection />
    </>
  )
}
