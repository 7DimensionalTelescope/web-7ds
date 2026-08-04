/* ---------------------------------------------------------------------------
   Colour scales shared by the sky map and the field map, so the two never
   disagree about what a given number looks like.
--------------------------------------------------------------------------- */

/* Viridis, sampled at ten stops and interpolated. Chosen to match the colour
   scale used in the survey's own footprint figures, and because it stays
   legible in greyscale and to colour-blind readers. */
const VIRIDIS: [number, number, number][] = [
  [68, 1, 84],
  [72, 40, 120],
  [62, 74, 137],
  [49, 104, 142],
  [38, 130, 142],
  [31, 158, 137],
  [53, 183, 121],
  [110, 206, 88],
  [181, 222, 43],
  [253, 231, 37],
];

export function viridis(t: number): [number, number, number] {
  const clamped = Math.max(0, Math.min(1, t));
  const scaled = clamped * (VIRIDIS.length - 1);
  const i = Math.min(VIRIDIS.length - 2, Math.floor(scaled));
  const f = scaled - i;
  const a = VIRIDIS[i];
  const b = VIRIDIS[i + 1];
  return [
    Math.round(a[0] + (b[0] - a[0]) * f),
    Math.round(a[1] + (b[1] - a[1]) * f),
    Math.round(a[2] + (b[2] - a[2]) * f),
  ];
}

export const rgb = (c: [number, number, number]) => `rgb(${c[0]},${c[1]},${c[2]})`;

/** True when a fill is dark enough that text on it should be white. */
export const isDark = (c: [number, number, number]) =>
  0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2] < 140;

/* The site's medium-band motif, 400 to 900 nm, so filter coverage is drawn in
   the same colours as the spectrum rule used elsewhere on the site. */
const SPECTRUM: [number, [number, number, number]][] = [
  [0, [91, 58, 209]],
  [0.14, [53, 99, 216]],
  [0.28, [43, 155, 196]],
  [0.42, [53, 171, 124]],
  [0.56, [143, 180, 63]],
  [0.68, [210, 177, 53]],
  [0.8, [216, 128, 47]],
  [0.9, [191, 66, 44]],
  [1, [140, 36, 32]],
];

/** Colour for a central wavelength in nm, sampled off the spectrum motif. */
export function wavelengthColor(nm: number): string {
  const t = Math.max(0, Math.min(1, (nm - 400) / 500));
  let i = 0;
  while (i < SPECTRUM.length - 2 && t > SPECTRUM[i + 1][0]) i += 1;
  const [t0, a] = SPECTRUM[i];
  const [t1, b] = SPECTRUM[i + 1];
  const f = t1 === t0 ? 0 : (t - t0) / (t1 - t0);
  return rgb([
    Math.round(a[0] + (b[0] - a[0]) * f),
    Math.round(a[1] + (b[1] - a[1]) * f),
    Math.round(a[2] + (b[2] - a[2]) * f),
  ]);
}
