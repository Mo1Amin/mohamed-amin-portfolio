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
};

export const projectEntries: ProjectEntry[] = [
  { slug: 'med-notes', number: '01', symbol: 'm / n', word: 'MED NOTES', tone: 'mint', categories: ['mobile'], status: 'coming' },
  { slug: 'myqat', number: '02', symbol: 'مـ', word: 'MYQAT', tone: 'violet', categories: ['web'], status: 'coming' },
  { slug: 'su-acm-website', number: '03', symbol: 'acm', word: 'COMMUNITY, CONNECTED.', tone: 'blue', categories: ['web'], status: 'development' },
  { slug: 'graduation-ml-fitness-health', number: '04', symbol: '✳', word: 'HUMAN × MACHINE', tone: 'lime', categories: ['mobile'], status: 'coming' },
];

export const slugs = projectEntries.map((project) => project.slug);

export function projectIndexOf(slug: string): number {
  return projectEntries.findIndex((project) => project.slug === slug);
}
