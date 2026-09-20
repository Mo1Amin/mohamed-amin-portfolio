import { MODE_STORAGE_KEY, THEME_STORAGE_KEY } from '@/lib/preferences'

/**
 * Applies the stored theme and visual mode before anything paints, so the page
 * never flashes the wrong direction. The site is dark-first: with nothing
 * stored, it stays on the dark Bold defaults.
 *
 * These two attributes are deliberately not rendered by React, so hydration
 * cannot reset a stored preference.
 */
const script = `(function(){var d=document.documentElement;try{
var t=localStorage.getItem('${THEME_STORAGE_KEY}');d.setAttribute('data-theme',t==='light'?'light':'dark');
var m=localStorage.getItem('${MODE_STORAGE_KEY}');d.setAttribute('data-mode',m==='calm'?'calm':'bold');
}catch(e){d.setAttribute('data-theme','dark');d.setAttribute('data-mode','bold')}})();`

export function PreferenceScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
