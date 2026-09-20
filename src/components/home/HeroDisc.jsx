import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { ringPoints, sectorPath } from "@/utils/discGeometry";

const OUTER_HOLES = ringPoints(24, 156);
const INNER_HOLES = ringPoints(24, 136, 7.5);
const BOLT_HOLES = ringPoints(5, 58, -90);
const CALIPER_OUTLINE = sectorPath(112, 214, -128, -52);
const CALIPER_RECESS = sectorPath(134, 196, -116, -64);

function DiscFace() {
  return (
    <>
      <circle r="200" fill="url(#disc-metal)" stroke="#6F7783" strokeWidth="2" />
      <g fill="none" stroke="rgba(20,24,32,.16)" strokeWidth="1.5">
        <circle r="188" />
        <circle r="176" />
        <circle r="122" />
      </g>
      <g fill="#2E343C">
        {OUTER_HOLES.map(({ x, y }, index) => (
          <circle key={index} cx={x} cy={y} r="6.5" />
        ))}
        {INNER_HOLES.map(({ x, y }, index) => (
          <circle key={index} cx={x} cy={y} r="4.5" />
        ))}
      </g>
      <circle r="108" fill="url(#disc-hat)" stroke="#59616D" strokeWidth="2" />
      <circle r="84" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="2" />
      <g fill="#2A2F36">
        {BOLT_HOLES.map(({ x, y }, index) => (
          <circle key={index} cx={x} cy={y} r="11" />
        ))}
      </g>
      <circle r="28" fill="#2A2F36" stroke="rgba(255,255,255,.3)" strokeWidth="2" />
      <circle cy="-96" r="4" className="fill-accent" />
    </>
  );
}

function Caliper() {
  return (
    <g className="drop-shadow-[0_14px_16px_rgba(0,0,0,0.28)]">
      <path
        d={CALIPER_OUTLINE}
        className="fill-accent stroke-accent"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d={CALIPER_RECESS} fill="rgba(0,0,0,.2)" />
      <path
        d={CALIPER_OUTLINE}
        fill="none"
        stroke="rgba(255,255,255,.28)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <text
        y="-158"
        textAnchor="middle"
        fill="#fff"
        fontSize="30"
        fontWeight="800"
        letterSpacing="4"
        fontFamily="Barlow Condensed, Arial Narrow, sans-serif"
      >
        {siteConfig.name.toUpperCase()}
      </text>
    </g>
  );
}

/** Disque de frein décoratif : il tourne une seule fois au chargement. */
export default function HeroDisc({ className = "" }) {
  return (
    <svg viewBox="-215 -215 430 430" aria-hidden="true" focusable="false" className={className}>
      <defs>
        <radialGradient id="disc-metal" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#EEF0F3" />
          <stop offset=".6" stopColor="#C6CBD2" />
          <stop offset="1" stopColor="#9FA6B0" />
        </radialGradient>
        <linearGradient id="disc-hat" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9198A3" />
          <stop offset="1" stopColor="#5B626D" />
        </linearGradient>
      </defs>
      <motion.g
        initial={{ rotate: -170 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 2.4, ease: [0.16, 0.8, 0.24, 1] }}
      >
        <DiscFace />
      </motion.g>
      <Caliper />
    </svg>
  );
}
