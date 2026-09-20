# Admin foundation

The `/admin` route is the first content-management surface for the portfolio.
It is intentionally a local draft workspace while authentication and shared
storage are still pending.

## Current behavior

- Shows all seven factual project records from `app/content-model.ts`.
- Exposes the four supported publication states.
- Edits English, Arabic, and Swedish titles and summaries together.
- Edits role, technologies, featured state, and verified link fields.
- Saves drafts to browser `localStorage` only.
- Keeps the public routes backed by their existing curated presentation data.

## Before production use

- Add Supabase authentication and restrict the route to the owner.
- Move the content model to a database with server-side validation.
- Store media in a private/public bucket according to project status.
- Ensure public queries exclude `private` records and unpublished case-study details.
- Add audit history and a publish workflow before external deployment.
