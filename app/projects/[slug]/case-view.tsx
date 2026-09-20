'use client';
import Link from 'next/link';
import {usePreferences} from '../../preferences';
import {routeCopy} from '../../route-copy';
import type {ProjectEntry} from '../../projects-data';
import { RouteControls } from '../../route-controls';

/** A single case study. `index` is the position in `projectEntries`. */
export function CaseView({index,project}:{index:number;project:ProjectEntry}){
 const {locale,t}=usePreferences(); const r=routeCopy[locale]; const technologies=project.content.technologies.length?project.content.technologies:[r.technologyFallback];
 return <main className="case-page">
  <header className="route-header"><Link className="brand" href="/" aria-label="Mohamed Amin">ma<span>↗</span></Link><Link className="text-link" href="/projects">← {r.allProjects}</Link><RouteControls /></header>
  <section className="case-hero"><p className="eyebrow"><span className="dot" />{t.tags[index]}</p><h1>{project.content.title[locale]}<em>.</em></h1><p className="case-lead">{project.content.shortSummary[locale]}</p><div className="case-meta"><div><small>{r.statusLabel}</small><strong>{r.status[project.status]}</strong></div><div><small>{r.roleLabel}</small><strong>{project.content.role[locale]}</strong></div></div></section>
 <section className="case-grid"><article><p className="eyebrow">{r.storyEyebrow}</p><h2>{r.storyHead[0]}<br /><em>{r.storyHead[1]}</em></h2><p>{project.content.caseNote[locale]}</p></article><article><p className="eyebrow">{r.techEyebrow}</p><ul>{technologies.map(item=><li key={item}>{item}<span>↗</span></li>)}</ul></article></section>
  {project.content.media.length > 0 && <section className="case-media" aria-label="Project media"><p className="eyebrow">PROJECT MEDIA</p><div className="media-grid">{project.content.media.map((media) => { const alt = media.alt[locale] || project.content.title[locale]; if (media.type === 'video') return <video key={media.id} className="media-frame" src={media.url} controls preload="metadata" aria-label={alt} />; if (media.type === 'embed') return <iframe key={media.id} className="media-frame" src={media.url} title={alt} loading="lazy" />; return <img key={media.id} className="media-frame" src={media.url} alt={alt} loading="lazy" />; })}</div></section>}
  <footer className="case-footer"><Link className="primary" href="/projects">{r.backToProjects} <span>↗</span></Link><p>{r.footerLine}</p></footer>
 </main>
}
