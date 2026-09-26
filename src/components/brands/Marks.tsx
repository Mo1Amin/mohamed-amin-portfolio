interface MarkProps {
  size?: number;
  className?: string;
  title?: string;
}

function a11y(title?: string) {
  return title ? { role: "img", "aria-label": title } : { "aria-hidden": true };
}

// Two buoys and the route between them, from the Nordsur favicon.
export function NordsurMark({ size = 48, className, title }: MarkProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={className} {...a11y(title)}>
      <rect width="32" height="32" rx="8" fill="#0b0b0c" />
      <g fill="#ff8a57">
        <circle cx="11" cy="9" r="3" />
        <circle cx="21" cy="23" r="3" />
      </g>
      <path d="M11 13c0 6 10 3 10 8" fill="none" stroke="#ff8a57" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function LotyMark({ size = 48, className, title }: MarkProps) {
  return (
    <svg viewBox="0 0 512 512" width={size} height={size} className={className} {...a11y(title)}>
      <rect width="512" height="512" rx="114" fill="#000" />
      <path d="M112 168c0-20 22-33 40-23l150 87c17 10 17 36 0 46l-150 87c-18 10-40-3-40-23z" fill="#0A84FF" />
      <path
        d="M196 168c0-20 22-33 40-23l150 87c17 10 17 36 0 46l-150 87c-18 10-40-3-40-23z"
        fill="#fff"
        stroke="#000"
        strokeWidth="18"
        paintOrder="stroke"
      />
    </svg>
  );
}

// Masar means "path": a route that climbs from the start line to a goal.
export function MasarMark({ size = 48, className, title }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} {...a11y(title)}>
      <rect width="64" height="64" rx="16" fill="#0b3b30" />
      <path
        d="M14 48h8c7 0 7-12 14-12s6-11 13-11"
        fill="none"
        stroke="#34d399"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="18" r="5" fill="#ecfdf5" />
    </svg>
  );
}
