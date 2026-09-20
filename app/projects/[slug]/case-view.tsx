'use client';
import Link from 'next/link';
import {usePreferences} from '../../preferences';
import {routeCopy} from '../../route-copy';
import {projectEntries} from '../../projects-data';
import { RouteControls } from '../../route-controls';

/** A single case study. `index` is the position in `projectEntries`. */
export function CaseView({index}:{index:number}){
 const {locale,t}=usePreferences(); const r=routeCopy[locale]; const project=projectEntries[index]; const technologies=project.content.technologies.length?project.content.technologies:[r.technologyFallback];
 return <main className="case-page">
  <header className="route-header"><Link className="brand" href="/" aria-label="Mohamed Amin">ma<span>↗</span></Link><Link className="text-link" href="/projects">← {r.allProjects}</Link><RouteControls /></header>
  <section className="case-hero"><p className="eyebrow"><span className="dot" />{t.tags[index]}</p><h1>{project.content.title[locale]}<em>.</em></h1><p className="case-lead">{project.content.shortSummary[locale]}</p><div className="case-meta"><div><small>{r.statusLabel}</small><strong>{r.status[project.status]}</strong></div><div><small>{r.roleLabel}</small><strong>{project.content.role[locale]}</strong></div></div></section>
  <section className="case-grid"><article><p className="eyebrow">{r.storyEyebrow}</p><h2>{r.storyHead[0]}<br /><em>{r.storyHead[1]}</em></h2><p>{project.content.caseNote[locale]}</p></article><article><p className="eyebrow">{r.techEyebrow}</p><ul>{technologies.map(item=><li key={item}>{item}<span>↗</span></li>)}</ul></article></section>
  <footer className="case-footer"><Link className="primary" href="/projects">{r.backToProjects} <span>↗</span></Link><p>{r.footerLine}</p></footer>
 </main>
}
