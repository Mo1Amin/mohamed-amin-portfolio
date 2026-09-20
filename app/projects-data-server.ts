import { projectCatalog, type ProjectContent, type TranslationMap } from './content-model';
import { projectEntries, presentationFor, type ProjectEntry, type StatusId } from './projects-data';
import { getPublicProjects, type PublicProjectRow, type PublicProjectTranslation } from './lib/supabase/content-repository';

const localeKeys = ['en', 'ar', 'sv'] as const;
type LocaleKey = (typeof localeKeys)[number];

const emptyTranslation: TranslationMap = { en: '', ar: '', sv: '' };

function translationsOf(row: PublicProjectRow): Record<LocaleKey, PublicProjectTranslation | undefined> {
  return Object.fromEntries(
    localeKeys.map((locale) => [locale, row.project_translations.find((item) => item.locale === locale)]),
  ) as Record<LocaleKey, PublicProjectTranslation | undefined>;
}

/**
 * Reads one translated field across the three locales.
 *
 * A field the owner left blank stays blank: the local catalog is only consulted
 * for a locale the database has no row for at all, never to paper over a field
 * that was deliberately left empty.
 */
function field(
  rows: Record<LocaleKey, PublicProjectTranslation | undefined>,
  key: keyof Omit<PublicProjectTranslation, 'locale'>,
  fallback: TranslationMap,
): TranslationMap {
  return Object.fromEntries(
    localeKeys.map((locale) => {
      const translation = rows[locale];
      return [locale, translation ? translation[key] : fallback[locale]];
    }),
  ) as TranslationMap;
}

function remoteContent(row: PublicProjectRow, fallback: ProjectContent): ProjectContent {
  const rows = translationsOf(row);
  const links = Object.fromEntries(row.project_links.map((link) => [
    link.kind === 'google_play' ? 'googlePlay' : link.kind === 'test_flight' ? 'testFlight' : link.kind,
    link.url,
  ])) as ProjectContent['links'];

  return {
    ...fallback,
    status: row.status,
    featured: row.featured,
    order: row.sort_order,
    title: field(rows, 'title', fallback.title),
    shortSummary: field(rows, 'short_summary', fallback.shortSummary),
    role: field(rows, 'role', fallback.role),
    caseNote: field(rows, 'case_note', fallback.caseNote),
    problem: field(rows, 'problem', fallback.problem),
    solution: field(rows, 'solution', fallback.solution),
    challenges: field(rows, 'challenges', fallback.challenges),
    outcome: field(rows, 'outcome', fallback.outcome),
    technologies: [...row.project_technologies].sort((a, b) => a.sort_order - b.sort_order).map((item) => item.technology),
    links,
    media: [...row.project_media].sort((a, b) => a.sort_order - b.sort_order).map((media) => ({ id: media.id, url: media.url, type: media.kind, alt: { en: media.alt_en, ar: media.alt_ar, sv: media.alt_sv } })),
  };
}

/** A project that exists only in the database still needs a content shape. */
function blankContent(row: PublicProjectRow): ProjectContent {
  return {
    id: row.slug,
    slug: row.slug,
    title: { ...emptyTranslation },
    shortSummary: { ...emptyTranslation },
    caseNote: { ...emptyTranslation },
    role: { ...emptyTranslation },
    problem: { ...emptyTranslation },
    solution: { ...emptyTranslation },
    challenges: { ...emptyTranslation },
    outcome: { ...emptyTranslation },
    technologies: [],
    category: [],
    status: row.status,
    featured: row.featured,
    order: row.sort_order,
    links: {},
    media: [],
  };
}

/**
 * Uses Supabase when configured and populated, with the verified catalog as a
 * local fallback. A project that exists only in the database is still shown:
 * it gets neutral presentation rather than being silently dropped.
 */
export async function getPublicProjectEntries(): Promise<ProjectEntry[]> {
  const remote = await getPublicProjects();
  if (!remote?.length) return projectEntries;

  return remote.map((row) => {
    const fallback = projectCatalog.find((project) => project.slug === row.slug);
    const content = remoteContent(row, fallback ?? blankContent(row));
    return {
      slug: row.slug,
      ...presentationFor(row.slug, content.order, content.title.en),
      status: row.status as StatusId,
      content,
    };
  });
}
