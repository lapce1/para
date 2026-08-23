export type Photo = {
  /** Path under /public, e.g. "/photos/cinija.jpg". Real photos only. */
  src: string;
  /** Serbian alt text describing what is actually in the shot. */
  alt: string;
  /** Intrinsic pixel size, so the browser reserves space and the layout
      does not shift while the image loads. */
  w: number;
  h: number;
};

/**
 * Real photography of the bowl and the lokal. This is intentionally empty until
 * real files exist: an empty array renders no gallery at all, so the site never
 * shows a broken image or a stock/faked "product demo."
 *
 * To turn it on:
 *   1. Drop the image files into public/photos/ (e.g. public/photos/cinija.jpg).
 *   2. Add an entry here with the real path, a truthful Serbian alt, and the
 *      file's real pixel dimensions.
 * The gallery on the landing page then appears automatically.
 */
export const photos: Photo[] = [];
