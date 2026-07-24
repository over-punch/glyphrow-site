// Setting presets cycled across the infinite scroll. Each row picks
// presets[index % length] and rotates through that preset's sample pool on each
// loop. Some presets pin a specific font (colour fonts, feature showcases);
// the rest use the cycled Google Font family.
//
// Single-line rows use size:"fit" — Glyphrow's auto-fit finds the largest size
// that fits the band, so a word never overflows a narrow screen. The size
// control's range caps how large fit may grow (giving scale variety) and, in
// fit mode, the size slider is hidden (sizing is automatic). Tracking is only
// applied to the all-caps row. Colour fonts are ordered so two never sit
// adjacent in the scroll.

import type { GlyphrowProps, FeatureTag } from "glyphrow/react";

/** A named bundle of Glyphrow options plus a rotating pool of sample texts. */
export interface Preset {
	/** Reference label (used as the row's hover title fallback). */
	label: string;
	/** Sample texts; the scroll rotates through these on each loop. */
	samples: string[];
	/** Glyphrow options (font-family is supplied per row unless `font` is set). */
	opts: Partial<GlyphrowProps>;
	/** Load the italic face for this row (so italic is real, not synthesised). */
	italic?: boolean;
	/** Pin this font instead of the cycled family (colour fonts, feature demos). */
	font?: string;
	/** css2 axis spec to load for the pinned font. */
	load?: string;
	/** Render on a neutral band so the font's own colours carry the row. */
	colorFont?: boolean;
}

const f = (...tags: string[]) => tags as FeatureTag[];

export const PRESETS: Preset[] = [
	{
		label: "Display · ligatures",
		samples: ["Handgloves", "Fjord bank", "Waltz nymph", "Quixotic"],
		opts: {
			size: "fit",
			weight: 700,
			wrap: false,
			controls: { size: { min: 20, max: 300 }, weight: true, features: true },
			features: f("liga", "dlig"),
		},
	},
	{
		label: "Reading",
		samples: [
			"Sphinx of black quartz, judge my vow.",
			"How vexingly quick daft zebras jump!",
			"Pack my box with five dozen liquor jugs.",
			"The five boxing wizards jump quickly.",
		],
		opts: { size: 30, wrap: true, controls: { size: true, weight: true, features: true } },
	},
	{
		label: "Colour font · Nabla",
		font: "Nabla",
		colorFont: true,
		samples: ["Chroma", "Spectrum", "Vivid", "Prism"],
		opts: { size: "fit", wrap: false, controls: { size: { min: 20, max: 280 }, tracking: true } },
	},
	{
		label: "Italic",
		samples: ["Bold, light & italic", "Emphasis, gracefully", "In her own words", "A slanted remark"],
		italic: true,
		opts: {
			size: "fit",
			weight: 300,
			italic: true,
			wrap: false,
			controls: { size: { min: 16, max: 110 }, weight: true, italic: true, features: true },
		},
	},
	{
		label: "Auto-fit headline",
		samples: ["Typographic voice", "Set in stone", "Reads beautifully", "Character & tone"],
		opts: { size: "fit", weight: 800, wrap: false, controls: { size: { min: 20, max: 300 }, weight: true, features: true } },
	},
	{
		label: "Colour font · Bungee Spice",
		font: "Bungee Spice",
		colorFont: true,
		samples: ["SPICE", "HEAT", "ZEST", "BOLD"],
		opts: { size: "fit", wrap: false, controls: { size: { min: 20, max: 240 }, tracking: true } },
	},
	{
		label: "All caps · tracked",
		samples: ["TYPE SPECIMEN", "DISPLAY CAPS", "SET IN CAPITALS", "GRAND OPENING"],
		opts: {
			size: "fit",
			weight: 500,
			tracking: 0.12,
			wrap: false,
			controls: { size: { min: 16, max: 92 }, weight: true, tracking: true, features: true },
		},
	},
	{
		label: "Numerals",
		samples: ["0123456789 · $1,234.56", "1/2 3/4 · No. 42 · 3.14159", "24/7 · +1 (555) 0192", "€9.99 · 100% · #7"],
		opts: { size: "fit", wrap: false, controls: { size: { min: 16, max: 84 }, features: true }, features: f("tnum") },
	},
	{
		label: "Colour font · Honk",
		font: "Honk",
		colorFont: true,
		samples: ["Honk", "Beep", "Zoom", "Loud"],
		opts: { size: "fit", wrap: false, controls: { size: { min: 20, max: 280 }, tracking: true } },
	},
	{
		label: "Italic quote",
		samples: [
			"The quick brown fox jumps over the lazy dog",
			"Typography endows language with visible form",
			"Good type is invisible until it isn't",
			"Letters were once cut by hand in metal",
		],
		italic: true,
		opts: { size: 32, weight: 300, italic: true, controls: { size: true, weight: true } },
	},
	{
		label: "Small caps",
		font: "Cormorant",
		samples: ["Small Capitals", "Fine Details", "Quiet Luxury", "Set in Caps"],
		opts: {
			size: "fit",
			weight: 500,
			wrap: false,
			controls: { size: { min: 16, max: 110 }, weight: true, features: true },
			features: f("smcp"),
		},
	},
];
