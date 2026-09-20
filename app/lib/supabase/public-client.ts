import { createClient } from '@supabase/supabase-js';

/**
 * A client for public content only: no cookies, no session.
 *
 * The cookie-aware server client makes any route that touches it dynamic, and a
 * dynamic route behind `loading.tsx` streams its response — which means the 200
 * status is already sent before `notFound()` can run, so a missing or private
 * project answered 200 OK. Reading public rows needs no session at all, so the
 * public pages use this client and stay statically rendered.
 *
 * Returns null when the environment is not configured, keeping the local
 * content fallback working.
 */
export function createSupabasePublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
