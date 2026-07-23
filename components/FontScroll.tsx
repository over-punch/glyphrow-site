"use client";

// Infinite scroll of Google Fonts, each rendered as a live Glyphrow tester with
// a cycling variety of settings. Rows are appended as a bottom sentinel scrolls
// into view; the family/preset lists loop, so the scroll never ends.

import { useEffect, useRef, useState } from "react";
import { Glyphrow } from "glyphrow/react";
import { FAMILIES } from "@/lib/families";
import { PRESETS } from "@/lib/presets";
import { loadGoogleFont } from "@/lib/googleFont";

/** How many rows to append each time the sentinel is reached. */
const BATCH = 8;

/** One font row: its Google Font is loaded on mount, then tested with a preset.
 * No visible caption — the family name is on the row's title (hover) for
 * reference, keeping the scroll a clean wall of type. */
function FontRow({ family, index }: { family: string; index: number }) {
	const preset = PRESETS[index % PRESETS.length];

	useEffect(() => {
		loadGoogleFont(family);
		// Italic rows load the real italic face so it isn't a synthesised slant.
		if (preset.italic) loadGoogleFont(family, "ital@1");
	}, [family, preset.italic]);

	return (
		<article className="row" title={family}>
			<Glyphrow
				fontFamily={family}
				fallback="sans-serif"
				text={preset.sample}
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
