'use client';
import {usePreferences} from './preferences';
import {routeCopy} from './route-copy';
export default function Loading() {
  const {locale}=usePreferences(); const r=routeCopy[locale];
  return <main className="state-screen" aria-busy="true" aria-label={r.loadingLabel}>
    <div className="state-mark">ma<span>↗</span></div>
    <p className="eyebrow"><span className="dot" />{r.loading}</p>
  </main>
}
