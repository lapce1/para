/**
 * A content placeholder box: marks where a real image (or other asset) belongs,
 * before it exists. Deliberately reads as a placeholder, a dashed frame on the
 * raised panel with a drawn image glyph and a label, so it is never mistaken for
 * final content. Swap it for a real <img> (or the Gallery/MenuCard photo) when
 * the asset lands. No photography is faked here; this only reserves the space.
 */
export default function Placeholder({
  label,
  ratio = "aspect-[4/3]",
  note,
  className = "",
}: {
  label: string;
  ratio?: string;
  note?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      className={`flex flex-col items-center justify-center gap-2 border-[3px] border-dashed border-chalk/35 bg-raised px-4 text-center ${ratio} ${className}`}
    >
      <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true" className="text-chalk/35">
        <rect x="3" y="4.5" width="18" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="8.5" cy="10" r="1.6" fill="currentColor" />
        <path
          d="M4 18l5-5 3.2 3.2L16 13l4 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="stamp text-chalksoft">{label}</span>
      {note && <span className="font-data text-[0.7rem] text-chalksoft/70">{note}</span>}
    </div>
  );
}
