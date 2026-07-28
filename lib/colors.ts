// Per-row background colours. Hues are drawn only from a warm arc — roses,
// reds, corals, oranges, yellows and warm greens — deliberately skipping the
// cool cyans, blues and violets that read as "techie". A golden-ratio sequence
// spreads them evenly across that arc so neighbours are distinct. High
// lightness with generous saturation gives a soft, crayon-like, childlike feel.

const WARM_START = 342; // rose / watermelon
const WARM_SPAN = 120; // ...through red, coral, tangerine, yellow to lime (~100°); no cool greens
const GOLDEN_RATIO = 0.6180339887; // even, non-repeating spread across the arc
const SAT = 90; // % — vivid, crayon-saturated
// Lightness cycles through three levels so adjacent bands differ in perceptual
// lightness, not just hue — hue is the one axis red-green colour blindness
// collapses, so a light/dark difference keeps neighbours distinguishable (and
// in greyscale). All three keep the near-black text above WCAG AA.
const LIGHTS = [78, 70, 62];

/** Background + foreground for the row at `index`. */
export function rowColor(index: number): { bg: string; fg: string } {
	const t = (index * GOLDEN_RATIO) % 1;
	const hue = (WARM_START + t * WARM_SPAN) % 360;
	const light = LIGHTS[index % LIGHTS.length];
	return { bg: `hsl(${hue.toFixed(1)} ${SAT}% ${light}%)`, fg: "#161616" };
}

/** Neutral band for colour fonts, so the font's own colours carry the row. */
export const NEUTRAL = { bg: "#0b0b0b", fg: "#ffffff" };
