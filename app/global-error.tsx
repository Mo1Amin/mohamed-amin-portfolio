'use client';
import './style.css';

/**
 * Last-resort boundary: it replaces the root layout, so it cannot use the
 * preferences provider and stays in the default locale and the dark theme.
 */
export default function GlobalError({error,reset}:{error:Error&{digest?:string};reset:()=>void}) {
  return <html lang="en" dir="ltr" data-theme="dark" data-mode="bold">
    <body>
      <main className="state-screen">
        <div className="state-mark">!<span>↗</span></div>
        <p className="eyebrow"><span className="dot" />Something interrupted this page</p>
        <h1>This part<br /><em>did not load.</em></h1>
        <p className="state-copy">{error.digest?`Reference: ${error.digest}`:'Try again, or reload the portfolio.'}</p>
        <button className="primary" onClick={reset}>Try again <span>↗</span></button>
      </main>
    </body>
  </html>
}
