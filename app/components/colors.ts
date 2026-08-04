/* ---------------------------------------------------------------------------
   Colour scales shared by the sky map and the field map, so the two never
   disagree about what a given number looks like.
--------------------------------------------------------------------------- */

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

export const rgb = (c: [number, number, number]) => `rgb(${c[0]},${c[1]},${c[2]})`;

/**
 * The site's own spectrum, used as the sequential scale on the sky maps.
 *
 * Viridis is the conventional choice and is what the project's own figures
 * use, but it ends in a yellow that disappears against a light page — exactly
 * where the most recently observed tiles fall. Every stop of the spectrum
 * motif is mid-dark and saturated, so the scale stays legible end to end on
 * paper, and it is the palette the rest of the site already runs on. The scale
 * is always drawn with its legend, since a spectrum is read by reference to
 * one rather than by brightness alone.
 */
export function spectrum(t: number): [number, number, number] {
  const clamped = Math.max(0, Math.min(1, t));
  let i = 0;
  while (i < SPECTRUM.length - 2 && clamped > SPECTRUM[i + 1][0]) i += 1;
  const [t0, a] = SPECTRUM[i];
  const [t1, b] = SPECTRUM[i + 1];
  const f = t1 === t0 ? 0 : (clamped - t0) / (t1 - t0);
  return [
    Math.round(a[0] + (b[0] - a[0]) * f),
    Math.round(a[1] + (b[1] - a[1]) * f),
    Math.round(a[2] + (b[2] - a[2]) * f),
  ];
}

/** True when a fill is dark enough that text on it should be white. */
export const isDark = (c: [number, number, number]) =>
  0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2] < 140;

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
