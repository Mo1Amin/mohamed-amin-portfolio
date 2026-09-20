'use client';

import { usePreferences } from './preferences';

/** Compact preference controls shared by the projects and case-study routes. */
export function RouteControls() {
  const { locale, theme, mode, t, setLocale, setTheme, setMode } = usePreferences();

  return (
    <div className="controls route-controls">
      <select aria-label={t.language} value={locale} onChange={(event) => setLocale(event.target.value as typeof locale)}>
        <option value="en">EN</option>
        <option value="ar">عربي</option>
        <option value="sv">SV</option>
      </select>
      <button aria-label={t.theme} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme === 'dark' ? '☼' : '◐'}
      </button>
      <button className="mode" aria-label={t.mode} onClick={() => setMode(mode === 'bold' ? 'calm' : 'bold')}>
        {mode === 'bold' ? t.bold : t.calm}<span> ◇</span>
      </button>
    </div>
  );
}
