'use client';
import {useEffect} from 'react';
import Link from 'next/link';
import {usePreferences} from './preferences';
import {routeCopy} from './route-copy';

/**
 * Route-level error boundary. Without it a thrown render error replaced the
 * whole document with the framework's default screen; now the reader keeps the
 * portfolio's own language and can retry in place.
 */
export default function RouteError({error,reset}:{error:Error&{digest?:string};reset:()=>void}) {
  const {locale}=usePreferences(); const r=routeCopy[locale];
  useEffect(()=>{console.error(error)},[error]);
  return <main className="state-screen">
    <div className="state-mark">!<span>↗</span></div>
    <p className="eyebrow"><span className="dot" />{r.errorEyebrow}</p>
    <h1>{r.errorHead[0]}<br /><em>{r.errorHead[1]}</em></h1>
    <p className="state-copy">{r.errorCopy}</p>
    <button className="primary" onClick={reset}>{r.errorAction} <span>↗</span></button>
    <Link className="text-link" href="/">{r.notFoundAction} ↗</Link>
  </main>
}
