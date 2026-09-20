import type { Metadata } from 'next'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { PageIntro } from '@/components/layout/page-intro'
import { ProjectIndex } from '@/components/projects/project-index'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = getDictionary(locale)
  return { title: t.nav.projects, description: t.projects.lede }
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = getDictionary(isLocale(locale) ? locale : 'en')

  return (
    <>
      <PageIntro
        index={t.sections.projects.index}
        label={t.sections.projects.label}
        title={t.sections.projects.title}
        lede={t.projects.lede}
      />
      <div className="shell py-14 md:py-20">
        <ProjectIndex />
      </div>
    </>
  )
}
