'use client';
import Link from 'next/link';
import {usePreferences} from '../preferences';
import {routeCopy} from '../route-copy';
import type {ProjectEntry} from '../projects-data';
import { RouteControls } from '../route-controls';

/** The projects index, localized from the same source as the landing page. */
export function ProjectsView({projects}:{projects:ProjectEntry[]}){
 const {locale,t}=usePreferences(); const r=routeCopy[locale];
 return <main className="route-page">
  <header className="route-header"><Link className="brand" href="/" aria-label="Mohamed Amin">ma<span>↗</span></Link><Link className="text-link" href="/">← {r.backToPortfolio}</Link><RouteControls /></header>
  <section className="route-intro"><p className="eyebrow"><span className="dot" />{r.projectsEyebrow}</p><h1>{r.projectsHead[0]}<br /><em>{r.projectsHead[1]}</em></h1><p>{r.projectsIntro}</p></section>
  <section className="route-projects" aria-label={t.nav[0]}>{projects.map((project,i)=><article className="route-project" key={project.slug}><Link className={`project-visual ${project.tone}`} href={`/projects/${project.slug}`} aria-label={`${t.details}: ${project.content.title[locale]}`}>{project.content.media[0]?.type === 'image' && <img className="project-cover" src={project.content.media[0].url} alt="" aria-hidden="true" loading="lazy" />}<span className="project-number">{project.number}</span><span className="project-symbol">{project.symbol}</span><span className="visual-word">{project.content.title[locale].toUpperCase()}</span><span className="project-arrow">↗</span></Link><div className="project-info"><p className="eyebrow">{t.tags[i]}</p><Link className="project-title" href={`/projects/${project.slug}`}>{project.content.title[locale]}<span>↗</span></Link><p>{project.content.shortSummary[locale]}</p></div></article>)}</section>
 </main>
}
