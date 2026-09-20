'use client';
import Link from 'next/link';
import {usePreferences} from '../../preferences';
import {routeCopy} from '../../route-copy';
import {projectEntries} from '../../projects-data';

/** A single case study. `index` is the position in `projectEntries`. */
export function CaseView({index}:{index:number}){
 const {locale,t}=usePreferences(); const r=routeCopy[locale]; const project=projectEntries[index];
 return <main className="case-page">
  <header className="route-header"><Link className="brand" href="/" aria-label="Mohamed Amin">ma<span>↗</span></Link><Link className="text-link" href="/projects">← {r.allProjects}</Link></header>
  <section className="case-hero"><p className="eyebrow"><span className="dot" />{t.tags[index]}</p><h1>{r.indexTitles[index]}<em>.</em></h1><p className="case-lead">{r.caseSummaries[index]}</p><div className="case-meta"><div><small>{r.statusLabel}</small><strong>{r.status[project.status]}</strong></div><div><small>{r.roleLabel}</small><strong>{t.roles[index]}</strong></div></div></section>
  <section className="case-grid"><article><p className="eyebrow">{r.storyEyebrow}</p><h2>{r.storyHead[0]}<br /><em>{r.storyHead[1]}</em></h2><p>{r.notes[index]}</p></article><article><p className="eyebrow">{r.techEyebrow}</p><ul>{r.tech[index].map(item=><li key={item}>{item}<span>↗</span></li>)}</ul></article></section>
  <footer className="case-footer"><Link className="primary" href="/projects">{r.backToProjects} <span>↗</span></Link><p>{r.footerLine}</p></footer>
 </main>
}
