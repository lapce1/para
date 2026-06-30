// Herb sprig (mint/basil) — the decorative motif that replaces the star-anise
// watermark across the site. Drawn in currentColor so it can be tinted and faded
// (e.g. text-herb/[0.08]) for use as a soft background accent.
const LEAF = "M0 0 C 7 -10 8 -27 0 -39 C -8 -27 -7 -10 0 0 Z";

const leaves = [
  { x: 32, y: 50, r: -44, s: 0.5 },
  { x: 32, y: 50, r: 44, s: 0.5 },
  { x: 32, y: 41, r: -32, s: 0.6 },
  { x: 32, y: 41, r: 32, s: 0.6 },
  { x: 32, y: 31, r: -20, s: 0.62 },
  { x: 32, y: 24, r: 0, s: 0.66 },
];

export default function HerbSprig({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path
        d="M32 61 C 30 45 33 29 32 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {leaves.map((n, i) => (
        <g key={i} transform={`translate(${n.x} ${n.y}) rotate(${n.r}) scale(${n.s})`}>
          <path d={LEAF} fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}
