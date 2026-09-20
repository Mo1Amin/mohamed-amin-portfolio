/**
 * Verifies the production Supabase setup from the outside, the way a visitor
 * sees it: with the anonymous key only.
 *
 * It answers the questions that matter for this project — can an anonymous
 * reader see the visible projects, are private projects invisible, and can an
 * anonymous reader write anything. It reads `.env.local` (or the environment)
 * and never needs a service-role key.
 *
 *   node scripts/supabase-verify.mjs
 */
import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const visibleStatuses = ['published', 'coming_soon', 'in_development'];

async function readEnv() {
  const env = { ...process.env };
  try {
    const file = await readFile(join(root, '.env.local'), 'utf8');
    for (const line of file.split(/\r?\n/)) {
      const match = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim());
      if (match && !env[match[1]]) env[match[1]] = match[2];
    }
  } catch {
    // No .env.local: fall back to the ambient environment.
  }
  return env;
}

const results = [];
function record(name, ok, detail) {
  results.push({ name, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
}

const env = await readEnv();
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error('NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required (.env.local or environment).');
  process.exit(2);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

// 1. Anonymous read returns only visible projects.
const { data: projects, error: readError } = await supabase
  .from('projects')
  .select('slug, status, featured, sort_order')
  .order('sort_order');

if (readError) {
  record('anonymous read of projects', false, readError.message);
} else {
  const statuses = [...new Set(projects.map((project) => project.status))];
  const leaked = projects.filter((project) => !visibleStatuses.includes(project.status));
  record('anonymous read of projects', true, `${projects.length} rows, statuses: ${statuses.join(', ') || 'none'}`);
  record('no hidden status reaches an anonymous reader', leaked.length === 0, leaked.map((project) => project.slug).join(', ') || 'none leaked');
}

// 2. A private project is invisible even when asked for by slug.
const { data: privateRows, error: privateError } = await supabase
  .from('projects')
  .select('slug, status')
  .eq('status', 'private');
record('private projects hidden from anonymous queries', !privateError && (privateRows?.length ?? 0) === 0, privateError ? privateError.message : `${privateRows?.length ?? 0} rows returned`);

// 3. Translations of hidden projects are hidden too.
const { data: translations, error: translationError } = await supabase
  .from('project_translations')
  .select('project_id, locale');
const expectedTranslations = (projects?.length ?? 0) * 3;
record(
  'translations follow the same visibility rule',
  !translationError && (translations?.length ?? 0) === expectedTranslations,
  translationError ? translationError.message : `${translations?.length ?? 0} rows, expected ${expectedTranslations}`,
);

// 4. Anonymous writes are refused.
const { error: writeError } = await supabase
  .from('projects')
  .insert({ slug: `rls-probe-${Date.now()}`, status: 'published', featured: false, sort_order: 999 });
record('anonymous write refused', Boolean(writeError), writeError ? writeError.message : 'the insert succeeded, which it must not');

// 5. The media bucket is reachable and public.
const { error: storageError } = await supabase.storage.from('portfolio-media').list('', { limit: 1 });
record('portfolio-media bucket readable', !storageError, storageError ? storageError.message : 'listed without an error');

const failed = results.filter((result) => !result.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed.`);
process.exit(failed.length ? 1 : 0);
