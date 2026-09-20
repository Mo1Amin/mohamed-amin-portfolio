import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '../../../lib/supabase/server';
import type { ProjectContent } from '../../../content-model';

const locales = ['en', 'ar', 'sv'] as const;
const linkKinds = ['github', 'live', 'googlePlay', 'testFlight'] as const;

function isProjectContent(value: unknown): value is ProjectContent {
  if (!value || typeof value !== 'object') return false;
  const project = value as Partial<ProjectContent>;
  return typeof project.slug === 'string'
    && typeof project.status === 'string'
    && typeof project.featured === 'boolean'
    && typeof project.order === 'number'
    && !!project.title
    && !!project.shortSummary
    && !!project.role
    && Array.isArray(project.technologies);
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

  const translations = locales.map((locale) => ({
    project_id: saved.id,
    locale,
    title: project.title[locale],
    short_summary: project.shortSummary[locale],
    role: project.role[locale],
    case_note: project.caseNote[locale],
  }));
  const { error: translationError } = await supabase.from('project_translations').upsert(translations, { onConflict: 'project_id,locale' });
  if (translationError) return NextResponse.json({ error: translationError.message }, { status: 400 });

  const { error: technologyDeleteError } = await supabase.from('project_technologies').delete().eq('project_id', saved.id);
  if (technologyDeleteError) return NextResponse.json({ error: technologyDeleteError.message }, { status: 400 });
  if (project.technologies.length) {
    const { error: technologyError } = await supabase.from('project_technologies').insert(project.technologies.map((technology, index) => ({ project_id: saved.id, technology, sort_order: index })));
    if (technologyError) return NextResponse.json({ error: technologyError.message }, { status: 400 });
  }

  const links = linkKinds.flatMap((kind) => project.links[kind] ? [{ project_id: saved.id, kind, url: project.links[kind] }] : []);
  const { error: linkDeleteError } = await supabase.from('project_links').delete().eq('project_id', saved.id);
  if (linkDeleteError) return NextResponse.json({ error: linkDeleteError.message }, { status: 400 });
  if (links.length) {
    const { error: linkError } = await supabase.from('project_links').insert(links);
    if (linkError) return NextResponse.json({ error: linkError.message }, { status: 400 });
  }

  return NextResponse.json({ slug: saved.slug, saved: true });
}
