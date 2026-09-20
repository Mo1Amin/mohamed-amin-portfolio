import { LOCALE_KEY, MODE_KEY, THEME_KEY } from './settings';

/**
 * Applies the stored language, theme and visual mode before anything paints.
 *
 * Without this the first paint of every route is English, left-to-right and
 * dark, and only the landing page corrected itself after hydration. It also
 * means /projects and the case-study routes now honour the same preferences.
 */
const script = `(function(){var d=document.documentElement;try{
var l=localStorage.getItem('${LOCALE_KEY}');if(l==='ar'||l==='sv'||l==='en'){d.lang=l;d.dir=l==='ar'?'rtl':'ltr'}
var t=localStorage.getItem('${THEME_KEY}');d.dataset.theme=t==='light'?'light':'dark';
var m=localStorage.getItem('${MODE_KEY}');d.dataset.mode=m==='calm'?'calm':'bold';
}catch(e){d.dataset.theme='dark';d.dataset.mode='bold'}})();`;

export function PreferenceScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
