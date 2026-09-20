import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '../../../lib/supabase/server';

const allowedKinds = new Set(['image', 'video', 'embed']);
const maxFileSize = 10 * 1024 * 1024;

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: 'Supabase is not configured.' }, { status: 503 });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });

  const form = await request.formData();
  const file = form.get('file');
  const slug = form.get('slug');
  const kind = form.get('kind');
  if (!(file instanceof File) || typeof slug !== 'string' || typeof kind !== 'string' || !allowedKinds.has(kind)) {
    return NextResponse.json({ error: 'A project slug, media kind, and file are required.' }, { status: 400 });
  }
  if (!file.size || file.size > maxFileSize) return NextResponse.json({ error: 'Media must be between 1 byte and 10 MB.' }, { status: 400 });
  if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) return NextResponse.json({ error: 'Only image and video files are supported.' }, { status: 400 });

  const { data: project, error: projectError } = await supabase.from('projects').select('id').eq('slug', slug).eq('owner_user_id', user.id).single();
  if (projectError || !project) return NextResponse.json({ error: 'Save this project before uploading media.' }, { status: 404 });

  const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '') || 'upload';
  const path = `${user.id}/${slug}/${Date.now()}-${safeName}`;
  const { error: uploadError } = await supabase.storage.from('portfolio-media').upload(path, file, { contentType: file.type, cacheControl: '3600', upsert: false });
  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 400 });
  const { data: publicUrl } = supabase.storage.from('portfolio-media').getPublicUrl(path);
  const localeAlt = (form.get('altEn') as string | null) ?? '';
  const { data: media, error: mediaError } = await supabase.from('project_media').insert({ project_id: project.id, kind, url: publicUrl.publicUrl, alt_en: localeAlt, alt_ar: (form.get('altAr') as string | null) ?? localeAlt, alt_sv: (form.get('altSv') as string | null) ?? localeAlt }).select('id, url, kind').single();
  if (mediaError) {
    await supabase.storage.from('portfolio-media').remove([path]);
    return NextResponse.json({ error: mediaError.message }, { status: 400 });
  }
  return NextResponse.json({ media }, { status: 201 });
}
