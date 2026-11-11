"use client";

import { useEffect, useRef } from "react";

/**
 * Mount point for the hero's 3D bowl. The scene (and three.js with it) is pulled
 * in with a dynamic import after hydration, so it costs nothing on first load;
 * until it draws its first frame the stage shows the static steam mark behind it
 * (see Hero3D), and keeps showing it if WebGL is unavailable.
 *
 * This is the one motion/illustration exception on the site, added at the owner's
 * request. See DESIGN.md, "Motion" and "Imagery".
 */
export default function PhoCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let dispose: (() => void) | undefined;
    let cancelled = false;
    import("@/lib/phoScene")
      .then(({ mountPhoScene }) => {
        if (cancelled || !ref.current) return;
        dispose = mountPhoScene(ref.current);
      })
      .catch(() => {
        /* chunk failed to load: the static fallback stays, nothing else to do */
      });
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="stage-canvas pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
