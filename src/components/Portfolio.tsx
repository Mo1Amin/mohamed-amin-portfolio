import type { CSSProperties, ReactNode } from "react";
import { copyFor, locales, pathFor, type Locale } from "@/content";
import { LotyMark, MasarMark, NordsurMark } from "./brands/Marks";
import { AcmChapter, LotyChapter, MasarChapter, NordsurChapter, NuvinkChapter } from "./chapters/Chapters";
import {
  ArrowDownIcon,
  ArrowOutIcon,
  GithubIcon,
  InstagramIcon,
  MailIcon,
  SendIcon,
  WhatsappIcon,
} from "./motion/icons";
import { DotGrowGroup, DotGrowItem } from "./dots/DotGrow";
import { DotText } from "./dots/DotText";
import { PrincipleGlyph, type GlyphKind } from "./dots/PrincipleGlyph";
import { RelayDots } from "./dots/RelayDots";
import { Monogram } from "./brands/Monogram";
import { MotionLink } from "./motion/MotionLink";
import { Squish, SquishLink } from "./motion/Squish";
import { ThemeToggle } from "./ThemeToggle";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const email = "mohmedamin1998@gmail.com";
const whatsapp = { href: "https://wa.me/201017348133", label: "+20 101 734 8133" };
const instagram = { href: "https://instagram.com/1l0mt", label: "@1l0mt" };
const github = { href: "https://github.com/Mo1Amin", label: "Mo1Amin" };
const source = "https://github.com/Mo1Amin/mohamed-amin-portfolio";

const glyphs: GlyphKind[] = ["moment", "security", "device", "team"];

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

      <a className="brand" href="#top" aria-label={hero.name}>
        <Squish>
          <Monogram />
        </Squish>
      </a>

      <nav className="top-controls" aria-label={ui.languageNav}>
        <ul className="language-list">
          {locales.map((code) => (
            <li key={code}>
              <a
                href={`${basePath}${pathFor(code)}`}
                hrefLang={code}
                lang={code}
                aria-current={code === locale ? "page" : undefined}
              >
                {ui.languages[code]}
              </a>
            </li>
          ))}
        </ul>
        <ThemeToggle toDark={ui.themeToDark} toLight={ui.themeToLight} />
      </nav>

      <header id="top" className="hero shell">
        <p className="hero-role">{hero.role}</p>
        <h1 className="hero-name">{hero.name}</h1>
        <div className="hero-intro">
          <p className="hero-lede">{hero.lede}</p>
          <div className="hero-actions">
            <MotionLink className="button button-primary" href="#work" icon={ArrowDownIcon} iconSize={18} iconAfter>
              {hero.primary}
            </MotionLink>
            <MotionLink className="button" href="#contact" icon={MailIcon} iconSize={18} iconAfter>
              {hero.secondary}
            </MotionLink>
          </div>
          <p className="hero-status">{hero.status}</p>
        </div>

        <nav className="project-index" aria-label={ui.projectIndex}>
          <ul>
            {index.map((project) => (
              <li key={project.id}>
                <SquishLink href={`#${project.id}`} mark={project.mark}>
                  <span className="project-index-text">
                    <span className="project-index-name">{project.name}</span>
                    <span className="project-index-role">{project.role}</span>
                  </span>
                </SquishLink>
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

        </section>

        <div className="lower">
          <section className="shell lower-section more" aria-labelledby="more-heading">
            <h2 id="more-heading" className="lower-title">
              {more.heading}
            </h2>
            <ul className="more-list">
              {more.items.map((item, i) => (
                <li key={item.href}>
                  <MotionLink href={item.href} icon={ArrowOutIcon} iconSize={18} iconAfter className="more-link">
                    <DotText delay={i * 140}>{item.name}</DotText>
                  </MotionLink>
                  <p>{item.summary}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="shell lower-section" aria-labelledby="principles-heading">
            <h2 id="principles-heading" className="lower-title">
              {principles.heading}
            </h2>
            <div className="principles">
              {principles.items.map((item, i) => (
                <div key={item.title} className="principle">
                  <PrincipleGlyph kind={glyphs[i]} />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="shell lower-section" aria-labelledby="toolkit-heading">
            <h2 id="toolkit-heading" className="lower-title">
              {toolkit.heading}
            </h2>
            <dl className="toolkit">
              {toolkit.groups.map((group) => (
                <div key={group.name} className="toolkit-group">
                  <dt>{group.name}</dt>
                  <dd>
                    <DotGrowGroup className="chips">
                      {group.items.split(/[,،]\s*/).map((skill) => (
                        <DotGrowItem key={skill} className="chip">
                          {skill}
                        </DotGrowItem>
                      ))}
                    </DotGrowGroup>
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="shell lower-section" aria-labelledby="background-heading">
            <h2 id="background-heading" className="lower-title">
              {background.heading}
            </h2>
            <ol className="timeline">
              {background.milestones.map((milestone, i) => (
                <li key={milestone.what} style={{ "--i": i } as CSSProperties}>
                  <span className="timeline-dot" aria-hidden="true" />
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

          <section id="contact" className="contact" aria-labelledby="contact-heading">
            <div className="shell">
              <div className="contact-panel">
                <RelayDots />
                <div className="contact-content">
                  <DotText as="h2" id="contact-heading" className="contact-heading">
                    {contact.heading}
                  </DotText>
                  <p className="contact-body">{contact.body}</p>
                  <p className="contact-email">
                    <MotionLink href={`mailto:${email}`} icon={SendIcon} iconSize={30}>
                      <bdi dir="ltr">{email}</bdi>
                    </MotionLink>
                  </p>
                  <DotGrowGroup className="contact-channels">
                    <DotGrowItem>
                      <MotionLink href={whatsapp.href} icon={WhatsappIcon}>
                        <span>{contact.whatsapp}</span>
                        <bdi dir="ltr">{whatsapp.label}</bdi>
                      </MotionLink>
                    </DotGrowItem>
                    <DotGrowItem>
                      <MotionLink href={instagram.href} icon={InstagramIcon}>
                        <span>{contact.instagram}</span>
                        <bdi dir="ltr">{instagram.label}</bdi>
                      </MotionLink>
                    </DotGrowItem>
                    <DotGrowItem>
                      <MotionLink href={github.href} icon={GithubIcon} rel="me">
                        <span>{contact.github}</span>
                        <bdi dir="ltr">{github.label}</bdi>
                      </MotionLink>
                    </DotGrowItem>
                  </DotGrowGroup>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="shell footer">
        <a className="footer-brand" href="#top" aria-label={hero.name}>
          <Monogram />
        </a>
        <p>
          © 2026 {copy.footer}
        </p>
        <MotionLink href={source} icon={GithubIcon} iconSize={16} className="footer-link">
          {ui.source}
        </MotionLink>
      </footer>
    </>
  );
}
