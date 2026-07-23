// Setting presets cycled across the infinite scroll so consecutive rows show
// different Glyphrow configurations — sizes, controls, OpenType features,
// alignment, italics and sample text. Each row picks presets[index % length],
// and rotates through that preset's sample pool on each successive loop so the
// endless scroll keeps showing fresh text.
//
// Tracking is only applied to the all-caps instance (caps benefit from a little
// letter-spacing); everything else runs at the font's natural spacing.

import type { GlyphrowProps, FeatureTag } from "glyphrow/react";

/** A named bundle of Glyphrow options plus a rotating pool of sample texts. */
export interface Preset {
	/** Reference label (used as the row's hover title, not shown as a caption). */
	label: string;
	/** Sample texts; the scroll rotates through these on each loop. */
	samples: string[];
	/** Glyphrow options (font-family is supplied per row). */
	opts: Partial<GlyphrowProps>;
	/** Load the italic face for this row (so italic is real, not synthesised). */
	italic?: boolean;
}

const f = (...tags: string[]) => tags as FeatureTag[];

export const PRESETS: Preset[] = [
	{
		label: "Display · ligatures",
		samples: ["Handgloves", "Fjord bank", "Waltz nymph", "Quixotic"],
		opts: { size: 92, controls: { size: true, features: true }, features: f("liga", "dlig") },
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
		label: "Italic",
		samples: ["Bold, light & italic", "Emphasis, gracefully", "In her own words", "A slanted remark"],
		italic: true,
		opts: { size: 56, italic: true, controls: { weight: true, italic: true, features: true } },
	},
	{
		label: "Auto-fit headline",
		samples: ["Typographic voice", "Set in stone", "Reads beautifully", "Character & tone"],
		opts: { size: "fit", controls: { features: true, align: true } },
	},
	{
		label: "All caps · tracked",
		samples: ["TYPE SPECIMEN", "DISPLAY CAPS", "SET IN CAPITALS", "GRAND OPENING"],
		opts: { size: 46, tracking: 0.12, controls: { size: true, tracking: true, features: true } },
	},
	{
		label: "Numerals",
		samples: ["0123456789 · $1,234.56", "1/2 3/4 · No. 42 · 3.14159", "24/7 · +1 (555) 0192", "€9.99 · 100% · #7"],
		opts: { size: 44, controls: { features: true }, features: f("tnum") },
	},
	{
		label: "Italic quote",
		samples: [
			"The quick brown fox jumps over the lazy dog",
			"Typography is the craft of endowing language with visible form",
			"Good type is invisible until it isn't",
			"Letters were once cut by hand in metal",
		],
		italic: true,
		opts: { size: 34, italic: true, align: "center", controls: { size: true, align: true } },
	},
];
