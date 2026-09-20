import { ringPoints, sectorPath } from "@/utils/discGeometry";

const OUTER_HOLES = ringPoints(24, 156);
const INNER_HOLES = ringPoints(24, 136, 7.5);
const BOLT_HOLES = ringPoints(5, 58, -90);

/** Disque en fil de fer, décoratif, pour le fond de la section CTA. */
export default function CtaDisc({ className = "" }) {
  return (
    <svg viewBox="-215 -215 430 430" aria-hidden="true" focusable="false" className={className}>
      <g fill="none" stroke="currentColor" strokeWidth="2.5">
        {[200, 188, 122, 108, 84, 28].map((radius) => (
          <circle key={radius} r={radius} />
        ))}
        {OUTER_HOLES.map(({ x, y }, index) => (
          <circle key={`outer-${index}`} cx={x} cy={y} r="6.5" />
        ))}
        {INNER_HOLES.map(({ x, y }, index) => (
          <circle key={`inner-${index}`} cx={x} cy={y} r="4.5" />
        ))}
        {BOLT_HOLES.map(({ x, y }, index) => (
          <circle key={`bolt-${index}`} cx={x} cy={y} r="11" />
        ))}
      </g>
      <path
        d={sectorPath(112, 214, -128, -52)}
        fill="none"
        strokeWidth="5"
        strokeLinejoin="round"
        className="stroke-accent"
      />
    </svg>
  );
}
