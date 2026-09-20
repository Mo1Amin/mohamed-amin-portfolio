import Link from 'next/link';

const projects = [
  { slug: 'med-notes', number: '01', title: 'Med Notes', type: 'PROJECT PREVIEW', summary: 'A project in preparation. The story, role, and verified links will be added before publication.', symbol: 'm / n', tone: 'mint' },
  { slug: 'myqat', number: '02', title: 'MyQat', type: 'PROJECT PREVIEW', summary: 'A project in preparation. The story, role, and verified links will be added before publication.', symbol: 'مـ', tone: 'violet' },
  { slug: 'su-acm-website', number: '03', title: 'SU ACM official website', type: 'WEB · COMMUNITY', summary: 'The digital home for the student chapter Mohamed founded and supports through its official web work.', symbol: 'acm', tone: 'blue' },
  { slug: 'graduation-ml-fitness-health', number: '04', title: 'Fitness × Intelligence', type: 'FLUTTER · MACHINE LEARNING', summary: 'A Flutter application and complete machine learning model for fitness and health, led as an A+ graduation project.', symbol: '✳', tone: 'lime' },
];

export default function ProjectsPage() {
  return <main className="route-page">
    <header className="route-header"><Link className="brand" href="/">ma<span>↗</span></Link><Link className="text-link" href="/">← Back to portfolio</Link></header>
    <section className="route-intro"><p className="eyebrow"><span className="dot" />01 / Selected work</p><h1>Projects that<br /><em>make ideas tangible.</em></h1><p>Every project is a chance to connect a human problem with a thoughtful interface and the engineering underneath.</p></section>
    <section className="route-projects" aria-label="Projects">{projects.map((project)=><article className="route-project" key={project.slug}><Link className={`project-visual ${project.tone}`} href={`/projects/${project.slug}`}><span className="project-number">{project.number}</span><span className="project-symbol">{project.symbol}</span><span className="visual-word">{project.title.toUpperCase()}</span><span className="project-arrow">↗</span></Link><div className="project-info"><p className="eyebrow">{project.type}</p><Link className="project-title" href={`/projects/${project.slug}`}>{project.title}<span>↗</span></Link><p>{project.summary}</p></div></article>)}</section>
  </main>
}
