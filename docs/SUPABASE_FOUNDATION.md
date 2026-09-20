# Supabase foundation

This branch prepares the persistence and access-control layer for the admin
workspace. It does not contain project credentials and it keeps the local
content fallback working until a Supabase project is connected.

## Setup

1. Create a Supabase project and copy `.env.example` to `.env.local`.
2. Fill `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Apply `supabase/migrations/001_initial_schema.sql` in the Supabase SQL editor.
4. Create the owner account in Supabase Auth, then seed projects with its user ID.

The browser and server helpers return `null` when the environment is not
configured, so local previews continue to use the checked-in content model.
`getPublicProjects()` only queries visible statuses. Row-level security repeats
that rule in the database and gives write access only to the authenticated
owner of each project.

The admin workspace now includes an authenticated `PUT /api/admin/projects`
mutation. It saves the selected project's status, featured flag, ordering,
translations, technologies, and links while preserving local preview mode when
Supabase is not configured. Media uploads and richer case-study fields remain
as the next storage integration work.
