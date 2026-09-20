'use client';
import { useEffect, useState } from 'react';

export function RouteControls() {
  const [theme, setTheme] = useState('dark');
  useEffect(() => { const saved = localStorage.getItem('theme'); if (saved === 'light') { setTheme('light'); document.documentElement.dataset.theme = 'light'; } }, []);
  function toggle() { const next = theme === 'dark' ? 'light' : 'dark'; setTheme(next); document.documentElement.dataset.theme = next; localStorage.setItem('theme', next); }
  return <div className="route-controls"><button aria-label="Switch color theme" onClick={toggle}>{theme === 'dark' ? '☼' : '◐'}</button><span>EN</span><span>عربي</span><span>SV</span></div>;
}
