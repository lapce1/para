// Subtle Vietnam motif: star anise (zvezdasti anis) — one of the five aromatics
// in the broth. Drawn as an 8-pod rosette in currentColor so it can be tinted
// gold/green and faded for use as a faint decorative accent.
export default function StarAnise({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 32 32)`}>
            <path d="M32 31 C25.5 26 27 12.5 32 6.5 C37 12.5 38.5 26 32 31 Z" />
            <circle cx="32" cy="21" r="1.7" fill="currentColor" stroke="none" />
          </g>
        ))}
        <circle cx="32" cy="32" r="3.4" />
      </g>
    </svg>
  );
}
