import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '../../../lib/supabase/server';
import type { ProjectContent, ProjectStatus, TranslationMap } from '../../../content-model';

const locales = ['en', 'ar', 'sv'] as const;
const statuses: ProjectStatus[] = ['published', 'coming_soon', 'private', 'in_development'];

/** Translated columns on `project_translations`, keyed by their content field. */
const translatedFields = {
  title: 'title',
  shortSummary: 'short_summary',
  role: 'role',
  caseNote: 'case_note',
  problem: 'problem',
  solution: 'solution',
  challenges: 'challenges',
  outcome: 'outcome',
} as const;

/** The database enum is snake_case; the content model is camelCase. */
const linkKinds = {
  github: 'github',
  live: 'live',
  googlePlay: 'google_play',
  testFlight: 'test_flight',
} as const;

function isTranslationMap(value: unknown): value is TranslationMap {
  if (!value || typeof value !== 'object') return false;
  const map = value as Record<string, unknown>;
  return locales.every((locale) => typeof map[locale] === 'string');
}

function isProjectContent(value: unknown): value is ProjectContent {
  if (!value || typeof value !== 'object') return false;
  const project = value as Partial<ProjectContent>;
  return typeof project.slug === 'string'
    && statuses.includes(project.status as ProjectStatus)
    && typeof project.featured === 'boolean'
    && typeof project.order === 'number'
    && Array.isArray(project.technologies)
    && project.technologies.every((technology) => typeof technology === 'string')
    && Object.keys(translatedFields).every((key) => isTranslationMap(project[key as keyof ProjectContent]));
}

export async function PUT(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: 'Supabase is not configured.' }, { status: 503 });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });

  let project: unknown;
  try { project = await request.json(); } catch { return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 }); }
  if (!isProjectContent(project)) return NextResponse.json({ error: 'Invalid project payload.' }, { status: 400 });

  const { data: saved, error: projectError } = await supabase
    .from('projects')
    .upsert({ owner_user_id: user.id, slug: project.slug, status: project.status, featured: project.featured, sort_order: project.order }, { onConflict: 'slug' })
    .select('id, slug')
    .single();
  if (projectError || !saved) return NextResponse.json({ error: projectError?.message ?? 'Unable to save project.' }, { status: 400 });

  // An empty field is saved as empty: an unconfirmed value stays visibly blank
  // instead of keeping whatever was stored before.
  const translations = locales.map((locale) => ({
    project_id: saved.id,
    locale,
    ...Object.fromEntries(
      Object.entries(translatedFields).map(([contentKey, column]) => [
        column,
        (project[contentKey as keyof ProjectContent] as TranslationMap)[locale],
      ]),
    ),
  }));
  const { error: translationError } = await supabase.from('project_translations').upsert(translations, { onConflict: 'project_id,locale' });
  if (translationError) return NextResponse.json({ error: translationError.message }, { status: 400 });

  const { error: technologyDeleteError } = await supabase.from('project_technologies').delete().eq('project_id', saved.id);
  if (technologyDeleteError) return NextResponse.json({ error: technologyDeleteError.message }, { status: 400 });
  if (project.technologies.length) {
    const { error: technologyError } = await supabase.from('project_technologies').insert(project.technologies.map((technology, index) => ({ project_id: saved.id, technology, sort_order: index })));
    if (technologyError) return NextResponse.json({ error: technologyError.message }, { status: 400 });
  }

  const links = Object.entries(linkKinds).flatMap(([contentKey, kind]) => {
    const url = project.links?.[contentKey as keyof ProjectContent['links']];
    return url ? [{ project_id: saved.id, kind, url }] : [];
  });
  const invalid = links.find((link) => !link.url.startsWith('https://'));
  if (invalid) return NextResponse.json({ error: `Links must start with https:// (${invalid.kind}).` }, { status: 400 });

  const { error: linkDeleteError } = await supabase.from('project_links').delete().eq('project_id', saved.id);
  if (linkDeleteError) return NextResponse.json({ error: linkDeleteError.message }, { status: 400 });
  if (links.length) {
    const { error: linkError } = await supabase.from('project_links').insert(links);
    if (linkError) return NextResponse.json({ error: linkError.message }, { status: 400 });
  }

  return NextResponse.json({ slug: saved.slug, saved: true });
}
