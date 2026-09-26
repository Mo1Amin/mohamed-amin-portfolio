"use client";

import { useInk } from "./InkLayer";

interface Props {
  labels: { penOn: string; penOff: string; clearInk: string; penActive: string };
}

export function PenControl({ labels }: Props) {
  const { penOn, setPenOn, hasInk, clear } = useInk();

  return (
    <div className="pen-control" data-no-ink>
      {hasInk && (
        <button type="button" className="float-button" onClick={clear} aria-label={labels.clearInk} title={labels.clearInk}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M4 20h9M7.5 16.5l-3-3a1.5 1.5 0 0 1 0-2.1l7.9-7.9a1.5 1.5 0 0 1 2.1 0l4.5 4.5a1.5 1.5 0 0 1 0 2.1L12 17.1" />
            <path d="M9.5 8.5l6 6" />
          </svg>
        </button>
      )}
      <button
        type="button"
        className="float-button pen-toggle"
        aria-pressed={penOn}
        onClick={() => setPenOn(!penOn)}
        title={penOn ? labels.penOff : labels.penOn}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path d="M14.5 4.5l5 5L9 20H4v-5L14.5 4.5z" />
          <path d="M12.5 6.5l5 5" />
        </svg>
        <span>{penOn ? labels.penOff : labels.penOn}</span>
      </button>
      <p className="pen-status" role="status">
        {penOn ? labels.penActive : ""}
      </p>
    </div>
  );
}
