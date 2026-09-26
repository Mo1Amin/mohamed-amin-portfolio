import { signatureStrokes, signatureViewBox } from "@/lib/ink/signature";

export function Signature() {
  return (
    <svg className="signature" viewBox={signatureViewBox} aria-hidden="true">
      {signatureStrokes.map((stroke, i) => (
        <g key={i}>
          <mask id={`signature-${i}`} maskUnits="userSpaceOnUse" x="0" y="0" width="320" height="160">
            <path d={stroke.reveal} pathLength={1} className="signature-reveal" strokeWidth={stroke.reach} />
          </mask>
          <path d={stroke.fill} mask={`url(#signature-${i})`} />
        </g>
      ))}
    </svg>
  );
}
