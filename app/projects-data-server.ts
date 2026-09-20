import { projectCatalog, type ProjectContent } from './content-model';
import { projectEntries, type ProjectEntry } from './projects-data';
import { getPublicProjects, type PublicProjectRow } from './lib/supabase/content-repository';

const localeKeys = ['en', 'ar', 'sv'] as const;

function remoteContent(row: PublicProjectRow, fallback: ProjectContent): ProjectContent {
  const translations = Object.fromEntries(localeKeys.map((locale) => {
    const found = row.project_translations.find((item) => item.locale === locale);
    return [locale, found ?? { title: fallback.title[locale], short_summary: fallback.shortSummary[locale], role: fallback.role[locale], case_note: fallback.caseNote[locale] }];
  })) as Record<typeof localeKeys[number], { title: string; short_summary: string; role: string; case_note: string }>;
  const links = Object.fromEntries(row.project_links.map((link) => [
    link.kind === 'google_play' ? 'googlePlay' : link.kind === 'test_flight' ? 'testFlight' : link.kind,
    link.url,
  ])) as ProjectContent['links'];
  return {
    ...fallback,
    status: row.status,
    featured: row.featured,
    order: row.sort_order,
    title: Object.fromEntries(localeKeys.map((locale) => [locale, translations[locale].title])) as ProjectContent['title'],
    shortSummary: Object.fromEntries(localeKeys.map((locale) => [locale, translations[locale].short_summary])) as ProjectContent['shortSummary'],
    role: Object.fromEntries(localeKeys.map((locale) => [locale, translations[locale].role])) as ProjectContent['role'],
    caseNote: Object.fromEntries(localeKeys.map((locale) => [locale, translations[locale].case_note])) as ProjectContent['caseNote'],
    technologies: row.project_technologies.sort((a, b) => a.sort_order - b.sort_order).map((item) => item.technology),
    links,
    media: row.project_media.sort((a, b) => a.sort_order - b.sort_order).map((media) => ({ id: media.id, url: media.url, type: media.kind, alt: { en: media.alt_en, ar: media.alt_ar, sv: media.alt_sv } })),
  };
}

/** Uses Supabase when configured and populated, with the verified catalog as a local fallback. */
export async function getPublicProjectEntries(): Promise<ProjectEntry[]> {
  const remote = await getPublicProjects();
  if (!remote?.length) return projectEntries;
  return remote.flatMap((row) => {
    const fallback = projectCatalog.find((project) => project.slug === row.slug);
    const presentation = projectEntries.find((project) => project.slug === row.slug);
    if (!fallback || !presentation) return [];
    return [{ ...presentation, content: remoteContent(row, fallback) }];
  });
}
