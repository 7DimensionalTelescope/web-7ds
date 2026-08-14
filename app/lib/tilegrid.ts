/* ---------------------------------------------------------------------------
   The 7DS tiling, as designed rather than as observed.

   The portal publishes tiles that have been observed. The planned footprint —
   what the survey will cover when it is complete — is not an endpoint, so it
   is reconstructed here from the tiling rule the grid follows.

   The rule: declination rings evenly spaced from the south celestial pole,
   each ring holding a whole number of tiles evenly spaced in right ascension,
   numbered T00000 upward ring by ring and, within a ring, from RA = 0.

   Derived from the observed tile list and checked against it: reconstructing
   every one of the 15,579 observed tiles from its identifier alone reproduces
   the cataloged RA and Dec exactly, with no mismatches, and the boundary
   between the original grid and the northern extension (`ris_tile_name_bound`
   = T25472 in the tiles payload) falls exactly on a ring boundary. To re-check
   after a change to the grid, compare `tileAt(id)` against the ra/dec of every
   tile the portal returns.
--------------------------------------------------------------------------- */

/** Declination of ring 0 — the tile centered on the south celestial pole. */
const DEC0 = -90;

/** Ring separation in declination, degrees: 180° over 212 steps. */
const DEC_STEP = 180 / 212;

/**
 * Tiles in each ring, from the south pole northward. 142 rings reach Dec
 * +29.7°, which is as far as the array observes.
 */
const RING = [
  1, 7, 11, 15, 19, 23, 27, 31, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96,
  100, 103, 107, 111, 115, 119, 122, 126, 130, 133, 137, 141, 144, 148, 151, 155, 158, 162, 165,
  168, 171, 175, 178, 181, 184, 187, 190, 193, 196, 199, 202, 205, 208, 211, 213, 216, 219, 221,
  224, 226, 228, 231, 233, 235, 238, 240, 242, 244, 246, 248, 250, 252, 253, 255, 257, 258, 260,
  261, 263, 264, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 276, 277, 277, 278, 278,
  279, 279, 279, 279, 280, 280, 280, 280, 280, 279, 279, 279, 279, 278, 278, 277, 277, 276, 276,
  275, 274, 273, 272, 271, 270, 269, 268, 267, 266, 264, 263, 261, 260, 258, 257, 255, 253, 252,
  250, 248, 246, 244,
];

/** Identifier of the first tile in each ring. */
const RING_START = (() => {
  const out: number[] = [];
  let at = 0;
  for (const n of RING) {
    out.push(at);
    at += n;
  }
  return out;
})();

/** Every tile in the grid, original and extension together. */
export const GRID_TILES = RING_START[RING.length - 1] + RING[RING.length - 1];

/**
 * First identifier of the northern extension. Tiles below this belong to the
 * original grid the RIS coverage percentage is counted over; the portal
 * publishes the same boundary as `ris_tile_name_bound`.
 */
export const EXTENSION_FROM = 25472;

/** Number of tiles in the original grid. */
export const RIS_TILES = EXTENSION_FROM;

export type Grid = { ra: Float64Array; dec: Float64Array; count: number };

/**
 * Tile centers for identifiers in [from, to).
 *
 * Returned as parallel typed arrays rather than objects: the whole grid is
 * twenty-eight thousand tiles and it is only ever iterated, never indexed by
 * name.
 */
export function tileGrid(from = 0, to = GRID_TILES): Grid {
  const start = Math.max(0, from);
  const end = Math.min(GRID_TILES, to);
  const count = Math.max(0, end - start);
  const ra = new Float64Array(count);
  const dec = new Float64Array(count);

  let ring = 0;
  while (ring < RING.length - 1 && RING_START[ring + 1] <= start) ring += 1;

  for (let i = 0; i < count; i += 1) {
    const id = start + i;
    while (ring < RING.length - 1 && RING_START[ring + 1] <= id) ring += 1;
    ra[i] = ((id - RING_START[ring]) * 360) / RING[ring];
    dec[i] = DEC0 + ring * DEC_STEP;
  }

  return { ra, dec, count };
}

/** Center of one tile, by numeric identifier. */
export function tileAt(id: number): { ra: number; dec: number } | null {
  if (!Number.isInteger(id) || id < 0 || id >= GRID_TILES) return null;
  let ring = 0;
  while (ring < RING.length - 1 && RING_START[ring + 1] <= id) ring += 1;
  return {
    ra: ((id - RING_START[ring]) * 360) / RING[ring],
    dec: DEC0 + ring * DEC_STEP,
  };
}
