"use client";

// Infinite scroll of Google Fonts, each rendered as a live Glyphrow tester with
// a cycling variety of settings. Rows are appended as a bottom sentinel scrolls
// into view; the family/preset lists loop, so the scroll never ends.

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Glyphrow } from "glyphrow/react";
import { FAMILIES, VARIABLE_FAMILIES, ITALIC_FAMILIES } from "@/lib/families";
import { PRESETS } from "@/lib/presets";
import { loadGoogleFont } from "@/lib/googleFont";
import { rowColor, NEUTRAL } from "@/lib/colors";

/** How many rows to append each time the sentinel is reached. */
const BATCH = 8;

/** Auto-append stops after this many rows; a "Load more" button then continues.
 * Bounds how many live Glyphrow instances / observers accumulate from scrolling. */
const CAP = 160;

/** One font row: a coloured band with a centred, live Glyphrow tester. Most
 * rows use the cycled Google Font family; some presets pin a specific font
 * (colour fonts, feature demos). The family name is on the row's title. */
/** How far outside the viewport a row keeps its live tester mounted. */
const WINDOW_MARGIN = "1400px 0px";

function FontRow({ family, index }: { family: string; index: number }) {
	const preset = PRESETS[index % PRESETS.length];
	// Rotate the preset's sample pool on each full loop through the presets.
	const cycle = Math.floor(index / PRESETS.length);
	const sample = preset.samples[cycle % preset.samples.length];
	// Pinned font (colour fonts / feature demos) or the cycled family.
	const font = preset.font ?? family;
	// Colour fonts paint themselves, so they sit on a neutral band.
	const { bg, fg } = preset.colorFont ? NEUTRAL : rowColor(index);

	const ref = useRef<HTMLElement>(null);
	// Windowing: mount the (heavy) Glyphrow tester only while the row is near the
	// viewport. Far rows keep just their coloured band at its last measured
	// height, so a long scroll doesn't accumulate unbounded live testers,
	// ResizeObservers and document listeners. Starts mounted so SSR/first paint
	// matches; the observer unmounts distant rows on the client.
	const [mounted, setMounted] = useState(true);
	const minHeightRef = useRef<number>();

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(
			([entry]) => {
				// Capture the fitted height before unmounting so the band keeps the
				// same size and the scroll position doesn't jump.
				if (!entry.isIntersecting) {
					const h = el.getBoundingClientRect().height;
					if (h) minHeightRef.current = h;
				}
				setMounted(entry.isIntersecting);
			},
			{ rootMargin: WINDOW_MARGIN },
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	useEffect(() => {
		loadGoogleFont(font, preset.load);
		// Only request the weight range for fonts with a variable wght axis — a
		// range request 400s on static fonts. Colour fonts have a fixed weight.
		if (!preset.colorFont && VARIABLE_FAMILIES.has(font)) {
			loadGoogleFont(font, "wght@100..900");
		}
		// Load a real italic face only for families that actually ship one.
		if (preset.italic && ITALIC_FAMILIES.has(font)) {
			loadGoogleFont(font, "ital@1");
		}
	}, [font, preset.load, preset.italic, preset.colorFont]);

	// Inline band colour + the text colour the proof inherits (see globals.css).
	// Setting `color` too means currentColor (which the proof's --glyphrow-accent
	// resolves to) is the band ink, not the light body ink — so focus rings stay
	// visible on bright bands, and any inherited-colour fallback text is legible.
	// While windowed out, pin the band to its captured height.
	const style = {
		background: bg,
		color: fg,
		"--glyphrow-fg": fg,
		...(mounted ? {} : { minHeight: minHeightRef.current }),
	} as CSSProperties;

	return (
		<article ref={ref} className="row" title={font} style={style}>
			{mounted && (
				<Glyphrow
					fontFamily={font}
					fallback="sans-serif"
					text={sample}
					align="center"
					className="row__proof"
					{...preset.opts}
				/>
			)}
		</article>
	);
}

/** The scrolling list. Grows as the user reaches the bottom. */
export default function FontScroll() {
	const [count, setCount] = useState(BATCH);
	const [reducedMotion, setReducedMotion] = useState(false);
	const sentinelRef = useRef<HTMLDivElement>(null);
	// Prevents a burst of batches within a single frame if the sentinel stays
	// intersecting after an append (short rows / tall viewport).
	const loadingRef = useRef(false);

	// Respect prefers-reduced-motion: swap the endless auto-append (content
	// shifting under the user on scroll) for an explicit "Load more" button,
	// which also makes the footer reachable.
	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => setReducedMotion(mq.matches);
		update();
		mq.addEventListener("change", update);
		return () => mq.removeEventListener("change", update);
	}, []);

	// Auto-append only while under the cap and not reduced-motion; past that a
	// "Load more" button takes over, bounding how many live instances accumulate.
	const autoAppend = !reducedMotion && count < CAP;

	useEffect(() => {
		if (!autoAppend) return;
		const node = sentinelRef.current;
		if (!node) return;
		const io = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting && !loadingRef.current) {
					loadingRef.current = true;
					setCount((c) => c + BATCH);
					requestAnimationFrame(() => {
						loadingRef.current = false;
					});
				}
			},
			// Preload well before the sentinel is visible so scrolling stays smooth.
			{ rootMargin: "800px 0px" },
		);
		io.observe(node);
		return () => io.disconnect();
	}, [autoAppend]);

	const rows = [];
	for (let i = 0; i < count; i++) {
		rows.push(<FontRow key={i} family={FAMILIES[i % FAMILIES.length]} index={i} />);
	}

	return (
		<>
			<div className="rows">{rows}</div>
			{autoAppend ? (
				<div ref={sentinelRef} className="sentinel" aria-hidden="true">
					loading more fonts…
				</div>
			) : (
				<button type="button" className="load-more" onClick={() => setCount((c) => c + BATCH)}>
					Load more fonts
				</button>
			)}
		</>
	);
}
