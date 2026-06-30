// Vietnam motif: star anise (zvezdasti anis) — one of the five aromatics in the
// broth. Drawn botanically as eight boat-shaped follicles radiating from a small
// core, each with a faint seam and a seed pocket. Uses currentColor throughout so
// it can be tinted gold/green and faded for use as a decorative accent.
export default function StarAnise({ className = "" }: { className?: string }) {
  const pods = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      {pods.map((deg) => (
        <g key={deg} transform={`rotate(${deg} 32 32)`}>
          {/* follicle: pointed outer tip, fuller belly, tapering back to the core */}
          <path
            d="M32 30.5 C26.4 27 24.2 18.5 27.4 11 C28.7 8 30.3 5.6 32 4 C33.7 5.6 35.3 8 36.6 11 C39.8 18.5 37.6 27 32 30.5 Z"
            fill="currentColor"
            fillOpacity="0.14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* central seam of the pod */}
          <path
            d="M32 28 L32 9"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.45"
          />
          {/* glossy seed seated in the belly */}
          <ellipse cx="32" cy="19.5" rx="2" ry="2.8" fill="currentColor" opacity="0.85" />
        </g>
      ))}
      {/* core where the follicles meet */}
      <circle cx="32" cy="32" r="2.6" fill="currentColor" />
    </svg>
  );
}
