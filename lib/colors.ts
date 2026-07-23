// Per-row background colours for the demo. Hues advance in smooth analogous
// steps at a fixed saturation and lightness, so bands stacked beside each other
// flow through the spectrum and read as one cohesive palette rather than a
// random jumble. Foreground is a near-black that stays legible on every hue at
// this lightness.

const HUE_STEP = 34; // degrees per row — analogous neighbours, ~11 rows per loop
const SAT = 72; // %
const LIGHT = 72; // % — light enough that near-black text has strong contrast

/** Background + foreground for the row at `index`. */
export function rowColor(index: number): { bg: string; fg: string } {
	const hue = (((index * HUE_STEP) % 360) + 360) % 360;
	return { bg: `hsl(${hue} ${SAT}% ${LIGHT}%)`, fg: "#161616" };
}

/** Neutral band for colour fonts, so the font's own colours carry the row. */
export const NEUTRAL = { bg: "#0b0b0b", fg: "#ffffff" };
