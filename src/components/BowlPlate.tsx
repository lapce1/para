/**
 * The product, drawn as printed packaging art rather than photographed.
 *
 * Flat process inks, one heavy keyline, no gradients — the way a food label
 * depicts its contents. A duplicate silhouette sits 4px off-register behind
 * the artwork, the way a cheap four-colour job slips on press; that slip is
 * the same idea the whole surface is built on.
 */
export default function BowlPlate({ className = "" }: { className?: string }) {
  const KEY = "#241B14";

  return (
    <svg
      viewBox="0 0 400 380"
      className={className}
      role="img"
      aria-label="Činija phở supe: rezanci, junetina, sveže biljke i limeta, para se diže iznad"
    >
      {/* off-register plate — printed a hair out of alignment */}
      <g transform="translate(5 5)" opacity="0.34">
        <path
          d="M42 196 H358 C352 300 288 352 200 352 C112 352 48 300 42 196 Z"
          fill="#C0442A"
        />
        <ellipse cx="200" cy="196" rx="158" ry="40" fill="#C0442A" />
      </g>

      {/* steam — the product's own name, rising */}
      <g stroke={KEY} strokeWidth="7" strokeLinecap="round" fill="none">
        <path className="rise" d="M150 150 C136 122 166 112 152 84 C142 64 164 54 152 32" />
        <path className="rise rise-2" d="M200 154 C186 120 216 110 202 78 C192 56 214 46 202 22" />
        <path className="rise rise-3" d="M250 150 C236 122 266 112 252 84 C242 64 264 54 252 32" />
      </g>

      {/* broth surface */}
      <ellipse cx="200" cy="196" rx="158" ry="40" fill="#E8A33C" />

      {/* contents, sitting in the broth */}
      <g>
        {/* rice noodles */}
        <g stroke="#EDE2CE" strokeWidth="6" strokeLinecap="round" fill="none">
          <path d="M126 200 C158 186 196 210 232 194" />
          <path d="M140 212 C172 198 206 220 246 204" />
          <path d="M132 188 C160 176 190 196 224 182" />
        </g>
        {/* brisket + rare beef, sliced thin */}
        <path
          d="M238 182 C262 176 288 182 292 194 C296 206 272 214 250 210 C232 207 224 187 238 182 Z"
          fill="#8E2D1A"
          stroke={KEY}
          strokeWidth="3.5"
        />
        <path
          d="M108 194 C128 186 152 192 156 202 C160 212 140 220 120 216 C104 213 96 199 108 194 Z"
          fill="#A8371F"
          stroke={KEY}
          strokeWidth="3.5"
        />
        {/* herbs — mint and basil, the sharp plate */}
        <path
          d="M186 176 C196 162 214 160 222 168 C214 182 196 186 186 176 Z"
          fill="#C9F23F"
          stroke={KEY}
          strokeWidth="3"
        />
        <path
          d="M148 216 C158 204 176 203 183 211 C175 224 158 226 148 216 Z"
          fill="#C9F23F"
          stroke={KEY}
          strokeWidth="3"
        />
        {/* scallion rings */}
        <circle cx="272" cy="176" r="7" fill="#C9F23F" stroke={KEY} strokeWidth="3" />
        <circle cx="118" cy="176" r="6" fill="#C9F23F" stroke={KEY} strokeWidth="3" />
        <circle cx="214" cy="214" r="6" fill="#C9F23F" stroke={KEY} strokeWidth="3" />
        {/* chilli */}
        <path
          d="M286 208 C300 206 312 214 308 222 C304 230 288 228 282 220 C279 215 281 209 286 208 Z"
          fill="#C0442A"
          stroke={KEY}
          strokeWidth="3"
        />
        {/* lime wedge, resting on the rim */}
        <path
          d="M70 186 C86 178 104 186 106 198 C90 206 72 199 70 186 Z"
          fill="#C9F23F"
          stroke={KEY}
          strokeWidth="3.5"
        />
        <path d="M78 189 L98 197 M88 184 L92 200" stroke={KEY} strokeWidth="2" />
      </g>

      {/* bowl body */}
      <path
        d="M42 196 H358 C352 300 288 352 200 352 C112 352 48 300 42 196 Z"
        fill="#A8371F"
        stroke={KEY}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      {/* painted band around the bowl — the vessel's own label */}
      <path
        d="M56 246 C104 268 152 278 200 278 C248 278 296 268 344 246"
        stroke="#EDE2CE"
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M56 246 C104 268 152 278 200 278 C248 278 296 268 344 246"
        stroke={KEY}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* rim keyline, drawn last so it sits above the broth */}
      <ellipse
        cx="200"
        cy="196"
        rx="158"
        ry="40"
        fill="none"
        stroke={KEY}
        strokeWidth="6"
      />
    </svg>
  );
}
