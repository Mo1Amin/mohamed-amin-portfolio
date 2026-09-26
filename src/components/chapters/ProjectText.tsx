import type { ReactNode } from "react";
import type { Project } from "@/content/types";
import { ArrowOutIcon, GithubIcon } from "../motion/icons";
import { MotionLink } from "../motion/MotionLink";

interface Props {
  project: Project;
  builtWith: string;
  summary?: ReactNode;
  children?: ReactNode;
}

export function ProjectMeta({ project }: { project: Project }) {
  return (
    <p className="chapter-meta">
      <span>{project.role}</span>
      <span>{project.period}</span>
    </p>
  );
}

export function ProjectText({ project, builtWith, summary, children }: Props) {
  return (
    <div className="chapter-text">
      <p className="chapter-summary">{summary ?? project.summary}</p>
      {children}
      <ul className="chapter-points">
        {project.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <dl className="chapter-stack">
        <dt>{builtWith}</dt>
        <dd>{project.stack}</dd>
      </dl>
      {project.links && (
        <p className="chapter-links">
          {project.links.map((link) => (
            <MotionLink
              key={link.href}
              href={link.href}
              icon={link.href.includes("github.com") ? GithubIcon : ArrowOutIcon}
              iconSize={18}
            >
              {link.label}
            </MotionLink>
          ))}
        </p>
      )}
    </div>
  );
}
