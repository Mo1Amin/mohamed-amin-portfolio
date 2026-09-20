'use client';
import Link from 'next/link';
import {usePreferences} from './preferences';
import {routeCopy} from './route-copy';
export default function NotFound() {
  const {locale}=usePreferences(); const r=routeCopy[locale];
  return <main className="state-screen">
    <div className="state-mark">404<span>↗</span></div>
    <p className="eyebrow"><span className="dot" />{r.notFoundEyebrow}</p>
    <h1>{r.notFoundHead[0]}<br /><em>{r.notFoundHead[1]}</em></h1>
    <p className="state-copy">{r.notFoundCopy}</p>
    <Link className="primary" href="/">{r.notFoundAction} <span>↗</span></Link>
  </main>
}
