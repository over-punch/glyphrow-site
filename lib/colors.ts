// Per-row background colours for the demo. Hues advance by the golden angle so
// every neighbouring band is a distinctly different hue, yet — because the
// saturation and lightness are fixed — they all share one tone and read as a
// cohesive, evenly-distributed palette. Foreground is a near-black that stays
// legible on every hue at this lightness.

const HUE_STEP = 137.508; // golden angle — maximally-distinct, evenly-spread hues
const SAT = 72; // %
const LIGHT = 72; // % — light enough that near-black text has strong contrast

/** Background + foreground for the row at `index`. */
export function rowColor(index: number): { bg: string; fg: string } {
	const hue = (((index * HUE_STEP) % 360) + 360) % 360;
	return { bg: `hsl(${hue} ${SAT}% ${LIGHT}%)`, fg: "#161616" };
}

/** Neutral band for colour fonts, so the font's own colours carry the row. */
export const NEUTRAL = { bg: "#0b0b0b", fg: "#ffffff" };
