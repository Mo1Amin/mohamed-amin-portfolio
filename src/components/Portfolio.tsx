import Link from "next/link";
import { copyFor, locales, pathFor, type Locale } from "@/content";
import type { Project } from "@/content/types";
import { arrow } from "@/lib/ink/handDrawn";
import { outline, outlineToSvgPath, smooth } from "@/lib/ink/stroke";
import { Annotated } from "./Annotated";
import { InkLayer } from "./ink/InkLayer";
import { PenControl } from "./ink/PenControl";
import { Signature } from "./Signature";
import { ThemeToggle } from "./ThemeToggle";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const email = "mohmedamin1998@gmail.com";
const github = "https://github.com/Mo1Amin";
const source = "https://github.com/Mo1Amin/mohamed-amin-portfolio";

const hintArrow = arrow({ x: 8, y: 58 }, { x: 70, y: 10 }, 7)
  .map((points) => outlineToSvgPath(outline(smooth(points))))
  .join("");

export function Portfolio({ locale }: { locale: Locale }) {
  const copy = copyFor(locale);
  const { hero, work, principles, toolkit, background, contact, ui } = copy;

  return (
    <InkLayer>
      <a className="skip-link" href="#work">
        {ui.skip}
      </a>

      <nav className="top-controls" aria-label={ui.languageNav} data-no-ink>
        <ul className="language-list">
          {locales.map((code) => (
            <li key={code}>
              <Link
                href={pathFor(code)}
                hrefLang={code}
                lang={code}
                aria-current={code === locale ? "page" : undefined}
              >
                {ui.languages[code]}
              </Link>
            </li>
          ))}
        </ul>
        <ThemeToggle toDark={ui.themeToDark} toLight={ui.themeToLight} />
      </nav>

      <div className="sheet">
        <header className="hero" data-ink-zone>
          <div className="row">
            <p className="margin-note hero-role">{hero.role}</p>
            <div>
              <div className="hero-title">
                <h1 className="hero-name">{hero.name}</h1>
                <Signature />
              </div>
              <p className="hero-lede">
                {hero.ledeBefore}
                <Annotated mark="underline" seed={11} delay={900} weight={3.4}>
                  {hero.ledeMark}
                </Annotated>
                {hero.ledeAfter}
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work">
                  {hero.primary}
                </a>
                <a className="button" href={`mailto:${email}`}>
                  {hero.secondary}
                </a>
              </div>
              <p className="hero-status">{hero.status}</p>
            </div>
          </div>
          <div className="row hero-hint-row" aria-hidden="true">
            <span />
            <p className="hero-hint">
              <svg className="hint-arrow" viewBox="0 0 80 70" width="80" height="70">
                <path d={hintArrow} />
              </svg>
              <span className="hint-pointer">{ui.penHintPointer}</span>
              <span className="hint-touch">{ui.penHintTouch}</span>
            </p>
          </div>
        </header>

        <main>
          <section id="work" className="section" aria-labelledby="work-heading">
            <div className="row">
              <h2 id="work-heading" className="section-label">
                {work.heading}
              </h2>
              <p className="section-intro">{work.intro}</p>
            </div>

            <article className="flagship" aria-labelledby="nuvink-name">
              <div className="row">
                <div className="margin-note">
                  <p>{work.flagship.role}</p>
                  <p>{work.flagship.period}</p>
                </div>
                <div>
                  <div className="flagship-head">
                    <img
                      className="flagship-mark"
                      src={`${basePath}/nuvink-mark.webp`}
                      alt={work.flagship.markAlt}
                      width={480}
                      height={334}
                      loading="lazy"
                      decoding="async"
                    />
                    <h3 id="nuvink-name" className="flagship-name">
                      {work.flagship.name}
                    </h3>
                  </div>
                  <p className="flagship-summary">{work.flagship.summary}</p>
                </div>
              </div>

              <div className="row">
                <span />
                <dl className="metrics">
                  {work.flagship.metrics.map((metric, i) => (
                    <div key={metric.label} className="metric">
                      <dt className="metric-label">{metric.label}</dt>
                      <dd className="metric-value">
                        <bdi dir="ltr">
                          {i === 0 ? (
                            <Annotated mark="loop" seed={23} delay={200} weight={3}>
                              {metric.value}
                            </Annotated>
                          ) : (
                            metric.value
                          )}
                        </bdi>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="row">
                <p className="margin-note">{work.flagship.stack}</p>
                <ul className="details">
                  {work.flagship.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            </article>

            {work.others.map((project) => (
              <ProjectRow key={project.id} project={project} />
            ))}
          </section>

          <section className="section" aria-labelledby="principles-heading">
            <div className="row">
              <h2 id="principles-heading" className="section-label">
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
            </div>
          </section>

          <section className="section" aria-labelledby="toolkit-heading">
            <div className="row">
              <h2 id="toolkit-heading" className="section-label">
                {toolkit.heading}
              </h2>
              <span />
            </div>
            <dl className="toolkit">
              {toolkit.groups.map((group) => (
                <div key={group.name} className="row">
                  <dt className="margin-note">{group.name}</dt>
                  <dd>{group.items}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="section" aria-labelledby="background-heading">
            <div className="row">
              <h2 id="background-heading" className="section-label">
                {background.heading}
              </h2>
              <span />
            </div>
            <ol className="timeline">
              {background.milestones.map((milestone) => (
                <li key={milestone.what} className="row">
                  <span className="margin-note timeline-when">{milestone.when}</span>
                  <p>{milestone.what}</p>
                </li>
              ))}
            </ol>
            <div className="row side-facts">
              <span />
              <div className="facts">
                <div>
                  <h3>{background.leadershipHeading}</h3>
                  <p>{background.leadership}</p>
                </div>
                <div>
                  <h3>{background.languagesHeading}</h3>
                  <ul>
                    {background.languages.map((language) => (
                      <li key={language}>{language}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="section contact" aria-labelledby="contact-heading">
            <div className="row">
              <span />
              <div>
                <h2 id="contact-heading" className="contact-heading">
                  {contact.heading}
                </h2>
                <p className="contact-body">{contact.body}</p>
                <p className="contact-email">
                  <a href={`mailto:${email}`}>
                    <Annotated mark="underline" seed={41} weight={3}>
                      <bdi dir="ltr">{contact.emailLabel}</bdi>
                    </Annotated>
                  </a>
                </p>
                <p className="contact-links">
                  <a href={github} rel="me">
                    {contact.github}
                  </a>
                </p>
              </div>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="row">
            <p className="margin-note">© 2026 {hero.name}</p>
            <p>
              {copy.footer} <a href={source}>{ui.viewSource}</a>
            </p>
          </div>
        </footer>
      </div>

      <PenControl labels={ui} />
    </InkLayer>
  );
}

function ProjectRow({ project }: { project: Project }) {
  return (
    <article className="project" aria-labelledby={`${project.id}-name`}>
      <div className="row">
        <div className="margin-note">
          <p>{project.role}</p>
          <p>{project.period}</p>
        </div>
        <div>
          <h3 id={`${project.id}-name`} className="project-name">
            {project.name}
          </h3>
          <p className="project-summary">{project.summary}</p>
          {project.details.map((detail) => (
            <p key={detail} className="project-detail">
              {detail}
            </p>
          ))}
          <p className="project-stack">{project.stack}</p>
          {project.link && (
            <p className="project-link">
              <a href={project.link.href}>{project.link.label}</a>
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
