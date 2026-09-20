/**
 * Structural project data: one source for the landing page, the projects route
 * and the case-study routes, which previously each kept their own copy of it.
 *
 * Order matches the localized arrays in `copy.ts` (projects, summaries, tags,
 * roles), so index 0 here is index 0 there.
 *
 * Categories and links follow docs/PROJECT_DATA.md. Links stay empty until
 * Mohamed confirms them. Publication status is never duplicated here: it comes
 * from the content record, so a status changed in the admin workspace is the
 * status the public pages show.
 */
import {projectCatalog, type ProjectContent} from './content-model';

export type Tone = 'mint' | 'violet' | 'blue' | 'lime';
export type Category = 'web' | 'mobile';
/** The statuses a reader can encounter. `private` never reaches a public page. */
export type StatusId = 'published' | 'coming_soon' | 'in_development';

export type ProjectPresentation = {
  number: string;
  symbol: string;
  /** The word printed across the artwork on the landing page. */
  word: string;
  tone: Tone;
  categories: Category[];
};

export type ProjectEntry = ProjectPresentation & {
  slug: string;
  status: StatusId;
  content: ProjectContent;
};

export const presentation: Record<string, ProjectPresentation> = {
  'med-notes': { number: '01', symbol: 'm / n', word: 'MED NOTES', tone: 'mint', categories: ['mobile'] },
  myqat: { number: '02', symbol: 'مـ', word: 'MYQAT', tone: 'violet', categories: ['web'] },
  'su-acm-website': { number: '03', symbol: 'acm', word: 'COMMUNITY, CONNECTED.', tone: 'blue', categories: ['web'] },
  'graduation-ml-fitness-health': { number: '04', symbol: '✳', word: 'HUMAN × MACHINE', tone: 'lime', categories: ['mobile'] },
};

const tones: Tone[] = ['mint', 'violet', 'blue', 'lime'];

/**
 * A project created in the admin workspace has no artwork of its own yet.
 * Rather than dropping it from the public site, it gets neutral presentation
 * derived from its own slug and order — no invented copy, only layout.
 */
export function presentationFor(slug: string, order: number, title: string): ProjectPresentation {
  const known = presentation[slug];
  if (known) return known;
  return {
    number: String(order).padStart(2, '0'),
    symbol: (title.trim()[0] ?? '·').toUpperCase(),
    word: title.toUpperCase(),
    tone: tones[Math.abs(order - 1) % tones.length]!,
    categories: [],
  };
}

export function toPublicStatus(status: ProjectContent['status']): StatusId | null {
  return status === 'private' ? null : status;
}

/** Public project queries exclude private records by construction. */
export const projectEntries: ProjectEntry[] = projectCatalog
  .filter((content) => content.status !== 'private')
  .map((content) => ({
    slug: content.slug,
    ...presentationFor(content.slug, content.order, content.title.en),
    status: content.status as StatusId,
    content,
  }));

export const slugs = projectEntries.map((project) => project.slug);

export function projectIndexOf(slug: string): number {
  return projectEntries.findIndex((project) => project.slug === slug);
}
