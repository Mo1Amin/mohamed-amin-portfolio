'use client';
import {useCallback,useEffect,useMemo,useRef,useState} from 'react';
import Link from 'next/link';
import {usePreferences} from './preferences';
import type {Category,ProjectEntry} from './projects-data';
const anchors=['work','capabilities','about','contact'];
const tabKeys=['ArrowRight','ArrowLeft','ArrowUp','ArrowDown','Home','End'];
export function HomeView({projects}:{projects:ProjectEntry[]}){
 const slugs=useMemo(()=>projects.map((entry)=>entry.slug),[projects]);
 const {locale,dir,t,theme,mode,setLocale,setTheme,setMode}=usePreferences();
 const [filter,setFilter]=useState<'all'|Category>('all'); const [skill,setSkill]=useState(0); const [project,setProject]=useState<number|null>(null);
 const caseRef=useRef<HTMLHeadingElement|null>(null); const triggerRef=useRef<HTMLElement|null>(null); const tabRefs=useRef<(HTMLButtonElement|null)[]>([]);

 // A deep link such as ?project=med-notes opens the case study on load, and the
 // back button closes it again.
 useEffect(()=>{const sync=()=>{const slug=new URLSearchParams(location.search).get('project');setProject(slug&&slugs.includes(slug)?slugs.indexOf(slug):null)};sync();window.addEventListener('popstate',sync);return()=>window.removeEventListener('popstate',sync)},[slugs]);

 // Opening moves focus into the case study, closing returns it to the control
 // that opened it, so the panel is usable without a pointer.
 const openProject=useCallback((i:number|null,trigger?:HTMLElement|null)=>{
  if(i!==null&&trigger)triggerRef.current=trigger;
  setProject(i);
  history.pushState(null,'',i===null?'#work':`?project=${slugs[i]}#project`);
  if(i===null){const back=triggerRef.current;triggerRef.current=null;requestAnimationFrame(()=>back?.focus())}
  else requestAnimationFrame(()=>caseRef.current?.focus());
 },[slugs]);

 // Tabs follow the ARIA pattern: arrow keys move selection, and only the
 // selected tab is in the tab order.
 function onTabKeyDown(event:React.KeyboardEvent<HTMLDivElement>){
  if(!tabKeys.includes(event.key))return;
  event.preventDefault();
  const total=t.skills.length;
  let next=skill;
  if(event.key==='Home')next=0;
  else if(event.key==='End')next=total-1;
  else{const forward=event.key==='ArrowDown'||(dir==='rtl'?event.key==='ArrowLeft':event.key==='ArrowRight');next=(skill+(forward?1:-1)+total)%total}
  setSkill(next);tabRefs.current[next]?.focus();
 }

 const visibleProjects=projects.map((entry,index)=>({entry,index})).filter(({entry})=>filter==='all'||entry.categories.includes(filter));

 return <><a className="skip" href="#main">{t.skip}</a><header><a className="brand" href="#" aria-label="Mohamed Amin">ma<span>↗</span></a><nav>{t.nav.map((n,i)=><a key={n} href={`#${anchors[i]}`}>{n}</a>)}</nav><div className="controls"><select aria-label={t.language} value={locale} onChange={e=>setLocale(e.target.value as typeof locale)}><option value="en">EN</option><option value="ar">عربي</option><option value="sv">SV</option></select><button aria-label={t.theme} onClick={()=>setTheme(theme==='dark'?'light':'dark')}>{theme==='dark'?'☼':'◐'}</button><button className="mode" aria-label={t.mode} onClick={()=>setMode(mode==='bold'?'calm':'bold')}>{mode==='bold'?t.bold:t.calm}<span> ◇</span></button></div></header>
 <main id="main"><section className="hero"><div className="hero-copy"><p className="eyebrow"><span className="dot"/>{t.eyebrow}</p><h1>{t.head[0]}<br/><span>{t.head[1]}</span><br/>{t.head[2]}<br/><em>{t.head[3]}</em></h1><p className="intro">{t.intro}</p><div className="actions"><a className="primary" href="#work">{t.explore}<span>↗</span></a><a className="text-link" href="https://github.com/Mo1Amin" target="_blank" rel="noreferrer">{t.github} ↗</a></div></div><div className="hero-art" aria-hidden="true"><div className="art-grid"/><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><div className="core"><span>m<span className="core-accent">a</span></span></div><span className="node node-web">&lt;/&gt;<small>WEB</small></span><span className="node node-ai">✳<small>AI / ML</small></span><span className="node node-mobile">▯<small>MOBILE</small></span><span className="coordinate">SYSTEM / AMIN<br/>30.00° N · BUILDING IDEAS</span><span className="art-caption">{t.note}</span><div className="art-index">01 — 03</div></div><div className="hero-bottom"><span>{t.scroll} ↓</span><span>WEB / MOBILE / AI</span></div></section>
 <div className="marquee" aria-hidden="true"><span>CREATIVE THINKING</span><b>✳</b><span>ENGINEERING MINDSET</span><b>✳</b><span>HUMAN EXPERIENCE</span><b>✳</b></div>
 <section id="work" className="section work"><div className="section-top"><div><p className="eyebrow">01 / {t.nav[0]}</p><h2>{t.selected}<span className="accent">.</span></h2><p>{t.selectedSub}</p></div><div className="filters">{([['all',t.all],['web',t.web],['mobile',t.mobile]] as const).map(([id,label])=><button key={id} aria-pressed={filter===id} className={filter===id?'active':''} onClick={()=>setFilter(id)}>{label}</button>)}</div></div><div className="projects">{visibleProjects.map(({entry,index:i})=><article className={`project p${i}`} key={entry.slug}><button className="project-visual" onClick={e=>openProject(i,e.currentTarget)} aria-label={`${t.details}: ${entry.content.title[locale]}`}><span className="project-number">{entry.number}</span><div className="project-symbol">{entry.symbol}</div><span className="visual-word">{entry.word}</span><span className="project-arrow">↗</span><small>{t.artifact}</small></button><div className="project-info"><p className="eyebrow">{t.tags[i]}</p><button className="project-title" onClick={e=>openProject(i,e.currentTarget)}>{entry.content.title[locale]} <span>↗</span></button><p>{entry.content.shortSummary[locale]}</p></div></article>)}</div></section>
 {project!==null&&<section className="case-study section" id="project" aria-labelledby="case-title"><button className="text-link" onClick={()=>openProject(null)}>← {t.back}</button><p className="eyebrow">{t.tags[project]}</p><h2 id="case-title" ref={caseRef} tabIndex={-1}>{projects[project].content.title[locale]}</h2><p>{projects[project].content.shortSummary[locale]}</p><h3>{t.role}</h3><p>{projects[project].content.role[locale]}</p><p className="case-status">{t.release}</p><Link className="primary" href={`/projects/${slugs[project]}`}>{t.view}<span>↗</span></Link></section>}
 <section className="section capabilities" id="capabilities"><p className="eyebrow">02 / {t.nav[1]}</p><h2>{t.capTitle}</h2><p>{t.capIntro}</p><div className="cap-layout"><div className="cap-tabs" role="tablist" aria-orientation="vertical" aria-label={t.nav[1]} onKeyDown={onTabKeyDown}>{t.skills.map((s,i)=><button role="tab" aria-selected={skill===i} aria-controls="skill-panel" tabIndex={skill===i?0:-1} ref={node=>{tabRefs.current[i]=node}} id={`skill-${i}`} key={s} onClick={()=>setSkill(i)}><span>0{i+1}</span>{s}<b>{skill===i?'↗':'+'}</b></button>)}</div><div id="skill-panel" role="tabpanel" tabIndex={0} aria-labelledby={`skill-${skill}`} className="skill-panel"><div className="skill-glyph" aria-hidden="true">{['{ }','▯','✳','⌘'][skill]}</div><h3>{t.skills[skill]}</h3><p>{t.skillDesc[skill]}</p></div></div><div className="workflow"><span>↳</span><div><h3>{t.workflow}</h3><p>{t.workflowText}</p></div></div></section>
 <section className="section about" id="about"><div><p className="eyebrow">03 / {t.aboutLabel}</p><h2>{t.aboutTitle}</h2><p className="about-copy">{t.about}</p><div className="signature">Mohamed Amin<span>↗</span></div></div><div className="proof"><article><span className="proof-icon">↗</span><div><small>SU ACM STUDENT CHAPTER</small><h3>{t.leadTitle}</h3><p>{t.lead}</p></div></article><article><span className="proof-icon grade">A+</span><div><small>FLUTTER × ML</small><h3>{t.grade}</h3><p>{t.gradeText}</p></div></article><article><span className="proof-icon">⌁</span><div><small>{t.education}</small><h3>{t.edu}</h3><p>{t.cert}</p></div></article></div></section>
 <section className="contact section" id="contact"><p className="eyebrow">04 / {t.next}</p><h2>{t.contact}<span className="accent">↗</span></h2><div><p>{t.contactText}</p><a className="primary" href="https://github.com/Mo1Amin" target="_blank" rel="noreferrer">{t.contactLink} ↗</a></div></section></main><footer><a className="brand" href="#">ma<span>↗</span></a><p>{t.footer}</p><span>© 2026 MOHAMED AMIN</span></footer></>
}
