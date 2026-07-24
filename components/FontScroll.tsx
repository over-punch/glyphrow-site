"use client";

// Infinite scroll of Google Fonts, each rendered as a live Glyphrow tester with
// a cycling variety of settings. Rows are appended as a bottom sentinel scrolls
// into view; the family/preset lists loop, so the scroll never ends.

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Glyphrow } from "glyphrow/react";
import { FAMILIES } from "@/lib/families";
import { PRESETS } from "@/lib/presets";
import { loadGoogleFont } from "@/lib/googleFont";
import { rowColor, NEUTRAL } from "@/lib/colors";

/** How many rows to append each time the sentinel is reached. */
const BATCH = 8;

/** One font row: a coloured band with a centred, live Glyphrow tester. Most
 * rows use the cycled Google Font family; some presets pin a specific font
 * (colour fonts, feature demos). The family name is on the row's title. */
function FontRow({ family, index }: { family: string; index: number }) {
	const preset = PRESETS[index % PRESETS.length];
	// Rotate the preset's sample pool on each full loop through the presets.
	const cycle = Math.floor(index / PRESETS.length);
	const sample = preset.samples[cycle % preset.samples.length];
	// Pinned font (colour fonts / feature demos) or the cycled family.
	const font = preset.font ?? family;
	// Colour fonts paint themselves, so they sit on a neutral band.
	const { bg, fg } = preset.colorFont ? NEUTRAL : rowColor(index);
	// Inline band colour + the text colour the proof inherits (see globals.css).
	// Setting `color` too means currentColor (which the proof's --glyphrow-accent
	// resolves to) is the band ink, not the light body ink — so focus rings stay
	// visible on bright bands, and any inherited-colour fallback text is legible.
	const style = { background: bg, color: fg, "--glyphrow-fg": fg } as CSSProperties;

	useEffect(() => {
		loadGoogleFont(font, preset.load);
		// Load the weight range so variable fonts render real weights (the range
		// request is a no-op for non-variable fonts; the plain load above covers
		// them). Colour fonts have their own fixed weight.
		if (!preset.colorFont) loadGoogleFont(font, "wght@100..900");
		// Italic rows load the real italic face so it isn't a synthesised slant.
		if (preset.italic) loadGoogleFont(font, "ital@1");
	}, [font, preset.load, preset.italic, preset.colorFont]);

	return (
		<article className="row" title={font} style={style}>
			<Glyphrow
				fontFamily={font}
				fallback="sans-serif"
				text={sample}
				align="center"
				className="row__proof"
				{...preset.opts}
			/>
		</article>
	);
}

/** The scrolling list. Grows as the user reaches the bottom. */
export default function FontScroll() {
	const [count, setCount] = useState(BATCH);
	const sentinelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const node = sentinelRef.current;
		if (!node) return;
		const io = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting) setCount((c) => c + BATCH);
			},
			// Preload well before the sentinel is visible so scrolling stays smooth.
			{ rootMargin: "800px 0px" },
		);
		io.observe(node);
		return () => io.disconnect();
	}, []);

	const rows = [];
	for (let i = 0; i < count; i++) {
		rows.push(<FontRow key={i} family={FAMILIES[i % FAMILIES.length]} index={i} />);
	}

	return (
		<>
			<div className="rows">{rows}</div>
			<div ref={sentinelRef} className="sentinel" aria-hidden="true">
				loading more fonts…
			</div>
		</>
	);
}
