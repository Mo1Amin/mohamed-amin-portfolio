'use client';

import Link from 'next/link';
import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '../../lib/supabase/client';

export function LoginView() {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (!supabase) { setError('Supabase is not configured for this environment.'); return; }
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) { setError(signInError.message); setLoading(false); return; }
    router.replace('/admin');
    router.refresh();
  }

  return <main className="auth-page">
    <div className="auth-card">
      <Link className="brand" href="/" aria-label="Mohamed Amin">ma<span>↗</span></Link>
      <p className="eyebrow"><span className="dot" />PRIVATE WORKSPACE</p>
      <h1>Welcome back.<br /><em>Manage the work.</em></h1>
      <p className="auth-copy">Sign in with the owner account configured in Supabase Auth.</p>
      <form onSubmit={submit}>
        <label>Email<input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
        <label>Password<input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label>
        {error && <p className="auth-error" role="alert">{error}</p>}
        <button className="primary" type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'} <span>↗</span></button>
      </form>
      <Link className="text-link" href="/">← Back to portfolio</Link>
    </div>
  </main>;
}
