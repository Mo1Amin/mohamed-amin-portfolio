import type { Copy } from "@/content/types";
import { arrow } from "@/lib/ink/handDrawn";
import { outline, outlineToSvgPath, smooth } from "@/lib/ink/stroke";
import { Annotated } from "../Annotated";
import { LotyMark, MasarMark, NordsurMark } from "../brands/Marks";
import { InkLayer, PenControl } from "../ink/InkLayer";
import { Squish } from "../motion/Squish";
import { ProjectMeta, ProjectText } from "./ProjectText";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/projects/${path}`;

const hintArrow = arrow({ x: 8, y: 58 }, { x: 70, y: 10 }, 7)
  .map((points) => outlineToSvgPath(outline(smooth(points))))
  .join("");

function withMark(text: string, phrase: string) {
  const at = text.indexOf(phrase);
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <Annotated mark="underline" seed={11} delay={300} weight={3}>
        {phrase}
      </Annotated>
      {text.slice(at + phrase.length)}
    </>
  );
}

export function NuvinkChapter({ copy }: { copy: Copy }) {
  const { nuvink, ui } = copy;
  return (
    <InkLayer id="nuvink" className="chapter chapter-nuvink" labelledBy="nuvink-name">
      <div className="chapter-inner">
        <header className="chapter-head">
          <Squish>
            <img
              className="nuvink-mark"
              src={asset("nuvink-mark.webp")}
              alt={nuvink.markAlt}
              width={480}
              height={334}
              loading="lazy"
              decoding="async"
            />
          </Squish>
          <div>
            <h3 id="nuvink-name" className="chapter-name">
              {nuvink.name}
            </h3>
            <ProjectMeta project={nuvink} />
          </div>
        </header>

        <dl className="nuvink-metrics">
          {nuvink.metrics.map((metric, i) => (
            <div key={metric.label}>
              <dt>{metric.label}</dt>
              <dd>
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

        <div className="chapter-body">
          <ProjectText project={nuvink} builtWith={ui.builtWith} summary={withMark(nuvink.summary, nuvink.markPhrase)} />
          <aside className="nuvink-sheet">
            <p className="nuvink-hint">
              <span className="hint-pointer">{nuvink.pen.hintPointer}</span>
              <span className="hint-touch">{nuvink.pen.hintTouch}</span>
              <svg className="hint-arrow" viewBox="0 0 80 70" width="56" height="49" aria-hidden="true">
                <path d={hintArrow} />
              </svg>
            </p>
            <PenControl labels={nuvink.pen} />
          </aside>
        </div>
      </div>
    </InkLayer>
  );
}

export function NordsurChapter({ copy }: { copy: Copy }) {
  const { nordsur, ui } = copy;
  return (
    <section id="nordsur" className="chapter chapter-nordsur" aria-labelledby="nordsur-name">
      <div className="chapter-inner">
        <header className="chapter-head">
          <Squish>
            <NordsurMark size={56} />
          </Squish>
          <div>
            <h3 id="nordsur-name" className="chapter-name">
              {nordsur.name}
            </h3>
            <ProjectMeta project={nordsur} />
          </div>
        </header>
        <div className="chapter-body">
          <ProjectText project={nordsur} builtWith={ui.builtWith} />
          <figure className="nordsur-visual">
            <picture>
              <source srcSet={asset("nordsur-poster.webp")} media="(prefers-reduced-motion: reduce)" />
              <img
                src={asset("nordsur-flight.webp")}
                alt={nordsur.visualAlt}
                width={960}
                height={540}
                loading="lazy"
                decoding="async"
              />
            </picture>
          </figure>
        </div>
      </div>
    </section>
  );
}

export function MasarChapter({ copy }: { copy: Copy }) {
  const { masar, ui } = copy;
  return (
    <section id="masar" className="chapter chapter-masar" aria-labelledby="masar-name">
      <div className="chapter-inner">
        <header className="chapter-head">
          <Squish>
            <MasarMark size={56} />
          </Squish>
          <div>
            <h3 id="masar-name" className="chapter-name">
              {masar.name}
              {copy.locale !== "ar" && (
                <span className="masar-arabic" lang="ar">
                  مسار
                </span>
              )}
            </h3>
            <ProjectMeta project={masar} />
          </div>
        </header>
        <div className="chapter-body">
          <ProjectText project={masar} builtWith={ui.builtWith}>
            <p className="masar-meaning">{masar.meaning}</p>
          </ProjectText>
          <div className="masar-visual" aria-hidden="true">
            <svg viewBox="0 0 320 320" className="masar-route">
              <path className="masar-track" d="M40 270h50c40 0 40-80 90-80s40-110 100-110" />
              <path className="masar-progress" d="M40 270h50c40 0 40-80 90-80s40-110 100-110" pathLength={1} />
              <circle className="masar-start" cx="40" cy="270" r="9" />
              <circle className="masar-goal" cx="280" cy="80" r="16" />
              <circle className="masar-goal-core" cx="280" cy="80" r="6" />
            </svg>
            <p className="masar-grade" dir="ltr">A+</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LotyChapter({ copy }: { copy: Copy }) {
  const { loty, ui } = copy;
  return (
    <section id="loty" className="chapter chapter-loty" aria-labelledby="loty-name">
      <div className="chapter-inner">
        <header className="chapter-head">
          <Squish>
            <LotyMark size={56} />
          </Squish>
          <div>
            <h3 id="loty-name" className="chapter-name">
              {loty.name}
            </h3>
            <ProjectMeta project={loty} />
          </div>
        </header>
        <div className="chapter-body">
          <ProjectText project={loty} builtWith={ui.builtWith} />
          <figure className="loty-visual" role="img" aria-label={loty.visualAlt}>
            <div className="loty-screen">
              <LotyMark size={72} className="loty-screen-mark" />
              <div className="loty-timeline" dir="ltr">
                <span className="loty-played" />
                <span className="loty-head" style={{ left: "61.6%" }} />
                <span className="loty-head" style={{ left: "62%" }} />
                <span className="loty-head" style={{ left: "62.3%" }} />
              </div>
            </div>
            <figcaption className="loty-drift">
              <bdi dir="ltr" className="loty-drift-value">
                {loty.drift.value}
              </bdi>
              <span>{loty.drift.label}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

export function AcmChapter({ copy }: { copy: Copy }) {
  const { acm, ui } = copy;
  return (
    <section id="acm" className="chapter chapter-acm" aria-labelledby="acm-name">
      <div className="chapter-inner">
        <header className="chapter-head">
          <Squish>
            <img className="acm-logo" src={asset("acm-logo.webp")} alt="" width={240} height={240} loading="lazy" />
          </Squish>
          <div>
            <h3 id="acm-name" className="chapter-name">
              {acm.name}
            </h3>
            <ProjectMeta project={acm} />
          </div>
        </header>
        <div className="chapter-body">
          <ProjectText project={acm} builtWith={ui.builtWith} />
          <figure className="acm-visual">
            <img
              src={asset("acm-preview.webp")}
              alt={acm.visualAlt}
              width={1280}
              height={720}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
