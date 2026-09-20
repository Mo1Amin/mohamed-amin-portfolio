'use client'

import { usePreferences } from '@/components/providers/preferences'
import { featuredProjects } from '@/content/projects'
import { localePath } from '@/lib/routes'
import { Section, SectionHeader } from '@/components/ui/section'
import { ActionLink } from '@/components/ui/action-link'
import { ProjectRow } from '@/components/projects/project-row'

export function FeaturedProjects() {
  const { locale, t } = usePreferences()
  const ordered = [...featuredProjects].sort((a, b) => a.order - b.order)

  return (
    <Section id="projects" className="border-t border-line">
      <div className="shell flex flex-col gap-12">
        <SectionHeader
          id="projects"
          index={t.sections.projects.index}
          label={t.sections.projects.label}
          title={t.sections.projects.title}
          lede={t.projects.lede}
          action={
            <ActionLink href={localePath(locale, '/projects')} variant="ghost">
              {t.actions.viewAllProjects}
            </ActionLink>
          }
        />

        <ul className="flex flex-col border-b border-line">
          {ordered.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </ul>
      </div>
    </Section>
  )
}
