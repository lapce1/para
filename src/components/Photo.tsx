import Image from "next/image";

// Hybrid image slot: renders a real photo when `src` is provided, otherwise a
// branded gradient placeholder (the same bowl-swatch look used before). This
// scaffolds the move to real photography — drop files in /public/photos and set
// `image` on the menu data / hero, and the layout is already built for them.
export default function Photo({
  src,
  alt = "",
  colors = ["#2A3038", "#14171b"],
  ratio = "4 / 3",
  priority = false,
  className = "",
  children,
}: {
  src?: string;
  alt?: string;
  colors?: [string, string];
  ratio?: string;
  priority?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          priority={priority}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{ background: `radial-gradient(70% 70% at 50% 38%, ${colors[0]}, ${colors[1]})` }}
          />
          {/* faint bowl + steam motif so the placeholder reads as "food photo soon" */}
          <div
            className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-black/10 transition duration-500 group-hover:scale-105"
            style={{
              background: `radial-gradient(circle at 50% 35%, #F6D488, ${colors[0]})`,
              boxShadow: "inset 0 -8px 20px rgba(0,0,0,0.25)",
            }}
          />
        </>
      )}
      {children}
    </div>
  );
}
