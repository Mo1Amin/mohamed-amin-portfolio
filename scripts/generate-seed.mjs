/**
 * Generates `supabase/migrations/003_seed_projects.sql` from the verified
 * catalog in `app/content-model.ts`.
 *
 * The seed is generated rather than written by hand so the database can never
 * drift from the checked-in facts, and so nothing is introduced by re-typing.
 * Fields that are empty in the catalog are written as empty strings: an
 * unconfirmed detail stays visibly unconfirmed.
 *
 *   node scripts/generate-seed.mjs
 */
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const locales = ['en', 'ar', 'sv'];

const translatedColumns = [
  ['title', 'title'],
  ['shortSummary', 'short_summary'],
  ['role', 'role'],
  ['caseNote', 'case_note'],
  ['problem', 'problem'],
  ['solution', 'solution'],
  ['challenges', 'challenges'],
  ['outcome', 'outcome'],
];

const linkKinds = [
  ['github', 'github'],
  ['live', 'live'],
  ['googlePlay', 'google_play'],
  ['testFlight', 'test_flight'],
];

function quote(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

async function loadCatalog() {
  const source = await readFile(join(root, 'app/content-model.ts'), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  });
  const tempDir = join(root, 'node_modules/.cache/portfolio-seed');
  const tempFile = join(tempDir, 'content-model.mjs');
  await mkdir(tempDir, { recursive: true });
  await writeFile(tempFile, outputText, 'utf8');
  try {
    return (await import(`${pathToFileURL(tempFile).href}?v=${Date.now()}`)).projectCatalog;
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

function projectBlock(project) {
  const lines = [];
  lines.push(`  -- ${project.slug} (${project.status})`);
  lines.push('  insert into public.projects (owner_user_id, slug, status, featured, sort_order)');
  lines.push(`  values (owner_id, ${quote(project.slug)}, ${quote(project.status)}, ${project.featured}, ${project.order})`);
  lines.push('  on conflict (slug) do update set status = excluded.status, featured = excluded.featured, sort_order = excluded.sort_order');
  lines.push('  returning id into target_id;');
  lines.push('');

  const columns = translatedColumns.map(([, column]) => column);
  lines.push(`  insert into public.project_translations (project_id, locale, ${columns.join(', ')})`);
  lines.push('  values');
  const rows = locales.map((locale) => {
    const values = translatedColumns.map(([key]) => quote(project[key][locale]));
    return `    (target_id, ${quote(locale)}, ${values.join(', ')})`;
  });
  lines.push(`${rows.join(',\n')}`);
  lines.push(`  on conflict (project_id, locale) do update set ${columns.map((column) => `${column} = excluded.${column}`).join(', ')};`);
  lines.push('');

  lines.push('  delete from public.project_technologies where project_id = target_id;');
  if (project.technologies.length) {
    const values = project.technologies.map((technology, index) => `(target_id, ${quote(technology)}, ${index})`);
    lines.push(`  insert into public.project_technologies (project_id, technology, sort_order) values ${values.join(', ')};`);
  }
  lines.push('');

  lines.push('  delete from public.project_links where project_id = target_id;');
  const links = linkKinds.flatMap(([key, kind]) => (project.links?.[key] ? [`(target_id, ${quote(kind)}, ${quote(project.links[key])})`] : []));
  if (links.length) {
    lines.push(`  insert into public.project_links (project_id, kind, url) values ${links.join(', ')};`);
  } else {
    lines.push('  -- No confirmed links for this project yet.');
  }

  return lines.join('\n');
}

const catalog = await loadCatalog();
const body = catalog.map(projectBlock).join('\n\n');

const sql = `-- Seed the verified project catalog.
--
-- Generated from app/content-model.ts by scripts/generate-seed.mjs.
-- Do not edit by hand: run the generator again instead.
--
-- Safe to run more than once. Projects are matched by slug, so re-running
-- refreshes the seeded facts without creating duplicates. Media is never
-- touched here, because media is uploaded through the admin workspace.
--
-- Private projects are seeded on purpose: row-level security is what keeps them
-- out of public queries, and an empty table would not prove that.

do $$
declare
  owner_id uuid;
  target_id uuid;
  owner_count integer;
begin
  select count(*) into owner_count from auth.users;
  if owner_count = 0 then
    raise exception 'No Auth user exists. Create the owner account in Supabase Auth before seeding.';
  end if;
  if owner_count > 1 then
    raise exception 'Expected exactly one Auth user, found %. Seed with an explicit owner instead.', owner_count;
  end if;
  select id into owner_id from auth.users limit 1;

${body}
end $$;
`;

const target = join(root, 'supabase/migrations/003_seed_projects.sql');
await writeFile(target, sql, 'utf8');
console.log(`Wrote ${target} for ${catalog.length} projects.`);
