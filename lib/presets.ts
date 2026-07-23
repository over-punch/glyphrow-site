// Setting presets cycled across the infinite scroll so consecutive rows show
// different Glyphrow configurations — sizes, controls, OpenType features,
// alignment, italics and sample text. Each row picks presets[index % length].
//
// Tracking is only applied to the all-caps instance (caps benefit from a little
// letter-spacing); everything else runs at the font's natural spacing.

import type { GlyphrowProps, FeatureTag } from "glyphrow/react";

/** A named bundle of Glyphrow options plus the sample text to seed. */
export interface Preset {
	/** Reference label (used as the row's hover title, not shown as a caption). */
	label: string;
	/** Seed sample text. */
	sample: string;
	/** Glyphrow options (font-family is supplied per row). */
	opts: Partial<GlyphrowProps>;
	/** Load the italic face for this row (so italic is real, not synthesised). */
	italic?: boolean;
}

const f = (...tags: string[]) => tags as FeatureTag[];

export const PRESETS: Preset[] = [
	{
		label: "Display · ligatures",
		sample: "Handgloves",
		opts: { size: 92, controls: { size: true, features: true }, features: f("liga", "dlig") },
	},
	{
		label: "Reading",
		sample: "Sphinx of black quartz, judge my vow.",
		opts: { size: 30, wrap: true, controls: { size: true, weight: true, features: true } },
	},
	{
		label: "Italic",
		sample: "Bold, light & italic",
		italic: true,
		opts: { size: 56, italic: true, controls: { weight: true, italic: true, features: true } },
	},
	{
		label: "Auto-fit headline",
		sample: "Typographic voice",
		opts: { size: "fit", controls: { features: true, align: true } },
	},
	{
		label: "All caps · tracked",
		sample: "TYPE SPECIMEN",
		opts: { size: 46, tracking: 0.12, controls: { size: true, tracking: true, features: true } },
	},
	{
		label: "Numerals",
		sample: "0123456789 · $1,234.56",
		opts: { size: 44, controls: { features: true }, features: f("tnum") },
	},
	{
		label: "Italic quote",
		sample: "The quick brown fox jumps over the lazy dog",
		italic: true,
		opts: { size: 34, italic: true, align: "center", controls: { size: true, align: true } },
	},
];
