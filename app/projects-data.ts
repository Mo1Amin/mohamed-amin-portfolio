/**
 * Structural project data: one source for the landing page, the projects route
 * and the case-study routes, which previously each kept their own copy of it.
 *
 * Order matches the localized arrays in `copy.ts` (projects, summaries, tags,
 * roles), so index 0 here is index 0 there.
 *
 * Categories, status and links follow docs/PROJECT_DATA.md. Links stay empty
 * until Mohamed confirms them.
 */
import {projectCatalog, type ProjectContent} from './content-model';

export type Tone = 'mint' | 'violet' | 'blue' | 'lime';
export type Category = 'web' | 'mobile';
export type StatusId = 'coming' | 'development';

export type ProjectEntry = {
  slug: string;
  number: string;
  symbol: string;
  /** The word printed across the artwork on the landing page. */
  word: string;
  tone: Tone;
  categories: Category[];
  status: StatusId;
  content: ProjectContent;
};

const presentation: Record<string, Omit<ProjectEntry, 'slug' | 'content'>> = {
  'med-notes': { number: '01', symbol: 'm / n', word: 'MED NOTES', tone: 'mint', categories: ['mobile'], status: 'coming' },
  myqat: { number: '02', symbol: 'مـ', word: 'MYQAT', tone: 'violet', categories: ['web'], status: 'coming' },
  'su-acm-website': { number: '03', symbol: 'acm', word: 'COMMUNITY, CONNECTED.', tone: 'blue', categories: ['web'], status: 'development' },
  'graduation-ml-fitness-health': { number: '04', symbol: '✳', word: 'HUMAN × MACHINE', tone: 'lime', categories: ['mobile'], status: 'coming' },
};

/** Public project queries exclude private records by construction. */
export const projectEntries: ProjectEntry[] = projectCatalog
  .filter((content) => content.status !== 'private')
  .map((content) => ({ slug: content.slug, ...presentation[content.slug], content }));

export const slugs = projectEntries.map((project) => project.slug);

export function projectIndexOf(slug: string): number {
  return projectEntries.findIndex((project) => project.slug === slug);
}
