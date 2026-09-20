import type { Metadata } from 'next';
import './style.css';
import { PreferenceScript } from './preference-script';
import { PreferencesProvider } from './preferences';
export const metadata: Metadata = { title: 'Mohamed Amin — Software Engineer', description: 'Web, mobile and AI. Selected work, leadership and experiments by Mohamed Amin, software engineer and founder of SU ACM Student Chapter.' };
export default function Layout({children}:{children:React.ReactNode}) {
  // lang, dir and the two data attributes are owned by the inline script and the
  // provider below, so hydration never overwrites a stored preference.
  return <html lang="en" dir="ltr" suppressHydrationWarning>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    </head>
    <body>
      <PreferenceScript />
      <PreferencesProvider>{children}</PreferencesProvider>
    </body>
  </html>
}
