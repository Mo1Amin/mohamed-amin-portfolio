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

The next integration step is to replace the local admin draft actions with
authenticated server mutations and Supabase Storage uploads.
