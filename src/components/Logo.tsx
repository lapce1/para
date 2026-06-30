export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-end gap-2 ${className}`}>
      <svg
        width="22"
        height="30"
        viewBox="0 0 22 30"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5 28 C2 22 8 20 5 14 C3 10 7 8 5 3"
          stroke="#E8B24A"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M11 28 C8 21 14 19 11 12 C9 8 13 6 11 1"
          stroke="#E8B24A"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M17 28 C14 22 20 20 17 14 C15 10 19 8 17 4"
          stroke="#E8B24A"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
      <span className="font-display text-2xl font-extrabold leading-none tracking-tight text-bone">
        PARA
      </span>
    </span>
  );
}
