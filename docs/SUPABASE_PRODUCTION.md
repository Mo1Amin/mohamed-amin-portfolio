# Supabase production setup

This records the actual state of the connected Supabase project after the work
on `claude/supabase-production`, what was verified, and what still needs a human.

## The connected project

| | |
| --- | --- |
| Project | `Mo1Amin's Project` |
| Reference | `mdbbfyjhhfzmjuuhflpy` |
| Region | `eu-central-1` |
| Status | active (it was paused; Mohamed restored it from the dashboard) |

**This database is shared.** Besides the five portfolio tables it hosts another
application (`students`, `schools`, `super_admins`, `academic_years`,
`announcements`, `uploads` and others). Nothing outside the `project*` tables
and the `portfolio-media` bucket was read, changed, or dropped, and the seed
touches only rows it owns by slug. Keep that in mind before running anything
broad such as a schema reset — a portfolio migration must never assume this
database belongs to the portfolio alone.

Credentials live in `.env.local`, which is git-ignored and was never committed.
No service-role key is used anywhere in this repository: the application, the
seed and the verification script all work with the anon key, and the schema work
went through the Supabase CLI's management connection.

## What was found before changing anything

- Migration `001_initial_schema.sql`: **already applied.** All five tables, the
  four enums, the `updated_at` trigger, row-level security on every table, and
  all ten policies were present, including the `problem`, `solution`,
  `challenges` and `outcome` columns.
- Migration `002_storage.sql`: **already applied.** The `portfolio-media` bucket
  exists and is public, with its four storage policies.
- Auth: **one account exists**, which is the owner account. No account was
  created, and no password is stored here or known to the tooling.
- Content: **the tables were empty.** Seeding was the missing step.

## What was done

1. Both migrations were made idempotent — guarded enum creation, `create table
   if not exists`, and `drop policy if exists` before each policy — and then
   re-applied to the live project to prove a second run is a no-op. This is what
   makes "apply it if it has not been applied" safe to follow literally.
2. `003_seed_projects.sql` was generated from `app/content-model.ts` by
   `scripts/generate-seed.mjs` and applied. Seven projects, each with English,
   Arabic and Swedish rows, and the technologies documented in
   `docs/PROJECT_DATA.md`. Nothing was invented: unconfirmed case-study fields
   are stored as empty strings and no project has a link, because none is
   confirmed yet.
3. The three private projects are seeded on purpose. Row-level security is what
   hides them, and an empty table would not prove that.
4. Public content is now read through a cookie-free client
   (`app/lib/supabase/public-client.ts`). The cookie-aware server client made
   every public route dynamic, and a dynamic route behind `loading.tsx` streams
   its response — the `200` header goes out before `notFound()` runs, so a
   private or missing project answered **200 OK** with the not-found screen
   inside it. Public reads need no session, so the public pages are statically
   rendered again and `/projects/flight-web` is a real `404`.
5. The routes that exist are generated from the visible-only query, so a private
   project has no route at all, and the landing page reads the same data as the
   projects routes instead of the checked-in catalog. Both revalidate after a
   minute (`export const revalidate = 60`), so an edit in the admin workspace
   reaches the public site without a deploy.

Re-run either step at any time:

```bash
npm run seed:generate   # rewrite 003 from the catalog
npm run verify:supabase # check the result as an anonymous visitor
```

## Seeded state

| Slug | Status | Featured | Technologies | Links |
| --- | --- | --- | --- | --- |
| `med-notes` | Coming Soon | yes | — | — |
| `myqat` | Coming Soon | yes | — | — |
| `su-acm-website` | In Development | yes | — | — |
| `graduation-ml-fitness-health` | Coming Soon | yes | Flutter, Machine Learning, Fitness and Health | — |
| `flight-web` | Private | no | HTML, CSS, JavaScript | — |
| `speed-store` | Private | no | HTML, CSS, JavaScript, Node.js, MySQL | — |
| `spark-motors` | Private | no | HTML, CSS, JavaScript | — |

All four documented states are represented except `Published`, which no project
has reached yet. The state exists in the enum, in the admin editor and in the
public status labels, and switching a project to it was exercised in a
rolled-back transaction.

## Verified

Anonymous, through the anon key (`npm run verify:supabase`, 6/6 passing):

- an anonymous reader sees four projects, all of them `coming_soon` or
  `in_development`;
- no private project is returned, even when asked for by status;
- translations follow the same rule (12 rows, three locales for four projects);
- an anonymous insert is refused by row-level security;
- the `portfolio-media` bucket is readable.

Through the running application:

- the landing page and `/projects` render the seeded titles from the database,
  and none of the three private projects appears in either page's markup;
- `/projects/flight-web`, `/projects/speed-store`, `/projects/spark-motors` and
  an invented slug all answer `404`, while the four visible projects answer
  `200`;
- a case-study page shows the status stored in the database;
- `/admin` redirects to `/admin/login` when there is no session;
- `PUT /api/admin/projects` and `POST /api/admin/media` answer `401` rather than
  `503`, which means Supabase is configured and the auth gate is what refused.

End to end, with the data restored afterwards: a title written to the database
as the owner appeared on `/projects` about twenty seconds later, and re-running
the seed put the original value back. That is the whole chain — owner write,
row-level security, public query, rendered page.

Owner permissions, checked against the policies inside a transaction that was
rolled back afterwards (so no data changed):

- the owner sees all seven projects, including the three private ones;
- the owner can change `status` and `featured`;
- the owner can write the translated case-study fields;
- the owner can insert a `google_play` link and a technology row.

## Still needs Mohamed

1. **Sign in once and save a project through the interface.** The owner's
   password is not available to the tooling and must not be, so the browser
   round-trip — sign in at `/admin/login`, edit, save, upload an image — is the
   one step left to confirm by hand. Everything it depends on is verified above.
2. **Decide what becomes `Published`.** Every project is currently Coming Soon,
   In Development or Private, which matches the documents.
3. **Supply the pending facts** before publishing: links, screenshots, stacks,
   roles, and the case-study text. The fields exist and are editable; they are
   empty because nothing has been confirmed.
4. **Set the same two environment variables on the deployment host** before
   going live, or the site silently falls back to the checked-in catalog.
5. **Redeploy after adding a brand new project.** Editing an existing project
   shows up within a minute, but a new slug needs a build for its route to
   exist — that is the price of returning a real `404` for everything else.

## Deliberately not done

- No service-role key was introduced, and `.env.local` is not committed.
- The admin dashboard beyond project editing, and the AI assistant, remain out
  of scope.
- The case-study fields are editable and stored, but the public case page still
  shows only the story note: displaying them is a design decision for the Codex
  visual direction, not an engineering gap.
