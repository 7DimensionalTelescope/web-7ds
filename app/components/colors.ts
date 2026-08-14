/* ---------------------------------------------------------------------------
   Color scales shared by the sky map and the field map, so the two never
   disagree about what a given number looks like.
--------------------------------------------------------------------------- */

/* The site's medium-band motif, 400 to 900 nm. This is a real spectrum — it
   maps a wavelength to the color of that wavelength — so it is used only
   where the quantity being drawn is a wavelength. Ordered quantities such as
   visit counts use the single-hue scale below instead. */
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

function sample(stops: [number, [number, number, number]][], t: number): [number, number, number] {
  const clamped = Math.max(0, Math.min(1, t));
  let i = 0;
  while (i < stops.length - 2 && clamped > stops[i + 1][0]) i += 1;
  const [t0, a] = stops[i];
  const [t1, b] = stops[i + 1];
  const f = t1 === t0 ? 0 : (clamped - t0) / (t1 - t0);
  return [
    Math.round(a[0] + (b[0] - a[0]) * f),
    Math.round(a[1] + (b[1] - a[1]) * f),
    Math.round(a[2] + (b[2] - a[2]) * f),
  ];
}

/* ---------------------------------------------------------------------------
   Sequential scale for the maps: one hue, varying in lightness.

   A multi-hue scale asks the reader to hold a legend in their head — orange
   against green carries no innate order, so every tile has to be looked up. A
   single hue does not: more observations read as more ink on a light page, and
   as more light on a dark one, before the legend is consulted at all. The hue
   is the site accent, so the maps stay part of the same palette as everything
   around them.

   Both ends are pulled in from pure white and pure black: the lightest step
   still has to separate from the empty sky drawn beneath it, and the darkest
   still has to show its edges against its neighbors.
--------------------------------------------------------------------------- */

const RAMP_LIGHT: [number, [number, number, number]][] = [
  [0, [199, 219, 243]],
  [0.25, [143, 182, 231]],
  [0.5, [79, 139, 214]],
  [0.75, [32, 92, 178]],
  [1, [12, 47, 106]],
];

const RAMP_DARK: [number, [number, number, number]][] = [
  [0, [28, 55, 92]],
  [0.25, [42, 94, 156]],
  [0.5, [74, 138, 219]],
  [0.75, [124, 184, 255]],
  [1, [206, 228, 255]],
];

/**
 * Value in [0, 1] to a color on the single-hue scale.
 *
 * On a light surface the scale runs pale to deep, so the most-observed sky is
 * the darkest. On a dark one it runs dim to bright, so the same sky is the
 * brightest. Either way the reading is the same: more of it means more.
 */
export function sequential(t: number, dark = false): [number, number, number] {
  return sample(dark ? RAMP_DARK : RAMP_LIGHT, t);
}

/** True when a fill is dark enough that text on it should be white. */
export const isDark = (c: [number, number, number]) =>
  0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2] < 140;

/** Color for a central wavelength in nm, sampled off the spectrum motif. */
export function wavelengthColor(nm: number): string {
  return rgb(sample(SPECTRUM, (nm - 400) / 500));
}
