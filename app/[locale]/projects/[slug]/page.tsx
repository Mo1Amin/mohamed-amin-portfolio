import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, locales } from '@/i18n/config'
import { getProjectBySlug, projects } from '@/content/projects'
import { tr } from '@/lib/i18n'
import { CaseStudy } from '@/components/projects/case-study'

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const project = getProjectBySlug(slug)
  if (!project) return {}

  return {
    title: tr(project.title, locale),
    description: tr(project.shortSummary, locale),
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()

  const project = getProjectBySlug(slug)
  if (!project) notFound()

  return <CaseStudy project={project} />
}
