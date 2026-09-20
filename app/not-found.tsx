import Link from 'next/link';
export default function NotFound() {
  return <main className="state-screen">
    <div className="state-mark">404<span>↗</span></div>
    <p className="eyebrow"><span className="dot" />This page is still being built</p>
    <h1>Nothing here<br /><em>yet.</em></h1>
    <p className="state-copy">The project may be private, coming soon, or the link may have changed.</p>
    <Link className="primary" href="/">Return to the portfolio <span>↗</span></Link>
  </main>
}
