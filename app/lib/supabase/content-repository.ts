import { createSupabasePublicClient } from './public-client';

export type PublicProjectTranslation = {
  locale: 'en' | 'ar' | 'sv';
  title: string;
  short_summary: string;
  role: string;
  case_note: string;
  problem: string;
  solution: string;
  challenges: string;
  outcome: string;
};

export type PublicProjectRow = {
  id: string;
  slug: string;
  status: 'published' | 'coming_soon' | 'in_development';
  featured: boolean;
  sort_order: number;
  project_translations: PublicProjectTranslation[];
  project_technologies: { technology: string; sort_order: number }[];
  project_links: { kind: 'github' | 'live' | 'google_play' | 'test_flight'; url: string }[];
  project_media: { id: string; kind: 'image' | 'video' | 'embed'; url: string; alt_en: string; alt_ar: string; alt_sv: string; sort_order: number }[];
};

const selection = [
  'id, slug, status, featured, sort_order',
  'project_translations(locale, title, short_summary, role, case_note, problem, solution, challenges, outcome)',
  'project_technologies(technology, sort_order)',
  'project_links(kind, url)',
  'project_media(id, kind, url, alt_en, alt_ar, alt_sv, sort_order)',
].join(', ');

/**
 * Returns null when Supabase is not configured or cannot answer, so the public
 * site keeps rendering from the checked-in catalog instead of failing. A query
 * error is logged on the server: it means the migrations are not applied yet.
 */
export async function getPublicProjects(): Promise<PublicProjectRow[] | null> {
  const supabase = createSupabasePublicClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('projects')
    .select(selection)
    .in('status', ['published', 'coming_soon', 'in_development'])
    .order('sort_order', { ascending: true });

  if (error) {
    console.error(`Supabase is configured but public projects could not be read: ${error.message}`);
    return null;
  }
  return (data ?? []) as unknown as PublicProjectRow[];
}
