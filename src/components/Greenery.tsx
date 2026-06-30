// Colorful garnish bouquet that sits BEHIND the bowl in the hero: a fan of fresh
// herb leaves rising out of the bowl, with a lime wheel and a chili for citrus +
// heat pops. viewBox matches BowlArt (320×320) so it aligns when overlaid.
const LEAF = "M0 0 C 9 -13 10 -34 0 -48 C -10 -34 -9 -13 0 0 Z";

// rooted at the broth line (160,150); only the tips clear the rim and show.
const leaves = [
  { r: -56, s: 1.32, c: "#2F8F52" },
  { r: -37, s: 1.5, c: "#3FB06A" },
  { r: -17, s: 1.64, c: "#57C77B" },
  { r: 3, s: 1.56, c: "#86E0A3" },
  { r: 22, s: 1.5, c: "#57C77B" },
  { r: 41, s: 1.46, c: "#3FB06A" },
  { r: 58, s: 1.3, c: "#2F8F52" },
];

export default function Greenery({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 320" className={className} fill="none" aria-hidden="true">
      <defs>
        <radialGradient
          id="greenGlow"
          gradientUnits="userSpaceOnUse"
          cx="160"
          cy="120"
          r="150"
        >
          <stop offset="0%" stopColor="#57C77B" stopOpacity="0.2" />
          <stop offset="65%" stopColor="#57C77B" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#57C77B" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="chiliG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EF6A4E" />
          <stop offset="100%" stopColor="#B5301F" />
        </linearGradient>
      </defs>

      {/* soft green halo for depth — circle sits outside the gradient's reach so
          the glow dissolves to nothing instead of clipping to a hard disc edge. */}
      <circle cx="160" cy="120" r="160" fill="url(#greenGlow)" />

      {/* herb-leaf fan */}
      <g>
        {leaves.map((l, i) => (
          <g key={i} transform={`translate(160 150) rotate(${l.r}) scale(${l.s})`}>
            <path d={LEAF} fill={l.c} />
            <path d="M0 -4 L0 -38" stroke="#1C3A22" strokeOpacity="0.35" strokeWidth="1.4" />
          </g>
        ))}
      </g>

      {/* chili — heat pop, peeking left of the rim */}
      <g transform="translate(104 104) rotate(-22)">
        <path d="M-4 -6 C 1 -2 3 2 2 6" stroke="#3FB06A" strokeWidth="3" strokeLinecap="round" />
        <path
          d="M2 4 C 14 3 21 14 18 28 C 16 37 9 41 6 39 C 12 33 13 23 8 15 C 5 9 3 7 2 4 Z"
          fill="url(#chiliG)"
        />
      </g>

      {/* lime wheel — citrus pop, peeking right of the rim */}
      <g transform="translate(214 92)">
        <circle r="20" fill="#4FB06A" />
        <circle r="16.5" fill="#EAF6CF" />
        <circle r="13.5" fill="#BFE372" />
        {[0, 30, 60, 90, 120, 150].map((a) => (
          <line
            key={a}
            x1="0"
            y1="0"
            x2={13.5 * Math.cos((a * Math.PI) / 180)}
            y2={13.5 * Math.sin((a * Math.PI) / 180)}
            stroke="#EAF6CF"
            strokeWidth="1.4"
          />
        ))}
        <line x1="-13.5" y1="0" x2="13.5" y2="0" stroke="#EAF6CF" strokeWidth="1.4" />
        <circle r="1.8" fill="#EAF6CF" />
      </g>
    </svg>
  );
}
