import { createSupabaseServerClient } from './server';

export type PublicProjectRow = {
  id: string;
  slug: string;
  status: 'published' | 'coming_soon' | 'in_development';
  featured: boolean;
  sort_order: number;
  project_translations: { locale: 'en' | 'ar' | 'sv'; title: string; short_summary: string; role: string; case_note: string }[];
  project_technologies: { technology: string; sort_order: number }[];
  project_links: { kind: 'github' | 'live' | 'google_play' | 'test_flight'; url: string }[];
  project_media: { id: string; kind: 'image' | 'video' | 'embed'; url: string; alt_en: string; alt_ar: string; alt_sv: string; sort_order: number }[];
};

/** Returns null when Supabase is not configured, keeping local previews usable. */
export async function getPublicProjects(): Promise<PublicProjectRow[] | null> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('id, slug, status, featured, sort_order, project_translations(locale, title, short_summary, role, case_note), project_technologies(technology, sort_order), project_links(kind, url), project_media(id, kind, url, alt_en, alt_ar, alt_sv, sort_order)')
      .in('status', ['published', 'coming_soon', 'in_development'])
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn(`Unable to load public projects from Supabase: ${error.message}`);
      return null;
    }
    return (data ?? []) as PublicProjectRow[];
  } catch (error) {
    console.warn('Unable to reach Supabase while loading public projects.', error);
    return null;
  }
}
