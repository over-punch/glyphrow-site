// Lazily injects a Google Fonts stylesheet <link> for a family, once each.
// Used by the infinite scroll so each font's CSS is only requested when the
// row that needs it comes into view.

const requested = new Set<string>();

/**
 * Ensures the given Google Fonts family is loaded. Idempotent per family.
 * Optionally appends a css2 axis spec (e.g. "wght@100..900") for variable
 * fonts; omit it to load the family's default face (robust for any font).
 */
export function loadGoogleFont(family: string, axisSpec?: string): void {
	if (typeof document === "undefined") return;
	const key = axisSpec ? `${family}::${axisSpec}` : family;
	if (requested.has(key)) return;
	requested.add(key);

	// Encode the family so reserved characters (& ? : = # …) can't break out of
	// the query string; Google uses "+" for spaces, so restore those. The axis
	// spec is developer-controlled css2 syntax (@, .., ,) and must stay literal.
	const name = encodeURIComponent(family.trim()).replace(/%20/g, "+");
	const spec = axisSpec ? `${name}:${axisSpec}` : name;
	const link = document.createElement("link");
	link.rel = "stylesheet";
	link.href = `https://fonts.googleapis.com/css2?family=${spec}&display=swap`;
	// Surface load failures (e.g. a mistyped family, or an axis a static font
	// doesn't offer) instead of silently rendering a fallback.
	link.addEventListener("error", () => {
		console.warn(`[glyphrow] font stylesheet failed to load: ${family}${axisSpec ? ` (${axisSpec})` : ""}`);
	});
	document.head.appendChild(link);
}
