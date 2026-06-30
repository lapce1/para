export default function BowlArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 320"
      className={className}
      role="img"
      aria-label="Činija phở supe iz koje se diže para"
    >
      <defs>
        <radialGradient id="brothG" cx="50%" cy="42%" r="58%">
          <stop offset="0%" stopColor="#F6D488" />
          <stop offset="55%" stopColor="#E8B24A" />
          <stop offset="100%" stopColor="#AD6B1E" />
        </radialGradient>
        <linearGradient id="bowlG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#272A2F" />
          <stop offset="100%" stopColor="#0C0D10" />
        </linearGradient>
      </defs>

      <g stroke="#FCF8F0" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.8">
        <path className="wisp w1" d="M120 96 C108 76 132 70 120 50 C112 36 128 30 120 14" />
        <path className="wisp w2" d="M160 96 C148 72 172 66 160 44 C152 30 168 24 160 8" />
        <path className="wisp w3" d="M200 96 C188 76 212 70 200 50 C192 36 208 30 200 16" />
      </g>

      <path
        d="M44 150 H276 C272 226 224 268 160 268 C96 268 48 226 44 150 Z"
        fill="url(#bowlG)"
      />
      <ellipse cx="160" cy="150" rx="116" ry="34" fill="url(#brothG)" />
      <ellipse cx="160" cy="150" rx="116" ry="34" fill="none" stroke="#3A2E22" strokeWidth="4" />

      <g opacity="0.95">
        <ellipse cx="120" cy="146" rx="20" ry="6" fill="#7A3B1E" />
        <ellipse cx="160" cy="156" rx="22" ry="6" fill="#8A4322" />
        <ellipse cx="196" cy="146" rx="18" ry="5" fill="#6E3318" />
        <circle cx="138" cy="140" r="3" fill="#57C77B" />
        <circle cx="178" cy="142" r="3" fill="#57C77B" />
        <circle cx="150" cy="160" r="3" fill="#86E0A3" />
        <circle cx="200" cy="158" r="2.5" fill="#F3E9D6" />
        <circle cx="124" cy="158" r="2.5" fill="#F3E9D6" />
      </g>

      <ellipse cx="160" cy="276" rx="54" ry="9" fill="#0A0806" />
    </svg>
  );
}
