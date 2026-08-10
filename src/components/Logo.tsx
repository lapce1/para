/**
 * The PARA logo — unchanged brand. The three steam wisps and the wordmark's
 * face (Bricolage Grotesque) are carried over verbatim from the previous
 * identity; only the ink adapts, because gold on board stock is unreadable.
 */
export default function Logo({
  className = "",
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "paper";
}) {
  const color = tone === "paper" ? "text-paper" : "text-paprika";
  const word = tone === "paper" ? "text-paper" : "text-ink";

  return (
    <span className={`inline-flex items-end gap-2 ${className}`}>
      <svg
        width="22"
        height="30"
        viewBox="0 0 22 30"
        fill="none"
        aria-hidden="true"
        className={color}
      >
        <path
          d="M5 28 C2 22 8 20 5 14 C3 10 7 8 5 3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M11 28 C8 21 14 19 11 12 C9 8 13 6 11 1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M17 28 C14 22 20 20 17 14 C15 10 19 8 17 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
      <span
        className={`font-mark text-2xl font-extrabold leading-none tracking-tight ${word}`}
      >
        PARA
      </span>
    </span>
  );
}
