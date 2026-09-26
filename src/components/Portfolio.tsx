import Link from "next/link";
import type { ReactNode } from "react";
import { copyFor, locales, pathFor, type Locale } from "@/content";
import { LotyMark, MasarMark, NordsurMark } from "./brands/Marks";
import { AcmChapter, LotyChapter, MasarChapter, NordsurChapter, NuvinkChapter } from "./chapters/Chapters";
import { ThemeToggle } from "./ThemeToggle";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const email = "mohmedamin1998@gmail.com";
const whatsapp = { href: "https://wa.me/201017348133", label: "+20 101 734 8133" };
const instagram = { href: "https://instagram.com/1l0mt", label: "@1l0mt" };
const github = { href: "https://github.com/Mo1Amin", label: "Mo1Amin" };
const source = "https://github.com/Mo1Amin/mohamed-amin-portfolio";

function logo(src: string) {
  return <img src={`${basePath}/projects/${src}`} alt="" width={40} height={40} />;
}

export function Portfolio({ locale }: { locale: Locale }) {
  const copy = copyFor(locale);
  const { hero, work, more, principles, toolkit, background, contact, ui } = copy;

  const index: { id: string; name: string; role: string; mark: ReactNode }[] = [
    { id: "nuvink", name: copy.nuvink.name, role: copy.nuvink.role, mark: logo("nuvink-mark.webp") },
    { id: "nordsur", name: copy.nordsur.name, role: copy.nordsur.role, mark: <NordsurMark size={40} /> },
    { id: "masar", name: copy.masar.name, role: copy.masar.role, mark: <MasarMark size={40} /> },
    { id: "loty", name: copy.loty.name, role: copy.loty.role, mark: <LotyMark size={40} /> },
    { id: "acm", name: "SU ACM", role: copy.acm.role, mark: logo("acm-logo.webp") },
  ];

  return (
    <>
      <a className="skip-link" href="#work">
        {ui.skip}
      </a>

      <nav className="top-controls" aria-label={ui.languageNav}>
        <ul className="language-list">
          {locales.map((code) => (
            <li key={code}>
              <Link href={pathFor(code)} hrefLang={code} lang={code} aria-current={code === locale ? "page" : undefined}>
                {ui.languages[code]}
              </Link>
            </li>
          ))}
        </ul>
        <ThemeToggle toDark={ui.themeToDark} toLight={ui.themeToLight} />
      </nav>

      <header className="hero shell">
        <p className="hero-role">{hero.role}</p>
        <h1 className="hero-name">{hero.name}</h1>
        <div className="hero-intro">
          <p className="hero-lede">{hero.lede}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              {hero.primary}
            </a>
            <a className="button" href="#contact">
              {hero.secondary}
            </a>
          </div>
          <p className="hero-status">{hero.status}</p>
        </div>

        <nav className="project-index" aria-label={ui.projectIndex}>
          <ul>
            {index.map((project) => (
              <li key={project.id}>
                <a href={`#${project.id}`}>
                  <span className="project-index-mark">{project.mark}</span>
                  <span className="project-index-text">
                    <span className="project-index-name">{project.name}</span>
                    <span className="project-index-role">{project.role}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <section id="work" className="work" aria-labelledby="work-heading">
          <div className="shell section-head">
            <h2 id="work-heading" className="section-title">
              {work.heading}
            </h2>
            <p className="section-intro">{work.intro}</p>
          </div>

          <NuvinkChapter copy={copy} />
          <NordsurChapter copy={copy} />
          <MasarChapter copy={copy} />
          <LotyChapter copy={copy} />
          <AcmChapter copy={copy} />

          <div className="shell more">
            <h3 className="more-title">{more.heading}</h3>
            <ul className="more-list">
              {more.items.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.name}</a>
                  <p>{item.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="shell section" aria-labelledby="principles-heading">
          <h2 id="principles-heading" className="section-title">
            {principles.heading}
          </h2>
          <div className="principles">
            {principles.items.map((item) => (
              <div key={item.title} className="principle">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="shell section" aria-labelledby="toolkit-heading">
          <h2 id="toolkit-heading" className="section-title">
            {toolkit.heading}
          </h2>
          <dl className="toolkit">
            {toolkit.groups.map((group) => (
              <div key={group.name}>
                <dt>{group.name}</dt>
                <dd>{group.items}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="shell section" aria-labelledby="background-heading">
          <h2 id="background-heading" className="section-title">
            {background.heading}
          </h2>
          <ol className="timeline">
            {background.milestones.map((milestone) => (
              <li key={milestone.what}>
                <span className="timeline-when">{milestone.when}</span>
                <p>{milestone.what}</p>
              </li>
            ))}
          </ol>
          <div className="languages">
            <h3>{background.languagesHeading}</h3>
            <ul>
              {background.languages.map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" className="shell section contact" aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="contact-heading">
            {contact.heading}
          </h2>
          <p className="contact-body">{contact.body}</p>
          <p className="contact-email">
            <a href={`mailto:${email}`}>
              <bdi dir="ltr">{email}</bdi>
            </a>
          </p>
          <ul className="contact-channels">
            <li>
              <a href={whatsapp.href}>
                <span>{contact.whatsapp}</span>
                <bdi dir="ltr">{whatsapp.label}</bdi>
              </a>
            </li>
            <li>
              <a href={instagram.href}>
                <span>{contact.instagram}</span>
                <bdi dir="ltr">{instagram.label}</bdi>
              </a>
            </li>
            <li>
              <a href={github.href} rel="me">
                <span>{contact.github}</span>
                <bdi dir="ltr">{github.label}</bdi>
              </a>
            </li>
          </ul>
        </section>
      </main>

      <footer className="shell footer">
        <p>© 2026 {copy.footer}</p>
        <a href={source}>GitHub</a>
      </footer>
    </>
  );
}
